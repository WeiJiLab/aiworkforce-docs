export const lanes = [
  {
    key: "DRAFT",
    name: "需求",
    actor: "需求员工",
    state: "待确认范围",
    next: "确认范围并进入开发",
  },
  {
    key: "DEV",
    name: "开发",
    actor: "开发员工",
    state: "编码中",
    next: "查看开发结果并进入测试发布",
  },
  {
    key: "PREPARE",
    name: "测试发布",
    actor: "发布员工",
    state: "候选批次就绪",
    next: "部署候选版本并开始验证",
  },
  {
    key: "TEST",
    name: "测试验证",
    actor: "测试员工",
    state: "待审阅证据",
    next: "接受验证结果并进入生产发布",
  },
  {
    key: "RELEASE",
    name: "生产发布",
    actor: "发布员工",
    state: "等待发布决定",
    next: "确认发布并查看部署回执",
  },
  {
    key: "DONE",
    name: "已完成",
    actor: "发布员工",
    state: "已收尾",
    next: "重新演练这张卡",
  },
] as const;

export const cards = [
  {
    id: 128,
    title: "修复重复的 Issue 通知",
    lane: "DRAFT",
    scope: "同一条 Issue 事件重试时，收件箱只保留一条通知。",
    check: "连续投递同一事件两次，收件箱只出现一条通知。",
    pr: 42,
  },
  {
    id: 126,
    title: "保留看板筛选条件",
    lane: "DEV",
    scope: "从任务详情返回后，保留原先选中的筛选条件。",
    check: "筛选待处理卡片后打开详情，再返回时仍显示原来的结果。",
    pr: 39,
  },
  {
    id: 119,
    title: "补全发布记录的版本号",
    lane: "TEST",
    scope: "每条发布回执都显示对应的提交版本。",
    check: "回执中的版本与候选批次的提交一致。",
    pr: 36,
  },
] as const;
