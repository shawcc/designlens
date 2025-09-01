/**
 * 设计知识库组件
 * 提供设计原则、案例解析和学习资源
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, TrendingUp, Palette, Layout, Type } from 'lucide-react';

const principles = [
  {
    id: 1,
    icon: Palette,
    title: '色彩理论',
    description: '掌握色彩搭配的基本原理，创造和谐的视觉效果',
    concepts: ['色环应用', '对比度原则', '色彩心理学', '品牌色彩'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    icon: Layout,
    title: '布局设计',
    description: '学习空间安排和元素组织的专业技巧',
    concepts: ['网格系统', '黄金比例', '留白艺术', '视觉平衡'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: Type,
    title: '字体排版',
    description: '提升文字表达力，增强设计的可读性',
    concepts: ['字体层级', '行间距', '字重选择', '文字对比'],
    color: 'from-green-500 to-emerald-500'
  }
];

const trendingTopics = [
  {
    title: '2024年UI设计趋势',
    description: '探索最新的界面设计潮流和技术应用',
    readTime: '8分钟阅读',
    category: '趋势'
  },
  {
    title: '移动端设计最佳实践',
    description: '创建优秀移动体验的核心原则和方法',
    readTime: '12分钟阅读',
    category: '实践'
  },
  {
    title: '品牌视觉识别系统',
    description: '构建一致性品牌形象的完整指南',
    readTime: '15分钟阅读',
    category: '品牌'
  }
];

export const DesignPrinciples: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* 头部介绍 */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            设计知识库
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            系统化学习设计理论，掌握专业技能，提升设计水平
          </p>
        </motion.div>
      </div>

      {/* 核心原则 */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-slate-800 mb-8 flex items-center"
        >
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
          设计核心原则
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${principle.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <principle.icon className="w-6 h-6 text-white" />
              </div>

              <h4 className="text-xl font-semibold text-slate-800 mb-3">
                {principle.title}
              </h4>
              <p className="text-slate-600 mb-4">
                {principle.description}
              </p>

              <div className="space-y-2">
                {principle.concepts.map((concept, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`w-2 h-2 bg-gradient-to-r ${principle.color} rounded-full mr-3`} />
                    <span className="text-sm text-slate-600">{concept}</span>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                深入学习 →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 热门话题 */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl font-bold text-slate-800 mb-8 flex items-center"
        >
          <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
          热门话题
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {topic.category}
                </span>
                <span className="text-sm text-slate-500">{topic.readTime}</span>
              </div>

              <h4 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h4>
              <p className="text-slate-600 text-sm">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 实用工具推荐 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          实用设计工具
        </h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Coolors', desc: '配色方案生成', category: '配色' },
            { name: 'Google Fonts', desc: '免费字体资源', category: '字体' },
            { name: 'Unsplash', desc: '高质量图片素材', category: '素材' },
            { name: 'Figma', desc: '界面设计工具', category: '设计' }
          ].map((tool, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3">
                {tool.name.charAt(0)}
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">{tool.name}</h4>
              <p className="text-sm text-slate-600 mb-2">{tool.desc}</p>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
