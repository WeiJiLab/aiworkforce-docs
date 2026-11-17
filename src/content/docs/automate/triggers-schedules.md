---
title: "Triggers and schedules"
description: "Choose a trigger, configure its input and time zone, and verify when a Job will run."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A trigger connects an occurrence to a Job. The Job owns the execution instructions; the trigger owns timing or event conditions. Use one Job for the same work even when it has several trigger rules.

## Choose how work starts

| Trigger                | Use it for                                                    | Check before enabling                                 |
| ---------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Manual                 | Testing or occasional work                                    | Input and execution employee                          |
| Schedule               | Regular summaries, checks, or collection                      | Five-field cron expression and time zone              |
| Webhook                | An external system invoking a Job                             | Generated endpoint, credentials, and payload contract |
| Platform event / Issue | Reacting to supported changes                                 | Event selection and workspace scope                   |
| Integration event      | Supported GitHub, Feishu Minutes, Sentry, or PagerDuty events | Source credentials and event-specific conditions      |
| IM                     | Work initiated through a connected message channel            | Connected channel and message conditions              |

Use the trigger types offered by your installed version. An event source must be configured and authorized before it can deliver useful input. A connector's existence alone does not create an event subscription.

## Schedule a weekday review

For a review at 09:00 on weekdays in Shanghai, use:

```text
Expression: 0 9 * * 1-5
Time zone: Asia/Shanghai
```

The five fields are minute, hour, day of month, month, and day of week. Time zones use IANA names. This schedule follows the selected local time zone rather than the browser's current location. Confirm the next execution shown by the schedule preview before enabling it.

Keep day-of-month and day-of-week expressions simple: standard cron matches either field when both are restricted. For example, specifying both a date and Monday does not mean “only when that date is a Monday.”

## Supply a clear input contract

Define the source, time window, and output destination as Job input. For a daily review, identify the project and the period to inspect; avoid a vague instruction to “check everything.” Choose event input or fixed JSON as appropriate, ensure it matches the Job's input contract, and try one representative event before enabling recurring work.

For task collection, select the inbox or workbench destination using the collection configuration. Include stable source identifiers so repeated source events can be recognized. See [runs and recovery](/automate/runs-recovery/) for duplicate and retry considerations.

## Verify the activation chain

1. Save the Job and inspect a manual run with representative input.
2. Publish the execution configuration.
3. Save the trigger's conditions, input, and time zone where applicable.
4. Enable automatic execution and the relevant rule.
5. Inspect the first triggered run's source, session, and result.

Publishing does not execute a Job, and manually running a paused Job does not turn automatic triggers back on. Inspect both the Job and the trigger when an expected run does not appear.

After a scheduling outage, missed slots are collapsed into one catch-up run; they are not all replayed. Check the task's time window when the work requires complete coverage of a missed period.

## Related guides

- [Automation fundamentals](/automate/fundamentals/)
- [Authentication](/developer/authentication/)
- [API reference](/developer/api-reference/)
