---
title: "OpenAPI reference"
description: "Read /openapi.json from the backend you run. This site does not host a generated endpoint catalog."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

FastAPI serves the generated route schema at `/openapi.json` on the backend. The default platform gateway does not proxy this path to the backend. Obtain the schema from the backend through an operator-approved connection.

## Use the schema you will call

Use the schema for the deployment you integrate with. For a local backend listening at `http://localhost:8080`, fetch `http://localhost:8080/openapi.json`. For a hosted deployment, ask its operator to provide the schema.

Select the operations you need. The pages on this site describe the contracts that were reviewed: sign-in, workspace discovery, Automation invocation, run status, run audit, and cancellation. A route present only in the schema is not documented here until it has the same request, response, and permission notes. Do not infer permission from the path.

## Generate carefully

The generated schema omits detailed response models for some routes. When generating a client, use the [REST API response contracts](/developer/api-reference/) to type those response bodies. A successful business response uses `{ "code": 0, "message": "ok", "data": ... }`. Check HTTP status as well. Authentication failures return 401. Permission failures can return 403. Validation commonly returns 422. Mapped state conflicts return 409. Rate limiting returns 429 with `Retry-After`. The default is 120 machine requests per minute per credential, enforced per backend process and configurable by the deployment.

Build the client as described in [SDK](/integrations/sdk/). There is still no published general SDK package.
