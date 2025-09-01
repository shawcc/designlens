/**
 * 环境配置管理
 * 处理不同环境下的配置差异
 */

export interface EnvironmentConfig {
  ai: {
    provider: 'mock' | 'openai' | 'claude' | 'gemini' | 'local';
    apiKey?: string;
    apiUrl?: string;
  };
  features: {
    enableRealAI: boolean;
    enableAnalytics: boolean;
    enableUserSystem: boolean;
  };
  deployment: {
    environment: 'development' | 'staging' | 'production';
    baseUrl: string;
  };
}

// 检测当前环境
const getCurrentEnvironment = (): 'development' | 'staging' | 'production' => {
  if (typeof window === 'undefined') return 'production'; // SSR
  
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  if (hostname.includes('staging') || hostname.includes('preview')) {
    return 'staging';
  }
  return 'production';
};

// 根据AI提供商获取对应的API Key（移到前面定义）
const getApiKeyByProvider = (provider: string): string | undefined => {
  switch (provider) {
    case 'gemini':
      return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    case 'claude':
      return process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
    case 'openai':
      return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    default:
      return undefined;
  }
};

// 环境配置 - 修复版本
const environmentConfigs: Record<string, EnvironmentConfig> = {
  development: {
    ai: {
      provider: 'mock',
      apiKey: undefined,
      apiUrl: undefined
    },
    features: {
      enableRealAI: false,
      enableAnalytics: false,
      enableUserSystem: true
    },
    deployment: {
      environment: 'development',
      baseUrl: 'http://localhost:3000'
    }
  },
  staging: {
    ai: {
      provider: process.env.NEXT_PUBLIC_AI_PROVIDER as any || 'openai',
      apiKey: getApiKeyByProvider(process.env.NEXT_PUBLIC_AI_PROVIDER || 'openai'),
      apiUrl: process.env.NEXT_PUBLIC_AI_API_URL
    },
    features: {
      enableRealAI: true,
      enableAnalytics: true,
      enableUserSystem: true
    },
    deployment: {
      environment: 'staging',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.designlens.app'
    }
  },
  production: {
    ai: {
      provider: process.env.NEXT_PUBLIC_AI_PROVIDER as any || 'gemini',
      apiKey: getApiKeyByProvider(process.env.NEXT_PUBLIC_AI_PROVIDER || 'gemini'),
      apiUrl: process.env.NEXT_PUBLIC_AI_API_URL
    },
    features: {
      enableRealAI: true,
      enableAnalytics: true,
      enableUserSystem: true
    },
    deployment: {
      environment: 'production',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://designlens.app'
    }
  }
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = getCurrentEnvironment();
  return environmentConfigs[env];
};

export const isProduction = () => getCurrentEnvironment() === 'production';
export const isDevelopment = () => getCurrentEnvironment() === 'development';
export const isStaging = () => getCurrentEnvironment() === 'staging';

// 添加一个注释来触发 Git 检测 - 修复时间戳
// Last modified: 2024-现在
