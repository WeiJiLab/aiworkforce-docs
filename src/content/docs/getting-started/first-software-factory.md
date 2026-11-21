---
title: "Set up your team’s first delivery board"
description: "Connect a code host, choose where employees run, create a delivery board, and prepare for the first card."
prev: false
next: false
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

First-run setup connects the tools a delivery board needs, chooses where employees run, and prepares the board for its first card. Connect a code host before the first change. Add messaging or an external issue source when you want those signals on the board. If the board is already configured, go to the [quickstart](/getting-started/quickstart/).

Use a workspace where you can create a delivery board and manage repository and employee grants. Have an approved test repository, a way to check the change, and a published collaboration template with requirements, development, and verification stages. A missing collaboration template is published by a system administrator. If you cannot add lane employees, the workspace page says to ask a workspace admin. Prepare a ready employee for each required lane with [the employee setup guide](/getting-started/first-employee/).

## Give employees access to repositories and delivery tools

### 1. Connect a code host

Open **Repositories**. Use **Manage repository connections** to select a connection for the test repository's provider and instance, or create one with an approved workspace credential. Choose **Add repository** and check the clone URL and default branch.

The host can be [GitHub](/integrations/github/), [GitLab](/integrations/gitlab/), or [Yunxiao Codeup](/integrations/yunxiao/). The shared rules for tokens, instances, and grants are in [code repositories](/integrations/code-repositories/).

Grant the development employee access to that credential for the permitted repository. Check the grants for any other lane employee that needs the repository. A workspace connection does not authorize every employee. Use a small read task to confirm access before the development employee changes code. When the change should produce a GitHub pull request, the employee's permitted actions need to cover branch and pull request creation.

### 2. Connect a messaging channel

Open **Integrations** and connect the channel the workspace catalog lists. The choices are [Feishu and Lark](/integrations/feishu/), [DingTalk](/integrations/dingtalk/), [Slack](/integrations/slack/), [Microsoft Teams](/integrations/microsoft-teams/), [WeCom](/integrations/wecom/), and [WeChat](/integrations/wechat/).

A connected channel can reach the primary employee. Where the channel accepts inbound messages, an allowed sender can start a Job in one conversation. The channel does not create a delivery card. [Signal → card](/software-factory/signal-to-card/) is how a report becomes work. Skip this step when the first card will start on the board.

### 3. Connect an issue source

GitHub and Yunxiao imports use a repository or project picker. [Jira](/integrations/jira/) and [Linear](/integrations/linear/) appear in the same import dialog after an administrator has connected that source. Import creates inbox tasks. It does not start a session, and it does not write status back to the tracker.

A Job can also poll GitHub issue events. The supported observations are open, close, reopen, labels, and comments. Setup is in [issue automation](/workflows/issue-automation/). Skip the external source when the first request will be a requirements session on the board.

## Give employees a place to work

### 1. Choose where tools run

The platform keeps the conversation, the model loop, and authorization. Commands run in the environment configured for the employee. Creating a card does not provision a virtual machine or a preview URL.

| Option                   | When to use it                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Operator-hosted platform | The deployment already runs employees, and the repository credential is on that workspace.                                                                               |
| Self-hosted platform     | The repository and tools should stay on infrastructure you operate. Follow [Self-host](/deployment/self-host/).                                                          |
| Authorized device        | Commands should run on a paired macOS or Linux computer, as the host user, in an approved working directory. Pair it with the [Device Executor CLI](/integrations/cli/). |

[Runtime management](/deployment/runtime-environments/) is the full choice. [Development environments](/software-factory/environments/) explains what a test result has to name before it counts as evidence. Confirm the employee can run in the environment you intend to use.

### 2. Name the board and assign employees

1. Open **Workbench** (工作台) in the primary navigation. The delivery workbench is at `/automations?tab=board-flow`. Select the workspace, and choose **New delivery project**. The **Create board** wizard opens.
2. Under **Choose a template**, select the published delivery template. Under **Basics**, name the board and review the lane order.
3. Under **Digital employees**, assign a ready employee to each required lane. The Requirements employee clarifies scope. The Development employee implements a confirmed card. Testing records results. Production carries merge and deploy when those integrations exist.
4. In **Shared MCP and Skill**, review the tools and skills selected by the template. In **External board and work item sources**, skip external sync for the first run if the issue source above is not ready. You can bring an issue in through Task inbox or open a requirements session on the board.
5. In **Confirm and create**, review the configuration and select **Create board**. After successful initialization, select **Open board**. If a module fails, retry that module or use **Back to configuration** to adjust its inputs.

The template wizard shows **Activates after creation**. Successful initialization enables the board and its configured automations. They can run when triggered. Review lane assignments, repository grants, and any external sources on **Confirm and create** before you select **Create board**. Use a test workspace and repository for the first run.

### 3. Check the lanes and the verification path

1. In **Board settings**, confirm that the project is bound to the test repository. If you skipped an external issues source during creation, bind the repository before adding that source. Open **Lane configuration** and check each required lane's **Execution identity**. Use **Lane flow** to review employee assignments and saved automations.
2. For automated checks, connect the project's test workflow and the test deployment it uses. A connected GitHub repository can use a GitHub Actions workflow as a project pipeline. Start with [CI/CD integration](/software-factory/cicd/) and [GitHub](/integrations/github/). Read the result on the Test deployment (测试发布) and Testing (测试验证) lanes.
3. When automated checks are unavailable, record which checks did not run and what you observed in the test environment. The standard test gate still requires its configured passing result. See [quality gates](/software-factory/quality-gates/).

## Next step

Once the repository is connected, the required lanes have ready employees, and you know where to check test results, pick a small Issue to deliver. [Deliver your first Issue on an existing board](/getting-started/quickstart/).
