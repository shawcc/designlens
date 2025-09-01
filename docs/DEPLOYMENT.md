# DesignLens 部署指南

## 环境差异说明

### aipa 环境（开发调试）
- 使用模拟AI分析
- 完整的开发工具支持
- 热重载和实时预览

### 生产环境（Vercel）
- 真实AI服务（OpenAI GPT-4 Vision）
- 环境变量配置
- CDN和全球部署

## 部署步骤

### 1. 准备工作

```bash
# 复制环境变量模板
cp .env.example .env.production

# 编辑生产环境配置
nano .env.production
