import type { BeautyType, MaleBeautyType, BeautyTypeInfo, FaceFeatureVector } from '../types'

/**
 * 10种颜值类型的详细信息
 */
export const BEAUTY_TYPE_INFO: Record<BeautyType, BeautyTypeInfo> = {
  '清冷仙气型': {
    type: '清冷仙气型',
    label: 'Ice Fairy',
    description: '拥有一种超凡脱俗的清冷气质，眉眼之间透着一股淡淡的疏离感，让人忍不住多看几眼。不是最浓艳的颜，却是最难忘的脸。',
    features: ['眼型细长深邃', '面部轮廓偏长', '肤色偏白冷调', '嘴角轮廓清晰', '气质偏冷疏离'],
    celebrities: ['刘亦菲', '周冬雨', '倪妮'],
    makeupStyle: '推荐雾面妆感、冷调眼影（灰紫、烟熏）、裸色哑光唇',
    avoidStyle: '避免过于浮夸的亮片眼影、大红唇',
    colors: { primary: '#B4C7D9', secondary: '#7B9BB5', accent: '#4A6FA5' },
  },
  '甜系邻家型': {
    type: '甜系邻家型',
    label: 'Sweet Neighbor',
    description: '像隔壁班上最讨喜的女孩，笑起来有小梨涡，眼睛大而明亮，给人强烈的亲近感和安全感。是会让人想保护的那种甜。',
    features: ['大眼睛明亮', '脸型圆润鹅蛋', '嘴型小巧丰满', '笑容甜美', '五官小巧精致'],
    celebrities: ['赵露思', '虞书欣', '关晓彤'],
    makeupStyle: '推荐清甜奶油妆、珊瑚橘眼影、豆沙粉唇、腮红打透',
    avoidStyle: '避免过于深邃的烟熏感、冷灰色系',
    colors: { primary: '#FFB5C8', secondary: '#FF85A1', accent: '#FF4D79' },
  },
  '御姐女王型': {
    type: '御姐女王型',
    label: 'Ice Queen',
    description: '一种与生俱来的气场，无需开口便有压制全场的气质。五官立体，眉目间自带权威感，优雅而凌厉，是让人心生仰望的类型。',
    features: ['眉形利落平直', '面部轮廓分明', '眼型深邃单双', '鼻梁挺拔收窄', '气质成熟强势'],
    celebrities: ['章子怡', '佟丽娅', '范冰冰'],
    makeupStyle: '推荐大红唇、猫眼眼线、高光立体修容、深色眼影',
    avoidStyle: '避免清淡粉嫩色系、卡姿兰大眼娃娃风',
    colors: { primary: '#8B1A1A', secondary: '#C41E3A', accent: '#FFD700' },
  },
  '元气少女型': {
    type: '元气少女型',
    label: 'Energetic Girl',
    description: '永远充满活力，笑起来让整个房间都亮了。五官小巧灵动，像一道阳光，充满朝气的能量型颜值，看到就心情变好。',
    features: ['五官小巧灵动', '脸型偏圆婴儿肥', '嘴角天然上扬', '肤色健康暖调', '笑容有酒窝'],
    celebrities: ['宋祖儿', '张子枫', '陈都灵'],
    makeupStyle: '推荐水光妆、橘色眼影、珊瑚红唇、晒伤感腮红',
    avoidStyle: '避免过于成熟的拉丝高光和修容',
    colors: { primary: '#FFB347', secondary: '#FF8C00', accent: '#FF6600' },
  },
  '高级混血型': {
    type: '高级混血型',
    label: 'Exotic Mix',
    description: '深邃的轮廓，立体的五官，有一种说不清道不明的异域感。不是纯粹的东方美，但又有着东方神韵，是极具视觉冲击力的高级美貌。',
    features: ['鼻梁高挺鼻根深', '眼睛深邃有眼窝', '颧骨高骨骼感强', '眼距略宽辨识度高', '混血异域风情'],
    celebrities: ['欧阳娜娜', '宋茜', '迪丽热巴'],
    makeupStyle: '推荐大地色烟熏妆、金棕色眼影、古铜色修容、裸棕唇',
    avoidStyle: '避免过于日系清纯的白皮甜美妆',
    colors: { primary: '#8B6914', secondary: '#C4922A', accent: '#E8B84B' },
  },
  '英气飒爽型': {
    type: '英气飒爽型',
    label: 'Cool & Sharp',
    description: '眉宇间透着一股英气，笑起来帅气过很多男生。既有女性的柔美，又有不输男生的锐利感，是最近几年最流行的颜值风格之一。',
    features: ['眉形平直有气势', '眼型细长眼尾上扬', '下颌线清晰', '鼻梁略高较直', '轮廓偏硬朗中性'],
    celebrities: ['古力娜扎', '热依扎', '辛芷蕾'],
    makeupStyle: '推荐锐利猫眼线、正红唇、刚硬眉形、明显修容',
    avoidStyle: '避免圆弧型下垂眉、粉嫩可爱风腮红',
    colors: { primary: '#2C3E50', secondary: '#34495E', accent: '#E74C3C' },
  },
  '知性优雅型': {
    type: '知性优雅型',
    label: 'Intellectual',
    description: '岁月沉淀出的美，有内涵，有气质。不靠颜色取胜，靠的是五官之间那种沉稳和从容。是越看越耐看的那种美，让人心生尊重。',
    features: ['眼型标准沉稳', '五官比例和谐', '脸型偏长清晰', '唇形饱满收敛', '气质内敛不张扬'],
    celebrities: ['汤唯', '秦岚', '蒋勤勤'],
    makeupStyle: '推荐裸妆底妆、深棕眼影、玫瑰红唇、轻柔修容',
    avoidStyle: '避免夸张亮片、过粗过黑的眼线',
    colors: { primary: '#6B4226', secondary: '#8B5E3C', accent: '#D4A574' },
  },
  '复古东方型': {
    type: '复古东方型',
    label: 'Oriental Classic',
    description: '天生自带一种古典韵味，仿佛从古画中走出来的人物。轮廓柔和圆润，眉目传情，一颦一笑间有着属于东方女性特有的含蓄之美。',
    features: ['眼型偏杏眼', '脸型偏圆额头饱满', '唇形饱满嘴型偏大', '五官感觉柔和', '肤色偏暖黄东方韵'],
    celebrities: ['林青霞', '巩俐', '张曼玉'],
    makeupStyle: '推荐仿旧感复古妆、暗红色唇、铜色暖调眼影、细眉流风',
    avoidStyle: '避免现代感极强的欧式双眼皮眼影画法',
    colors: { primary: '#8B4513', secondary: '#A0522D', accent: '#D2691E' },
  },
  '少年感中性型': {
    type: '少年感中性型',
    label: 'Androgynous',
    description: '介于男孩和女孩之间的奇妙存在，中性魅力让人着迷。打破了传统对美的定义，是最先锋、最个性的颜值类型，粉丝黏性极强。',
    features: ['眉形粗而平男性气质', '眼型圆或细长锐利', '下颌线偏方下巴略尖', '无强烈性别倾向', '男女通吃造型风'],
    celebrities: ['李宇春', '王菲', '白百何'],
    makeupStyle: '推荐无性别感裸妆、烟熏眼、简洁唇色、突出骨骼感的修容',
    avoidStyle: '避免过于甜美的蜜桃妆、蝴蝶结等女童感元素',
    colors: { primary: '#5F5F5F', secondary: '#808080', accent: '#A0A0A0' },
  },
  '暖系治愈型': {
    type: '暖系治愈型',
    label: 'Warm Healing',
    description: '像一杯热可可，看见就感到温暖。圆润可爱的五官，温柔的眼神，散发着治愈能量。不是最惊艳的颜，却是最让人心动的存在。',
    features: ['眼睛大而圆润', '脸型圆润两颊肉感', '嘴唇微厚温暖', '肤色均匀偏暖', '整体温暖治愈'],
    celebrities: ['景甜', '沈月', '杨紫'],
    makeupStyle: '推荐奶油肌底妆、蜜桃色眼影、珊瑚橙腮红、浆果粉唇',
    avoidStyle: '避免过深过冷的修容色、让脸看起来更瘦的强对比修容',
    colors: { primary: '#FF9B7B', secondary: '#FF7043', accent: '#FF5722' },
  },
}

