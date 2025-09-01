/**
 * 社区页面组件
 * 展示优秀设计案例和社区内容
 */
import React from 'react';
import { motion } from 'framer-motion';
import { CommunityShowcase } from '../components/community';

export const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <CommunityShowcase />
      </div>
    </div>
  );
};
