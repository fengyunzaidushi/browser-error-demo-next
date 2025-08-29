# Browser Echo 文档中心

欢迎来到 Browser Echo 文档中心！这里包含了关于 Browser Echo 在 Next.js 框架中使用的完整指南。

## 📚 文档目录

### 🚀 入门指南

- **[Next.js 浏览器日志回显指南](./nextjs-browser-echo-guide.md)** - 适合初学者的完整入门指南
  - 什么是 Browser Echo
  - 为什么需要它
  - 安装和设置步骤
  - 基本使用方法
  - 常见问题解答

### 🔧 技术原理

- **[Next.js 技术原理详解](./nextjs-technical-principles.md)** - 深入理解工作原理
  - 核心概念和架构
  - 详细工作流程
  - 关键技术实现
  - 性能优化策略
  - 安全性考虑

### 💡 实践指南

- **[Next.js 实践指南](./nextjs-practical-guide.md)** - 实际项目中的应用
  - 快速开始
  - 实际项目示例
  - 高级配置
  - 调试技巧
  - 最佳实践

- **[Next.js 完整实践示例](./nextjs-complete-practice-example.md)** - 完整的项目演示
  - 完整项目结构和代码
  - 表单验证、用户管理、购物车等真实场景
  - API 路由配置实例
  - MCP 集成完整配置
  - 终端日志效果展示

### 🤖 AI 集成

- **[MCP 集成指南](./mcp-integration-guide.md)** - 与 Cursor AI 的智能集成
  - MCP 服务器安装和配置
  - Cursor 配置文件设置
  - AI 智能日志分析功能
  - 故障排除和最佳实践

## 🎯 学习路径建议

### 如果你是初学者（高中生）

1. 先阅读 **[Next.js 浏览器日志回显指南](./nextjs-browser-echo-guide.md)**
2. 跟着实践指南创建一个小项目
3. 遇到问题时查看常见问题解答

### 如果你想要深入理解

1. 阅读 **[技术原理详解](./nextjs-technical-principles.md)**
2. 查看架构图和流程图
3. 理解关键技术实现

### 如果你想要实际应用

1. 直接查看 **[实践指南](./nextjs-practical-guide.md)**
2. 参考 **[完整实践示例](./nextjs-complete-practice-example.md)** 获取完整代码
3. 配置 **[MCP 集成](./mcp-integration-guide.md)** 实现 AI 智能分析
4. 复制代码示例到你的项目中
5. 根据需求调整配置

## 🛠️ 快速参考

### 安装命令

```bash
# 基本安装
npm install -D @browser-echo/next
npx @browser-echo/next setup

# MCP 集成（可选）
npm install -g @browser-echo/mcp
```

### 基本设置

```tsx
// app/layout.tsx
import BrowserEchoScript from "@browser-echo/next/BrowserEchoScript";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {process.env.NODE_ENV === "development" && <BrowserEchoScript />}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```ts
// app/api/client-logs/route.ts
import { POST as originalPOST } from '@browser-echo/next/route';

export { originalPOST as POST };
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

### 常用配置选项

```tsx
<BrowserEchoScript
  include={["warn", "error"]} // 只捕获警告和错误
  tag="[我的应用]" // 自定义标签
  stackMode="condensed" // 简化堆栈跟踪
  batch={{ size: 20, interval: 300 }} // 批量发送设置
/>
```

## 🔍 常见问题快速查找

| 问题         | 解决方案                | 文档位置                                                               |
| ------------ | ----------------------- | ---------------------------------------------------------------------- |
| 看不到日志   | 检查开发模式和 API 路由 | [入门指南 - 常见问题](./nextjs-browser-echo-guide.md#常见问题解答)     |
| 日志太多     | 使用 include 过滤       | [实践指南 - 高级配置](./nextjs-practical-guide.md#高级配置示例)        |
| 性能问题     | 调整批处理设置          | [技术原理 - 性能优化](./nextjs-technical-principles.md#性能优化策略)   |
| 自定义配置   | 查看配置选项            | [实践指南 - 高级配置](./nextjs-practical-guide.md#高级配置示例)        |
| MCP 连接失败 | 重启 Cursor，检查配置   | [MCP 集成指南 - 故障排除](./mcp-integration-guide.md#故障排除)         |
| API 路由错误 | 检查 runtime 和 dynamic | [完整实践示例 - 核心配置](./nextjs-complete-practice-example.md#核心配置) |

## 📖 相关资源

### 官方文档

- [Browser Echo 主项目](https://github.com/instructa/browser-echo)
- [Next.js 官方文档](https://nextjs.org/docs)

### 框架支持

- [Vite 集成](./../packages/vite/README.md)
- [Nuxt 集成](./../packages/nuxt/README.md)
- [React 集成](./../packages/react/README.md)
- [Vue 集成](./../packages/vue/README.md)

### MCP 服务器

- [MCP 服务器设置](./../packages/mcp/README.md) - 用于 AI 助手集成

## 🤝 贡献和反馈

如果你发现文档中有错误或需要改进的地方，欢迎：

1. 在 GitHub 上提交 Issue
2. 提交 Pull Request
3. 联系项目维护者

## 📝 文档更新日志

- **2024 年 8 月** - 重大更新！
  - ✅ 创建完整的 Next.js 使用指南
  - ✅ 包含入门指南、技术原理和实践指南
  - ✅ 添加了丰富的代码示例和 mermaid 图表
  - ✅ 针对高中生等初学者优化了语言表达
  - 🆕 **新增完整实践示例**：包含登录表单、用户管理、购物车等真实场景
  - 🆕 **新增 MCP 集成指南**：实现 AI 智能日志分析功能
  - 🆕 **修正 API 路由配置**：提供经过实际验证的正确配置方法

---

**祝你使用 Browser Echo 开发愉快！** 🎉
