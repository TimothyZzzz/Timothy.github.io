import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 薪资点击器组件
export default function SalaryClicker() {
  // 从本地存储获取初始值或设置默认值
  const [salary, setSalary] = useState<number>(() => {
    const savedSalary = localStorage.getItem('salary');
    return savedSalary ? parseInt(savedSalary) : 0;
  });
  
  const [clicks, setClicks] = useState<number>(() => {
    const savedClicks = localStorage.getItem('clicks');
    return savedClicks ? parseInt(savedClicks) : 0;
  });

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('salary', salary.toString());
    localStorage.setItem('clicks', clicks.toString());
  }, [salary, clicks]);

  // 增加薪资的函数
  const increaseSalary = () => {
    setSalary(prev => prev + 500);
    setClicks(prev => prev + 1);
  };

  // 重置函数
  const resetGame = () => {
    if (confirm('确定要重置薪资和点击次数吗？')) {
      setSalary(0);
      setClicks(0);
    }
  };

  // 格式化薪资显示
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('CN¥', '¥');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-8 text-[#222]"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">薪资加薪器</h2>
      <p className="text-gray-600 text-center mb-6 text-sm">
        每次点击都会为你的薪资+500（可重复点击，支持本地保存）
      </p>
      
      <div className="flex justify-center mb-8">
        <motion.div
          className="text-4xl font-bold text-[#ff6f91]"
          initial={{ scale: 1 }}
          animate={{ scale: salary > 0 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatSalary(salary)}
        </motion.div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={increaseSalary}
          className="bg-[#ff6f91] py-3 px-8 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6f91]/30 transition-all"
        >
          点我+500
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="bg-gray-200 hover:bg-gray-300 py-3 px-6 rounded-full text-gray-800 font-medium transition-all"
        >
          重置
        </motion.button>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        已点击 {clicks} 次
      </div>
    </motion.div>
  );
}