/**
 * 特征向量匹配每种类型的倾向分数
 */
interface TypeScore {
  type: BeautyType
  score: number
}

/**
 * 基于五官特征向量判断颜值类型
 */
export function determineBeautyType(fv: FaceFeatureVector): BeautyType {
  const scores: TypeScore[] = [
    { type: '清冷仙气型', score: calcIceFairyScore(fv) },
    { type: '甜系邻家型', score: calcSweetNeighborScore(fv) },
    { type: '御姐女王型', score: calcIceQueenScore(fv) },
    { type: '元气少女型', score: calcEnergeticGirlScore(fv) },
    { type: '高级混血型', score: calcExoticMixScore(fv) },
    { type: '英气飒爽型', score: calcCoolSharpScore(fv) },
    { type: '知性优雅型', score: calcIntellectualScore(fv) },
    { type: '复古东方型', score: calcOrientalClassicScore(fv) },
    { type: '少年感中性型', score: calcAndrogynousScore(fv) },
    { type: '暖系治愈型', score: calcWarmHealingScore(fv) },
  ]

  // 取最高分的类型
  scores.sort((a, b) => b.score - a.score)
  return scores[0].type
}

// 清冷仙气型：细长眼、长脸/瓜子脸、冷调肤色、高对称性
function calcIceFairyScore(fv: FaceFeatureVector): number {
  let score = 0
  // 眼型特征
  if (fv.eyes.heightRatio < 0.30) score += 25  // 细长眼
  if (fv.eyes.type === '单眼皮' || fv.eyes.type === '内双') score += 15
  // 脸型特征
  if (fv.faceShape.type === '长脸' || fv.faceShape.type === '瓜子脸') score += 20
  // 肤色
  if (fv.skin.tone === '冷调') score += 15
  if (fv.skin.brightness > 70) score += 10
  // 对称性
  if (fv.symmetryScore > 75) score += 15
  return score
}

