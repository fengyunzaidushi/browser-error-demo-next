"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import ShoppingCart from "./components/ShoppingCart";

export default function HomePage() {
  const [activeDemo, setActiveDemo] = useState<string>("basic");

  const handleBasicTest = () => {
    console.log("=== 基础测试开始 ===");
    console.log("普通日志：按钮被点击了！");
    console.info("信息日志：这是一条信息");
    console.warn("警告日志：这是一个警告信息");
    console.error("错误日志：这是一个错误信息");
    console.debug("调试日志：这是调试信息");
    console.log("=== 基础测试结束 ===");
  };

  const handlePerformanceTest = () => {
    console.log("=== 性能测试开始 ===");
    const startTime = performance.now();
    
    // 模拟一些计算
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += Math.random();
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log("计算结果:", result);
    console.log("计算耗时:", duration.toFixed(2), "毫秒");
    console.log("=== 性能测试结束 ===");
  };

  const handleErrorTest = () => {
    console.log("=== 错误测试开始 ===");
    try {
      console.log("尝试访问undefined的属性...");
      const obj: any = undefined;
      const value = obj.nonExistentProperty;
    } catch (error) {
      console.error("捕获到错误:", error);
      console.error("错误堆栈:", (error as Error).stack);
    }
    console.log("=== 错误测试结束 ===");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browser Echo 实践演示</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDemo("basic")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDemo === "basic"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              基础测试
            </button>
            <button
              onClick={() => setActiveDemo("login")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDemo === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              登录表单
            </button>
            <button
              onClick={() => setActiveDemo("userlist")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDemo === "userlist"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              用户列表
            </button>
            <button
              onClick={() => setActiveDemo("cart")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeDemo === "cart"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              购物车
            </button>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeDemo === "basic" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">基础日志测试</h2>
            <p className="text-gray-600 mb-6">
              点击下面的按钮测试不同类型的日志输出。所有日志都会显示在你的终端中！
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBasicTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                基础日志测试
              </button>
              <button
                onClick={handlePerformanceTest}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                性能测试
              </button>
              <button
                onClick={handleErrorTest}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                错误测试
              </button>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                💡 提示：打开你的终端查看日志输出！Browser Echo 会将所有浏览器日志实时传送到终端。
              </p>
            </div>
          </div>
        )}

        {activeDemo === "login" && <LoginForm />}
        {activeDemo === "userlist" && <UserList />}
        {activeDemo === "cart" && <ShoppingCart />}
      </main>

      {/* 底部说明 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Browser Echo 功能演示</h3>
            <p className="text-gray-600">
              这个应用展示了 Browser Echo 如何将浏览器中的 console 日志实时传送到开发服务器终端。
              尝试不同的功能，观察终端中的日志输出！
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}