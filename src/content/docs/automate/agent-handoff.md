---
title: "Agent handoff"
description: "Pass work between a session, another run, or a person. A sentence in the prompt is not a handoff record."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Handoff means the next actor can see the current state and the previous actor stops owning the next step. The current product records that in different places. It does not provide one general handoff protocol between arbitrary agents.

## Choose the record

| Situation                               | What actually happens                                   | Read next                                               |
| --------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| Same goal, more detail                  | Continue the session                                    | [Sessions and plans](/user-guide/sessions-planning/)    |
| A Job runs again                        | A new run, or the bound session if reuse is configured  | [Runs and recovery](/automate/runs-recovery/)           |
| A parent delegates inside one execution | A subagent, only if the trace shows the call            | [Agent composition](/build/composition/)                |
| A person takes the next step            | Takeover on a delivery card, then an explicit hand-back | [Human approval](/user-guide/human-approval/)           |
| Engineering work changes lanes          | The card moves, with its session and evidence           | [Agent orchestration](/software-factory/orchestration/) |

Continuing a session keeps the conversation. Starting a new session does not copy every prior decision unless you put that context in the new request. Reused-session Jobs accumulate context on purpose. That accumulation can also hide which run introduced a mistake.

## Hand back to a person

If you take over a card, automatic progress stops. Resuming a pause does not clear the takeover. Hand the work back explicitly and record what you did. A prompt that says "ask a human if unsure" does not create an approval request by itself. Use the question and approval points the card or the run already exposes.

Do not describe a workflow as a relay of agents unless you can point to the trace of each delegation and the grants each agent actually had.
