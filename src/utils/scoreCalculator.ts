import type { FaceFeatureVector, ScoreDimension, FeatureAnalysis } from '../types'

/**
 * 情绪价值优化：将原始评分映射到用户友好的分数区间
 * 使用幂函数曲线：低分温和提升，高分保持区分度
 * 目标分布：大多数用户 72-92 分
 */
function boostScore(raw: number): number {
  const t = Math.max(0, Math.min(100, raw)) / 100
  const curved = Math.pow(t, 0.7)
  return Math.round(60 + curved * 38)
}

/**
 * 8个评分维度权重
 */
const DIMENSION_WEIGHTS = {
  refinement: 0.25,     // 五官精致度
  goldenRatio: 0.20,    // 黄金比例契合度
  symmetry: 0.15,       // 面部对称性
  eyeCharisma: 0.15,    // 眼神气质感
  skinQuality: 0.10,    // 肤质光泽度
  faceSculpt: 0.08,     // 脸型立体感
  harmony: 0.05,        // 整体协调性
  trendy: 0.02,         // 时代审美契合度
}

/**
 * 计算五官精致度
 */
function calcRefinement(fv: FaceFeatureVector): number {
  // 眼睛精致度：大小 + 对称 + 眼型加成
  const eyeTypeBonus = fv.eyes.type === '双眼皮' ? 10 : fv.eyes.type === '内双' ? 5 : 0
  const eyeScore = (fv.eyes.size * 0.5 + fv.eyes.symmetry * 0.3 + fv.eyes.spacing * 0.2) + eyeTypeBonus

  // 鼻子精致度：鼻梁 + 鼻翼
  const noseScore = fv.nose.bridgeHeight * 0.6 + fv.nose.wingWidth * 0.4

  // 嘴唇精致度：大小 + 饱满
  const lipScore = fv.lips.size * 0.5 + fv.lips.fullness * 0.5

  // 眉毛精致度：对称 + 疏密
  const browScore = fv.brows.symmetry * 0.6 + fv.brows.thickness * 0.2 + fv.brows.spacing * 0.2

  // 加权平均
  const refinement = eyeScore * 0.35 + noseScore * 0.25 + lipScore * 0.25 + browScore * 0.15

  return Math.min(100, Math.max(0, refinement))
}

/**
 * 计算眼神气质感
 */
function calcEyeCharisma(fv: FaceFeatureVector): number {
  // 眼睛大小（在脸部的占比）
  const sizeContrib = fv.eyes.size

  // 眼睛高宽比（越大越有神）
  const heightRatioBonus = Math.min(30, fv.eyes.heightRatio * 60)

  // 眼距适中（0.9-1.1 为最佳）
  const spacingContrib = fv.eyes.spacing

  // 肤质亮度（配合眼神）
  const skinContrib = fv.skin.brightness * 0.3

  const charisma = sizeContrib * 0.4 + heightRatioBonus + spacingContrib * 0.3 + skinContrib

  return Math.min(100, Math.max(0, charisma))
}

/**
 * 计算肤质光泽度
 */
function calcSkinQuality(fv: FaceFeatureVector): number {
  return (fv.skin.brightness * 0.6 + fv.skin.uniformity * 0.4)
}

/**
 * 计算脸型立体感
 */
function calcFaceSculpt(fv: FaceFeatureVector): number {
  // 下颌线清晰度
  const jawlineContrib = fv.faceShape.jawlineSharpness

  // 颧骨适度突出
  const cheekboneScore = fv.faceShape.cheekboneProminence > 40 && fv.faceShape.cheekboneProminence < 75
    ? 80
    : fv.faceShape.cheekboneProminence > 30
      ? 60
      : 40

  // 鼻梁高度（对立体感有贡献）
  const noseContrib = fv.nose.bridgeHeight * 0.5

  const sculpt = jawlineContrib * 0.4 + cheekboneScore * 0.35 + noseContrib * 0.25

  return Math.min(100, Math.max(0, sculpt))
}

/**
 * 计算整体协调性
 */
