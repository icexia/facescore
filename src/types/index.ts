// 评分维度
export interface ScoreDimension {
  name: string
  score: number
  description: string
  details?: {
    label: string
    score: number
  }[]
}

// 眼睛特征
export interface EyeFeatures {
  size: number          // 眼睛大小评分 (0-100)
  spacing: number       // 眼距评分 (0-100)
  symmetry: number      // 对称性评分 (0-100)
  type: '单眼皮' | '双眼皮' | '内双' | '标准'
  widthRatio: number    // 眼宽与脸宽之比
  heightRatio: number   // 眼高与眼宽之比
}

// 眉毛特征
export interface BrowFeatures {
  shape: '平眉' | '弓形眉' | '上扬眉' | '下垂眉' | '粗平眉'
  spacing: number       // 眉间距评分 (0-100)
  thickness: number     // 眉毛浓密度评分 (0-100)
  symmetry: number      // 对称性评分 (0-100)
}

// 鼻子特征
export interface NoseFeatures {
  bridgeHeight: number  // 鼻梁高度评分 (0-100)
  wingWidth: number     // 鼻翼宽度评分 (0-100)
  ratio: number         // 鼻翼宽度与脸宽之比
  type: '挺拔型' | '标准型' | '圆润型' | '宽翼型'
}

// 嘴唇特征
export interface LipFeatures {
  size: number          // 嘴唇大小评分 (0-100)
  fullness: number      // 唇部饱满度评分 (0-100)
  shape: '厚唇' | '薄唇' | '标准唇' | 'M型峰唇'
  widthRatio: number    // 嘴宽与脸宽之比
  thicknessRatio: number// 唇厚与嘴宽之比
  cornerAngle: number   // 嘴角角度（正数上扬，负数下垂）
}

// 脸型特征
export interface FaceShapeFeatures {
  type: '瓜子脸' | '圆脸' | '方脸' | '长脸' | '心形脸' | '菱形脸' | '椭圆脸'
  widthHeightRatio: number  // 宽高比
  jawlineSharpness: number  // 下颌线清晰度 (0-100)
  cheekboneProminence: number // 颧骨突出度 (0-100)
}

// 肤质特征
export interface SkinFeatures {
  brightness: number    // 亮度评分 (0-100)
  uniformity: number    // 均匀度评分 (0-100)
  tone: '冷调' | '暖调' | '中性'
}

// 五官综合特征（用于颜值类型判断）
export interface FaceFeatureVector {
  eyes: EyeFeatures
  brows: BrowFeatures
  nose: NoseFeatures
  lips: LipFeatures
  faceShape: FaceShapeFeatures
  skin: SkinFeatures
  symmetryScore: number     // 整体对称性 (0-100)
  goldenRatioScore: number  // 黄金比例契合度 (0-100)
  threeZonesRatio: [number, number, number]  // 三庭比例
  fiveEyesRatio: number     // 五眼比例偏差
}

// 五官分析（展示用）
export interface FeatureAnalysis {
  eyes: ScoreDimension
  brows: ScoreDimension
  nose: ScoreDimension
  lips: ScoreDimension
  face: ScoreDimension
  skin: ScoreDimension
  overall: ScoreDimension
}

// 性别类型
export type Gender = 'male' | 'female' | 'auto'

// 颜值类型（女性）
export type BeautyType =
  | '清冷仙气型'
  | '甜系邻家型'
  | '御姐女王型'
  | '元气少女型'
  | '高级混血型'
  | '英气飒爽型'
  | '知性优雅型'
  | '复古东方型'
  | '少年感中性型'
  | '暖系治愈型'

// 颜值类型（男性）
export type MaleBeautyType =
  | '阳光运动型'
  | '儒雅书生型'
  | '霸气总裁型'
  | '邻家暖男型'
  | '冷酷型男型'
  | '文艺清新型'
  | '潮流先锋型'
  | '硬汉型男型'

// 通用颜值类型（男女均兼容）
export type AnyBeautyType = BeautyType | MaleBeautyType

// 颜值类型英文标签
export const BEAUTY_TYPE_LABELS: Record<BeautyType, string> = {
  '清冷仙气型': 'Ice Fairy',
  '甜系邻家型': 'Sweet Neighbor',
  '御姐女王型': 'Ice Queen',
  '元气少女型': 'Energetic Girl',
  '高级混血型': 'Exotic Mix',
  '英气飒爽型': 'Cool & Sharp',
  '知性优雅型': 'Intellectual',
  '复古东方型': 'Oriental Classic',
  '少年感中性型': 'Androgynous',
  '暖系治愈型': 'Warm Healing',
}

