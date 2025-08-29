"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
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
        
        // 模拟 API 调用，由于我们没有真实的 API，创建模拟数据
        const mockResponse = new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              status: 200,
              headers: new Headers({'content-type': 'application/json'}),
              json: async () => [
                { id: 1, name: "张三", email: "zhangsan@example.com", password: "123456" },
                { id: 2, name: "李四", email: "lisi@example.com", password: "123456" },
                { id: 3, name: "王五", email: "wangwu@example.com", password: "123456" },
                { id: 4, name: "赵六", email: "zhaoliu@example.com", password: "123456" },
              ]
            });
          }, 1000);
        });

        const response = await mockResponse as any;

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
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("渲染错误状态:", error);
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">出现错误</h2>
        <p className="text-red-600">错误: {error}</p>
      </div>
    );
  }

  console.log("渲染用户列表，用户数量:", users.length);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">用户列表 ({users.length})</h2>
      
      {/* 提示信息 */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          💡 提示：所有用户的默认密码都是 <span className="font-mono bg-yellow-100 px-1 rounded">123456</span>
        </p>
      </div>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                ID: {user.id}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">邮箱：</span>{user.email}</p>
              <p><span className="font-medium">默认密码：</span>
                <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs ml-1">
                  {user.password}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}