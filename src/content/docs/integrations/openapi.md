---
title: "OpenAPI reference"
description: "Read /openapi.json from the backend you run. This site does not host a generated endpoint catalog."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

The backend exposes its generated schema at `/openapi.json` using FastAPI's default configuration. That file is the reference for the deployment you are calling. This documentation site does not mirror it and does not regenerate when a backend changes.

## Use the schema you will call

Retrieve `https://<your-backend>/openapi.json` from the environment you integrate with. Local examples in the [REST API](/developer/api-reference/) use `http://localhost:8080`. A schema from another environment can list routes your deployment does not serve.

Select the operations you need. The pages on this site describe the contracts that were reviewed: sign-in, workspace discovery, Automation invocation, run status, run audit, and cancellation. A route present only in the schema is not documented here until it has the same request, response, and permission notes. Do not infer permission from the path.

## Generate carefully

Code generation should be reviewed against the deployed schema. The response envelope is `{ "code": 0, "message": "ok", "data": ... }` for successful business responses. Also check the HTTP status. Authentication failures return 401. Permission failures can return 403. Validation commonly returns 422. Mapped state conflicts return 409. Rate limiting returns 429 with `Retry-After`. The current default is 120 machine requests per minute per credential, enforced per backend process and configurable by the deployment.

Build the client as described in [SDK](/integrations/sdk/). There is still no published general SDK package.
