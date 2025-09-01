# 文件结构对照指南

## aipa 环境 ↔ 部署环境 文件映射

| aipa 中的路径 | 实际项目路径 | 说明 |
|--------------|-------------|------|
| `/App.tsx` | `/App.tsx` | ✅ 直接对应 |
| `/components/` | `/components/` | ✅ 直接对应 |
| `/pages/` | `/pages/` | ✅ 直接对应 |
| `/services/` | `/services/` | ✅ 直接对应 |
| `/stores/` | `/stores/` | ✅ 直接对应 |
| `/utils/` | `/utils/` | ✅ 直接对应 |
| `/config/` | `/config/` | ✅ 直接对应 |

## 关键配置文件检查清单

### ✅ 必须存在的文件
- [ ] `package.json` - 项目依赖和脚本配置
- [ ] `index.tsx` - React 应用入口
- [ ] `App.tsx` - 主应用组件
- [ ] `vite.config.ts` - 构建配置
- [ ] `vercel.json` - 部署配置
- [ ] `tailwind.config.js` - 样式配置
- [ ] `tsconfig.json` - TypeScript 配置
- [ ] `index.html` - HTML 模板

### ⚠️ 环境差异文件
- `.env.example` - 环境变量模板（aipa 中可见）
- `.env.production` - 生产环境变量（需要手动创建）
- `.gitignore` - Git 忽略规则（部署时需要）
- `README.md` - 项目说明（建议添加）

### 🚫 不应该包含的文件
- `node_modules/` - 依赖包（太大，应被忽略）
- `dist/` - 构建产物（临时文件）
- `.env` - 本地环境变量（包含敏感信息）
- `.vercel/` - Vercel 本地配置

## 构建产物说明

运行 `npm run build` 后会生成：
