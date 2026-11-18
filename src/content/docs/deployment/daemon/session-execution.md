---
title: "Session execution location"
description: "Choose an online computer for a session and understand host permissions and offline behavior."
sidebar:
  label: Session execution location
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Start an employee session and open **Execution location** before sending the first message. Select an online computer you own. If it is missing, check its pairing and online status under **Device connections** in personal settings. See [My machines](/deployment/daemon/my-machines/).

## Check the working directory and permissions

Tool commands run as the operating-system user on the selected computer. The `--workspace` you approved sets the starting directory. The process can access files allowed by that user’s OS permissions. Only the session owner can invoke tools on a personal device, subject to workspace permissions and the session’s tool grant.

## Change the execution location

The location is fixed after the first message. If the device goes offline or its authorization is revoked, the session does not fall back to platform execution. Marking a default computer in Device connections leaves existing sessions as they are. To use a different computer or the platform, start a session and select the location before the first message.