// 甜系邻家型：大双眼皮、圆脸/心形脸、厚唇、暖调
function calcSweetNeighborScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.eyes.type === '双眼皮') score += 25
  if (fv.eyes.size > 65) score += 20
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '心形脸') score += 20
  if (fv.lips.fullness > 65) score += 15
  if (fv.skin.tone === '暖调') score += 10
  if (fv.lips.cornerAngle > 3) score += 10  // 嘴角上扬
  return score
}

// 御姐女王型：平眉、高颧骨、单双眼皮、挺鼻
function calcIceQueenScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.brows.shape === '平眉') score += 20
  if (fv.faceShape.cheekboneProminence > 60) score += 25
  if (fv.nose.bridgeHeight > 70) score += 20
  if (fv.eyes.type === '单眼皮' || fv.eyes.type === '内双') score += 15
  if (fv.faceShape.type === '方脸' || fv.faceShape.type === '长脸') score += 20
  return score
}

// 元气少女型：小眼or大眼、圆脸、上扬嘴角、暖调肤色
function calcEnergeticGirlScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '圆脸') score += 30
  if (fv.lips.cornerAngle > 5) score += 25  // 嘴角明显上扬
  if (fv.skin.tone === '暖调') score += 15
  if (fv.skin.brightness > 65) score += 10
  if (fv.eyes.type === '双眼皮') score += 10
  if (fv.faceShape.widthHeightRatio > 0.80) score += 10
  return score
}

// 高级混血型：挺鼻、高颧骨、大眼距
function calcExoticMixScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.nose.bridgeHeight > 75) score += 30
  if (fv.faceShape.cheekboneProminence > 65) score += 25
  if (fv.eyes.spacing < 55) score += 15  // 眼距略宽（评分低反而说明间距更大）
  if (fv.nose.type === '挺拔型') score += 15
  if (fv.faceShape.type === '菱形脸' || fv.faceShape.type === '长脸') score += 15
  return score
}

// 英气飒爽型：平眉、细长上扬眼、清晰下颌线、方/长脸
function calcCoolSharpScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.brows.shape === '平眉' || fv.brows.shape === '上扬眉') score += 20
  if (fv.eyes.heightRatio < 0.30) score += 20  // 细长眼
  if (fv.faceShape.jawlineSharpness > 70) score += 25
  if (fv.faceShape.type === '方脸' || fv.faceShape.type === '长脸') score += 20
  if (fv.nose.bridgeHeight > 65) score += 15
  return score
}

// 知性优雅型：标准比例、标准双眼皮、椭圆/长脸
function calcIntellectualScore(fv: FaceFeatureVector): number {
  let score = 0
  // 知性型特征是"没有特别突出的单项"，各项均衡
  const featureScores = [fv.eyes.size, fv.nose.bridgeHeight, fv.lips.fullness, fv.brows.symmetry]
  const avg = featureScores.reduce((s, v) => s + v, 0) / featureScores.length
  const variance = featureScores.reduce((s, v) => s + (v - avg) ** 2, 0) / featureScores.length
  // 方差越小，说明各项越均衡
  score += Math.max(0, 30 - variance / 100)

  if (fv.faceShape.type === '椭圆脸' || fv.faceShape.type === '长脸') score += 25
  if (fv.goldenRatioScore > 70) score += 25  // 比例好
  if (fv.symmetryScore > 75) score += 20
  return score
}

