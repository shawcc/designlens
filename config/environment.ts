/**
 * 环境配置管理
 * 处理不同环境下的配置差异
 */

export interface EnvironmentConfig {
  ai: {
    provider: 'mock' | 'openai' | 'claude' | 'local';
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

// 环境配置
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
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
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
      provider: 'claude',
      apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
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