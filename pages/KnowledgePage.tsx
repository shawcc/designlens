/**
 * 知识库页面组件
 * 展示设计理论和学习资源
 */
import React from 'react';
import { motion } from 'framer-motion';
import { DesignPrinciples } from '../components/knowledge/DesignPrinciples';

export const KnowledgePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <DesignPrinciples />
      </div>
    </div>
  );
};
