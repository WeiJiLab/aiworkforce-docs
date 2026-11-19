---
title: "Self-host"
description: "Run the AI Workforce service stack on infrastructure you operate, including the local Compose path, the single-host release, and the limits of both."
audience:
  - platform-engineer
product_area: deployment
last_verified: "2026-11-19"
sidebar:
  label: Self-host the platform
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

Self-hosting means your organization runs the AI Workforce services: the web application, the backend, PostgreSQL, and the workspace files those services store. An operator-hosted deployment is the same product, run for you. People still use workspaces, employees, and workflows. What changes is who operates the services and where those records live.

The platform provides a local development stack and a single-host Compose release. You can also deploy a device executor separately on Kubernetes and connect it to an existing platform.

See [Runtime management](/deployment/runtime-environments/) to choose where to run the platform and devices.

## Running managed agents on enterprise infrastructure

| What your organization needs to control              | What to configure                                                                                                                                  | Who operates it                                                                                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Where session history and workspace files are stored | Deploy the platform, PostgreSQL, and persistent volumes on a host you operate.                                                                     | The AI Workforce backend calls the model, checks permissions, and saves records. Your organization operates the services, backs up data, and installs upgrades. |
| Which machine can work on project files              | Pair the device executor on the computer holding the files and select it when creating the session. An operator can continue to host the platform. | The platform manages sessions and authorization. Tools run with the device user's OS permissions, which determine which files they can access.                  |
| Which service receives inference requests            | Configure the model endpoint for the employee's runtime. To keep inference inside your network, choose an endpoint that performs inference there.  | The platform sends the prompts, file contents, and tool results needed for inference to that endpoint.                                                          |

For example, an employee can test a private repository change on a paired development machine. If your organization also needs custody of session history, deploy the platform on a host you operate. The model endpoint configuration determines where inference requests go. [Choose a session execution location](/deployment/daemon/session-execution/) · [Configure a model channel](/administration/configuration/)

## What you can run

| Layout                              | What it is                                                                                                             | What to expect                                                                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Local development stack             | `deploy/local`: Compose, source mounts, frontend and backend reload, local volumes                                     | A private development environment. It is the path you can start from a checkout.                                                                 |
| Host-mode development               | `deploy/local/deploy.sh`: PostgreSQL in Compose, API and frontend processes on the host                                | Another development entry in the same directory. It stops when you interrupt it.                                                                 |
| Single-host release                 | `deploy/shared/compose`: PostgreSQL 16, backend image, frontend image, and Caddy, started by an environment entrypoint | An in-place update of one host, with a window where that host is down. The shared release script is not a command to run from a source checkout. |
| Kubernetes or Helm for the platform | No maintained operator or chart in this baseline                                                                       | Package the services yourself only if you keep migration order, volumes, runtime ownership, and readiness.                                       |
| Multi-machine rolling update        | Not implemented                                                                                                        | The release path updates one host and stops it during migration and startup. A load balancer and shared storage are not included.                |

Release images are produced for the environment's build. This guide does not add a public image name or a `docker pull` command. Configuration for a release host is the runtime contract that entrypoint already validates. Copying `deploy/local/.env` into a release host is not that contract.

## What the services are

| Piece           | Role                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Web application | The workspace UI. The release Compose file serves it behind Caddy. The local stack publishes it on a host port.                        |
| Backend         | Employees, sessions, authorization, automation, and the model loop.                                                                    |
| PostgreSQL 16   | Accounts, workspace records, sessions, and automation state.                                                                           |
| Volumes         | Database files, workspace directories, and the backend home directory. The release stack also keeps the proxy certificate data.        |
| Device executor | Optional. Tool processes on a computer you approve. It connects outward to the platform origin. It is not one of the Compose services. |

The release Compose file publishes HTTP and HTTPS on the proxy. It does not publish PostgreSQL on a public port. The local Compose file does publish the frontend, the backend, and PostgreSQL on host ports, and it does not run Caddy.

The model loop runs on the platform you host. Prompts, file contents used for a task, and tool results still go to the model endpoint you configure. Hosting the platform puts the platform's copy of that data on your disks. Inference stays inside your network only when that model endpoint is already inside it.

## Requirements

For the local stack:

- Docker Engine or Docker Desktop, with Compose v2
- The platform source repository
- A `deploy/local/.env` copied from the example, with the placeholder secrets replaced
- Outbound access from the backend to the model endpoint, MCP servers, and code hosts you will use

For a release host that your organization already operates:

