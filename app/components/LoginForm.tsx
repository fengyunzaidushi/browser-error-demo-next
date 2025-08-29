"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors: string[] = [];
    
    console.log("开始表单验证");
    console.log("表单数据:", { email, passwordLength: password.length });

    // 邮箱验证
    if (!email) {
      newErrors.push("邮箱不能为空");
      console.warn("邮箱验证失败: 邮箱为空");
    } else if (!email.includes("@")) {
      newErrors.push("邮箱格式不正确");
      console.warn("邮箱验证失败:", email);
    }

    // 密码验证
    if (!password) {
      newErrors.push("密码不能为空");
      console.warn("密码验证失败: 密码为空");
    } else if (password.length < 6) {
      newErrors.push("密码长度至少6位");
      console.warn("密码长度不足:", password.length);
    }

    console.log("验证结果:", newErrors);
    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors([]);
    
    console.log("开始登录流程");
    
    // 表单验证
    if (!validateForm()) {
      console.warn("表单验证失败，阻止提交");
      return;
    }
    
    console.log("表单验证通过，开始API调用");
    setLoading(true);

    console.log("用户邮箱:", email);
    console.log("密码长度:", password.length);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("登录API响应状态:", response.status);
      const data = await response.json();

      if (response.ok) {
        console.log("登录成功，用户信息:", data);
        setSuccessMessage(`登录成功！欢迎 ${data.user.name}`);
        setEmail("");
        setPassword("");
      } else {
        console.warn("登录失败，状态码:", response.status);
        console.error("登录错误:", data.message);
        setErrors([data.message || "登录失败"]);
      }
    } catch (error) {
      console.error("网络请求失败:", error);
      setErrors(["网络连接失败，请稍后重试"]);
    } finally {
      setLoading(false);
      console.log("登录流程结束");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">用户登录</h2>
      
      {/* 测试账号提示 */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800 mb-1">测试账号：</p>
        <p className="text-xs text-blue-600">
          邮箱：zhangsan@example.com / lisi@example.com<br/>
          密码：123456
        </p>
      </div>
      
      {/* 成功消息 */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 text-sm">{successMessage}</p>
        </div>
      )}
      
      {/* 错误消息 */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          {errors.map((error, index) => (
            <p key={index} className="text-red-800 text-sm mb-1 last:mb-0">
              • {error}
            </p>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  );
}