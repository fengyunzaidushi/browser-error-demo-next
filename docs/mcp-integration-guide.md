# Browser Echo MCP 集成指南

## 🎯 什么是 MCP 集成？

MCP (Model Context Protocol) 集成允许 Cursor AI 直接访问 Browser Echo 收集的浏览器日志数据，让 AI 助手能够：
- 实时读取浏览器日志历史
- 分析应用行为模式
- 提供基于实际运行数据的调试建议
- 智能识别问题和优化机会

## 🔧 安装步骤

### 1. 全局安装 Browser Echo MCP 服务器
```bash
npm install -g @browser-echo/mcp
```

### 2. 验证安装
```bash
browser-echo-mcp --help
```

应该看到类似输出：
```
MCP server for Browser Echo (stdio by default, Streamable HTTP via --http) (browser-echo-mcp v1.0.0)

USAGE browser-echo-mcp [OPTIONS] 

OPTIONS
                 --port="5179"    HTTP port for ingest or full HTTP transport (default 5179)     
            --host="127.0.0.1"    HTTP host for ingest or full HTTP transport (default 127.0.0.1)
  --logsRoute="/__client-logs"    Logs ingest route (default /__client-logs)                     
             --endpoint="/mcp"    MCP endpoint path when using --http (default /mcp)             
                      --buffer    Max in-memory entries (default 1000)                           
                        --http    Use full Streamable HTTP transport (default: stdio)
```

## ⚙️ Cursor 配置

### 配置文件位置
在你的项目根目录创建：
```
.cursor/mcp.json
```

### 基础配置
```json
{
  "mcpServers": {
    "browser-echo-mcp": {
      "command": "browser-echo-mcp",
      "args": [
        "--buffer=500"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

## 📋 配置选项说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `command` | MCP 服务器执行命令 | `browser-echo-mcp` |
| `--buffer` | 内存中保存的日志条数 | `1000` |
| `--port` | HTTP 端口（如使用 --http） | `5179` |
| `--host` | HTTP 主机（如使用 --http） | `127.0.0.1` |
| `--logsRoute` | 日志接收路由 | `/__client-logs` |

## 🚀 启用步骤

### 1. 重启 Cursor
配置 MCP 服务器后需要重启 Cursor 使配置生效。

### 2. 验证连接
在 Cursor 中，MCP 服务器应该会自动连接。你可以在 Cursor 的状态栏或设置中查看 MCP 连接状态。

### 3. 开始使用
一旦连接成功，Cursor AI 就能：
- 读取浏览器日志历史
- 分析应用运行模式
- 提供基于实际数据的建议

## 🔄 工作流程

```
浏览器 → Browser Echo Script → Next.js API → 终端日志 → 开发者查看
                                     ↓
                                MCP Server → Cursor AI → 智能分析 → 调试建议
```

## 📊 MCP 提供的功能

### 1. 日志查询
- 按时间范围查询日志
- 按日志级别过滤
- 按组件或功能模块搜索

### 2. 模式分析
- 识别频繁出现的错误
- 分析用户行为模式
- 检测性能瓶颈

### 3. 智能建议
- 基于实际日志数据的优化建议
- 错误处理改进方案
- 用户体验提升建议

## 🧪 测试 MCP 功能

### 1. 确保 Browser Echo 正常运行
```bash
npm run dev
```

### 2. 在浏览器中产生日志
- 点击各种按钮
- 填写表单
- 触发不同的日志事件

### 3. 在 Cursor 中询问 AI
可以向 Cursor AI 询问类似问题：
- "分析一下最近的浏览器日志"
- "有哪些错误需要修复？"
- "用户在登录过程中遇到了什么问题？"
- "应用的性能表现如何？"
- "有什么可以优化的地方吗？"

## 🔧 故障排除

### MCP 服务器无法启动
1. 确认全局安装成功：`npm list -g @browser-echo/mcp`
2. 检查命令是否可用：`browser-echo-mcp --help`
3. 验证配置文件格式是否正确

### Cursor 无法连接
1. 重启 Cursor
2. 检查 `.cursor/mcp.json` 文件位置和格式
3. 查看 Cursor 的 MCP 连接状态

### 日志数据不显示
1. 确认 Browser Echo 正常工作（检查终端日志）
2. 验证 MCP 服务器配置
3. 检查浏览器中是否有实际的日志输出

## 🎯 使用技巧

### 1. 优化缓冲区大小
根据应用的日志量调整 `--buffer` 参数：
- 轻量应用：`--buffer=200`
- 中等应用：`--buffer=500`
- 重度日志应用：`--buffer=1000+`

### 2. 结合终端日志
- MCP 提供历史数据分析
- 终端提供实时日志查看
- 两者结合使用效果最佳

### 3. 定期清理
重启应用会清理 MCP 服务器的内存缓冲区，建议在长时间开发后重启。

## 🚀 高级配置

### HTTP 模式
如果需要多个客户端访问，可以使用 HTTP 模式：

```json
{
  "mcpServers": {
    "browser-echo-mcp": {
      "command": "browser-echo-mcp",
      "args": [
        "--http",
        "--port=5179",
        "--host=127.0.0.1"
      ]
    }
  }
}
```

### Windows 特定配置
如果在 Windows 上遇到路径问题，可以使用 node 绝对路径：

```json
{
  "mcpServers": {
    "browser-echo-mcp": {
      "command": "node",
      "args": [
        "C:/Users/username/AppData/Roaming/npm/node_modules/@browser-echo/mcp/dist/index.mjs"
      ]
    }
  }
}
```

## 💡 最佳实践

1. **保持适中的缓冲区大小**：避免内存占用过多
2. **定期重启 MCP 服务器**：清理累积的日志数据
3. **结合多种调试方式**：MCP + 终端日志 + 浏览器开发者工具
4. **充分利用 AI 分析**：定期询问 AI 关于日志模式和优化建议

## 📈 实际使用示例

### 性能优化询问
```
"分析最近的性能测试日志，有什么可以优化的地方？"
```

### 错误分析
```
"查看最近的错误日志，找出主要问题和解决方案"
```

### 用户体验分析
```
"基于用户操作日志，分析用户体验是否需要改进"
```

### 代码质量评估
```
"根据浏览器日志，评估代码的健壮性和错误处理"
```

通过这个 MCP 集成，Browser Echo 不仅能提供实时日志传输，还能让 AI 助手成为你的智能调试伙伴！🤖✨

## 🔗 相关文档

- [Next.js Browser Echo 指南](./nextjs-browser-echo-guide.md)
- [Next.js 完整实践示例](./nextjs-complete-practice-example.md)
- [Next.js 实践指南](./nextjs-practical-guide.md)