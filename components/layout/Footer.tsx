/**
 * 页面底部组件
 * 包含产品信息、链接和版权声明
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: '产品',
      links: [
        { name: '功能特性', href: '#' },
        { name: '定价方案', href: '#' },
        { name: '使用指南', href: '#' },
        { name: 'API文档', href: '#' }
      ]
    },
    {
      title: '社区',
      links: [
        { name: '优秀案例', href: '#' },
        { name: '设计师入驻', href: '#' },
        { name: '用户反馈', href: '#' },
        { name: '帮助中心', href: '#' }
      ]
    },
    {
      title: '资源',
      links: [
        { name: '设计知识库', href: '#' },
        { name: '博客文章', href: '#' },
        { name: '设计工具', href: '#' },
        { name: '趋势报告', href: '#' }
      ]
    },
    {
      title: '关于',
      links: [
        { name: '关于我们', href: '#' },
        { name: '联系我们', href: '#' },
        { name: '隐私政策', href: '#' },
        { name: '服务条款', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* 品牌区域 */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">DesignLens</h3>
                <p className="text-slate-400 text-sm">AI设计诊断平台</p>
              </div>
            </motion.div>
            
            <p className="text-slate-400 text-sm mb-6">
              让每个人都能获得专业级的设计反馈，提升全社会的设计美学水平。
            </p>

            {/* 社交媒体 */}
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* 链接区域 */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 底部版权 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm">
            © 2024 DesignLens. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              服务条款
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cookie政策
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
