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
    setTimeout(() => {
      console.log("结账成功: 订单已创建");
      setCart([]);
      console.log("购物车已清空");
    }, 1000);
  };

  // 示例商品数据
  const sampleProducts = [
    { id: 1, name: "苹果", price: 6.5 },
    { id: 2, name: "香蕉", price: 4.2 },
    { id: 3, name: "橙子", price: 8.8 },
    { id: 4, name: "葡萄", price: 15.6 },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 商品选择区域 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">商品列表</h2>
        <div className="space-y-3">
          {sampleProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">￥{product.price}</p>
              </div>
              <button
                onClick={() => addItem(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                添加到购物车
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 购物车区域 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">购物车</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">购物车为空</p>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">￥{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">总计: ￥{total.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                结账
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}