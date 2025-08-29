# Next.js Browser Echo 实践指南

## 快速开始

### 1. 创建新的 Next.js 项目

```bash
npx create-next-app@latest my-browser-echo-app
cd my-browser-echo-app
```

### 2. 安装 Browser Echo

```bash
npm install -D @browser-echo/next
```

### 3. 自动设置

```bash
npx @browser-echo/next setup
```

### 4. 启动开发服务器

```bash
npm run dev
```

现在你可以在浏览器中使用 `console.log()` 等命令，日志会自动显示在终端中！

## 实际项目示例

### 示例 1：用户登录表单

```tsx
// app/components/LoginForm.tsx
"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("开始登录流程");
    console.log("用户邮箱:", email);
    console.log("密码长度:", password.length);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("登录API响应状态:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("登录成功，用户信息:", data);
        // 处理登录成功
      } else {
        console.warn("登录失败，状态码:", response.status);
        const error = await response.json();
        console.error("登录错误:", error.message);
      }
    } catch (error) {
      console.error("网络请求失败:", error);
    } finally {
      setLoading(false);
      console.log("登录流程结束");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">邮箱</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "登录中..." : "登录"}
      </button>
    </form>
  );
}
```

### 示例 2：数据获取组件

```tsx
// app/components/UserList.tsx
"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("开始加载用户列表");

    const fetchUsers = async () => {
      try {
        console.log("发送API请求: /api/users");
        const response = await fetch("/api/users");

        console.log("API响应状态:", response.status);
        console.log("响应头:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("获取到用户数据:", data);
        console.log("用户数量:", data.length);

        setUsers(data);
        console.log("用户列表更新完成");
      } catch (err) {
        console.error("获取用户列表失败:", err);
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
        console.log("用户列表加载完成");
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    console.log("渲染加载状态");
    return <div>加载中...</div>;
  }

  if (error) {
    console.error("渲染错误状态:", error);
    return <div>错误: {error}</div>;
  }

  console.log("渲染用户列表，用户数量:", users.length);

  return (
    <div>
      <h2>用户列表 ({users.length})</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 示例 3：购物车组件

```tsx
// app/components/ShoppingCart.tsx
"use client";

import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("购物车状态更新:", cart);
    console.log("购物车商品数量:", cart.length);

    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log("计算总价:", newTotal);
    setTotal(newTotal);
  }, [cart]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    console.log("添加商品到购物车:", item);

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        console.log("商品已存在，增加数量");
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        console.log("添加新商品");
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: number) => {
    console.log("从购物车移除商品:", itemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    console.log("更新商品数量:", itemId, "新数量:", quantity);

    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const checkout = () => {
    console.log("开始结账流程");
    console.log("购物车商品:", cart);
    console.log("总价:", total);

    // 模拟结账API调用
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total }),
    })
      .then((response) => {
        console.log("结账API响应:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("结账成功:", data);
        setCart([]);
      })
      .catch((error) => {
        console.error("结账失败:", error);
      });
  };

  return (
    <div>
      <h2>购物车</h2>
      {cart.length === 0 ? (
        <p>购物车为空</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ￥{item.price} x {item.quantity}
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)}>删除</button>
              </li>
            ))}
          </ul>
          <p>总计: ￥{total}</p>
          <button onClick={checkout}>结账</button>
        </>
      )}
    </div>
  );
}
```

## 高级配置示例

### 1. 自定义配置

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
import BrowserEchoScript from "@browser-echo/next/BrowserEchoScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "development" && (
          <BrowserEchoScript
            route="/api/client-logs"
            include={["warn", "error", "log"]} // 只捕获警告、错误和普通日志
            preserveConsole={true} // 保持原始console行为
            tag="[我的应用]" // 自定义标签
            stackMode="condensed" // 使用简化的堆栈跟踪
            showSource={true} // 显示源代码位置
            batch={{
              size: 15, // 每批最多15条日志
              interval: 400, // 最多400ms发送一次
            }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. 环境特定配置

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
import BrowserEchoScript from "@browser-echo/next/BrowserEchoScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  // 根据环境变量配置不同的设置
  const browserEchoConfig = {
    development: {
      include: ["log", "warn", "error", "info", "debug"],
      tag: "[DEV]",
      stackMode: "full" as const,
    },
    test: {
      include: ["warn", "error"],
      tag: "[TEST]",
      stackMode: "condensed" as const,
    },
  };

  const config =
    browserEchoConfig[process.env.NODE_ENV as keyof typeof browserEchoConfig] ||
    browserEchoConfig.development;

  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV !== "production" && (
          <BrowserEchoScript
            route="/api/client-logs"
            include={config.include}
            tag={config.tag}
            stackMode={config.stackMode}
            showSource={true}
            batch={{ size: 20, interval: 300 }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 调试技巧

### 1. 使用不同的日志级别

```tsx
// 在组件中使用不同级别的日志
export default function DebugComponent() {
  useEffect(() => {
    // 普通信息
    console.log("组件已挂载");

    // 调试信息
    console.debug("调试信息：组件状态正常");

    // 警告信息
    console.warn("警告：某些功能可能不可用");

    // 错误信息
    console.error("错误：API调用失败");

    // 信息提示
    console.info("提示：用户操作已完成");
  }, []);

  return <div>调试组件</div>;
}
```

### 2. 条件日志

```tsx
// 只在特定条件下输出日志
export default function ConditionalLogging() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 只在开发模式下输出详细日志
    if (process.env.NODE_ENV === "development") {
      console.log("计数器更新:", count);

      if (count > 10) {
        console.warn("计数器值较高:", count);
      }

      if (count > 20) {
        console.error("计数器值过高:", count);
      }
    }
  }, [count]);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

