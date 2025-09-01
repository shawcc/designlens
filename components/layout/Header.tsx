/**
 * 页面头部导航组件
 * 包含品牌标识、导航菜单和用户操作
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, User, Menu } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/globalState';
import { UserProfile } from '../user/UserProfile';
import { AuthModal } from '../user/AuthModal';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [user, setUser] = useAtom(userAtom);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleUserClick = () => {
    if (user.id) {
      setShowUserProfile(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 品牌标识 */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onPageChange('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DesignLens
                </h1>
                <p className="text-xs text-slate-500">AI设计诊断平台</p>
              </div>
            </motion.div>

            {/* 导航菜单 - 桌面端 */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`relative group px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="font-medium">{item.label}</span>
                  
                  {/* 悬浮提示 */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* 用户操作区 */}
            <div className="flex items-center space-x-4">
              {/* 剩余次数显示 */}
              {!user.isPro && (
                <div className="hidden sm:flex items-center px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm">
                  <span className="font-medium">剩余 {user.remainingDiagnoses} 次</span>
                </div>
              )}

              {/* Pro标识 */}
              {user.isPro && (
                <div className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg text-sm font-medium">
                  ✨ Pro
                </div>
              )}

              {/* 用户头像 */}
              <motion.button
                onClick={handleUserClick}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700">
                  {user.name}
                </span>
              </motion.button>

              {/* 移动端菜单按钮 */}
              <button className="md:hidden p-2 text-slate-600 hover:text-slate-800">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 用户资料模态框 */}
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

const navItems = [
  { id: 'home', label: '智能诊断', description: '上传设计获得AI反馈' },
  { id: 'community', label: '优秀案例', description: '学习精彩设计作品' },
  { id: 'knowledge', label: '设计知识', description: '掌握设计理论基础' }
];