function calcHarmony(fv: FaceFeatureVector): number {
  // 五官比例的内在协调性
  // 嘴宽与眼距的关系（理想：嘴宽约等于两内眼角间距）
  const lipEyeRatio = fv.lips.widthRatio / (fv.eyes.widthRatio * 2)
  const lipEyeHarmony = 100 - Math.abs(lipEyeRatio - 1) * 100

  // 鼻翼与嘴宽关系（理想：鼻翼宽约等于嘴宽*0.7-0.85）
  const noseToLipRatio = fv.nose.ratio / fv.lips.widthRatio
  const noseLipHarmony = 100 - Math.abs(noseToLipRatio - 0.8) * 150

  // 对称性作为协调基础
  const symContrib = fv.symmetryScore * 0.3

  const harmony = lipEyeHarmony * 0.35 + noseLipHarmony * 0.35 + symContrib

  return Math.min(100, Math.max(0, harmony))
}

/**
 * 计算时代审美契合度（趣味维度）
 */
function calcTrendy(fv: FaceFeatureVector): number {
  let score = 65 // 基础分

  // 当前审美趋势：清冷感、甜系、高级感

  // 清冷感加分：眼型细长、脸型偏长
  if (fv.eyes.type === '单眼皮' || fv.eyes.heightRatio < 0.28) score += 8
  if (fv.faceShape.type === '瓜子脸' || fv.faceShape.type === '长脸') score += 8

  // 甜系加分：大眼睛、圆脸
  if (fv.eyes.type === '双眼皮' && fv.eyes.size > 70) score += 8
  if (fv.faceShape.type === '圆脸' || fv.faceShape.type === '心形脸') score += 5

  // 高级感加分：对称性高、鼻梁挺拔
  if (fv.symmetryScore > 80) score += 5
  if (fv.nose.bridgeHeight > 75) score += 8

  // 元气感加分：嘴角上扬
  if (fv.lips.cornerAngle > 3) score += 5

  return Math.min(100, Math.max(0, score))
}

/**
 * 生成各五官维度的展示评分和描述
 */
