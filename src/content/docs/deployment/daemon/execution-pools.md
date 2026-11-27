---
title: "Use an execution pool"
description: "Group your paired devices, choose a pool for a chat, and see which device handles each turn."
audience:
  - user
product_area: deployment
last_verified: "2026-11-27"
sidebar:
  label: Execution pools
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

An execution pool lets AI Workforce choose an available device from the computers you have paired. Use a pool when several devices can run the same work and you want to start a chat without picking a computer yourself. Each device can run one turn at a time.

## Create a pool

1. Pair your computers with the same AI Workforce account. Open **Personal settings → Device connections** to check that each device is online and uses the working directory you expect. If a device is marked **update client**, update its client first. [Pair a computer](/deployment/daemon/my-machines/)
2. Under **Execution pools**, select the plus button labeled **Create execution pool**.
3. Enter a name, select the computers you want to use, and select **Save execution pool**.

You choose the devices when you create the pool. To use a different set of devices, create another pool. If a device belongs to two pools, both pools share its one slot. A chat that selects that device directly uses the same slot.

Each device uses its own paired working directory. If any device in the pool might handle a task, make sure each device has the files and tools the task needs.

## Choose a pool for a chat

1. Open a new regular chat with a Claude Code employee.
2. Before sending the first message, open **Execution location** above the message box and select the pool by name. The number next to its name is the total number of slots. Check **Device connections** for the number currently available.
3. Send your message. The chat shows why a turn is waiting and then names the assigned computer and working directory.

Follow-up messages in the same chat use the computer assigned to its first turn. Another chat can use that computer between your turns. To change the execution location, start a new chat. If you need a particular working directory, select that computer directly. For files needed by a pool chat, put them in the device workspace and ask the employee to read them there.

## Check a queued turn

Under **Personal settings → Device connections → Execution pools**, you can see available, occupied, and unavailable slots, each device's status, how many turns are queued, and how long the oldest turn has been waiting.

For example, if both computers in a two-slot pool are busy, the first turn of a third chat waits. It can start when either computer is available. If the third chat has already run on one of those computers, its next turn waits for that computer.

| What the chat says                   | What you can do                                                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Waiting for a pool device assignment | An eligible device is available. Wait for the turn to be assigned.                                                                     |
| Pool devices are in use or stopping  | Wait for a slot to become available. A device can still be occupied while it stops the previous turn.                                  |
| No pool device can take this turn    | Check the devices in **Execution pools**. Reconnect offline devices, or update the client if the device shows that it needs an update. |
| Waiting for the bound device         | Check the named computer. The chat resumes on that computer once it is ready.                                                          |

You can stop a queued turn from the chat. A turn cancelled before assignment sends no commands to a computer.

## Resume after an interruption

- If the wait times out, check **Execution pools** and send a new message once a device is ready. For a chat that already has an assigned computer, check that computer.
- If the assigned computer disconnects during a turn, reconnect it using its existing pairing. Once it is ready, send a new message in the same chat. The interrupted turn stays in the chat history. If it had already started changing files, check the working directory before asking the employee to try again.
- If the computer is isolated or still stopping, wait for it to become available. For a device that stays unavailable, follow the steps in [Troubleshoot self-hosted machines](/deployment/daemon/troubleshooting/).
