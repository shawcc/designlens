/**
 * AI 服务抽象层
 * 统一AI分析接口，支持多种实现方式（模拟、真实API、本地模型等）
 */
import { DiagnosisResult } from '../stores/globalState';
import { GeminiService } from './geminiService';

export interface AIAnalysisConfig {
  provider: 'mock' | 'openai' | 'claude' | 'gemini' | 'local';
  apiKey?: string;
  apiUrl?: string;
  modelName?: string;
}

export interface AIAnalysisService {
  analyze(file: File, config?: AIAnalysisConfig): Promise<DiagnosisResult>;
}

// 模拟AI分析实现（开发/演示环境使用）
class MockAIService implements AIAnalysisService {
  async analyze(file: File): Promise<DiagnosisResult> {
    // 模拟分析延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const imageUrl = URL.createObjectURL(file);
    
    // 生成模拟的分析结果
    const colorScore = Math.floor(Math.random() * 30) + 65;
    const layoutScore = Math.floor(Math.random() * 25) + 70;
    const typographyScore = Math.floor(Math.random() * 35) + 60;
    const hierarchyScore = Math.floor(Math.random() * 30) + 65;
    const brandingScore = Math.floor(Math.random() * 25) + 70;
    
    const overallScore = Math.round((colorScore + layoutScore + typographyScore + hierarchyScore + brandingScore) / 5);
    
    return {
      id: Date.now().toString(),
      imageUrl,
      fileName: file.name,
      overallScore,
      timestamp: Date.now(),
      dimensions: {
        color: {
          score: colorScore,
          issues: colorScore < 70 ? [
            '主色调对比度不足，影响可读性',
            '配色方案缺乏层次感',
            '品牌色使用不一致'
          ] : colorScore < 85 ? [
            '部分颜色搭配略显突兀',
            '可以考虑增加辅助色'
          ] : [],
          suggestions: [
            '建议使用4:5:1的配色比例',
            '确保文字与背景对比度达到WCAG AA标准',
            '考虑使用品牌色的不同饱和度变化'
          ]
        },
        layout: {
          score: layoutScore,
          issues: layoutScore < 70 ? [
            '元素排列缺乏网格系统',
            '页面留白不足，显得拥挤',
            '重要信息没有突出显示'
          ] : layoutScore < 85 ? [
            '部分区域间距不够统一',
            '视觉重心略有偏移'
          ] : [],
          suggestions: [
            '采用12列网格系统进行布局',
            '增加元素间距，提升透气感',
            '运用黄金比例优化版面构图'
          ]
        },
        typography: {
          score: typographyScore,
          issues: typographyScore < 70 ? [
            '字体层次不够清晰',
            '行间距设置不当',
            '字体大小缺乏规律'
          ] : typographyScore < 85 ? [
            '标题字重可以更加突出',
            '正文字体可读性有待提升'
          ] : [],
          suggestions: [
            '建立清晰的字体层级系统',
            '正文行高建议设置为1.5-1.6倍',
            '标题与正文保持3:2的黄金比例'
          ]
        },
        hierarchy: {
          score: hierarchyScore,
          issues: hierarchyScore < 70 ? [
            '信息层次结构混乱',
            '用户视线流引导不清',
            '重要操作按钮不够突出'
          ] : hierarchyScore < 85 ? [
            '次要信息略显突兀',
            '可以进一步优化信息优先级'
          ] : [],
          suggestions: [
            '运用大小、颜色、位置建立清晰层次',
            '重要信息放在用户视线黄金区域',
            '使用对比度突出关键操作'
          ]
        },
        branding: {
          score: brandingScore,
          issues: brandingScore < 70 ? [
            '品牌识别元素不够突出',
            '整体风格缺乏一致性',
            '品牌调性传达不清'
          ] : brandingScore < 85 ? [
            '品牌元素可以更加统一',
            '风格表达可以更加鲜明'
          ] : [],
          suggestions: [
            '统一品牌色彩和字体使用',
            '增强品牌标识的视觉权重',
            '保持设计风格的一致性'
          ]
        }
      }
    };
  }
}