function generateFeatureAnalysis(fv: FaceFeatureVector): FeatureAnalysis {
  // 眼睛
  const eyeScore = Math.round(
    fv.eyes.size * 0.4 + fv.eyes.symmetry * 0.3 + fv.eyes.spacing * 0.3
  )
  const eyeTypeBonus = fv.eyes.type === '双眼皮' ? 8 : fv.eyes.type === '内双' ? 4 : 0
  const eyeDisplayScore = Math.min(100, eyeScore + eyeTypeBonus)

  let eyeDesc = ''
  const eyeTypeText = fv.eyes.type
  if (fv.eyes.size > 75) {
    eyeDesc = `您拥有大而有神的${eyeTypeText}，`
  } else if (fv.eyes.size > 55) {
    eyeDesc = `眼睛大小适中（${eyeTypeText}），`
  } else {
    eyeDesc = `眼睛较为精巧（${eyeTypeText}），`
  }
  if (fv.eyes.spacing > 75) {
    eyeDesc += '眼距适中，符合五眼标准。'
  } else if (fv.eyes.spacing > 55) {
    eyeDesc += '眼距比例协调，双眼神采奕奕。'
  } else {
    eyeDesc += '两眼间距略有特色，妆容可适当修饰。'
  }
  if (fv.eyes.symmetry > 80) {
    eyeDesc += '左右对称性极佳，眼部轮廓清晰自然。'
  }

  // 眉毛
  const browScore = Math.round(fv.brows.symmetry * 0.5 + fv.brows.spacing * 0.3 + fv.brows.thickness * 0.2)
  let browDesc = `眉形为${fv.brows.shape}，`
  if (fv.brows.symmetry > 80) {
    browDesc += '左右眉毛对称性好，'
  } else {
    browDesc += '两眉略有差异（这很正常），'
  }
  browDesc += '整体眉形自然，可根据脸型进行修饰调整。'

  // 鼻子
  const noseScore = Math.round(fv.nose.bridgeHeight * 0.6 + fv.nose.wingWidth * 0.4)
  let noseDesc = `鼻型为${fv.nose.type}，`
  if (fv.nose.bridgeHeight > 70) {
    noseDesc += '鼻梁挺拔，立体感强，'
  } else if (fv.nose.bridgeHeight > 50) {
    noseDesc += '鼻梁高度适中，'
  } else {
    noseDesc += '鼻梁较为圆润平缓，'
  }
  if (fv.nose.wingWidth > 70) {
    noseDesc += '鼻翼宽度比例协调。'
  } else if (fv.nose.wingWidth > 50) {
    noseDesc += '鼻翼宽度适中，整体和谐。'
  } else {
    noseDesc += '鼻翼略宽，可通过修容来优化视觉效果。'
  }

  // 嘴唇
  const lipScore = Math.round(fv.lips.size * 0.5 + fv.lips.fullness * 0.5)
  let lipDesc = `唇形为${fv.lips.shape}，`
  if (fv.lips.fullness > 70) {
    lipDesc += '嘴唇饱满丰盈，充满活力，'
  } else if (fv.lips.fullness > 50) {
    lipDesc += '唇部轮廓清晰，厚薄适中，'
  } else {
    lipDesc += '嘴唇较薄，轮廓优雅，'
  }
  if (fv.lips.cornerAngle > 3) {
    lipDesc += '嘴角微微上扬，天生带着一丝甜美笑意。'
  } else if (fv.lips.cornerAngle > -3) {
    lipDesc += '嘴型平和自然，给人温和亲切之感。'
  } else {
    lipDesc += '嘴角略微下垂，展现出一种神秘感。'
  }

  // 脸型
  const faceScore = Math.round(
    fv.faceShape.jawlineSharpness * 0.4 + fv.faceShape.cheekboneProminence * 0.3 + 60 * 0.3
  )
  let faceDesc = `脸型为${fv.faceShape.type}，`
  if (fv.faceShape.jawlineSharpness > 70) {
    faceDesc += '下颌线条清晰，轮廓感强，'
  } else if (fv.faceShape.jawlineSharpness > 50) {
    faceDesc += '面部轮廓柔和自然，'
  } else {
    faceDesc += '轮廓圆润柔美，'
  }
  faceDesc += `宽高比为${fv.faceShape.widthHeightRatio.toFixed(2)}，整体比例${
    fv.faceShape.widthHeightRatio > 0.65 && fv.faceShape.widthHeightRatio < 0.85 ? '和谐' : '独特'
  }。`

  // 肤质
  const skinScore = Math.round(fv.skin.brightness * 0.6 + fv.skin.uniformity * 0.4)
  let skinDesc = `肤色为${fv.skin.tone}调，`
  if (fv.skin.brightness > 75) {
    skinDesc += '皮肤亮度高，呈现出健康光泽，'
  } else if (fv.skin.brightness > 55) {
    skinDesc += '肤质健康自然，'
  } else {
    skinDesc += '皮肤偏暗，注重保湿和防晒可以改善，'
  }
  if (fv.skin.uniformity > 70) {
    skinDesc += '肤色均匀，是羡煞旁人的好皮肤。'
  } else {
    skinDesc += '肤色均匀度一般，日常护肤可有效改善。'
  }

  // 整体
  const overallScore = Math.round(
    fv.symmetryScore * 0.4 + fv.goldenRatioScore * 0.35 + (eyeDisplayScore + browScore + noseScore + lipScore + faceScore + skinScore) / 6 * 0.25
  )
  let overallDesc = `面部对称性${fv.symmetryScore > 80 ? '优秀' : fv.symmetryScore > 65 ? '良好' : '一般'}，`
  overallDesc += `黄金比例契合度${fv.goldenRatioScore > 80 ? '极高' : fv.goldenRatioScore > 65 ? '较高' : '一般'}，`
  overallDesc += '整体五官协调，展现出独特的个人魅力。'

  return {
    eyes: {
      name: '眼睛',
      score: boostScore(Math.min(100, eyeDisplayScore)),
      description: eyeDesc,
      details: [
        { label: '眼睛大小', score: boostScore(fv.eyes.size) },
        { label: '眼距比例', score: boostScore(fv.eyes.spacing) },
        { label: '左右对称', score: boostScore(fv.eyes.symmetry) },
      ],
    },
    brows: {
      name: '眉毛',
      score: boostScore(Math.min(100, browScore)),
      description: browDesc,
      details: [
        { label: '眉形', score: boostScore(fv.brows.symmetry) },
        { label: '眉间距', score: boostScore(fv.brows.spacing) },
      ],
    },
    nose: {
      name: '鼻子',
      score: boostScore(Math.min(100, noseScore)),
      description: noseDesc,
      details: [
        { label: '鼻梁高度', score: boostScore(fv.nose.bridgeHeight) },
        { label: '鼻翼比例', score: boostScore(fv.nose.wingWidth) },
      ],
    },
    lips: {
      name: '嘴唇',
      score: boostScore(Math.min(100, lipScore)),
      description: lipDesc,
      details: [
        { label: '唇部大小', score: boostScore(fv.lips.size) },
        { label: '唇形饱满', score: boostScore(fv.lips.fullness) },
      ],
    },
    face: {
      name: '脸型',
      score: boostScore(Math.min(100, faceScore)),
      description: faceDesc,
      details: [
        { label: '下颌线条', score: boostScore(fv.faceShape.jawlineSharpness) },
        { label: '颧骨比例', score: boostScore(fv.faceShape.cheekboneProminence) },
      ],
    },
    skin: {
      name: '肤质',
      score: boostScore(Math.min(100, skinScore)),
      description: skinDesc,
      details: [
        { label: '肤色亮度', score: boostScore(fv.skin.brightness) },
        { label: '肤色均匀', score: boostScore(fv.skin.uniformity) },
      ],
    },
    overall: {
      name: '整体',
      score: boostScore(Math.min(100, overallScore)),
      description: overallDesc,
    },
  }
}

