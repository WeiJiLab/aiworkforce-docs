---
title: "Self-hosted machines overview"
description: "Learn when to run tools on your own computer with a daemon and where task data goes."
sidebar:
  label: Overview
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A daemon lets an employee run tools on a macOS or Linux computer you manage. You start sessions and read results in AI Workforce. The platform handles the conversation, model calls, and authorization. Your computer executes the commands.

## Who should use a daemon

Select your computer when a task needs a checkout or test service on your private network, hardware attached to that computer, or a build that must run as its OS user. Choose platform execution when the task only needs services already connected to the platform.

To operate the web application and database yourself, see [Self-host](/deployment/self-host/). For a comparison of execution environments, see [Runtime management](/deployment/runtime-environments/).

## What leaves the computer

The checkout and device credentials are stored on your computer. File contents read by the employee and tool results travel to the platform and may reach the employee’s configured model provider. The daemon opens outbound HTTPS and WebSocket connections to the platform. The machine needs no inbound port. See [Security and permissions](/deployment/security/).

## Get started

1. Approve the computer and working directory, then confirm it is online. See [My machines](/deployment/daemon/my-machines/).
2. Select the computer before sending the first message in an employee session. See [Session execution location](/deployment/daemon/session-execution/).
3. If approval succeeds but the worker stays offline, see [Troubleshooting](/deployment/daemon/troubleshooting/).

On a deployment with the candidate change, you can group your paired devices using [Fixed-capacity execution pools](/deployment/daemon/execution-pools/).
