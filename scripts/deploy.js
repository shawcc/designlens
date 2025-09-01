/**
 * 部署脚本
 * 处理从 aipa 环境到生产环境的一键同步
 */

import fs from 'fs';
import path from 'path';

// 部署配置检查
const checkDeploymentReadiness = () => {
  const requiredFiles = [
    '.env.production',
    'vercel.json',
    'package.json'
  ];

  console.log('🔍 检查部署就绪状态...');
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.error('❌ 缺少必要文件:', missingFiles);
    return false;
  }

  // 检查环境变量
  const envContent = fs.readFileSync('.env.production', 'utf8');
  const requiredEnvVars = [
    'NEXT_PUBLIC_AI_PROVIDER'
  ];

  // 根据AI提供商检查对应的API Key
  if (envContent.includes('NEXT_PUBLIC_AI_PROVIDER=gemini')) {
    requiredEnvVars.push('NEXT_PUBLIC_GEMINI_API_KEY');
  } else if (envContent.includes('NEXT_PUBLIC_AI_PROVIDER=openai')) {
    requiredEnvVars.push('NEXT_PUBLIC_OPENAI_API_KEY');
  } else if (envContent.includes('NEXT_PUBLIC_AI_PROVIDER=claude')) {
    requiredEnvVars.push('NEXT_PUBLIC_CLAUDE_API_KEY');
  }

  const missingEnvVars = requiredEnvVars.filter(envVar => 
    !envContent.includes(envVar)
  );

  if (missingEnvVars.length > 0) {
    console.error('❌ 缺少必要环境变量:', missingEnvVars);
    return false;
  }

  console.log('✅ 部署检查通过');
  return true;
};

// 生成 Vercel 配置
const generateVercelConfig = () => {
  const vercelConfig = {
    "name": "designlens",
    "version": 2,
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "installCommand": "npm install",
    "framework": null,
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  };

  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  console.log('✅ Vercel 配置已生成');
};

// 主部署函数
const deploy = () => {
  console.log('🚀 开始部署流程...');
  
  if (!checkDeploymentReadiness()) {
    process.exit(1);
  }
  
  generateVercelConfig();
  
  console.log('📋 部署清单:');
  console.log('1. 确保在 Vercel 控制台中设置了正确的环境变量');
  console.log('2. 将代码推送到 GitHub 仓库');
  console.log('3. 在 Vercel 中连接 GitHub 仓库');
  console.log('4. 配置域名和SSL证书');
  console.log('');
  console.log('💡 环境变量配置建议:');
  console.log('- NEXT_PUBLIC_AI_PROVIDER=gemini (推荐)');
  console.log('- NEXT_PUBLIC_GEMINI_API_KEY=你的Gemini API密钥');
  console.log('- NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app');
  console.log('');
  console.log('🎉 部署准备完成！');
};

// 运行部署
deploy();