// 复古东方型：杏眼或下垂眼、圆脸、厚唇大嘴、暖黄肤色
function calcOrientalClassicScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.brows.shape === '下垂眉') score += 15
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '椭圆脸') score += 20
  if (fv.lips.shape === '厚唇') score += 20
  if (fv.lips.widthRatio > 0.35) score += 15  // 嘴型偏大
  if (fv.skin.tone === '暖调') score += 20
  if (fv.eyes.heightRatio < 0.30) score += 10
  return score
}

// 少年感中性型：粗平眉、方脸、中等大小眼、无明显性别倾向
function calcAndrogynousScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.brows.shape === '平眉') score += 20
  if (fv.brows.thickness > 70) score += 20  // 眉毛较粗
  if (fv.faceShape.type === '方脸') score += 25
  if (fv.faceShape.jawlineSharpness > 65) score += 20
  // 眼睛既不特别大也不特别小（中性）
  if (fv.eyes.size > 40 && fv.eyes.size < 70) score += 15
  return score
}

// 暖系治愈型：大圆眼、圆脸、厚唇、暖调、嘴角上扬
function calcWarmHealingScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.eyes.heightRatio > 0.33) score += 20  // 大而圆的眼睛
  if (fv.eyes.type === '双眼皮') score += 15
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '心形脸') score += 20
  if (fv.lips.fullness > 60) score += 15
  if (fv.skin.tone === '暖调') score += 20
  if (fv.lips.cornerAngle > 2) score += 10  // 嘴角微上扬
  return score
}

/**
 * 获取颜值类型详细信息
 */
export function getBeautyTypeInfo(type: BeautyType): BeautyTypeInfo {
  return BEAUTY_TYPE_INFO[type]
}

// ============================================================
// 男性颜值类型
// ============================================================

/**
 * 男性颜值类型详细信息
 */
