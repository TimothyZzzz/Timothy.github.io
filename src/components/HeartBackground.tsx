import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 生成随机位置、大小和动画时间的函数
const getRandomProps = (index: number) => {
  // 为了确保更好的随机分布，结合索引和当前时间生成随机种子
  const seed = index * 1000 + Date.now() % 10000;
  
  // 使用更简单直接的随机方法
  const getRandom = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };
  
  return {
    x: getRandom(0, 100), // 0-100% 的随机水平位置
    y: getRandom(0, 100), // 0-100% 的随机垂直位置
    scale: getRandom(0.3, 1), // 随机大小 0.3-1
    duration: getRandom(8, 20), // 随机动画时间 8-20秒
    delay: getRandom(0, 5), // 随机延迟 0-5秒
    opacity: getRandom(0.1, 0.4), // 随机透明度 0.1-0.4
  };
};

// 心形背景组件
export default function HeartBackground() {
  // 创建多个心形元素
  const [hearts, setHearts] = useState<number[]>([]);
  
  // 初始化心形数组
  useEffect(() => {
    // 创建20个心形
    setHearts(Array.from({ length: 20 }, (_, i) => i));
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, index) => {
        const { x, y, scale, duration, delay, opacity } = getRandomProps(index);
        
        return (
          <motion.div
            key={index}
            className="absolute text-[#ff6f91] flex items-center justify-center"
            style={{
              left: '0',
              top: '0',
            }}
            initial={{
              x: `${x}%`,
              y: `${y}%`,
              scale,
              opacity: 0,
            }}
            animate={{
              x: [
                `${x}%`, 
                `${Math.min(Math.max(x + (Math.random() * 20 - 10), 0), 100)}%`, 
                `${Math.min(Math.max(x + (Math.random() * 20 - 10), 0), 100)}%`,
                `${x}%`
              ],
              y: [
                `${y}%`, 
                `${Math.max(y - 30, -20)}%`, 
                `${Math.max(y - 50, -40)}%`,
                `${y}%`
              ],
              opacity: [0, opacity, opacity, 0],
              scale: [scale, scale * 1.1, scale * 0.9, scale],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          >
            ❤
          </motion.div>
        );
      })}
    </div>
  );
}