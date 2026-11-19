export function managedAgentScenarios(zh: boolean) {
  const hosted = zh ? "运营方托管" : "Operator-hosted";
  const enterprise = zh ? "企业自托管" : "Enterprise-hosted";
  const device = zh ? "企业开发机" : "Enterprise device";
  const external = zh ? "外部供应商" : "External provider";
  const internal = zh ? "企业内网" : "Enterprise network";
  return [
    {
      label: zh ? "连接企业设备" : "Pair a device",
      locations: [device, hosted, external],
      result: zh
        ? "代码检出在开发机。测试输出返回运营方托管的平台，调用外部模型时，所需的文件内容和工具结果会随提示发送。"
        : "The checkout stays on the device. Test output returns to the operator-hosted platform. Model calls send the prompts, file contents, and tool results needed for inference to the provider.",
      guide: "deployment/daemon/session-execution",
      link: zh ? "为会话选择设备" : "Select a session device",
    },
    {
      label: zh ? "自托管平台" : "Host the platform",
      locations: [device, enterprise, external],
      result: zh
        ? "企业保管工作空间文件和会话历史，并负责备份与升级。测试结果返回企业平台，推理所需的内容仍会发给外部模型供应商。"
        : "Your organization stores workspace files and session history and handles backups and upgrades. Test output returns to your platform. The external model provider receives the content needed for inference.",
      guide: "deployment/self-host",
      link: zh ? "查看平台部署步骤" : "Deploy the platform",
    },
    {
      label: zh ? "内网推理" : "Use internal inference",
      locations: [device, enterprise, internal],
      result: zh
        ? "平台把提示和测试结果发给在内网完成推理的端点。会话存储、测试执行和这次模型调用都在企业基础设施内。"
        : "The platform sends the prompt and test results to an endpoint that performs inference inside your network. Session storage, test execution, and this model call all run on enterprise infrastructure.",
      guide: "administration/configuration",
      link: zh ? "配置模型渠道" : "Configure a model channel",
    },
  ];
}