export const MALE_BEAUTY_TYPE_INFO: Record<MaleBeautyType, BeautyTypeInfo> = {
  '阳光运动型': {
    type: '阳光运动型',
    label: 'Sporty Sunshine',
    description: '笑容灿烂如阳光，给人温暖积极的感觉。五官周正，线条流畅，是每个人都喜欢的那种男孩。',
    features: ['笑容灿烂', '五官周正', '肤色健康', '下颌线流畅', '给人阳光积极的感觉'],
    celebrities: ['彭于晏', '陈伟霆', '黄景瑜'],
    makeupStyle: '推荐清爽自然护肤、保持肤色健康、适度修眉',
    avoidStyle: '避免过度修饰，保持自然阳光感',
    colors: { primary: '#FF8C00', secondary: '#FFB347', accent: '#FFD700' },
  },
  '儒雅书生型': {
    type: '儒雅书生型',
    label: 'Elegant Scholar',
    description: '文质彬彬，温润如玉。五官精致而不过分凌厉，给人知书达理、温和可靠的感觉。',
    features: ['五官精致柔和', '脸型偏长椭圆', '眼神温和', '唇形清晰', '气质儒雅'],
    celebrities: ['胡歌', '朱一龙', '白敬亭'],
    makeupStyle: '推荐简约护肤、保持干净清爽、文艺风穿搭',
    avoidStyle: '避免过于粗犷的造型',
    colors: { primary: '#5B7B9A', secondary: '#7BA3C4', accent: '#A8C8E8' },
  },
  '霸气总裁型': {
    type: '霸气总裁型',
    label: 'CEO Aura',
    description: '天生自带气场，眉宇间透着一股不怒自威的力量感。五官立体，轮廓分明，是人群中最有存在感的存在。',
    features: ['五官立体', '下颌线锐利', '鼻梁挺拔', '眉形浓密', '气场强大'],
    celebrities: ['吴彦祖', '金城武', '段奕宏'],
    makeupStyle: '推荐保持面部清洁、修剪利落的发型、注重穿搭质感',
    avoidStyle: '避免过于可爱或休闲的造型',
    colors: { primary: '#2C3E50', secondary: '#34495E', accent: '#1A1A2E' },
  },
  '邻家暖男型': {
    type: '邻家暖男型',
    label: 'Warm Neighbor',
    description: '像隔壁那个让人安心的大男孩，眼睛里有温暖的光。五官柔和，笑起来特别治愈，给人强烈的安全感。',
    features: ['眼睛温暖有光', '脸型圆润', '嘴角上扬', '肤色均匀', '笑容亲切'],
    celebrities: ['李现', '杨洋', '刘昊然'],
    makeupStyle: '推荐干净护肤、保持自然好气色、温暖风穿搭',
    avoidStyle: '避免过于冷酷或前卫的造型',
    colors: { primary: '#E8A87C', secondary: '#D4956E', accent: '#C68252' },
  },
  '冷酷型男型': {
    type: '冷酷型男型',
    label: 'Cool Guy',
    description: '酷到没朋友的类型，一张冷脸就能迷倒万人。眉眼深邃，表情淡漠，自带疏离感的高级帅。',
    features: ['眉眼深邃', '表情冷峻', '脸型偏长', '皮肤冷调', '气质疏离'],
    celebrities: ['王一博', '肖战', '龚俊'],
    makeupStyle: '推荐保持冷调肤色、简洁发型、深色系穿搭',
    avoidStyle: '避免过于甜美可爱的造型',
    colors: { primary: '#4A6FA5', secondary: '#3D5A80', accent: '#293241' },
  },
  '文艺清新型': {
    type: '文艺清新型',
    label: 'Artistic Fresh',
    description: '如同一首散文诗，安静而深沉。五官不张扬但很耐看，眼神里有故事，是让人想深入了解的类型。',
    features: ['五官清秀', '眼神文艺', '脸型标准', '气质内敛', '整体干净'],
    celebrities: ['井柏然', '陈坤', '林更新'],
    makeupStyle: '推荐自然系护肤、文艺风穿搭、简约配饰',
    avoidStyle: '避免过于商务或运动风的造型',
    colors: { primary: '#8FBC8F', secondary: '#6B8E6B', accent: '#556B2F' },
  },
  '潮流先锋型': {
    type: '潮流先锋型',
    label: 'Trendsetter',
    description: '走在时尚最前沿的弄潮儿，五官个性十足，辨识度极高。不管什么造型都能驾驭，是天生的时尚Icon。',
    features: ['五官辨识度高', '轮廓分明', '个性十足', '适合多种风格', '天生时尚感'],
    celebrities: ['蔡徐坤', '易烊千玺', '范丞丞'],
    makeupStyle: '推荐大胆尝试各种发色发型、潮牌穿搭、个性配饰',
    avoidStyle: '避免过于保守传统的造型',
    colors: { primary: '#FF6B6B', secondary: '#FFA07A', accent: '#FFD93D' },
  },
  '硬汉型男型': {
    type: '硬汉型男型',
    label: 'Tough Guy',
    description: '充满男性荷尔蒙的硬朗气质，五官深刻，轮廓坚毅。是最传统的男性审美标准代表，力量感十足。',
    features: ['五官深刻', '下颌方正', '鼻梁高挺', '眉毛浓密', '气质硬朗'],
    celebrities: ['张译', '吴京', '于适'],
    makeupStyle: '推荐保持粗犷感、修剪利落短发、户外运动风穿搭',
    avoidStyle: '避免过于精致细腻的造型',
    colors: { primary: '#8B4513', secondary: '#A0522D', accent: '#CD853F' },
  },
}

/**
 * 特征向量匹配每种男性类型的倾向分数
 */
interface MaleTypeScore {
  type: MaleBeautyType
  score: number
}

/**
 * 基于五官特征向量判断男性颜值类型
 */
export function determineMaleBeautyType(fv: FaceFeatureVector): MaleBeautyType {
  const scores: MaleTypeScore[] = [
    { type: '阳光运动型', score: calcMaleSportySunshineScore(fv) },
    { type: '儒雅书生型', score: calcMaleElegantScholarScore(fv) },
    { type: '霸气总裁型', score: calcMaleCEOAuraScore(fv) },
    { type: '邻家暖男型', score: calcMaleWarmNeighborScore(fv) },
    { type: '冷酷型男型', score: calcMaleCoolGuyScore(fv) },
    { type: '文艺清新型', score: calcMaleArtisticFreshScore(fv) },
    { type: '潮流先锋型', score: calcMaleTrendsetterScore(fv) },
    { type: '硬汉型男型', score: calcMaleToughGuyScore(fv) },
  ]

  scores.sort((a, b) => b.score - a.score)
  return scores[0].type
}

