/**
 * 诊断报告组件
 * 展示AI分析结果，包括综合评分、各维度详细分析和改进建议
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, AlertTriangle, Lightbulb, Download, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { DiagnosisResult } from '../../stores/globalState';
import { getScoreColor, getScoreLevel } from '../../services/aiService';

interface DiagnosisReportProps {
  result: DiagnosisResult;
  onNewAnalysis: () => void;
}

export const DiagnosisReport: React.FC<DiagnosisReportProps> = ({ result, onNewAnalysis }) => {
  const chartData = [
    { name: '配色', score: result.dimensions.color.score, color: '#3B82F6' },
    { name: '布局', score: result.dimensions.layout.score, color: '#10B981' },
    { name: '字体', score: result.dimensions.typography.score, color: '#F59E0B' },
    { name: '层次', score: result.dimensions.hierarchy.score, color: '#EF4444' },
    { name: '品牌', score: result.dimensions.branding.score, color: '#8B5CF6' }
  ];

  const dimensions = [
    { key: 'color', name: '配色方案', icon: '🎨', data: result.dimensions.color },
    { key: 'layout', name: '排版布局', icon: '📐', data: result.dimensions.layout },
    { key: 'typography', name: '字体选择', icon: '✍️', data: result.dimensions.typography },
    { key: 'hierarchy', name: '视觉层次', icon: '📊', data: result.dimensions.hierarchy },
    { key: 'branding', name: '品牌一致性', icon: '🏷️', data: result.dimensions.branding }
  ];

  const handleDownloadReport = () => {
    try {
      const reportContent = `
DesignLens 设计诊断报告
========================

文件名: ${result.fileName}
诊断时间: ${new Date(result.timestamp).toLocaleString('zh-CN')}
综合评分: ${result.overallScore}/100 (${getScoreLevel(result.overallScore)})

详细评分:
--------
🎨 配色方案: ${result.dimensions.color.score}/100
📐 排版布局: ${result.dimensions.layout.score}/100  
✍️ 字体选择: ${result.dimensions.typography.score}/100
📊 视觉层次: ${result.dimensions.hierarchy.score}/100
🏷️ 品牌一致性: ${result.dimensions.branding.score}/100

主要问题:
--------
${Object.entries(result.dimensions).map(([key, data]) => 
  data.issues.length > 0 ? `${key}: ${data.issues.join(', ')}` : ''
).filter(Boolean).join('\n')}

改进建议:
--------
${Object.entries(result.dimensions).map(([key, data]) => 
  `${key}: ${data.suggestions.join('; ')}`
).join('\n')}

感谢使用 DesignLens AI设计诊断平台！
      `;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `设计诊断报告_${result.fileName}_${new Date().toISOString().split('T')[0]}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('报告下载成功！');
    } catch (error) {
      toast.error('下载失败，请重试');
    }
  };

  const handleShareResult = async () => {
    try {
      const shareText = `我在 DesignLens 上完成了设计诊断！

📊 综合评分: ${result.overallScore}/100 (${getScoreLevel(result.overallScore)})

主要评分:
🎨 配色: ${result.dimensions.color.score}/100
📐 布局: ${result.dimensions.layout.score}/100  
✍️ 字体: ${result.dimensions.typography.score}/100
📊 层次: ${result.dimensions.hierarchy.score}/100
🏷️ 品牌: ${result.dimensions.branding.score}/100

#DesignLens #AI设计诊断 #设计优化`;

      if (navigator.share) {
        await navigator.share({
          title: 'DesignLens 设计诊断结果',
          text: shareText,
          url: window.location.href
        });
        toast.success('分享成功！');
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('分享内容已复制到剪贴板！');
      }
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = `我的设计诊断结果：综合评分 ${result.overallScore}/100 - 来自 DesignLens AI设计诊断平台`;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        toast.success('分享内容已复制到剪贴板！');
      } catch (err) {
        toast.error('分享失败，请手动复制分享内容');
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* 总体评分区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mr-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">诊断完成</h2>
                <p className="text-slate-600">AI已完成多维度设计分析</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline mb-2">
                  <span className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}
                  </span>
                  <span className="text-xl text-slate-500 ml-2">/100</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.overallScore)} bg-white`}>
                    {getScoreLevel(result.overallScore)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleDownloadReport}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下载报告
                </button>
                <button 
                  onClick={handleShareResult}
                  className="flex items-center px-4 py-2 bg-white text-slate-700 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  分享结果
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">各维度评分</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* 原图展示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-slate-800 mb-4">分析对象</h3>
        <div className="flex justify-center">
          <img
            src={result.imageUrl}
            alt={result.fileName}
            className="max-w-full max-h-96 rounded-lg shadow-lg"
          />
        </div>
        <p className="text-center text-slate-600 mt-4">{result.fileName}</p>
      </motion.div>

      {/* 详细分析 */}
      <div className="grid gap-6">
        {dimensions.map((dimension, index) => (
          <motion.div
            key={dimension.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{dimension.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{dimension.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`text-2xl font-bold ${getScoreColor(dimension.data.score)} mr-2`}>
                      {dimension.data.score}
                    </span>
                    <span className="text-slate-500">/100</span>
                    <span className={`ml-3 px-2 py-1 rounded text-sm ${getScoreColor(dimension.data.score)} bg-slate-100`}>
                      {getScoreLevel(dimension.data.score)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dimension.data.issues.length > 0 && (
                <div>
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                    <h4 className="font-medium text-slate-800">发现的问题</h4>
                  </div>
                  <ul className="space-y-2">
                    {dimension.data.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                  <h4 className="font-medium text-slate-800">改进建议</h4>
                </div>
                <ul className="space-y-2">
                  {dimension.data.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center space-x-4"
      >
        <button
          onClick={onNewAnalysis}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          开始新的诊断
        </button>
        <button className="px-8 py-3 bg-white text-slate-700 rounded-xl font-medium border border-slate-200 hover:bg-slate-50 transition-colors">
          查看更多案例
        </button>
      </motion.div>
    </div>
  );
};