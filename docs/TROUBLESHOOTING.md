# 文件结构问题排查指南

## 常见问题

### 1. 导入路径错误
**问题**: `Cannot resolve module './components/xxx'`
**原因**: aipa 中的相对路径和实际项目结构不匹配
**解决**: 
- 检查 `tsconfig.json` 中的 `paths` 配置
- 确保所有导入使用相对路径或配置的别名

### 2. 文件找不到
**问题**: `Module not found: Can't resolve './pages/HomePage'`
**原因**: 文件路径大小写或扩展名问题
**解决**: 
- 确保文件名大小写完全匹配
- 明确指定 `.tsx` 扩展名

### 3. 构建失败
**问题**: `Build failed with errors`
**原因**: 配置文件缺失或配置错误
**解决**: 
- 检查 `vite.config.ts` 配置
- 确保所有依赖都在 `package.json` 中

### 4. 部署后白屏
**问题**: 部署成功但页面空白
**原因**: 路由配置或环境变量问题
**解决**: 
- 检查 `vercel.json` 中的 rewrites 配置
- 确保环境变量正确设置

## 检查脚本

可以使用以下命令检查项目完整性：

```bash
# 检查文件结构
find . -name "*.tsx" -o -name "*.ts" | head -20

# 检查依赖
npm ls --depth=0

# 测试构建
npm run build

# 本地预览
npm run preview