- That environment's entrypoint, which calls the shared release scripts
- The runtime configuration that entrypoint validates
- Disk for the database and workspace volumes
- DNS and TLS for the public name, terminated at the reverse proxy
- The same auth secret and encryption key for the life of that database

Keep production secrets out of `deploy/local/.env`.

## Start the local stack

From the platform repository root:

```bash
cp deploy/local/.env.example deploy/local/.env
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml up --build
```

Read the copied file before the first start. Replace every value that still says `replace-with`. Those are local-only secrets. This guide adds no configuration keys.

The backend container waits until PostgreSQL is healthy, applies the safe expand migration, applies the DBOS schema step, and then starts the API. A fresh `up --build` is enough. You do not run a separate migrate command for this local file.

Then open:

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:8080>

The example file turns account creation on for that local process. On an empty local database, open the frontend and create the first account from the sign-in page. The password field requires at least 8 characters. After you are in, an administrator configures a model channel under **Runtime kernels**: endpoint, credentials, and model identifiers. A channel that is saved can still be unreachable. Run a small session before you treat the stack as ready for real work. See [platform configuration](/administration/configuration/).

Check the process, then check whether it can serve:

```bash
curl 'http://localhost:8080/api/health/live'
curl 'http://localhost:8080/api/health/ready'
```

`/api/health/live` reports that the process is up. It does not call the database. `/api/health/ready` reports whether this instance can serve its deployment role, including the database. `/api/health` is a compatibility endpoint that checks the database. `/api/version` reports the release SHA the process was given. On this local stack that value is `local` unless the environment sets one.

None of these probes prove that a model channel, an MCP server, or a repository credential can finish a task.

If a default port is already taken, change `FRONTEND_PORT`, `BACKEND_PORT`, or `POSTGRES_PORT` in `deploy/local/.env` and start again.

When the selected Docker context is a remote VM, bind mounts from your laptop are empty on that machine. Add the VM override so the images contain the source:

```bash
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml \
  -f deploy/local/docker-compose.vm.yml up --build
```

The local stack mounts the repository, reloads the frontend and backend as you edit, and stores PostgreSQL, workspaces, and dependency caches in named volumes for this Compose project. It does not use release images or Caddy. Keep it off the public internet. The local template leaves the administrator terminal enabled, and that terminal can open a shell inside the backend container.

Useful commands:

```bash
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml ps
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml logs -f backend frontend
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml down
```

`down` stops the containers and keeps the volumes. `down --volumes` deletes the local database, workspace files, and dependency caches. Those volumes belong to the local Compose project, so this command does not delete a separate release host.

`bash deploy/local/deploy.sh` is the host-mode development entry. It starts PostgreSQL with Compose, runs the same expand and DBOS steps, then runs the API and the frontend on the host until you interrupt it. That host needs the backend and frontend toolchains already installed. Use the Compose file above when you want the whole stack in containers.

## Run a device executor on Kubernetes

You can run one authorized Linux device executor on Kubernetes and connect it to an existing AI Workforce platform. The daemon opens an outbound WSS connection, so the Pod needs no incoming port. The platform continues to manage sessions, authorization, and model calls. Dispatch workloads you trust to run with the Pod user's permissions.

1. Obtain a dedicated token, device ID, and authorized actor ID from the platform. Create a Secret named `awf-device` in the target namespace with the keys `token`, `device-id`, and `actor-id`. Use a separate device credential for each executor.
2. Build the image from your `aiworkforce-daemon` checkout and push it to a registry your cluster can pull from.

   ```sh
   docker build -t registry.example.com/aiworkforce-device-exec:example .
   docker push registry.example.com/aiworkforce-device-exec:example
   ```

3. Update the image in `deploy/kubernetes/device.yaml` and set `AWF_CONTROL_URL` to the platform's `wss://your-platform.example.com/api/daemon/v2/connect` endpoint. Use the cluster's default StorageClass for both claims or specify one on each. The state volume must allow UID `10001` to create and own the `device` directory under `/var/lib/awf`.
4. Apply the manifest in the Secret's namespace. Check the logs and confirm that the device appears online in the platform before starting a session.

   ```sh
   kubectl -n YOUR_NAMESPACE apply -f deploy/kubernetes/device.yaml
   kubectl -n YOUR_NAMESPACE logs deployment/awf-device
   ```

Run one replica per device. `/workspace` and `/var/lib/awf` use separate PVCs. Keep the state PVC through Pod replacement. When a previous execution did not reach confirmed stop, the new Pod stays quarantined and refuses new leases. Preserve the journal for review.

