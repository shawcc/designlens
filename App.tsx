import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CommunityPage } from './pages/CommunityPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { initializeDebugTools, getEnvironmentConfig } from './config/environment';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // 在应用启动时初始化调试工具
  useEffect(() => {
    console.log('🚀 App组件已挂载，初始化调试工具...');
    
    // 立即初始化调试工具
    initializeDebugTools();
    
    // 使用静态导入加载环境配置
    setTimeout(() => {
      try {
        console.log('📦 正在获取环境配置...');
        const config = getEnvironmentConfig();
        console.log('✅ 环境配置获取成功');
        
        // 更新调试工具
        if ((window as any).designLensDebug) {
          (window as any).designLensDebug.fullConfig = config;
          (window as any).designLensDebug.configLoaded = true;
          console.log('🎯 调试工具已更新完整配置');
        }
      } catch (error) {
        console.error('❌ 环境配置获取失败:', error);
        
        // 提供备用配置
        if ((window as any).designLensDebug) {
          (window as any).designLensDebug.configError = error;
          (window as any).designLensDebug.fallbackMode = true;
          console.log('🔄 已启用备用模式');
        }
      }
    }, 500);
    
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'community':
        return <CommunityPage />;
      case 'knowledge':
        return <KnowledgePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#F9FAFB',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />
      
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;