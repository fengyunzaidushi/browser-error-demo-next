import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据
const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com", password: "123456" },
  { id: 2, name: "李四", email: "lisi@example.com", password: "123456" },
  { id: 3, name: "王五", email: "wangwu@example.com", password: "123456" },
  { id: 4, name: "赵六", email: "zhaoliu@example.com", password: "123456" },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log("[API] 收到登录请求:", { email, passwordLength: password?.length });
    
    // 基本验证
    if (!email || !password) {
      console.log("[API] 登录失败: 缺少邮箱或密码");
      return NextResponse.json(
        { message: "邮箱和密码不能为空" },
        { status: 400 }
      );
    }
    
    // 查找用户
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log("[API] 登录失败: 用户不存在");
      return NextResponse.json(
        { message: "用户不存在" },
        { status: 401 }
      );
    }
    
    // 验证密码
    if (user.password !== password) {
      console.log("[API] 登录失败: 密码错误");
      return NextResponse.json(
        { message: "密码错误" },
        { status: 401 }
      );
    }
    
    // 登录成功
    console.log("[API] 登录成功:", { id: user.id, name: user.name, email: user.email });
    return NextResponse.json({
      success: true,
      message: "登录成功",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error("[API] 登录处理出错:", error);
    return NextResponse.json(
      { message: "服务器内部错误" },
      { status: 500 }
    );
  }
}