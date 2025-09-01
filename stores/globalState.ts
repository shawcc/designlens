/**
 * 全局状态管理
 * 管理用户状态、诊断结果、作品展示等全局数据
 */
import { atom } from 'jotai';

// 用户状态
export const userAtom = atom({
  id: null as string | null,
  name: '访客用户',
  isPro: false,
  remainingDiagnoses: 3
});

// 诊断结果状态
export interface DiagnosisResult {
  id: string;
  imageUrl: string;
  fileName: string;
  overallScore: number;
  timestamp: number;
  dimensions: {
    color: { score: number; issues: string[]; suggestions: string[] };
    layout: { score: number; issues: string[]; suggestions: string[] };
    typography: { score: number; issues: string[]; suggestions: string[] };
    hierarchy: { score: number; issues: string[]; suggestions: string[] };
    branding: { score: number; issues: string[]; suggestions: string[] };
  };
}

export const diagnosisResultsAtom = atom<DiagnosisResult[]>([]);
export const currentDiagnosisAtom = atom<DiagnosisResult | null>(null);

// 社区作品状态
export interface CommunityWork {
  id: string;
  title: string;
  imageUrl: string;
  beforeImageUrl?: string;
  author: string;
  score: number;
  likes: number;
  category: string;
  description: string;
  tags: string[];
}

export const communityWorksAtom = atom<CommunityWork[]>([
  {
    id: '1',
    title: '电商产品页面设计',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    beforeImageUrl: 'https://picsum.photos/400/300?random=11',
    author: '设计师小王',
    score: 92,
    likes: 248,
    category: 'UI设计',
    description: '通过改进配色方案和排版层次，大幅提升了用户体验',
    tags: ['电商', '响应式', '用户体验']
  },
  {
    id: '2',
    title: '品牌官网首页',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    beforeImageUrl: 'https://picsum.photos/400/300?random=12',
    author: '独立开发者',
    score: 88,
    likes: 156,
    category: '网页设计',
    description: '运用对比色和网格系统，打造专业品牌形象',
    tags: ['品牌', '官网', '专业']
  },
  {
    id: '3',
    title: '移动端APP界面',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    author: 'UI新手',
    score: 85,
    likes: 89,
    category: 'APP设计',
    description: '简洁明了的界面设计，注重用户操作流畅性',
    tags: ['移动端', '简约', '易用性']
  }
]);

// 当前选中的分类
export const selectedCategoryAtom = atom<string>('全部');

// 上传状态
export const uploadStatusAtom = atom<'idle' | 'uploading' | 'analyzing' | 'completed' | 'error'>('idle');
