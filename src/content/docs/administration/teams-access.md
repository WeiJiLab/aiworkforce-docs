---
title: "Teams and access"
description: "Manage team membership and workspace grants while keeping platform roles separate from workspace permissions."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Teams organize people; workspace grants determine access to shared work. A platform administrator, team leader, and workspace owner have different responsibilities. Check the specific workspace action rather than assuming that a role grants access everywhere.

## Create or join a team

Open **Teams** to find your teams or discover another team. Where available, submit a join request and wait for its review. A team leader can also select existing system users and add them directly; those users join immediately rather than receiving a separate acceptance invitation.

Use the team details page to review membership and open the team's workspaces. A leader can review pending join requests, remove members, or transfer leadership with confirmation.

## Grant workspace access

Open the workspace's settings and its member/access section. If you are allowed to manage grants, choose a user, team, or platform role as the subject, then select the available permission level.

| Grant                     | Scope to expect                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| Read-only session history | Inspect historical sessions; it does not grant general project-file access or task execution. |
| Full access               | Perform the actions allowed by the workspace type and effective role.                         |
| Team grant                | Uses full access and is combined with current team membership.                                |

In a team workspace, membership is required, and the owning team's grant can still be revoked. Team leadership controls adding access and deleting the team workspace. Platform role grants can target standard users, FDE users, or administrators, but a platform role is not a universal bypass of workspace authorization.

## Account roles

A platform role and a workspace role answer different questions. A **Member** (`NORMAL_USER`, shown as 普通成员) signs in to **Workbench** (工作台). That account does not get **FDE workbench** (FDE 工作台) or **Admin console** (管理控制台). An **FDE user** (`FDE_USER`) or a **system administrator** (`ADMIN_USER`, shown as 系统管理员) can open **FDE workbench**. Only a system administrator can open **Admin console**.

| Need                                                 | Who can do it                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Publish a digital employee template                  | An FDE user or a system administrator. **Marketplace** (市场) only browses templates, skills, and MCP servers.                                                                                                                                                                                                                                                                                    |
| Publish a primary-agent template or a board template | A system administrator, in **Admin console**.                                                                                                                                                                                                                                                                                                                                                     |
| Create a digital employee in a workspace             | Someone who can manage digital employees: **Owner** (所有者), **Full access** (完整权限), **Team leader** (团队 leader), a team member with full access, or the system and FDE roles that include agent management. The dialog is **Add digital employee** (添加数字员工). If you cannot add one, the page says “Ask a workspace admin to add a digital employee.” (联系空间管理员添加数字员工。) |
| An employee will not start                           | The same people who can manage digital employees inspect initialization. When no template is recommended, the product says to contact the space owner (空间负责人) and summon from the available catalog.                                                                                                                                                                                         |
| Change a grant                                       | Creating a grant: Owner, Full access, Team leader, a system administrator on a system workspace, or an FDE administrator. Revoking a grant: the workspace creator, a team leader, or an admin.                                                                                                                                                                                                    |

There is no workspace manager account.

## Change access carefully

Before removing a member or revoking a grant, identify the workspaces and ongoing responsibilities affected. Removal or leaving a team can immediately remove access to team workspaces.

If a leader leaves, leadership passes to the earliest-joined remaining member. The last member cannot leave while the team still owns a workspace; otherwise leaving dissolves the team. Transfer responsibility deliberately before making the change.

## Verify the result

Ask the affected user to reopen the intended workspace and confirm the required action. Visibility, employee management, execution, settings, and access management are distinct capabilities. Use the smallest grant that meets the collaboration need.

If access still fails, check current membership, the grant subject and level, and whether the account remains active. A saved link alone does not preserve permission.

Continue with [workspace](/user-guide/workspace/), [configuration](/administration/configuration/), and [troubleshooting](/resources/troubleshooting/).
