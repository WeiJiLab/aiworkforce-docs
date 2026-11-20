---
title: "PagerDuty"
description: "Receive PagerDuty incident events on a personal connection and start a Job when an enabled rule matches."
sidebar:
  label: PagerDuty
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

PagerDuty is a monitoring connection for incident events. The connection belongs to you in one workspace. When an incident event matches an enabled rule, a published Job can run. The connection does not acknowledge, resolve, or reassign the incident in PagerDuty.

## What it is

You save a PagerDuty API token for the US or EU region. After the token is validated, AI Workforce can register an account webhook that posts incident events back to this deployment. The signing secret from PagerDuty is stored encrypted and is not returned to the browser.

## When to use it

Use PagerDuty when an incident is triggered, acknowledged, resolved, or escalated and an employee should look at it. Use [Sentry](/integrations/sentry/) for issue lifecycle events. Use a schedule, documented in [research and monitoring](/workflows/research-monitoring/), when the work should run at a time rather than on an incident.

## What moves between the systems

PagerDuty posts the subscribed incident events. The platform checks the signature, then stores a normalized event the Job can read: incident id, title, service, urgency, status, and URL. A preview uses a sample of that shape. A successful preview does not mean the webhook was delivered.

Events are incident triggered, acknowledged, resolved, and escalated. A rule holds one to twelve conditions. Each condition is one event type plus its filters. Every filter on that condition has to match, and any matching condition admits the event. Filters can require service ids, urgencies, and a title substring. Leave a filter unset when it should not narrow the event.

## Connect it

1. Create a PagerDuty API token that can read services and incidents. Creating the subscription also needs read and write on webhook subscriptions.
2. Open the workspace **Integrations**, choose PagerDuty, and add a connection for your automations in this workspace.
3. Name it and choose the United States or Europe region. The API address is the official address for that region: `https://api.pagerduty.com` or `https://api.eu.pagerduty.com`. Region and address stay fixed after the first save.
4. Enter the API token and save. Leave the signing secret empty when you want the subscription step to generate it.
5. Validate. Save pending edits first. An authentication failure marks an authorization error. A temporary upstream failure records a health error and does not clear an authorization that already succeeded.
6. Configure the event subscription. The product creates or repairs the account webhook for triggered, acknowledged, resolved, and escalated events, aimed at this deployment's public HTTPS address. A healthy existing subscription keeps its signing secret. A missing or mismatched subscription is replaced. If PagerDuty hides the old secret, the matching orphan subscriptions for this callback are removed and a new one is created.
7. On the Job, choose the PagerDuty events, this connection, and the service or urgency conditions. Publish the Job and enable the rule.

The deployment needs a public HTTPS address before the subscription can be registered.

## What you can do afterward

A matching event starts the Job. The employee uses the tools it already has. The incident payload does not grant new tools and does not prove the incident is fixed. Read the run, then decide what a person should do in PagerDuty.

A saved subscription id means the subscription was registered. It does not mean PagerDuty is still healthy. Configure the subscription again when delivery stops. Deleting the connection removes the remote subscription this connection created, then deletes the local connection. If the remote delete fails, the connection stays so you can retry.

## Permissions and credentials

The token is encrypted and is not returned by the API. You can reveal it from the connection while you are the owner and no subscription is locking it. Another person, including a workspace administrator, cannot use your connection. You still need execute permission on the workspace.

After a subscription exists, the API token cannot be replaced on this connection. Create a new connection and point the rules at it. That avoids attaching the webhook to a different PagerDuty account. The signing secret can be rotated and takes effect immediately.

## Limits

PagerDuty uses manually configured connections and processes native incident events. A verified connection can still accept and store eligible events while paused. The platform skips rule evaluation for those deliveries and does not replay them on re-enable. The integration reads new events without changing incidents, granting MCP access, or backfilling history.

## Related guides

- [Integration directory](/integrations/overview/)
- [Sentry](/integrations/sentry/)
- [Research and monitoring](/workflows/research-monitoring/)
- [Event-driven automation](/automate/event-driven/)
