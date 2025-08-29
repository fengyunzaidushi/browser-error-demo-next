"use client";

export default function HomePage() {
  const handleClick = () => {
    console.log("按钮被点击了！");
    console.warn("这是一个警告信息");
    console.error("这是一个错误信息");
  };

  return (
    <div>
      <h1>Hello Browser Echo!</h1>
      <button onClick={handleClick}>点击我测试日志</button>
    </div>
  );
}