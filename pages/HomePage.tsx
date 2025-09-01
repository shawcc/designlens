/**
 * 首页组件
 * 整合上传功能和诊断报告展示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { UploadArea } from '../components/upload';
import { DiagnosisReport } from '../components/diagnosis/DiagnosisReport';
import { currentDiagnosisAtom, uploadStatusAtom, userAtom, diagnosisResultsAtom } from '../stores/globalState';
import { simulateAIAnalysis } from '../utils/mockAIAnalysis';
import { AIServiceFactory } from '../services/aiService';
import { getEnvironmentConfig } from '../config/environment';

export const HomePage: React.FC = () => {
  const [currentDiagnosis, setCurrentDiagnosis] = useAtom(currentDiagnosisAtom);
  const [uploadStatus, setUploadStatus] = useAtom(uploadStatusAtom);
  const [user, setUser] = useAtom(userAtom);
  const [diagnosisResults, setDiagnosisResults] = useAtom(diagnosisResultsAtom);

  const handleFileSelect = async (file: File) => {
    // 检查剩余次数
    if (!user.isPro && user.remainingDiagnoses <= 0) {
      toast.error('诊断次数已用完，请升级到Pro版本');
      return;
    }

    try {
      setUploadStatus('uploading');
      toast.loading('正在上传文件...', { id: 'upload' });

      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUploadStatus('analyzing');
      toast.loading('AI正在分析中...', { id: 'upload' });

      // 使用AI服务进行分析
      const envConfig = getEnvironmentConfig();
      const aiService = AIServiceFactory.getInstance(envConfig.ai);
      const result = await aiService.analyze(file);
      
      // 更新状态
      setCurrentDiagnosis(result);
      setDiagnosisResults(prev => [result, ...prev]);
      setUploadStatus('completed');

      // 扣除次数
      if (!user.isPro) {
        setUser(prev => ({
          ...prev,
          remainingDiagnoses: prev.remainingDiagnoses - 1
        }));
      }

      toast.success('诊断完成！', { id: 'upload' });
    } catch (error) {
      setUploadStatus('error');
      toast.error(error instanceof Error ? error.message : '分析失败，请重试', { id: 'upload' });
    }
  };

  const handleNewAnalysis = () => {
    setCurrentDiagnosis(null);
    setUploadStatus('idle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {!currentDiagnosis ? (
          <div className="space-y-12">
            {/* 头部介绍 */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h1 className="text-5xl font-bold text-slate-800">
                  AI驱动的
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    设计诊断
                  </span>
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  上传你的设计作品，获得专业级的AI分析反馈。从配色到布局，从字体到层次，
                  全方位诊断设计问题，提供具体可执行的改进建议。
                </p>
              </motion.div>
            </div>

            {/* 上传区域 */}
            <UploadArea onFileSelect={handleFileSelect} />

            {/* 特性介绍 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-3 gap-8 mt-16"
            >
              {[
                {
                  icon: '🎯',
                  title: '多维度分析',
                  description: '从配色、布局、字体、层次、品牌一致性五个维度进行专业诊断'
                },
                {
                  icon: '⚡',
                  title: '即时反馈',
                  description: '上传即得结果，无需等待，AI秒级完成专业级设计分析'
                },
                {
                  icon: '💡',
                  title: '实用建议',
                  description: '不只指出问题，更提供具体可执行的改进方案和代码输出'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <DiagnosisReport 
            result={currentDiagnosis} 
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </div>
    </div>
  );
};