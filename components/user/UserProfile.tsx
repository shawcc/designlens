/**
 * 用户资料组件
 * 展示用户信息、诊断历史和账户设置
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, History, Crown, Download, Share2, Trash2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom, diagnosisResultsAtom } from '../../stores/globalState';
import { getScoreColor, getScoreLevel } from '../../utils/mockAIAnalysis';

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [user] = useAtom(userAtom);
  const [diagnosisResults] = useAtom(diagnosisResultsAtom);
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'settings'>('profile');

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'history', label: '诊断历史', icon: History },
    { id: 'settings', label: '账户设置', icon: Settings }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* 用户基本信息 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{user.name}</h3>
            <p className="text-slate-600">{user.id ? `ID: ${user.id}` : '访客用户'}</p>
            {user.isPro && (
              <div className="flex items-center mt-2">
                <Crown className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-yellow-600">Pro 用户</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 使用统计 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{diagnosisResults.length}</div>
            <div className="text-sm text-slate-600">已完成诊断</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {user.isPro ? '∞' : user.remainingDiagnoses}
            </div>
            <div className="text-sm text-slate-600">剩余次数</div>
          </div>
        </div>
      </div>

      {/* Pro 升级 */}
      {!user.isPro && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">升级到 Pro</h4>
              <p className="text-slate-600 text-sm">无限次诊断 + 高级功能 + 优先支持</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
              升级
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      {diagnosisResults.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500">还没有诊断记录</p>
          <button 
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始第一次诊断
          </button>
        </div>
      ) : (
        diagnosisResults.map((result) => (
          <div key={result.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-slate-800">{result.fileName}</h4>
                <p className="text-sm text-slate-500">
                  {new Date(result.timestamp).toLocaleString('zh-CN')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}
                </span>
                <span className="text-slate-400">/100</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-sm ${getScoreColor(result.overallScore)} bg-slate-100`}>
                {getScoreLevel(result.overallScore)}
              </span>
              
              <div className="flex space-x-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-800">账户设置</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-slate-700">邮箱通知</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-slate-700">自动保存诊断</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-slate-700">数据统计</span>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-slate-800">隐私设置</h4>
        
        <div className="space-y-3">
          <button className="w-full text-left py-3 px-4 border rounded-lg hover:bg-slate-50 transition-colors">
            修改密码
          </button>
          
          <button className="w-full text-left py-3 px-4 border rounded-lg hover:bg-slate-50 transition-colors">
            下载我的数据
          </button>
          
          <button className="w-full text-left py-3 px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            删除账户
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 模态框内容 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
      >
        {/* 头部 */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">用户中心</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 标签导航 */}
          <div className="flex space-x-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </motion.div>
    </div>
  );
};
