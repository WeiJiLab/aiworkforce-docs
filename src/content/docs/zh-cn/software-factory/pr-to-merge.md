---
title: "Pull Request 到合并"
description: "在人接受合并和发布之前，审阅、修复并验证变更。"
sidebar:
  label: "PR → 合并"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "8315f4bcb34b04ff1e71be11b012f2821282decf89ede6d9f12341f39e590d09"
---

开发记录变更后，卡片进入测试发布和测试验证。检查失败或审阅要求修改时，退回卡片返修。具备所需集成和授权后，生产发布泳道可以合入通过的批次。生产部署是独立步骤，有自己的结果记录。哪些发布动作需要显式审批由批次策略决定。

图中示例包含团队在合入前审阅变更的步骤。看板要求的审批步骤以批次策略为准。

```mermaid
flowchart TD
    ready["人：接受变更进入审阅"] --> checks["测试发布和测试验证"]
    checks --> decision["人：审阅发现和证据"]
    decision -->|接受| release["合入通过的批次"]
    release --> deploy["按配置部署到生产"]
    deploy --> ship["人：核对实际部署的版本"]
    checks -->|检查失败| fix["开发员工：修复卡片"]
    decision -->|需要修改| fix
    fix -->|再次检查| checks
    class ready,decision,ship human
    class checks,fix,release,deploy agent
```

测试发布和测试验证是看板泳道，不是一串独立的审阅产品。测试员工记录实际跑过的那个候选版本的结果。[Pull Request 自动化](/zh-cn/workflows/pull-request-automation/)也可以在轮询到匹配的 GitHub Pull Request 事件时启动 Job。这个 Job 做调查。它不合并；除非员工用自己的授权实际提交了审阅，它也不会批准 Pull Request。

关闭批次表示该批次完成了收尾。生产发布和资源回收另有记录。每个阶段要读什么，见[审阅与发布](/zh-cn/software-factory/review-release/)。哪条结果可以让卡片前进、怎样的豁免才有效，见[发布治理](/zh-cn/software-factory/release-governance/)。

## 你在哪些地方参与

- **决定泳道可以做什么。** 接上你希望看板调用的测试工作流和发布集成。泳道运行保存在该泳道上的执行器。
- **审阅证据。** 把 diff 和已确认的范围比较。对每条验收标准，阅读结果、受测提交或候选版本，以及环境。接受变更之前，先补上缺失的记录。
- **做出发布决定。** 接受需求，确认的是那一版需求。接受变更进入审阅是后来的决定。确认合并了什么、什么到达了生产，仍然是更后面的记录。员工会话结束，并不等于合并了 Pull Request。

测试失败时，带上失败的验收标准和证据退回卡片。开发员工修复这张卡片。第一次执行仍在进行时，不要再开一个修复会话。接管之后，记录你做了什么，并通过恢复操作交还。只恢复暂停，接管仍然有效。结束平台对 Pull Request 的跟进后，外部 Pull Request 仍然开着，卡片保持人工处理，直到你交还。

批次级的回应可以恢复每一张成员卡片。批准或重试共享工作之前，先看成员。

## 泳道员工

| 员工     | 在这条回路里的职责                                 |
| -------- | -------------------------------------------------- |
| 测试员工 | 在测试批次中记录候选版本的验证。                   |
| 开发员工 | 检查失败或你要求修改时，修复同一张卡片。           |
| 发布员工 | 执行项目集成实际支持的合并、等待、部署和验证步骤。 |

[业务验证](/zh-cn/software-factory/business-verification/)是变更与已确认验收标准的比较。[构建与测试](/zh-cn/software-factory/build-test/)是测试泳道的记录。[CI/CD 集成](/zh-cn/software-factory/cicd/)说明流水线如何成为这条记录。

## 如何配置

1. 连接代码托管和仓库。准备验证泳道要运行的[环境](/zh-cn/software-factory/environments/)和测试工具。看板向导见[配置软件工厂](/zh-cn/getting-started/first-software-factory/)。
2. 指派模板标为必配的测试和发布员工。为这些泳道要调用的仓库和流水线资源授权。
3. 打开开发泳道已经记录了代码引用的卡片，或把该变更送入测试泳道。阅读交付工作台、流水线运行，以及卡片上等待回答的问题。

## 下一步

反馈或事件应成为下一项工作时，继续[信号到卡片](/zh-cn/software-factory/signal-to-card/)。这条回路留下的记录见[证据与追踪](/zh-cn/software-factory/evidence/)。