From the daemon checkout, run `python3 tests/kubernetes/test_lifecycle.py` to reproduce execution, cancellation, lease expiry, reconnect, eviction, and fencing after an abrupt exit in a disposable k3d cluster. The test uses a local controller in the Pod. Run a small platform session after deployment to check your WSS route and device authentication.

## Network and data

| Stays on the deployment                                                                    | Can leave the deployment                                                                                                  |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL data, workspace files, session checkpoints, and the auth and encryption secrets | Content the model loop sends to the configured model endpoint: prompts, file contents used for the task, and tool results |
| Release proxy certificates and the database volume                                         | Calls an employee makes to MCP servers, code hosts, and other tools on the execution environment's network                |
| Device executor journals on that computer                                                  | Tool results the device sends to the platform, which the model loop may then send to the model endpoint                   |

Serve a release deployment over HTTPS. Trust forwarded headers only for the reverse proxy that deployment runs. Keep PostgreSQL, private execution control paths, and internal tool-bridge endpoints off the public API. Automation MCP checks the allowed host and origin, and the caller still needs a credential and authorization. Details are in [security and permissions](/deployment/security/).

A device executor opens an outbound authenticated connection. The browser does not need a route to a listening port on that computer. The approved working directory identifies context. It is not an operating-system sandbox. Commands run as the host user.

There is no separate vendor host list to allow beyond the endpoints you configure. If the backend cannot reach a model or MCP server, the task fails even when `/api/health/ready` succeeds. Shell tools, plugin hooks, and MCP servers use the network of the place where they run. This product does not put a universal network sandbox around every tool.

## Upgrades and recovery

On the local stack, run the same `up --build` after you update the source. Keep the env file and the volumes when you need the same database.

On the release path, one host is updated in place. The running application stops, the expand migration runs, and the new images start. A failed release attempts to restore the previous images and configuration. The database is not downgraded, so an expand migration has to keep working with the previous application version. The release path then checks that the DBOS schema is already present. Starting the release image does not apply DBOS DDL. The local entrypoint does run that DBOS step before the API starts. Treat those as different procedures.

The test and production release entrypoints skip creating a new database and file backup on each release. A backup script remains, and an operator can run it on its own. Verify a backup before you depend on it. Existing backups are kept. A deleted record in the product is not proof that a backup, or the model provider, has dropped its copy.

Put the database, the workspace volumes, and the stable auth and encryption secrets in one recovery plan. `AIWORKFORCE_SECRET_ENCRYPTION_KEY` has to stay with the database it encrypted. Replacing that key without a migration can make stored secrets unreadable.

Session file history uses `AIWORKFORCE_SESSION_CHECKPOINT_MAX_MIB`. The default is 1024 MiB for one session. That value is not a disk quota for the host, the Git cache, or every retained session.

Before you call an upgrade finished, compare `/api/version` with the source or image you meant to run, check `/api/health/ready`, and repeat a small session.

## Troubleshooting

| What you see                                        | What to check                                                                                                                                                        |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `live` succeeds and `ready` fails                   | PostgreSQL, then the backend logs. Readiness also depends on this instance being able to serve its role. Deleting volumes does not repair a migration.               |
| Both health checks succeed and a task fails         | The model channel, employee initialization, and credentials. See [configuration](/administration/configuration/) and [troubleshooting](/resources/troubleshooting/). |
| The UI, API, or database port is already in use     | Change `FRONTEND_PORT`, `BACKEND_PORT`, or `POSTGRES_PORT` in `deploy/local/.env` and start again.                                                                   |
| A remote Docker host shows empty source directories | Add `deploy/local/docker-compose.vm.yml`.                                                                                                                            |
| The sign-in page has no way to create an account    | The local example enables account creation. A release deployment follows its own runtime configuration.                                                              |
| A device stays offline                              | Browser approval and an online worker are different steps. Use `aiworkforce-daemon status --json`. See [Device Executor CLI](/integrations/cli/).                    |
| Stored secrets no longer decrypt after a change     | The encryption key and the database are from different generations. Restore the key that encrypted that database.                                                    |

## Related guides

- [Runtime management](/deployment/runtime-environments/)
- [Security and permissions](/deployment/security/)
- [Device Executor CLI](/integrations/cli/)
- [Platform configuration](/administration/configuration/)
- [Troubleshooting](/resources/troubleshooting/)
