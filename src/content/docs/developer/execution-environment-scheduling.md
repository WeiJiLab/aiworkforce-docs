---
title: "Scheduling sessions on self-hosted workers"
description: "How two fixed workers could share a queue, keep a session on its original workspace, and recover an assignment after a dispatcher restart."
status: planned
audience:
  - platform-engineer
  - developer
product_area: deployment
last_verified: "2026-11-19"
sidebar:
  label: Worker scheduling
  badge:
    text: Planned
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

Suppose sessions 1 and 2 are running tools on workers A and B. The owner submits the first message in session 3. With the proposed **execution environment**, the owner chooses a set of eligible workers. Session 3 waits. When B finishes and confirms that its processes have stopped, the platform starts session 3 on B, even if the owner has closed the browser.

This design explores dispatcher takeover of reserved turns that have yet to start. To group your paired devices or choose a pool for a chat, see [Use an execution pool](/deployment/daemon/execution-pools/).

## What works with two devices today

The owner of a regular Claude Code employee session can select a device before the first message. The platform runs the model loop and sends tool calls to that device. A single-node Linux ARM64 Kubernetes trial used two independently registered daemons, real WSS connections and scripted model responses. Both sessions wrote and read different markers at the same relative path, then read them again after each idle Pod was replaced. Across both devices, four turns produced six successful tool receipts. A third session already bound to A received a busy error while B was idle. For registration, volumes and the manual check, see [Run a device executor on Kubernetes](/deployment/self-host/#run-a-device-executor-on-kubernetes).

Each worker has its own device identity, state volume and project volume. Sessions assigned to the same worker can read files left in its workspace. That makes **one owner and one trusted project** the scope of this design. A session keeps its worker binding across turns. A turn reserves the worker only until it finishes and the device has accounted for its processes. B can therefore admit session 3 while session 2 is idle. Session 2's next turn still needs B.

## What the platform would change

### Accept a message before choosing a worker

Save the owner's environment choice before the first message. The device picker freezes the target once a message exists, so the dispatcher needs an internal operation to bind the first worker later. The current `send_prompt` path starts a task in the WebSocket process. Its follow-up queue orders messages within one session. By the time a tool command reaches a daemon, it already names a worker. The environment queue therefore belongs before device assignment.

For an environment, persist the message and its queue entry together, using the session and client message ID as a unique database key, before acknowledging receipt. A retry with the same session and client message ID returns the same request. Reject different content under that key. While the request waits for a worker, keep the model idle and show the waiting state when the owner reconnects. A cancellation or deadline that wins before allocation ends the wait.

### Reserve one worker for one turn

The dispatcher takes the oldest eligible request, preserving message order within each session. It rechecks the owner's access, the project and the worker's environment membership. An eligible worker is online, authorized for `device_rpc` and clear of quarantine. A bound session waits for its own worker.

In one PostgreSQL transaction, claim the request, create or reuse the session's unique binding to the worker and its local session, reserve the worker, and record one run per request with its start pending. Lock the request and use a conditional slot update. Two dispatchers can then compete safely even when they see the same free worker. Admission requires both the platform turn (`active_run_id`) and the device execution slot (`execution_slot_id`) to be clear.

### Start the recorded run

The existing `runtime_turn` creates a run and rejects a second call for the same request. The scheduler needs a way to start a reserved run using its original ID. The current lease cleanup interrupts expired runs. For a reservation whose start is still pending, the new dispatcher must be able to take over the lease and start the run in coordination with that cleanup.

Guard the transition from pending to running with the dispatcher's current lease version. Increment that version on takeover and check it when writing state or dispatching tools so only the current holder can act. Wake the dispatcher when a slot is released. On startup and periodically, scan for eligible requests and pending starts to recover a missed notification.

### Reuse the daemon and its stop evidence

The existing daemon is sufficient for the fixed-capacity pilot. It authenticates over outbound WSS, executes tool commands for its device, and records execution generations, results and stops in its journal. The platform can offer the slot to the next turn once the current turn finishes and the device confirms its processes stopped.

If a command might have run, reconcile its original ID and device execution generation against the receipts and journal. Where the outcome is unknown, keep the slot quarantined and show that it is waiting for review. Releasing it after a Pod replacement or dispatcher lease expiry requires evidence about the original execution.

## How to verify the scheduler

These are acceptance tests for the proposed platform change. Use real PostgreSQL, two independent dispatcher processes, and two registered daemons with separate project volumes. Give sessions 1 and 2 controllable turns that hold A and B. Give session 3 one tool action that **appends its request ID** to a test file. Count matching lines on both volumes to detect repeated execution, including a second write that would be invisible with an overwrite.

| Exercise                                                                                                           | Passing observation                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Submit session 3 while both workers are occupied. Retry with the same message ID and close the browser.            | After a dispatch scan, PostgreSQL shows one waiting request for session 3. Worker bindings, model starts and tool commands for that request are all zero.                         |
| Keep A occupied. Finish session 2 and confirm the stop on B. Let both dispatchers contend for the waiting request. | Without another user message, session 3 binds to B and completes one run. Its command has one logical completion receipt. The file contains its ID once on B and zero times on A. |
| Withhold B's stop confirmation at the end of its turn.                                                             | Session 3 keeps waiting. B remains quarantined if the stop outcome is unknown.                                                                                                    |
| Cancel session 3 while it is queued, then release B.                                                               | The request stays cancelled and its ID appears on neither volume.                                                                                                                 |
| With session 3 running on B, release A and submit another turn in session 2.                                       | Session 2 waits for B and resumes in its original workspace after B becomes available.                                                                                            |

Run the release test again for each crash point below. Stop the dispatcher that holds the claim, let its peer take over, then restart the first process. Correlate the same request, worker binding, run, command receipt and file counts after recovery.

| Crash point                                                                 | Passing observation                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before the allocation transaction commits                                   | PostgreSQL rolls back the claim and reservation. The peer can assign the original request once.                                                                                                                                       |
| After commit, before the start notification                                 | The peer discovers the pending start and starts the recorded run on the recorded worker. A delayed start from the old lease holder is rejected.                                                                                       |
| After the tool appends the marker, before the platform receives the receipt | Recovery reconciles the original command and execution generation. If the receipt can be recovered, the recorded run receives it. If the outcome is unknown, the slot stays quarantined. In both cases the marker count stays at one. |

## How this relates to per-session sandboxes

Anthropic's Compose quickstart checks which container actually ran a tool. Its Kubernetes chart uses the Agent Sandbox controller. The dispatcher polls an environment queue and allocates a sandbox per session. After an idle Pod exits, the next message mounts the same session volume in a new Pod. The fixed-worker design borrows the environment queue and session affinity. Its project volume belongs to a worker. [Claude Managed Agents quickstart](https://platform.claude.com/docs/en/managed-agents/self-hosted/quickstart) · [One sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-per-session)

Kubernetes SIG Apps Agent Sandbox provides `SandboxClaim` to request capacity from a template and `SandboxWarmPool` to keep sandboxes ready. Its DeerFlow example maps a provider's acquire and release operations to claims. Once the fixed-worker tests pass, a dispatcher could use a claim for a new session, persist the claim identity, scope credentials to the session and attach a session-owned volume. The platform would still own admission, session binding and recovery. [Agent Sandbox v1.0.11](https://github.com/kubernetes-sigs/agent-sandbox/tree/v1.0.11) · [Warm pool example](https://github.com/kubernetes-sigs/agent-sandbox/tree/v1.0.11/examples/warmpool-quickstart) · [DeerFlow provider](https://github.com/kubernetes-sigs/agent-sandbox/tree/v1.0.11/examples/deer-flow-sandbox)