// OpenAI GPT-4 Vision 实现（生产环境使用）
class OpenAIService implements AIAnalysisService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl = 'https://api.openai.com/v1/chat/completions') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async analyze(file: File): Promise<DiagnosisResult> {
    try {
      // 将文件转换为 base64
      const base64Image = await this.fileToBase64(file);
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `请作为专业的设计师，对这张设计图进行全面的设计诊断分析。

请从以下5个维度进行评分（0-100分）并提供具体的问题识别和改进建议：

1. 配色方案 (color) - 色彩搭配、对比度、品牌一致性
2. 排版布局 (layout) - 空间利用、网格系统、视觉平衡  
3. 字体选择 (typography) - 字体层级、可读性、字重搭配
4. 视觉层次 (hierarchy) - 信息优先级、用户视线引导
5. 品牌一致性 (branding) - 品牌识别、风格统一

请以JSON格式返回结果，格式如下：
{
  "overallScore": 85,
  "dimensions": {
    "color": {
      "score": 80,
      "issues": ["具体问题1", "具体问题2"],
      "suggestions": ["改进建议1", "改进建议2"]
    },
    "layout": { ... },
    "typography": { ... },
    "hierarchy": { ... },
    "branding": { ... }
  }
}`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API 错误: ${response.status}`);
      }

      const data = await response.json();
      const analysisResult = JSON.parse(data.choices[0].message.content);

      // 转换为标准格式
      return {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(file),
        fileName: file.name,
        overallScore: analysisResult.overallScore,
        timestamp: Date.now(),
        dimensions: analysisResult.dimensions
      };

    } catch (error) {
      console.error('AI 分析失败:', error);
      throw new Error('AI 分析服务暂时不可用，请稍后重试');
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // 移除 data:image/...;base64, 前缀
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

// Claude Vision 实现（备选方案）
class ClaudeService implements AIAnalysisService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl = 'https://api.anthropic.com/v1/messages') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async analyze(file: File): Promise<DiagnosisResult> {
    try {
      const base64Image = await this.fileToBase64(file);
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: 'image/jpeg',
                    data: base64Image
                  }
                },
                {
                  type: 'text',
                  text: '请作为专业设计师对这张图进行设计诊断分析...' // 同样的 prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API 错误: ${response.status}`);
      }

      const data = await response.json();
      const analysisResult = JSON.parse(data.content[0].text);

      return {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(file),
        fileName: file.name,
        overallScore: analysisResult.overallScore,
        timestamp: Date.now(),
        dimensions: analysisResult.dimensions
      };

    } catch (error) {
      console.error('Claude 分析失败:', error);
      throw new Error('AI 分析服务暂时不可用，请稍后重试');
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

// AI 服务工厂
export class AIServiceFactory {
  private static instance: AIAnalysisService | null = null;

  static createService(config: AIAnalysisConfig): AIAnalysisService {
    switch (config.provider) {
      case 'openai':
        if (!config.apiKey) {
          throw new Error('OpenAI API Key 必须提供');
        }
        return new OpenAIService(config.apiKey, config.apiUrl);
      
      case 'claude':
        if (!config.apiKey) {
          throw new Error('Claude API Key 必须提供');
        }
        return new ClaudeService(config.apiKey, config.apiUrl);
      
      case 'gemini':
        if (!config.apiKey) {
          throw new Error('Gemini API Key 必须提供');
        }
        return new GeminiService(config.apiKey, config.apiUrl);
      
      case 'mock':
      default:
        return new MockAIService();
    }
  }

  static getInstance(config?: AIAnalysisConfig): AIAnalysisService {
    if (!this.instance) {
      const defaultConfig: AIAnalysisConfig = {
        provider: this.getProviderFromEnv(),
        apiKey: this.getApiKeyFromEnv(),
        apiUrl: this.getApiUrlFromEnv()
      };
      this.instance = this.createService(config || defaultConfig);
    }
    return this.instance;
  }

  private static getProviderFromEnv(): 'mock' | 'openai' | 'claude' | 'gemini' | 'local' {
    if (typeof window === 'undefined') return 'mock';
    
    const provider = process.env.NEXT_PUBLIC_AI_PROVIDER || 'mock';
    return provider as 'mock' | 'openai' | 'claude' | 'gemini' | 'local';
  }

  private static getApiKeyFromEnv(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    const provider = this.getProviderFromEnv();
    switch (provider) {
      case 'openai':
        return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      case 'claude':
        return process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
      case 'gemini':
        return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      default:
        return undefined;
    }
  }

  private static getApiUrlFromEnv(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    return process.env.NEXT_PUBLIC_AI_API_URL;
  }
}

// 辅助函数
export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const getScoreLevel = (score: number): string => {
  if (score >= 90) return '优秀';
  if (score >= 80) return '良好';
  if (score >= 70) return '中等';
  if (score >= 60) return '待改进';
  return '需要重构';
};