/**
 * 计算总评分及各维度评分
 */
export function calculateScore(fv: FaceFeatureVector): {
  totalScore: number
  dimensions: ScoreDimension[]
  features: FeatureAnalysis
} {
  // 各维度分数
  const refinement = calcRefinement(fv)
  const goldenRatio = fv.goldenRatioScore
  const symmetry = fv.symmetryScore
  const eyeCharisma = calcEyeCharisma(fv)
  const skinQuality = calcSkinQuality(fv)
  const faceSculpt = calcFaceSculpt(fv)
  const harmony = calcHarmony(fv)
  const trendy = calcTrendy(fv)

  // 加权计算总分
  const rawScore =
    refinement * DIMENSION_WEIGHTS.refinement +
    goldenRatio * DIMENSION_WEIGHTS.goldenRatio +
    symmetry * DIMENSION_WEIGHTS.symmetry +
    eyeCharisma * DIMENSION_WEIGHTS.eyeCharisma +
    skinQuality * DIMENSION_WEIGHTS.skinQuality +
    faceSculpt * DIMENSION_WEIGHTS.faceSculpt +
    harmony * DIMENSION_WEIGHTS.harmony +
    trendy * DIMENSION_WEIGHTS.trendy

  // 加入 ±2 分随机偏差（种子基于特征值以保证同一张图得分稳定）
  const seed = Math.round(fv.symmetryScore + fv.goldenRatioScore + fv.eyes.size)
  const randomOffset = ((seed % 5) - 2) // -2 到 +2
  const totalScore = boostScore(Math.min(100, Math.max(0, Math.round(rawScore + randomOffset))))

  // 构建维度展示数据（各维度也应用分数提升）
  const dimensions: ScoreDimension[] = [
    {
      name: '五官精致度',
      score: boostScore(Math.round(refinement)),
      description: '眼、鼻、口、眉各器官的形态完整度',
    },
    {
      name: '黄金比例',
      score: boostScore(Math.round(goldenRatio)),
      description: '三庭五眼与黄金分割的契合程度',
    },
    {
      name: '面部对称性',
      score: boostScore(Math.round(symmetry)),
      description: '左右半脸特征点的对称程度',
    },
    {
      name: '眼神气质',
      score: boostScore(Math.round(eyeCharisma)),
      description: '眼睛大小及在面部中的神采感',
    },
    {
      name: '肤质光泽',
      score: boostScore(Math.round(skinQuality)),
      description: '皮肤亮度与均匀度的视觉评估',
    },
    {
      name: '脸型立体',
      score: boostScore(Math.round(faceSculpt)),
      description: '下颌轮廓与颧骨的立体程度',
    },
    {
      name: '整体协调',
      score: boostScore(Math.round(harmony)),
      description: '五官之间的比例与整体协调感',
    },
    {
      name: '时代审美',
      score: boostScore(Math.round(trendy)),
      description: '与当下主流审美趋势的契合度',
    },
  ]

  const features = generateFeatureAnalysis(fv)

  return { totalScore, dimensions, features }
}
