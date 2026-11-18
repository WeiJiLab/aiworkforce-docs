---
title: Employee marketplace settings
description: Set the Git repository and token that the FDE marketplace and employee builder use.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Open **Employee marketplace** (数字员工市场) in the FDE workbench configuration group. The page asks for a repository URL and a Git token. The default repository is `aiworkforce-internal-agents`. The token can reuse the secret already saved on the server for the openstar-agents market, and you can replace that token here.

Initialize the builder from this page before the [employee builder](/fde/builder/) can open a session. This page does not edit a Plugin. Package contents stay in the builder, and the plugins you can convert are listed in the [standard employee marketplace](/fde/market/).

The token is a credential. Do not paste it into an employee instruction, a skill, or a meeting transcript.