// 阳光运动型：圆脸/椭圆脸、暖调、嘴角上扬、眼睛大
function calcMaleSportySunshineScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '椭圆脸') score += 25
  if (fv.skin.tone === '暖调') score += 20
  if (fv.lips.cornerAngle > 3) score += 20  // 嘴角上扬
  if (fv.eyes.size > 60) score += 20
  if (fv.skin.brightness > 60) score += 15
  return score
}

// 儒雅书生型：椭圆/长脸、标准眉、比例好、对称好
function calcMaleElegantScholarScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '椭圆脸' || fv.faceShape.type === '长脸') score += 25
  if (fv.goldenRatioScore > 68) score += 25
  if (fv.symmetryScore > 72) score += 20
  if (fv.brows.shape === '平眉' || fv.brows.shape === '弓形眉') score += 15
  if (fv.eyes.type === '双眼皮' || fv.eyes.type === '内双') score += 15
  return score
}

// 霸气总裁型：方脸/长脸、高颧骨、挺鼻、粗眉
function calcMaleCEOAuraScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '方脸' || fv.faceShape.type === '长脸') score += 25
  if (fv.faceShape.cheekboneProminence > 60) score += 20
  if (fv.nose.bridgeHeight > 65) score += 20
  if (fv.brows.thickness > 65) score += 20
  if (fv.faceShape.jawlineSharpness > 65) score += 15
  return score
}

// 邻家暖男型：圆脸/心形脸、暖调、眼睛大、嘴角上扬
function calcMaleWarmNeighborScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '心形脸') score += 30
  if (fv.skin.tone === '暖调') score += 20
  if (fv.eyes.size > 65) score += 20
  if (fv.lips.cornerAngle > 2) score += 20
  if (fv.skin.uniformity > 65) score += 10
  return score
}

// 冷酷型男型：长脸/菱形脸、冷调、细长眼、高对称
function calcMaleCoolGuyScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '长脸' || fv.faceShape.type === '菱形脸') score += 25
  if (fv.skin.tone === '冷调') score += 20
  if (fv.eyes.heightRatio < 0.30) score += 20  // 细长眼
  if (fv.symmetryScore > 72) score += 20
  if (fv.lips.fullness < 55) score += 15  // 嘴唇偏薄显冷感
  return score
}

// 文艺清新型：各项均衡、椭圆/瓜子脸、比例好
function calcMaleArtisticFreshScore(fv: FaceFeatureVector): number {
  let score = 0
  const featureScores = [fv.eyes.size, fv.nose.bridgeHeight, fv.lips.fullness, fv.brows.symmetry]
  const avg = featureScores.reduce((s, v) => s + v, 0) / featureScores.length
  const variance = featureScores.reduce((s, v) => s + (v - avg) ** 2, 0) / featureScores.length
  // 方差越小，说明各项越均衡
  score += Math.max(0, 30 - variance / 100)

  if (fv.faceShape.type === '椭圆脸' || fv.faceShape.type === '瓜子脸') score += 25
  if (fv.goldenRatioScore > 65) score += 25
  if (fv.skin.brightness > 60) score += 20
  return score
}

// 潮流先锋型：辨识度高（特征方差大）、个性
function calcMaleTrendsetterScore(fv: FaceFeatureVector): number {
  let score = 0
  const featureScores = [fv.eyes.size, fv.nose.bridgeHeight, fv.lips.fullness, fv.faceShape.cheekboneProminence]
  const avg = featureScores.reduce((s, v) => s + v, 0) / featureScores.length
  const variance = featureScores.reduce((s, v) => s + (v - avg) ** 2, 0) / featureScores.length
  // 方差越大，特征越个性化
  score += Math.min(40, variance / 30)

  if (fv.faceShape.type === '菱形脸' || fv.faceShape.type === '瓜子脸') score += 20
  if (fv.nose.bridgeHeight > 70) score += 20
  if (fv.eyes.type === '单眼皮' || fv.eyes.type === '内双') score += 20
  return score
}

// 硬汉型男型：方脸、浓眉、高鼻梁、清晰下颌线
function calcMaleToughGuyScore(fv: FaceFeatureVector): number {
  let score = 0
  if (fv.faceShape.type === '方脸') score += 30
  if (fv.brows.thickness > 68) score += 25
  if (fv.nose.bridgeHeight > 65) score += 20
  if (fv.faceShape.jawlineSharpness > 68) score += 25
  return score
}

/**
 * 获取男性颜值类型详细信息
 */
export function getMaleBeautyTypeInfo(type: MaleBeautyType): BeautyTypeInfo {
  return MALE_BEAUTY_TYPE_INFO[type]
}
