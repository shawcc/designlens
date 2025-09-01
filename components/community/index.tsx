/**
 * 社区展示组件
 * 展示优秀设计作品案例，提供学习对比和灵感来源
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star, Filter } from 'lucide-react';
import { useAtom } from 'jotai';
import { communityWorksAtom, selectedCategoryAtom } from '../../stores/globalState';

const categories = ['全部', 'UI设计', '网页设计', 'APP设计', '品牌设计', '海报设计'];

export const CommunityShowcase: React.FC = () => {
  const [works] = useAtom(communityWorksAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const filteredWorks = works.filter(work => 
    selectedCategory === '全部' || work.category === selectedCategory
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* 头部介绍 */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            优秀设计案例
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            探索经过AI诊断优化的精彩设计作品，学习设计技巧，获得创作灵感
          </p>
        </motion.div>
      </div>

      {/* 分类筛选 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow-sm">
          <Filter className="w-5 h-5 text-slate-400 ml-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 作品网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* 作品图片 */}
            <div className="relative overflow-hidden">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* 悬浮信息 */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white">
                  <Eye className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">查看详情</p>
                </div>
              </div>

              {/* 评分标签 */}
              <div className="absolute top-4 right-4 bg-white/95 rounded-lg px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="font-bold text-slate-800">{work.score}</span>
              </div>

              {/* 对比标签 */}
              {work.beforeImageUrl && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  优化对比
                </div>
              )}
            </div>

            {/* 作品信息 */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
                  {work.title}
                </h3>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {work.category}
                </span>
              </div>

              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {work.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 底部信息 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {work.author.charAt(0)}
                  </div>
                  <span className="text-sm text-slate-600">{work.author}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-slate-400">
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm">{work.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 加载更多 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <button className="px-8 py-3 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 rounded-xl font-medium hover:from-slate-300 hover:to-slate-400 transition-all">
          加载更多作品
        </button>
      </motion.div>
    </div>
  );
};