### 3. 性能监控

```tsx
// 监控组件性能
export default function PerformanceMonitor() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const startTime = performance.now();
    console.log("开始数据加载");

    fetch("/api/data")
      .then((response) => response.json())
      .then((result) => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log("数据加载完成");
        console.log("加载耗时:", duration.toFixed(2), "ms");
        console.log("数据大小:", JSON.stringify(result).length, "bytes");

        setData(result);
      })
      .catch((error) => {
        console.error("数据加载失败:", error);
      });
  }, []);

  return <div>{data ? "数据已加载" : "加载中..."}</div>;
}
```

## 最佳实践

### 1. 日志组织

```tsx
// 使用前缀组织日志
const LOG_PREFIX = "[UserModule]";

export default function UserModule() {
  const handleUserAction = () => {
    console.log(`${LOG_PREFIX} 用户操作开始`);
    console.log(`${LOG_PREFIX} 处理用户数据`);
    console.log(`${LOG_PREFIX} 用户操作完成`);
  };

  return <button onClick={handleUserAction}>执行操作</button>;
}
```

### 2. 错误边界集成

```tsx
// app/components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("错误边界捕获到错误:", error);
    console.error("错误信息:", errorInfo);
    console.error("错误堆栈:", error.stack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>出现错误</h2>
          <p>请检查控制台获取详细信息</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 3. 自定义日志工具

```tsx
// utils/logger.ts
const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log("[APP]", ...args);
    }
  },

  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn("[APP]", ...args);
    }
  },

  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error("[APP]", ...args);
    }
  },

  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug("[APP]", ...args);
    }
  },
};

// 在组件中使用
import { logger } from "@/utils/logger";

export default function MyComponent() {
  useEffect(() => {
    logger.log("组件初始化");
    logger.debug("调试信息");
  }, []);

  return <div>我的组件</div>;
}
```

## 常见场景和解决方案

### 1. 表单验证

```tsx
export default function FormValidation() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    console.log("开始表单验证");
    console.log("表单数据:", formData);

    // 邮箱验证
    if (!formData.email.includes("@")) {
      newErrors.push("邮箱格式不正确");
      console.warn("邮箱验证失败:", formData.email);
    }

    // 密码验证
    if (formData.password.length < 6) {
      newErrors.push("密码长度不足");
      console.warn("密码长度不足:", formData.password.length);
    }

    // 确认密码验证
    if (formData.password !== formData.confirmPassword) {
      newErrors.push("两次密码不一致");
      console.error("密码不匹配");
    }

    console.log("验证结果:", newErrors);
    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("表单提交");

    if (validateForm()) {
      console.log("表单验证通过，提交数据");
      // 提交表单
    } else {
      console.warn("表单验证失败，阻止提交");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
```

### 2. API 调用监控

```tsx
export default function ApiMonitor() {
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint: string) => {
    setLoading(true);
    const startTime = Date.now();

    console.log(`开始调用API: ${endpoint}`);
    console.log("请求时间:", new Date().toISOString());

    try {
      const response = await fetch(endpoint);
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`API调用完成: ${endpoint}`);
      console.log("响应状态:", response.status);
      console.log("响应时间:", duration, "ms");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("响应数据:", data);

      return data;
    } catch (error) {
      console.error(`API调用失败: ${endpoint}`, error);
      throw error;
    } finally {
      setLoading(false);
      console.log(`API调用结束: ${endpoint}`);
    }
  };

  return (
    <div>
      <button onClick={() => callApi("/api/test")} disabled={loading}>
        {loading ? "调用中..." : "测试API"}
      </button>
    </div>
  );
}
```

## 总结

通过这个实践指南，你应该能够：

1. **快速上手**：在几分钟内设置 Browser Echo
2. **实际应用**：在各种场景中使用日志调试
3. **高级配置**：根据需求自定义行为
4. **最佳实践**：遵循推荐的开发模式
5. **问题解决**：处理常见的调试场景

记住，Browser Echo 的目的是让你的开发体验更加流畅，特别是与 AI 助手协作时。合理使用日志，既能帮助你调试问题，也能让 AI 助手更好地理解你的代码行为。
