// 类型定义
export interface AIAnalysisConfig {
  provider: 'gemini' | 'openai' | 'claude' | 'mock';
  apiKey?: string;
  apiUrl?: string;
}

export interface EnvironmentConfig {
  ai: AIAnalysisConfig;
}

// 环境检测函数
export const getCurrentEnvironment = (): 'development' | 'staging' | 'production' => {
  if (typeof window === 'undefined') return 'production';
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  if (hostname.includes('staging') || hostname.includes('preview')) {
    return 'staging';
  }
  
  return 'production';
};

// API Key 获取函数
export const getApiKeyByProvider = (provider: string): string | undefined => {
  if (typeof process === 'undefined') return undefined;
  
  switch (provider) {
    case 'gemini':
      return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    case 'openai':
      return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    case 'claude':
      return process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
    default:
      return undefined;
  }
};

// 环境配置定义
const environmentConfigs: Record<string, EnvironmentConfig> = {
  development: {
    ai: {
      provider: 'gemini',
      apiKey: getApiKeyByProvider('gemini') || 'AIzaSyBUhAnULWmXJQWprJilZiXdgclJf4xG9Og',
    }
  },
  staging: {
    ai: {
      provider: 'gemini',
      apiKey: getApiKeyByProvider('gemini') || 'AIzaSyBUhAnULWmXJQWprJilZiXdgclJf4xG9Og',
    }
  },
  production: {
    ai: {
      provider: 'gemini',
      apiKey: getApiKeyByProvider('gemini') || 'AIzaSyBUhAnULWmXJQWprJilZiXdgclJf4xG9Og',
    }
  }
};

// 主要配置获取函数
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = getCurrentEnvironment();
  const config = environmentConfigs[env];
  
  // 浏览器安全的API key检查
  const checkApiKeyStatus = () => {
    const provider = config.ai.provider;
    let apiKeyStatus = '未检测到';
    let apiKeyLength = 0;
    
    try {
      switch (provider) {
        case 'gemini':
          const geminiKey = getApiKeyByProvider('gemini');
          if (geminiKey) {
            apiKeyStatus = '已设置';
            apiKeyLength = geminiKey.length;
          }
          break;
        case 'openai':
          const openaiKey = getApiKeyByProvider('openai');
          if (openaiKey) {
            apiKeyStatus = '已设置';
            apiKeyLength = openaiKey.length;
          }
          break;
        case 'claude':
          const claudeKey = getApiKeyByProvider('claude');
          if (claudeKey) {
            apiKeyStatus = '已设置';
            apiKeyLength = claudeKey.length;
          }
          break;
      }
    } catch (error) {
      apiKeyStatus = '检查失败';
    }
    
    return { status: apiKeyStatus, length: apiKeyLength };
  };

  const apiKeyInfo = checkApiKeyStatus();
  
  // 添加浏览器友好的调试信息
  const debugInfo = {
    currentEnv: env,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'SSR',
    aiProvider: config.ai.provider,
    hasApiKey: !!config.ai.apiKey,
    apiKeyInfo: apiKeyInfo,
    configApiKey: config.ai.apiKey ? {
      length: config.ai.apiKey.length,
      preview: config.ai.apiKey.substring(0, 8) + '...'
    } : null,
    // 安全地显示环境变量状态
    envVars: {
      AI_PROVIDER: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_AI_PROVIDER : 'process不可用',
      GEMINI_KEY: apiKeyInfo.status,
      GEMINI_KEY_LENGTH: apiKeyInfo.length
    },
    isClientSide: typeof window !== 'undefined',
    buildTime: typeof process !== 'undefined' ? 'server' : 'client'
  };
  
  console.log('🌍 环境配置调试:', debugInfo);
  
  // 将调试信息暴露到全局，方便浏览器调试
  if (typeof window !== 'undefined') {
    (window as any).designLensDebug = {
      ...(window as any).designLensDebug, // 保留已有的调试工具
      environmentConfig: debugInfo,
      config: config,
      checkApiKey: () => {
        console.log('=== API Key 状态检查 ===');
        console.log('Provider:', config.ai.provider);
        console.log('Has API Key:', !!config.ai.apiKey);
        console.log('API Key length:', config.ai.apiKey?.length || 0);
        console.log('API Key preview:', config.ai.apiKey ? config.ai.apiKey.substring(0, 8) + '...' : 'null');
        console.log('Environment:', debugInfo);
        return {
          hasKey: !!config.ai.apiKey,
          keyLength: config.ai.apiKey?.length || 0,
          provider: config.ai.provider
        };
      },
      testEnvironment: () => {
        console.log('=== 环境测试 ===');
        console.log('当前环境:', debugInfo.currentEnv);
        console.log('客户端环境:', debugInfo.isClientSide);
        console.log('域名:', debugInfo.hostname);
        console.log('配置完整性:', !!config.ai.provider && !!config.ai.apiKey);
        return debugInfo;
      }
    };
    
    console.log('✅ 调试工具已加载到 window.designLensDebug');
    console.log('💡 使用 window.designLensDebug.checkApiKey() 检查API配置');
    console.log('💡 使用 window.designLensDebug.testEnvironment() 测试环境');
  }
  
  return config;
};

