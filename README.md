# DesignLens - AI设计诊断平台

🎨 基于AI的专业设计诊断和优化建议平台

## ✨ 功能特性

- 🤖 **AI智能分析** - 使用GPT-4 Vision进行专业设计诊断
- 📊 **多维度评分** - 配色、布局、字体、层次、品牌一致性全方位分析
- 📈 **可视化报告** - 直观的图表展示和详细改进建议
- 💾 **报告下载** - 支持导出完整的诊断报告
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 👥 **用户系统** - 个人中心、诊断历史、Pro会员功能

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **状态管理**: Jotai
- **动画库**: Framer Motion
- **图表库**: Recharts
- **AI服务**: OpenAI GPT-4 Vision API
- **部署平台**: Vercel

## 📦 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 环境配置

复制环境变量文件：

\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local` 并添加你的 OpenAI API 密钥：

\`\`\`env
NEXT_PUBLIC_AI_PROVIDER=openai
NEXT_PUBLIC_OPENAI_API_KEY=你的API密钥
\`\`\`

### 开发运行

\`\`\`bash
npm run dev
\`\`\`

项目将在 `http://localhost:3000` 启动

### 构建部署

\`\`\`bash
npm run build
\`\`\`

## 🌐 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 自动部署完成

## 📁 项目结构

\`\`\`
├── components/          # React组件
│   ├── layout/         # 布局组件
│   ├── diagnosis/      # 诊断相关组件
│   └── user/          # 用户系统组件
├── pages/              # 页面组件
├── services/           # 服务层（AI服务等）
├── stores/            # 状态管理
├── utils/             # 工具函数
└── config/            # 配置文件
\`\`\`

## 🔧 环境变量说明

| 变量名 | 说明 | 必填 |
|--------|------|------|
| \`NEXT_PUBLIC_AI_PROVIDER\` | AI服务提供商 | ✅ |
| \`NEXT_PUBLIC_OPENAI_API_KEY\` | OpenAI API密钥 | ✅ |
| \`NEXT_PUBLIC_BASE_URL\` | 网站基础URL | ✅ |

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过 GitHub Issues 联系我们。
