---
title: "Sentry"
description: "Receive Sentry issue events on a personal connection and start a Job when an enabled rule matches."
sidebar:
  label: Sentry
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Sentry is a monitoring connection for issue events. The connection belongs to you in one workspace. When an issue event matches an enabled rule, a published Job can run. The connection does not update the Sentry issue, assign an owner, or file a research report.

## What it is

You register a Sentry internal integration and save its organization, installation id, API token, and client secret. AI Workforce checks that identity against Sentry, then shows the webhook URL to paste into that integration. Only issue hooks for that installation are accepted.

## When to use it

Use Sentry when a new, resolved, assigned, archived, or unresolved issue should wake an employee. Use [PagerDuty](/integrations/pagerduty/) for incident events. Use a schedule when the work is "check again at this time" rather than "this issue changed." Both triggers are described in [research and monitoring](/workflows/research-monitoring/).

## What moves between the systems

Sentry posts issue events to the deployment. The platform checks the signature and the installation, then stores a normalized event. The Job can see the issue id, title, project, level, URL, and, for a regression, the unresolved substatus. A preview sample uses the same shape and does not mean a real webhook arrived.

Supported events are issue created, resolved, assigned, archived, and unresolved. Sentry's archived notification arrives as an ignored action and is stored as archived. A regression arrives as unresolved with substatus `regressed`.

A rule holds one to twelve conditions. Each condition is one event type plus its filters. Every filter on that condition has to match, and any matching condition admits the event. Filters can require project ids, levels, a title substring, and substatuses. Leave a filter unset when it should not narrow the event. There is no environment filter, because the issue hook does not provide a reliable environment field.

## Connect it

1. In Sentry, create an internal integration. Allow Organization Read, Issue & Event Read, and Project Read. Copy the installation UUID. That UUID is the installation, not the app id or the client id.
2. Open the workspace **Integrations**, choose Sentry, and add a connection. The connection is for your automations in this workspace.
3. Name it. Set the Sentry URL to `https://sentry.io`, `https://us.sentry.io`, or `https://de.sentry.io`. Enter the organization slug and the installation UUID.
4. Enter the internal integration API token and the client secret. Save. Address, organization, and installation stay fixed. A different organization needs a new connection.
5. Validate. Validation calls Sentry and checks the organization and the installation. Save pending edits before you validate. A network or rate-limit failure records a health error and does not clear an authorization that already succeeded. An authentication or identity failure marks the connection as an authorization error.
6. Open the webhook setup. Copy the URL into the internal integration, enable the issue webhook, and keep the client secret on this connection the same as Sentry's. The product does not configure Sentry's legacy webhooks plugin and does not put the token in the URL.
7. On the Job, choose the Sentry events, this connection, and the project or title conditions. Publish the Job and enable the rule.

The deployment must have a public HTTPS address before a webhook URL can be shown. Self-hosted Sentry is not accepted.

## What you can do afterward

A matching event starts the Job. The employee uses its own tools. The event payload is untrusted input and does not add permissions. You can also run the same Job on a schedule. Read the run before treating the result as a fix. The connection does not resolve the Sentry issue.

Deleting the connection stops new events. Remove the webhook in Sentry as well. Existing event sources can no longer pass the authorization check.

## Permissions and credentials

The token and client secret are encrypted. The API does not return them. You can reveal a saved secret from the connection screen when you are the owner. Another workspace member cannot use your connection, including an administrator. Execute permission on the workspace is still required to manage your own connection.

The token needs the organization, project, and issue reads above. The client secret verifies `Sentry-Hook-Signature`. The installation UUID in the hook must match the one you saved. The first event does not bind a blank installation for you.

## Limits

There is no OAuth install wizard, no write-back to Sentry, no automatic MCP grant, and no historical backfill. Webhook delivery status is not stored as a verified remote health check. The screen says the webhook still needs to be confirmed in Sentry. Issue hooks do not offer an environment filter. Identical signed bodies are treated as the same delivery. A real regression usually changes fields such as last seen or count, and then has a new identity.

Sentry issue events require a verified connection. A verified connection can still accept and store eligible events while paused. The platform skips rule evaluation for those deliveries and does not replay them when you enable the connection again. Other Sentry resources are acknowledged and ignored.

## Related guides

- [Integration directory](/integrations/overview/)
- [PagerDuty](/integrations/pagerduty/)
- [Research and monitoring](/workflows/research-monitoring/)
- [Event-driven automation](/automate/event-driven/)
