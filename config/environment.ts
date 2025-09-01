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
          const geminiKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GEMINI_API_KEY : undefined;
          if (geminiKey) {
            apiKeyStatus = '已设置';
            apiKeyLength = geminiKey.length;
          }
          break;
        case 'openai':
          const openaiKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_OPENAI_API_KEY : undefined;
          if (openaiKey) {
            apiKeyStatus = '已设置';
            apiKeyLength = openaiKey.length;
          }
          break;
        case 'claude':
          const claudeKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CLAUDE_API_KEY : undefined;
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