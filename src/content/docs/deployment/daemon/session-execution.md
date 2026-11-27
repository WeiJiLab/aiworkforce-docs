---
title: "Session execution location"
description: "Choose an online computer for a session and understand host permissions and offline behavior."
sidebar:
  label: Session execution location
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Start a session for a Claude Code employee you can run. Under **Execution location**, select an online computer you own that advertises `device_rpc`. A computer marked **update client** needs a newer device client. For a regular session, make the selection before sending the first message. See [My machines](/deployment/daemon/my-machines/).

If your deployment includes the pool candidate, a regular Claude Code session can also select a [fixed-capacity execution pool](/deployment/daemon/execution-pools/) before the first message.

## Check the working directory and permissions

Tool commands run as the operating-system user on the selected computer. The `--workspace` you approved sets the starting directory. The process can access files allowed by that user’s OS permissions. Only the session owner can invoke tools on a personal device, subject to workspace permissions and the session’s tool grant.

## Change the execution location

A regular session locks its execution location as soon as it starts. Start a new regular session to choose a different location. The owner of an eligible idle automation session can switch location between turns. The next turn uses the location you select, and switching back resumes that location’s runtime context. If a selected device goes offline or is revoked, execution stays bound to that device until you switch or start a new session. A preferred device setting applies as a choice in the picker.
