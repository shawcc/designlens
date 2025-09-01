/**
 * 模拟AI分析工具
 * 模拟真实的AI诊断分析过程，为MVP提供数据支持
 */
import { DiagnosisResult } from '../stores/globalState';

export const simulateAIAnalysis = async (file: File): Promise<DiagnosisResult> => {
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
  
  const result: DiagnosisResult = {
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
  
  return result;
};

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
