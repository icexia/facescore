import type {
  FaceAnalysisResult,
  BeautyTypeInfo,
  FeatureAnalysis,
  ScoreDimension,
  MakeupAdvice,
} from '../types'
import { getScoreGrade } from '../types'

/**
 * 生成 Mock 分析结果（供开发测试使用）
 * 真实算法接入后此函数应被 useFaceAnalysis hook 替代
 */
export function generateMockResult(): FaceAnalysisResult {
  // 模拟一个 82 分的结果（S 倾城级别）
  const totalScore = 82

  const grade = getScoreGrade(totalScore)

  const features: FeatureAnalysis = {
    eyes: {
      name: '眼睛',
      score: 88,
      description: '您的眼睛大而有神，双眼皮深且明显，眼尾微微上扬，眼神深邃迷人。眼距比例适中，符合黄金五眼标准，整体给人灵动且有气质的印象。',
      details: [
        { label: '大眼双眼皮', score: 90 },
        { label: '眼神深邃', score: 85 },
        { label: '卧蚕明显', score: 88 },
      ],
    },
    brows: {
      name: '眉毛',
      score: 79,
      description: '眉形自然流畅，眉峰位置适中，与五官整体搭配和谐。眉毛浓密有型，眉间距标准，稍微修整后可以进一步提升整体颜值。',
      details: [
        { label: '眉形自然', score: 82 },
        { label: '眉距适中', score: 75 },
        { label: '浓密有型', score: 78 },
      ],
    },
    nose: {
      name: '鼻子',
      score: 83,
      description: '鼻梁较为挺拔，鼻翼宽度比例适当，鼻型整体偏精巧型。从正面看立体感强，侧面轮廓优美，是五官中较为出色的部分。',
      details: [
        { label: '鼻梁挺拔', score: 86 },
        { label: '鼻翼精巧', score: 80 },
        { label: '立体感强', score: 84 },
      ],
    },
    lips: {
      name: '嘴唇',
      score: 85,
      description: '唇形饱满圆润，M峰线条明显，嘴角自然上扬给人亲切感。上下唇厚度比例协调，唇色红润自然，是标准的丰唇型。',
      details: [
        { label: '唇形饱满', score: 88 },
        { label: 'M峰明显', score: 82 },
        { label: '嘴角上扬', score: 85 },
      ],
    },
    face: {
      name: '脸型',
      score: 87,
      description: '脸型偏瓜子脸，下颌线条流畅优美，颧骨位置适中不突兀。整体轮廓清晰，有立体感，是东方审美中最受欢迎的脸型之一。',
      details: [
        { label: '瓜子脸', score: 88 },
        { label: '下颌线清晰', score: 86 },
        { label: '轮廓立体', score: 85 },
      ],
    },
    skin: {
      name: '肤质',
      score: 76,
      description: '肤色均匀明亮，整体光泽度较好，皮肤质感细腻。图像显示皮肤水润度高，没有明显色斑或瑕疵，适合走自然裸妆路线。',
      details: [
        { label: '光泽感强', score: 78 },
        { label: '肤色均匀', score: 74 },
        { label: '细腻水润', score: 76 },
      ],
    },
    overall: {
      name: '整体协调',
      score: 84,
      description: '五官整体搭配和谐，没有明显的失衡感，整体颜值协调性高。',
    },
  }

  const dimensions: ScoreDimension[] = [
    { name: '五官精致度', score: 85, description: '五官形态完整精细，整体精致度高' },
    { name: '黄金比例', score: 83, description: '面部三庭五眼比例接近黄金分割' },
    { name: '面部对称性', score: 88, description: '左右半脸高度对称，协调性极佳' },
    { name: '眼神气质', score: 87, description: '眼睛大而有神，气质感强' },
    { name: '肤质光泽', score: 76, description: '皮肤光泽均匀，质感细腻' },
    { name: '脸型立体感', score: 84, description: '下颌线清晰，轮廓立体感强' },
    { name: '整体协调', score: 82, description: '五官比例协调，整体感强' },
    { name: '时代审美', score: 80, description: '符合当代主流清冷高级审美' },
  ]

  const beautyTypeInfo: BeautyTypeInfo = {
    type: '甜系邻家型',
    label: 'Sweet Neighbor',
    description: '像隔壁班上最讨喜的女孩，笑起来有小梨涡，眼睛大而明亮，给人强烈的亲近感和安全感。是会让人想保护的那种甜。',
    features: ['大眼睛明亮', '圆润鹅蛋脸', '嘴唇丰满有肉感', '笑容灿烂', '五官小巧精致'],
    celebrities: ['赵露思', '虞书欣', '关晓彤'],
    makeupStyle: '推荐清甜奶油妆、珊瑚橘眼影、豆沙粉唇、腮红打透，打造亲切甜美的少女感',
    avoidStyle: '过于深邃的烟熏感、冷灰色系',
    colors: {
      primary: '#FF6B9D',
      secondary: '#C084FC',
      accent: '#F472B6',
    },
  }

  const makeupAdvices: MakeupAdvice[] = [
    {
      category: '眉形',
      icon: '✏️',
      title: '自然弓形眉最适合你',
      description: '您的脸型偏圆润，建议选择微上扬的拱形眉，可以拉长脸部视觉比例，让整体更加精致。眉峰不要太尖，保持自然弧度。',
      tips: ['眉尾略微上扬2-3度', '眉峰在眉毛2/3处', '眉头自然不要太粗'],
    },
    {
      category: '眼妆',
      icon: '👁️',
      title: '强调眼尾打开眼型',
      description: '您的眼睛已经很大，建议用深棕色眼线强调眼尾，配合珊瑚橘色眼影晕染，让眼神更加灵动迷人。可以加一点下睫毛膏增加水灵感。',
      tips: ['用棕色代替黑色眼线', '眼尾拉长2-3mm', '下眼睑涂少量珠光眼影'],
    },
    {
      category: '唇妆',
      icon: '💄',
      title: '豆沙粉唇突显唇形',
      description: '您的唇形本身很好，建议选择豆沙粉或珊瑚红色系的唇色，不需要改变唇形，直接按照本来唇线上色，展现饱满丰盈的唇型。',
      tips: ['选择哑光或微光质地', '颜色以粉橘系为主', '不需要特别修唇线'],
    },
    {
      category: '修容',
      icon: '✨',
      title: '轻度修容提升立体感',
      description: '您的脸型轮廓已经不错，只需在颧骨下方轻扫少量修容粉，鼻梁两侧打细细一条阴影，配合T区高光，即可打造自然立体感。',
      tips: ['修容色选择比肤色深一号', '高光打在T区和颧骨最高点', '晕染要自然，切忌生硬'],
    },
    {
      category: '发型',
      icon: '💇‍♀️',
      title: '空气刘海最适合你',
      description: '圆脸系建议留空气刘海，既可以修饰额头，又能保留清纯少女感。发型整体建议留在锁骨以下，增加脸部纵向比例。',
      tips: ['空气刘海遮住约2/3额头', '两侧留少量碎发修饰脸型', '发色偏暖调更显甜美'],
    },
    {
      category: '风格',
      icon: '🎨',
      title: '清甜学院风最适合你',
      description: '您适合走清甜学院风或甜酷少女风，整体造型应保持干净清爽。选择粉白蓝等马卡龙色系服装，搭配精致小配饰，突显青春活力。',
      tips: ['以马卡龙色系为主', '可以尝试格纹、碎花等可爱图案', '避免过于成熟浓艳的妆容和造型'],
    },
  ]

  return {
    totalScore,
    beautyType: '甜系邻家型',
    beautyTypeInfo,
    grade,
    gender: 'female' as const,
    summary: `精致五官，甜美大眼，整体颜值高于 ${100 - grade.minScore}% 的用户`,
    features,
    featureVector: {
      eyes: {
        size: 88,
        spacing: 82,
        symmetry: 90,
        type: '双眼皮',
        widthRatio: 0.32,
        heightRatio: 0.42,
      },
      brows: {
        shape: '弓形眉',
        spacing: 78,
        thickness: 72,
        symmetry: 85,
      },
      nose: {
        bridgeHeight: 83,
        wingWidth: 80,
        ratio: 0.28,
        type: '挺拔型',
      },
      lips: {
        size: 82,
        fullness: 87,
        shape: 'M型峰唇',
        widthRatio: 0.38,
        thicknessRatio: 0.45,
        cornerAngle: 5,
      },
      faceShape: {
        type: '瓜子脸',
        widthHeightRatio: 0.72,
        jawlineSharpness: 85,
        cheekboneProminence: 65,
      },
      skin: {
        brightness: 78,
        uniformity: 74,
        tone: '暖调',
      },
      symmetryScore: 88,
      goldenRatioScore: 83,
      threeZonesRatio: [0.33, 0.34, 0.33],
      fiveEyesRatio: 0.98,
    },
    dimensions,
    makeupAdvices,
    analyzedAt: new Date(),
    confidence: 0.95,
  }
}