// 手动初始化调试工具的函数
export const initializeDebugTools = () => {
  if (typeof window === 'undefined') return;
  
  console.log('🛠️  正在初始化调试工具...');
  
  // 创建基础调试工具，即使环境配置还没加载
  (window as any).designLensDebug = {
    initialized: false,
    manualInit: true,
    timestamp: new Date().toISOString(),
    
    // 基础环境检查
    checkEnvironment: () => {
      console.log('=== 手动环境检查 ===');
      console.log('当前域名:', window.location.hostname);
      console.log('当前URL:', window.location.href);
      console.log('User Agent:', navigator.userAgent);
      console.log('时间戳:', new Date().toISOString());
      
      // 检查process对象
      const hasProcess = typeof process !== 'undefined';
      console.log('Process对象:', hasProcess ? '可用' : '不可用');
      
      if (hasProcess) {
        console.log('环境变量检查:');
        console.log('- AI_PROVIDER:', process.env.NEXT_PUBLIC_AI_PROVIDER || '未设置');
        console.log('- GEMINI_KEY:', process.env.NEXT_PUBLIC_GEMINI_API_KEY ? '已设置' : '未设置');
      }
      
      return {
        hostname: window.location.hostname,
        hasProcess,
        timestamp: new Date().toISOString()
      };
    },
    
    // 检查页面加载状态
    checkPageStatus: () => {
      console.log('=== 页面状态检查 ===');
      
      // 检查React组件
      const reactElements = document.querySelectorAll('[data-reactroot], [data-react-helmet]');
      console.log('React元素数量:', reactElements.length);
      
      // 检查应用状态
      const uploadArea = document.querySelector('[class*="upload"], [data-testid*="upload"]');
      console.log('上传组件:', uploadArea ? '已加载' : '未找到');
      
      const buttons = document.querySelectorAll('button');
      console.log('按钮数量:', buttons.length);
      
      // 检查错误信息
      const errorElements = document.querySelectorAll('[class*="error"], .error');
      console.log('错误元素:', errorElements.length);
      
      if (errorElements.length > 0) {
        errorElements.forEach((el, index) => {
          console.log(`错误 ${index + 1}:`, el.textContent);
        });
      }
      
      return {
        reactElements: reactElements.length,
        hasUploadArea: !!uploadArea,
        buttonCount: buttons.length,
        errorCount: errorElements.length
      };
    },
    
    // 强制重新初始化
    forceReinit: () => {
      console.log('🔄 强制重新初始化...');
      try {
        const env = getCurrentEnvironment();
        console.log('✅ 环境检测:', env);
        
        // 创建临时配置
        const tempConfig = {
          ai: {
            provider: 'gemini' as const,
            apiKey: 'AIzaSyBUhAnULWmXJQWprJilZiXdgclJf4xG9Og'
          }
        };
        
        console.log('✅ 临时配置创建成功');
        
        // 更新调试工具
        (window as any).designLensDebug.initialized = true;
        (window as any).designLensDebug.config = tempConfig;
        
        return { success: true, config: tempConfig };
      } catch (error) {
        console.error('❌ 重新初始化失败:', error);
        return { success: false, error };
      }
    },
    
    // 测试环境（兼容之前的方法名）
    testEnvironment: () => {
      console.log('🧪 测试环境功能已手动创建');
      return (window as any).designLensDebug.checkEnvironment();
    }
  };
  
  console.log('🛠️  手动调试工具已创建');
  console.log('💡 使用 window.designLensDebug.checkEnvironment() 检查环境');
  console.log('💡 使用 window.designLensDebug.checkPageStatus() 检查页面状态');
  console.log('💡 使用 window.designLensDebug.forceReinit() 强制重新初始化');
};