// 颜值类型详细信息
export interface BeautyTypeInfo {
  type: AnyBeautyType
  label: string
  description: string
  features: string[]
  celebrities: string[]
  makeupStyle: string
  avoidStyle: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

// 评分等级
export interface ScoreGrade {
  grade: string
  label: string
  description: string
  minScore: number
  maxScore: number
  color: string
}

export const SCORE_GRADES: ScoreGrade[] = [
  {
    grade: 'S+',
    label: '绝世',
    description: '万中无一的天赐容颜，令人过目难忘',
    minScore: 90,
    maxScore: 100,
    color: '#FFD700',
  },
  {
    grade: 'S',
    label: '倾城',
    description: '五官精致协调，美貌程度远超常人',
    minScore: 80,
    maxScore: 89,
    color: '#A855F7',
  },
  {
    grade: 'A+',
    label: '出众',
    description: '颜值在线，是同龄人中的佼佼者',
    minScore: 70,
    maxScore: 79,
    color: '#FF6B9D',
  },
  {
    grade: 'A',
    label: '亮眼',
    description: '外貌有明显亮点，整体感觉清新好看',
    minScore: 60,
    maxScore: 69,
    color: '#60A5FA',
  },
  {
    grade: 'B+',
    label: '可人',
    description: '五官端正，散发出自然亲和的气质',
    minScore: 50,
    maxScore: 59,
    color: '#34D399',
  },
  {
    grade: 'B',
    label: '普通',
    description: '平凡中自有魅力，气质胜于颜值',
    minScore: 40,
    maxScore: 49,
    color: '#94A3B8',
  },
  {
    grade: 'C',
    label: '潜力',
    description: '有改造空间，妆容和造型可大幅提升',
    minScore: 30,
    maxScore: 39,
    color: '#F59E0B',
  },
  {
    grade: 'C-',
    label: '个性',
    description: '独特的外貌风格，风格定位更重要',
    minScore: 0,
    maxScore: 29,
    color: '#9CA3AF',
  },
]

// 化妆建议
export interface MakeupAdvice {
  category: string
  title: string
  description: string
  icon?: string
  tips?: string[]
}

// 完整分析结果
export interface FaceAnalysisResult {
  // 总分 0-100
  totalScore: number
  // 性别
  gender: 'male' | 'female'
  // 颜值类型
  beautyType: AnyBeautyType
  // 颜值类型详细信息
  beautyTypeInfo: BeautyTypeInfo
  // 评分等级
  grade: ScoreGrade
  // 一句话评价
  summary: string
  // 五官分析
  features: FeatureAnalysis
  // 五官特征向量（内部使用）
  featureVector: FaceFeatureVector
  // 各维度评分（用于雷达图等展示）
  dimensions: ScoreDimension[]
  // 化妆/改善建议
  makeupAdvices: MakeupAdvice[]
  // 分析时间
  analyzedAt: Date
  // 人脸检测置信度
  confidence: number
  // 人脸检测到的关键点（可选，用于可视化）
  landmarks?: FaceLandmark[]
  // 表情分析
  expressions?: ExpressionAnalysis
  // 人脸区域（用于可视化）
  faceBox?: {
    x: number
    y: number
    width: number
    height: number
  }
}

// 人脸关键点
export interface FaceLandmark {
  x: number
  y: number
  type?: string
}

// 表情分析
export interface ExpressionAnalysis {
  neutral: number
  happy: number
  sad: number
  angry: number
  fearful: number
  disgusted: number
  surprised: number
}

// 应用状态
export type AppState = 'idle' | 'uploading' | 'analyzing' | 'result' | 'error'

// 错误类型
export type ErrorType = 'no-face' | 'face-too-small' | 'multiple-faces' | 'low-quality' | 'file-error' | 'unknown'

// 应用错误
export interface AppError {
  type: ErrorType
  message: string
  suggestion?: string
}

// 评分颜色映射
export interface ScoreColorMap {
  from: string
  to: string
  label: string
}

export const SCORE_COLOR_MAP: Record<string, ScoreColorMap> = {
  'S+': { from: '#FFD700', to: '#A855F7', label: '绝世' },
  'S': { from: '#A855F7', to: '#EC4899', label: '倾城' },
  'A+': { from: '#FF6B9D', to: '#C084FC', label: '出众' },
  'A': { from: '#60A5FA', to: '#34D399', label: '亮眼' },
  'B+': { from: '#34D399', to: '#10B981', label: '可人' },
  'B': { from: '#94A3B8', to: '#64748B', label: '普通' },
  'C': { from: '#F59E0B', to: '#D97706', label: '潜力' },
  'C-': { from: '#D1D5DB', to: '#9CA3AF', label: '个性' },
}

export function getScoreGrade(score: number): ScoreGrade {
  for (const grade of SCORE_GRADES) {
    if (score >= grade.minScore && score <= grade.maxScore) {
      return grade
    }
  }
  return SCORE_GRADES[SCORE_GRADES.length - 1]
}

export function getScoreColorMap(score: number): ScoreColorMap {
  const grade = getScoreGrade(score)
  return SCORE_COLOR_MAP[grade.grade] || SCORE_COLOR_MAP['C-']
}

export function getBeautyType(score: number): BeautyType {
  if (score >= 90) return '清冷仙气型'
  if (score >= 80) return '御姐女王型'
  if (score >= 70) return '知性优雅型'
  if (score >= 60) return '甜系邻家型'
  if (score >= 50) return '元气少女型'
  if (score >= 40) return '暖系治愈型'
  if (score >= 30) return '英气飒爽型'
  return '复古东方型'
}
