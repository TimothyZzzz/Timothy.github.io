import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SalaryClicker from "@/components/SalaryClicker";
import HeartBackground from "@/components/HeartBackground";

export default function Home() {
    const [randomText, setRandomText] = useState<string>("");
    const [dynamicWork, setDynamicWork] = useState<string>("");
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
    const dynamicWorkRef = useRef<HTMLSpanElement>(null);

    const messages = [
        "你今天看起来像是刚睡醒，但很有魅力。",
        "别卷了，喝口水吧兄弟。",
        "如果人生有撤销键，你现在会按吗？",
        "今天适合摸鱼（其实每天都适合）。",
        "加载中……加载失败，请重试你的生活。"
    ];

    const workTasks = ["整理模型文件", "审核外包作品", "优化插件工具", "组织徒步活动", "喝咖啡思考人生", "写奇怪的小工具"];

    const getRandomColor = () => {
        const colors = ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f", "#9b59b6", "#e67e22"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const showRandomText = () => {
        const rand = Math.floor(Math.random() * messages.length);
        setRandomText(messages[rand]);
    };

    let currentIndex = 0;

    const updateDynamicWork = () => {
        if (dynamicWorkRef.current) {
            dynamicWorkRef.current.style.opacity = "0";
            dynamicWorkRef.current.style.transform = "translateY(20px)";
        }

        setTimeout(() => {
            setDynamicWork(workTasks[currentIndex]);

            if (dynamicWorkRef.current) {
                dynamicWorkRef.current.style.opacity = "1";
                dynamicWorkRef.current.style.transform = "translateY(0)";
                dynamicWorkRef.current.style.color = getRandomColor();
            }

            currentIndex = (currentIndex + 1) % workTasks.length;
        }, 500);
    };

    const showEmail = () => {
        const userEmail = "Ma.Yao@habatrading.com";
        window.location.href = `mailto:${userEmail}`;
        toast("正在打开邮件客户端...");
    };

    useEffect(() => {
        updateDynamicWork();
        const interval = setInterval(updateDynamicWork, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="min-h-screen bg-[#fff5f7] text-[#222] font-sans flex flex-col items-center py-10 px-5 relative overflow-hidden">
            <HeartBackground />
            <h1 className="text-4xl font-bold mb-3">Hi，我是Yao</h1>
            <div className="text-[#666] text-lg mb-10 flex items-center gap-2">来自 Content·Model BPO & VidaXL 徒步社社长 & 电竞游戏主理人
                                <i className="fa-solid fa-rocket w-8 h-8 animate-bounce text-[#ff6f91]" />
            </div>
            <div
                className="card bg-white p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] w-[320px] text-center relative transition-transform duration-200 hover:-translate-y-2 hover:rotate-1 mb-5 overflow-hidden">
                <div
                    className="avatar w-25 h-25 rounded-full bg-[#ffd1dc] mx-auto mb-5 flex justify-center items-center text-4xl shadow-[0_4px_10px_rgba(0,0,0,0.1)]">😐</div>
                <p>白天管理外包，晚上管理徒步社，周末管理不了自己的作息。</p>
                <div
                    className="mt-5 text-sm text-[#888] cursor-pointer transition-all duration-200 hover:text-black hover:rotate-1"
                    onClick={showRandomText}>👉 点我获取今日的胡言乱语
                                    </div>
                <div
                    id="randomText"
                    className="mt-4 text-lg font-semibold min-h-6 inline-block transition-all duration-500"
                    style={{
                        color: randomText ? getRandomColor() : ""
                    }}>
                    {randomText}
                </div>
            </div>
            <div
                className="card bg-white p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] w-[320px] text-center relative transition-transform duration-200 hover:-translate-y-2 hover:rotate-1 mb-5 overflow-hidden">
                <p>我在做：
                                        <span
                        ref={dynamicWorkRef}
                        id="dynamicWork"
                        className="mt-4 text-lg font-semibold min-h-6 inline-block transition-all duration-500 hover:scale-125 hover:-rotate-3 ml-1">
                        {dynamicWork}
                    </span>
                </p>
            </div>
             <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
                <button
                    className="email-btn py-3 px-5 bg-[#ff6f91] text-white border-none rounded-full cursor-pointer text-lg transition-all duration-300 hover:bg-[#ff4c7a] hover:scale-110 shadow-[0_4px_8px_rgba(255,111,145,0.4)] hover:shadow-[0_6px_12px_rgba(255,111,145,0.6)]"
                    onClick={showEmail}
                    style={{
                        fontFamily: "\"Noto Sans SC\", sans-serif"
                    }}>点击获取我的邮件
                                </button>
                <button 
                    className="py-3 px-5 bg-[#f8f9fa] border border-gray-200 rounded-full text-[#666] text-lg shadow-sm hover:shadow hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                    onClick={() => setShowLocationModal(true)}
                >
                    快速找到我
                </button>
            </div>
            {/* 位置信息弹窗 */}
            {showLocationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-[90%] mx-4 shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#222]">我的位置</h3>
                            <button 
                                onClick={() => setShowLocationModal(false)}
                                className="text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <i className="fa-solid fa-times text-lg"></i>
                            </button>
                        </div>
                        <div className="text-lg mb-6 text-center">
                            <p className="mb-2">2楼</p>
                            <p className="font-semibold text-[#ff6f91]">BPO办公室（原Turkey会议室）</p>
                        </div>
                        <div className="flex justify-center">
                            <button 
                                onClick={() => setShowLocationModal(false)}
                                className="px-6 py-2 bg-[#ff6f91] text-white rounded-full hover:bg-[#ff4c7a] transition-colors"
                            >
                                知道了
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <div className="mt-10 mb-5 w-full max-w-md">
                <SalaryClicker />
            </div>
        </div>
    );
}