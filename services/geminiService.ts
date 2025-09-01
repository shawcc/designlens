/**
 * Google Gemini Pro Vision AI 服务
 * 免费额度大，性价比极高的替代方案
 */
import { DiagnosisResult } from '../stores/globalState';
import { AIAnalysisService } from './aiService';

export class GeminiService implements AIAnalysisService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent') {
    this.apiKey = apiKey;
    this.apiUrl = `${apiUrl}?key=${apiKey}`;
  }

  async analyze(file: File): Promise<DiagnosisResult> {
    try {
      const base64Image = await this.fileToBase64(file);
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
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
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API 错误: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      const analysisResult = JSON.parse(content);

      return {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(file),
        fileName: file.name,
        overallScore: analysisResult.overallScore,
        timestamp: Date.now(),
        dimensions: analysisResult.dimensions
      };

    } catch (error) {
      console.error('Gemini 分析失败:', error);
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
