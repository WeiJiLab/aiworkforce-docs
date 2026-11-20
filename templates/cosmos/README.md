# Cosmos workflow archive

These 51 workflow prompts were collected from the Augment Cosmos catalog. Each file preserves the original **Copy prompt** text. The [source manifest](sources.json) records the upstream URL and SHA-256 of each file. When a record includes `source_slug`, that value identifies the original filename.

The AI Workforce platform maintains the [10 BoardFlow starters](https://github.com/WeiJiLab/aiworkforce-platform/tree/main/backend/workflow_templates) used by the template picker.

## Workflows

- [accessibility-audit-pr](originals/accessibility-audit-pr.md) — 对界面变更检查键盘操作、焦点与无障碍体验。
- [api-contract-drift-detector](originals/api-contract-drift-detector.md) — 对照接口实现与 API 契约，将偏差提交维护者。
- [architecture-review-before-implementation](originals/architecture-review-before-implementation.md) — 架构师在开发前评审方案，记录约束、取舍与负责人。
- [ask-channel-kb-answer-drafting](originals/ask-channel-kb-answer-drafting.md) — 客服员工从知识库检索依据，起草客户答复，交人工复核。
- [auditor-evidence-response](originals/auditor-evidence-response.md) — 按审计请求匹配证据、责任人与有效期，组织答复。
- [backlog-dispatcher](originals/backlog-dispatcher.md) — 根据待办的范围和责任人派单，跟踪交接。
- [backlog-prioritization](originals/backlog-prioritization.md) — 按影响、投入和置信度排序产品待办。
- [backlog-scrub-and-kickoff](originals/backlog-scrub-and-kickoff.md) — 产品梳理积压需求，澄清待决项，交付可启动的工单。
- [backup-verification-and-incident](originals/backup-verification-and-incident.md) — 验证备份可恢复性，针对失败项建立跟进记录。
- [canary-slo-auto-rollback](originals/canary-slo-auto-rollback.md) — 核对灰度发布指标与 SLO，将异常交给值班人决策。
- [ci-build-failure-autofix](originals/ci-build-failure-autofix.md) — 定位 CI 构建失败，开发修复，复核原检查。
- [codebase-health-scorecard](originals/codebase-health-scorecard.md) — 生成代码库健康指标与趋势，维护人跟进改进项。
- [continuous-code-simplification](originals/continuous-code-simplification.md) — 分批重构复杂代码，验证行为一致性。
- [continuous-privacy-compliance](originals/continuous-privacy-compliance.md) — 核对数据处理与隐私要求，记录偏差和整改人。
- [cosmos-analyst](originals/cosmos-analyst.md) — 分析员工核对数据口径与来源，交付带证据的结论。
- [deep-code-reviewer](originals/deep-code-reviewer.md) — 代码审查员工核对变更风险与测试覆盖，作者处理发现。
- [docs-update-on-pr-merge](originals/docs-update-on-pr-merge.md) — 在 PR 合并后核对用户文档，提交文档维护者复核。
- [documentation-readiness-gate-before-ga](originals/documentation-readiness-gate-before-ga.md) — 在正式发布前核对说明、升级指南与已知限制。
- [e2e-playwright-pr-verification](originals/e2e-playwright-pr-verification.md) — 用 Playwright 运行端到端验收并记录失败证据。
- [email-triage-and-response](originals/email-triage-and-response.md) — 对客服邮件分诊、分配负责人并准备答复草稿。
- [epic-decomposition-agent-orchestration](originals/epic-decomposition-agent-orchestration.md) — 大型 Epic 按成果拆解，多名数字员工分工协作并汇总交付。
- [feature-flag-cleanup](originals/feature-flag-cleanup.md) — 跟踪过期功能开关的调用点与清理进度。
- [figma-to-code](originals/figma-to-code.md) — 设计员工从 Figma 整理交互规格，开发实现后交设计复核。
- [flaky-test-auto-quarantine](originals/flaky-test-auto-quarantine.md) — 识别不稳定测试，记录重跑证据与跟进责任人。
- [heavy-query-sandbox-optimiser](originals/heavy-query-sandbox-optimiser.md) — 在测试数据上比较慢查询的执行计划与性能。
- [incident-root-cause-correlation](originals/incident-root-cause-correlation.md) — 关联故障时间、发布活动和指标变化，归纳可能原因。
- [legacy-code-migration](originals/legacy-code-migration.md) — 分段迁移遗留代码，比较行为与回归结果。
- [license-compliance-continuous-audit](originals/license-compliance-continuous-audit.md) — 核对依赖许可证，例外项由合规负责人审阅。
- [meeting-notes-to-pr](originals/meeting-notes-to-pr.md) — 从会议纪要提取决定和验收条件，开发提交待审 PR。
- [monitoring-alert-investigation](originals/monitoring-alert-investigation.md) — 从监控告警定位影响范围，交给值班人分级处理。
- [multi-channel-ticket-dedup-sync](originals/multi-channel-ticket-dedup-sync.md) — 按来源与关联信息归并重复工单，核对状态与负责人。
- [network-health-and-intrusion](originals/network-health-and-intrusion.md) — 汇总网络健康指标和异常流量，交值班团队研判。
- [pair-reviewer](originals/pair-reviewer.md) — 两名审阅者分别检查代码，汇总发现与待裁决项。
- [performance-regression-gate](originals/performance-regression-gate.md) — 比较候选版本与基线性能，发现回归时交负责员工裁决。
- [personal-assistant](originals/personal-assistant.md) — 归集个人待办、会议与行动项，按优先级整理。
- [pr-auto-maintenance](originals/pr-auto-maintenance.md) — 跟踪开放 PR 的审阅与检查，维护员工逐项跟进。
- [pr-review-triage](originals/pr-review-triage.md) — 分类 PR 审阅意见，把阻塞项交给作者处理。
- [project-builder](originals/project-builder.md) — 明确项目范围，围绕可验证的里程碑交付实现。
- [prompt-eval-regression-gate](originals/prompt-eval-regression-gate.md) — 对照基线评测提示词质量、成本与延迟，记录回归证据。
- [runbook-auto-execution](originals/runbook-auto-execution.md) — 根据运维事件查找手册，核对处置权限与执行证据。
- [safe-dependency-update](originals/safe-dependency-update.md) — 评估依赖升级风险并执行回归验证，提交维护者审阅。
- [safe-schema-migration-pipeline](originals/safe-schema-migration-pipeline.md) — 评审数据库迁移兼容性，验证变更与回滚方案。
- [secret-rotation-expiry-gate](originals/secret-rotation-expiry-gate.md) — 记录凭据到期时间，安排轮换和交接验证。
- [slack-feedback-to-pr](originals/slack-feedback-to-pr.md) — 从 Slack 反馈整理复现条件，开发提交修复 PR。
- [sop-policy-self-update](originals/sop-policy-self-update.md) — 根据执行反馈修订 SOP，交流程负责人确认。
- [spec-to-gherkin-tests](originals/spec-to-gherkin-tests.md) — 从验收标准提取 Gherkin 场景，业务与测试共同审阅。
- [synthetic-eval-dataset-from-prod](originals/synthetic-eval-dataset-from-prod.md) — 从脱敏样本构建合成评测集，检查覆盖情况。
- [technical-debt-scanner](originals/technical-debt-scanner.md) — 分析技术债影响与处理成本，形成可跟进事项。
- [test-coverage-gap-auto-pr](originals/test-coverage-gap-auto-pr.md) — 识别测试覆盖缺口，提交新用例与审阅请求。
- [threat-model-from-prd](originals/threat-model-from-prd.md) — 从产品设计整理信任边界与风险，评审缓解措施。
- [ticket-dispatcher](originals/ticket-dispatcher.md) — 按优先级和团队职责分派支持工单，保留交接记录。
