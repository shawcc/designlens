/**
 * 智能AI服务切换
 * 根据预算和需求自动选择最合适的AI模型
 */
import { AIServiceFactory, AIAnalysisConfig } from './aiService';
import { DiagnosisResult } from '../stores/globalState';

export class SmartAIService {
  private configs: AIAnalysisConfig[];
  private currentIndex = 0;

  constructor() {
    // 按性价比排序的AI配置
    this.configs = [
      {
        provider: 'gemini',
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
      },
      {
        provider: 'claude',
        apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY
      },
      {
        provider: 'openai',
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
      }
    ].filter(config => config.apiKey); // 只使用已配置的服务
  }

  async analyze(file: File): Promise<DiagnosisResult> {
    for (let i = 0; i < this.configs.length; i++) {
      try {
        const config = this.configs[this.currentIndex];
        const service = AIServiceFactory.createService(config);
        
        console.log(`尝试使用 ${config.provider} 进行分析...`);
        const result = await service.analyze(file);
        
        console.log(`${config.provider} 分析成功！`);
        return result;
        
      } catch (error) {
        console.warn(`${this.configs[this.currentIndex].provider} 分析失败:`, error);
        
        // 切换到下一个服务
        this.currentIndex = (this.currentIndex + 1) % this.configs.length;
        
        // 如果所有服务都尝试过了，抛出错误
        if (i === this.configs.length - 1) {
          throw new Error('所有AI服务都不可用，请稍后重试');
        }
      }
    }
    
    throw new Error('无可用的AI服务');
  }
}
