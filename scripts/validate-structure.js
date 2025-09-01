/**
 * 项目结构验证脚本
 * 确保 aipa 环境和实际部署环境的一致性
 */

import fs from 'fs';
import path from 'path';

// 必需的文件列表
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.js',
  'index.html',
  'index.tsx',
  'App.tsx',
  'vercel.json'
];

// 必需的目录列表
const requiredDirs = [
  'components',
  'pages', 
  'services',
  'stores',
  'utils',
  'config'
];

// 检查文件是否存在
const checkFiles = () => {
  console.log('🔍 检查必需文件...');
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.error('❌ 缺少必需文件:', missingFiles);
    return false;
  }
  
  console.log('✅ 所有必需文件都存在');
  return true;
};

// 检查目录结构
const checkDirectories = () => {
  console.log('🔍 检查目录结构...');
  const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));
  
  if (missingDirs.length > 0) {
    console.error('❌ 缺少必需目录:', missingDirs);
    return false;
  }
  
  console.log('✅ 目录结构完整');
  return true;
};

// 检查关键组件文件
const checkComponents = () => {
  console.log('🔍 检查关键组件...');
  
  const criticalComponents = [
    'components/layout/Header.tsx',
    'components/layout/Footer.tsx', 
    'components/diagnosis/DiagnosisReport.tsx',
    'pages/HomePage.tsx',
    'services/aiService.ts',
    'stores/globalState.ts'
  ];
  
  const missingComponents = criticalComponents.filter(comp => !fs.existsSync(comp));
  
  if (missingComponents.length > 0) {
    console.error('❌ 缺少关键组件:', missingComponents);
    return false;
  }
  
  console.log('✅ 关键组件检查通过');
  return true;
};

// 检查 package.json 配置
const checkPackageJson = () => {
  console.log('🔍 检查 package.json 配置...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // 检查必需的脚本
    const requiredScripts = ['dev', 'build', 'preview'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      console.error('❌ 缺少必需脚本:', missingScripts);
      return false;
    }
    
    // 检查关键依赖
    const requiredDeps = ['react', 'react-dom', 'jotai', 'framer-motion'];
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    
    if (missingDeps.length > 0) {
      console.error('❌ 缺少关键依赖:', missingDeps);
      return false;
    }
    
    console.log('✅ package.json 配置正确');
    return true;
  } catch (error) {
    console.error('❌ package.json 解析失败:', error.message);
    return false;
  }
};

// 检查 src 目录冲突
const checkSrcConflict = () => {
  console.log('🔍 检查 src 目录冲突...');
  
  if (fs.existsSync('src')) {
    console.warn('⚠️  发现 src 目录，可能存在文件结构冲突');
    
    // 检查 src 目录内容
    const srcFiles = fs.readdirSync('src');
    console.log('📁 src 目录包含:', srcFiles);
    
    // 检查重复文件
    const duplicateFiles = srcFiles.filter(file => fs.existsSync(file));
    if (duplicateFiles.length > 0) {
      console.warn('⚠️  发现重复文件:', duplicateFiles);
      console.log('💡 建议：将 src/ 中的文件移动到根目录并覆盖重复文件');
      return false;
    }
  }
  
  console.log('✅ 无 src 目录冲突');
  return true;
};

// 检查环境配置
const checkEnvironment = () => {
  console.log('🔍 检查环境配置...');
  
  // 检查环境变量示例文件
  if (!fs.existsSync('.env.example')) {
    console.warn('⚠️  建议创建 .env.example 文件');
  }
  
  // 检查 TypeScript 配置
  if (!fs.existsSync('tsconfig.json')) {
    console.error('❌ 缺少 tsconfig.json 配置文件');
    return false;
  }
  
  console.log('✅ 环境配置检查通过');
  return true;
};

// 生成缺失文件的建议
const generateMissingSuggestions = () => {
  console.log('\n📋 修复建议：\n');
  
  // 检查是否需要处理 src 目录
  if (fs.existsSync('src')) {
    console.log('🔄 处理 src 目录冲突：');
    console.log('   # 将 src 中的文件移动到根目录');
    console.log('   mv src/* ./');
    console.log('   # 删除空的 src 目录');
    console.log('   rmdir src');
    console.log('');
  }
  
  console.log('1. 创建缺失的目录：');
  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`   mkdir -p ${dir}`);
    }
  });
  
  console.log('\n2. 运行 npm install 安装依赖');
  console.log('3. 运行 npm run build 测试构建');
  console.log('4. 重新运行验证脚本确认修复');
};

// 主验证函数
const validate = () => {
  console.log('🚀 开始项目结构验证...\n');
  
  const results = [
    checkFiles(),
    checkDirectories(),
    checkSrcConflict(),
    checkComponents(),
    checkPackageJson(),
    checkEnvironment()
  ];
  
  const allPassed = results.every(result => result === true);
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 项目结构验证通过！');
    console.log('\n📋 下一步操作：');
    console.log('1. 创建 .env.production 文件并配置 OpenAI API Key');
    console.log('2. 运行 npm install 安装依赖');
    console.log('3. 运行 npm run build 测试构建');
    console.log('4. 推送代码到 GitHub');
    console.log('5. 在 Vercel 部署');
    console.log('\n✨ 准备就绪，可以开始部署了！');
  } else {
    console.log('❌ 验证失败，发现问题需要修复');
    generateMissingSuggestions();
    console.log('\n🔧 修复问题后，请重新运行验证脚本');
    process.exit(1);
  }
};

// 运行验证
validate();