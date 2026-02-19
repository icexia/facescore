import * as faceapi from 'face-api.js'
import type {
  FaceFeatureVector,
  EyeFeatures,
  BrowFeatures,
  NoseFeatures,
  LipFeatures,
  FaceShapeFeatures,
  SkinFeatures,
} from '../types'


// 两点距离
function dist(a: faceapi.Point, b: faceapi.Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

// 点集平均中心
function centroid(pts: faceapi.Point[]): faceapi.Point {
  const x = pts.reduce((s, p) => s + p.x, 0) / pts.length
  const y = pts.reduce((s, p) => s + p.y, 0) / pts.length
  return new faceapi.Point(x, y)
}

// 将距离值转换为评分（越接近理想值得分越高）
// 使用高斯曲线：小偏差温和扣分，只有大偏差才显著降低
function ratioToScore(value: number, ideal: number, tolerance: number): number {
  const diff = Math.abs(value - ideal)
  const sigma = tolerance * 1.2 // 加宽容差带
  const score = 100 * Math.exp(-(diff * diff) / (2 * sigma * sigma))
  return Math.max(30, Math.min(100, score))
}

// 线性映射到0-100（带底线保护）
function normalize(value: number, min: number, max: number): number {
  const raw = ((value - min) / (max - min)) * 100
  return Math.max(30, Math.min(100, raw))
}

/**
 * 分析眼睛特征
 * 左眼: 36-41, 右眼: 42-47
 * 36=左眼左角, 39=左眼右角, 37/38=上眼皮, 40/41=下眼皮
 */
function analyzeEyes(pts: faceapi.Point[], faceWidth: number): EyeFeatures {
  // 左眼宽度
  const leftEyeWidth = dist(pts[36], pts[39])
  // 右眼宽度
  const rightEyeWidth = dist(pts[42], pts[45])
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2

  // 左眼高度（上下眼皮中点距离）
  const leftEyeHeight = (dist(pts[37], pts[41]) + dist(pts[38], pts[40])) / 2
  // 右眼高度
  const rightEyeHeight = (dist(pts[43], pts[47]) + dist(pts[44], pts[46])) / 2
  const avgEyeHeight = (leftEyeHeight + rightEyeHeight) / 2

  // 眼距（两内眼角距离）
  const eyeSpacing = dist(pts[39], pts[42])

  // 眼宽比（眼宽/脸宽）
  const widthRatio = avgEyeWidth / faceWidth

  // 眼高宽比（判断眼型）
  const heightRatio = avgEyeHeight / avgEyeWidth

  // 对称性评分（两眼大小差异）
  const symmetryDiff = Math.abs(leftEyeWidth - rightEyeWidth) / avgEyeWidth
  const symmetry = Math.max(0, 100 - symmetryDiff * 200)

  // 眼睛大小评分：理想眼宽约为脸宽的1/5 ≈ 0.18-0.22
  const sizeScore = ratioToScore(widthRatio, 0.20, 0.08)

  // 眼距评分：理想眼距约等于一个眼宽（内眦间距/眼宽 ≈ 1.0）
  const spacingRatio = eyeSpacing / avgEyeWidth
  const spacingScore = ratioToScore(spacingRatio, 1.0, 0.4)

  // 判断眼型（基于高宽比）
  let eyeType: EyeFeatures['type'] = '标准'
  if (heightRatio < 0.25) {
    eyeType = '单眼皮'
  } else if (heightRatio >= 0.25 && heightRatio < 0.32) {
    eyeType = '内双'
  } else if (heightRatio >= 0.32) {
    eyeType = '双眼皮'
  }

  return {
    size: sizeScore,
    spacing: spacingScore,
    symmetry,
    type: eyeType,
    widthRatio,
    heightRatio,
  }
}

/**
 * 分析眉毛特征
 * 左眉: 17-21, 右眉: 22-26
 */
function analyzeBrows(pts: faceapi.Point[]): BrowFeatures {
  // 左眉宽度
  const leftBrowWidth = dist(pts[17], pts[21])
  // 右眉宽度
  const rightBrowWidth = dist(pts[22], pts[26])

  // 左眉最高点（18-20中间点相对17-21连线的偏移）
  const leftBrowCurve = pts[19].y - (pts[17].y + pts[21].y) / 2

  // 眉间距
  const browSpacing = dist(pts[21], pts[22])

  // 眉毛走势角度
  const leftBrowAngle = Math.atan2(pts[17].y - pts[21].y, pts[21].x - pts[17].x) * (180 / Math.PI)
  const rightBrowAngle = Math.atan2(pts[22].y - pts[26].y, pts[26].x - pts[22].x) * (180 / Math.PI)
  const avgBrowAngle = (leftBrowAngle + rightBrowAngle) / 2

  // 判断眉形
  let shape: BrowFeatures['shape'] = '平眉'
  if (avgBrowAngle > 8) {
    shape = '上扬眉'
  } else if (avgBrowAngle < -5) {
    shape = '下垂眉'
  } else if (Math.abs(leftBrowCurve) > leftBrowWidth * 0.15) {
    shape = '弓形眉'
  } else {
    shape = '平眉'
  }

  // 眉毛对称性
  const browWidthDiff = Math.abs(leftBrowWidth - rightBrowWidth) / ((leftBrowWidth + rightBrowWidth) / 2)
  const symmetry = Math.max(0, 100 - browWidthDiff * 300)

  // 眉间距评分（理想眉间距约等于一个眼宽，这里用相对比例）
  const avgEyeWidth = (leftBrowWidth + rightBrowWidth) / 2
  const spacingRatio = browSpacing / avgEyeWidth
  const spacingScore = ratioToScore(spacingRatio, 0.9, 0.4)

  // 浓密度估计（基于眉毛面积比）
  const browArea = (leftBrowWidth + rightBrowWidth) / 2 * 5
  const thickness = normalize(browArea, 50, 200)

  return {
    shape,
    spacing: spacingScore,
    thickness: Math.min(100, Math.max(30, thickness)),
    symmetry,
  }
}

/**
 * 分析鼻子特征
 * 鼻梁: 27-30, 鼻翼: 31-35
 * 27=鼻根, 30=鼻尖, 31=左鼻翼外, 35=右鼻翼外, 33=鼻中
 */
function analyzeNose(pts: faceapi.Point[], faceWidth: number, faceHeight: number): NoseFeatures {
  // 鼻梁高度（鼻根到鼻尖的垂直距离）
  const noseHeight = dist(pts[27], pts[30])

  // 鼻翼宽度（左右鼻翼外侧距离）
  const noseWingWidth = dist(pts[31], pts[35])

  // 鼻翼宽度比（鼻翼宽/脸宽）
  const ratio = noseWingWidth / faceWidth

  // 鼻梁高度比（鼻高/脸高）
  const bridgeHeightRatio = noseHeight / faceHeight

  // 鼻梁高度评分：理想鼻高约为脸高的1/3 ≈ 0.28-0.35
  const bridgeHeight = ratioToScore(bridgeHeightRatio, 0.30, 0.10)

  // 鼻翼宽度评分：理想鼻翼宽约为脸宽的0.25-0.30
  const wingWidth = ratioToScore(ratio, 0.27, 0.08)

  // 判断鼻型
  let type: NoseFeatures['type'] = '标准型'
  if (bridgeHeightRatio > 0.35) {
    type = '挺拔型'
  } else if (ratio > 0.32) {
    type = '宽翼型'
  } else if (bridgeHeightRatio < 0.22) {
    type = '圆润型'
  }

  return {
    bridgeHeight,
    wingWidth,
    ratio,
    type,
  }
}

/**
 * 分析嘴唇特征
 * 外轮廓: 48-59, 内轮廓: 60-67
 * 48=左嘴角, 54=右嘴角, 51=上唇中, 57=下唇中
 */
function analyzeLips(pts: faceapi.Point[], faceWidth: number): LipFeatures {
  // 嘴宽（左右嘴角距离）
  const mouthWidth = dist(pts[48], pts[54])

  // 上唇厚度（嘴角连线中点到上唇中点）
  const upperLipThickness = Math.abs(pts[51].y - (pts[48].y + pts[54].y) / 2)
  // 下唇厚度（嘴角连线中点到下唇中点）
  const lowerLipThickness = Math.abs(pts[57].y - (pts[48].y + pts[54].y) / 2)
  const avgLipThickness = (upperLipThickness + lowerLipThickness) / 2

  // 嘴宽比（嘴宽/脸宽）
  const widthRatio = mouthWidth / faceWidth

  // 唇厚比（唇厚/嘴宽）
  const thicknessRatio = avgLipThickness / mouthWidth

  // 嘴角角度（正数=上扬，负数=下垂）
  const cornerAngle = Math.atan2(
    ((pts[48].y + pts[54].y) / 2) - pts[51].y,
    mouthWidth / 2
  ) * (180 / Math.PI)

  // 嘴唇大小评分：理想嘴宽约为脸宽的0.30-0.36
  const sizeScore = ratioToScore(widthRatio, 0.33, 0.08)

  // 唇部饱满度评分：理想厚度比约0.35-0.45
  const fullnessScore = ratioToScore(thicknessRatio, 0.40, 0.12)

  // 判断唇形
  let shape: LipFeatures['shape'] = '标准唇'
  // 上唇中间是否有明显M形（上唇中点比两侧高）
  const upperLipM = Math.abs(pts[49].y - pts[51].y) + Math.abs(pts[53].y - pts[51].y)
  if (thicknessRatio > 0.45) {
    shape = '厚唇'
  } else if (thicknessRatio < 0.28) {
    shape = '薄唇'
  } else if (upperLipM > mouthWidth * 0.1) {
    shape = 'M型峰唇'
  }

  return {
    size: sizeScore,
    fullness: fullnessScore,
    shape,
    widthRatio,
    thicknessRatio,
    cornerAngle,
  }
}

/**
 * 分析脸型
 * 下颌线: 0-16
 */
function analyzeFaceShape(pts: faceapi.Point[]): FaceShapeFeatures {
  // 脸宽（颧骨处，约第2-14点最宽处）
  const faceWidth = dist(pts[1], pts[15])
  // 下颌宽（下颌线最宽处，约第4-12点）
  const jawWidth = dist(pts[4], pts[12])
  // 脸高（眉间到下颌）
  const faceHeight = dist(pts[8], centroid([pts[19], pts[24]]))

  // 宽高比
  const widthHeightRatio = faceWidth / faceHeight

  // 下颌线清晰度（通过下颌线的曲率变化判断）
  const jawlinePoints = pts.slice(0, 17)
  let jawlineCurvature = 0
  for (let i = 1; i < jawlinePoints.length - 1; i++) {
    const a = dist(jawlinePoints[i - 1], jawlinePoints[i])
    const b = dist(jawlinePoints[i], jawlinePoints[i + 1])
    const c = dist(jawlinePoints[i - 1], jawlinePoints[i + 1])
    // 通过三角形面积估算曲率
    const s = (a + b + c) / 2
    const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)))
    jawlineCurvature += area
  }
  const jawlineSharpness = normalize(jawlineCurvature / jawlinePoints.length, 0, 100)

  // 颧骨突出度（脸宽/下颌宽之差）
  const cheekboneProminence = normalize((faceWidth - jawWidth) / faceWidth, 0, 0.3) * 100

  // 判断脸型
  let type: FaceShapeFeatures['type'] = '椭圆脸'
  const jawRatio = jawWidth / faceWidth

  if (widthHeightRatio > 0.85) {
    if (jawRatio > 0.85) {
      type = '方脸'
    } else {
      type = '圆脸'
    }
  } else if (widthHeightRatio < 0.65) {
    type = '长脸'
  } else {
    if (jawRatio < 0.65) {
      type = '心形脸'
    } else if (jawRatio < 0.75) {
      type = '瓜子脸'
    } else if (cheekboneProminence > 60) {
      type = '菱形脸'
    } else {
      type = '椭圆脸'
    }
  }

  return {
    type,
    widthHeightRatio,
    jawlineSharpness: Math.min(100, Math.max(0, jawlineSharpness)),
    cheekboneProminence: Math.min(100, Math.max(0, cheekboneProminence)),
  }
}

/**
 * 分析肤质（基于图像数据）
 */
function analyzeSkin(imageElement: HTMLImageElement | HTMLCanvasElement, faceBox: { x: number; y: number; width: number; height: number }): SkinFeatures {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('无法创建canvas上下文')

    // 取脸部中心区域用于分析
    const sampleX = faceBox.x + faceBox.width * 0.2
    const sampleY = faceBox.y + faceBox.height * 0.2
    const sampleW = faceBox.width * 0.6
    const sampleH = faceBox.height * 0.6

    canvas.width = Math.max(1, Math.floor(sampleW))
    canvas.height = Math.max(1, Math.floor(sampleH))

    ctx.drawImage(
      imageElement,
      sampleX, sampleY, sampleW, sampleH,
      0, 0, canvas.width, canvas.height
    )

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const pixelCount = canvas.width * canvas.height

    let totalR = 0, totalG = 0, totalB = 0
    let brightnessValues: number[] = []

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      totalR += r
      totalG += g
      totalB += b
      // 感知亮度
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b
      brightnessValues.push(brightness)
    }

    const avgR = totalR / pixelCount
    const avgG = totalG / pixelCount
    const avgB = totalB / pixelCount
    const avgBrightness = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB)

    // 亮度均匀度（标准差越小越均匀）
    const avgBr = brightnessValues.reduce((s, v) => s + v, 0) / brightnessValues.length
    const variance = brightnessValues.reduce((s, v) => s + (v - avgBr) ** 2, 0) / brightnessValues.length
    const stdDev = Math.sqrt(variance)

    // 亮度评分（理想亮度120-200）
    const brightnessScore = ratioToScore(avgBrightness, 160, 60)

    // 均匀度评分（标准差越小越好）
    const uniformityScore = Math.max(0, 100 - (stdDev / 255) * 200)

    // 判断肤色冷暖（基于R-B通道差异）
    let tone: SkinFeatures['tone'] = '中性'
    const warmth = avgR - avgB
    if (warmth > 20) {
      tone = '暖调'
    } else if (warmth < -10) {
      tone = '冷调'
    }

    return {
      brightness: Math.min(100, Math.max(0, brightnessScore)),
      uniformity: Math.min(100, Math.max(0, uniformityScore)),
      tone,
    }
  } catch {
    // 若无法获取像素数据（跨域等问题），返回默认值
    return {
      brightness: 65,
      uniformity: 65,
      tone: '中性',
    }
  }
}

/**
 * 计算面部对称性
 */
function calculateSymmetry(pts: faceapi.Point[]): number {
  // 面部中轴线（取鼻梁点27-30的平均x）
  const noseCenterX = (pts[27].x + pts[28].x + pts[29].x + pts[30].x) / 4

  // 对称点对（左右对称的特征点索引）
  const symmetryPairs: [number, number][] = [
    [0, 16],  // 下颌左右端
    [1, 15],
    [2, 14],
    [3, 13],
    [4, 12],
    [5, 11],
    [6, 10],
    [7, 9],
    [17, 26], // 眉毛
    [18, 25],
    [19, 24],
    [20, 23],
    [21, 22],
    [36, 45], // 眼角
    [37, 44],
    [38, 43],
    [39, 42],
    [40, 47],
    [41, 46],
    [31, 35], // 鼻翼
    [32, 34],
    [48, 54], // 嘴角
    [49, 53],
    [50, 52],
    [59, 55],
    [58, 56],
  ]

  let totalDiff = 0
  let count = 0

  for (const [leftIdx, rightIdx] of symmetryPairs) {
    if (leftIdx >= pts.length || rightIdx >= pts.length) continue
    const left = pts[leftIdx]
    const right = pts[rightIdx]
    // 计算左点到中轴的距离和右点到中轴的距离的差值
    const leftDist = Math.abs(left.x - noseCenterX)
    const rightDist = Math.abs(right.x - noseCenterX)
    // 垂直位置差
    const yDiff = Math.abs(left.y - right.y)
    // 综合对称差
    const diff = Math.abs(leftDist - rightDist) + yDiff * 0.5
    totalDiff += diff
    count++
  }

  if (count === 0) return 70

  const avgDiff = totalDiff / count
  // 平均差越小对称性越好，差值20以上认为非常不对称
  const symmetryScore = Math.max(0, 100 - (avgDiff / 20) * 100)
  return Math.min(100, symmetryScore)
}

/**
 * 计算黄金比例契合度（三庭五眼）
 */
function calculateGoldenRatio(pts: faceapi.Point[]): { score: number; threeZonesRatio: [number, number, number]; fiveEyesRatio: number } {
  // 三庭：
  // 第一庭：发际线(约pts[19])到眉心(pts[21].y和pts[22].y的中点)
  // 第二庭：眉心到鼻底(pts[33])
  // 第三庭：鼻底到下颌(pts[8])

  const browCenter = (pts[21].y + pts[22].y) / 2
  const noseBase = pts[33].y
  const chin = pts[8].y

  // 假设发际线在眉毛上方 (pts[27] - 面部高度的约15%)
  const faceTop = pts[27].y - (chin - pts[27].y) * 0.2

  const zone1 = browCenter - faceTop
  const zone2 = noseBase - browCenter
  const zone3 = chin - noseBase
  const totalHeight = zone1 + zone2 + zone3

  const ratio1 = zone1 / totalHeight
  const ratio2 = zone2 / totalHeight
  const ratio3 = zone3 / totalHeight

  // 理想三庭各约1/3
  const threeZonesScore = 100 -
    (Math.abs(ratio1 - 0.333) + Math.abs(ratio2 - 0.333) + Math.abs(ratio3 - 0.333)) * 150

  // 五眼：
  // 脸宽约等于5个眼宽
  const leftEyeWidth = dist(pts[36], pts[39])
  const rightEyeWidth = dist(pts[42], pts[45])
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2

  const faceWidth = dist(pts[0], pts[16])
  const fiveEyesIdeal = avgEyeWidth * 5
  const fiveEyesRatioDiff = Math.abs(faceWidth - fiveEyesIdeal) / fiveEyesIdeal

  // 两内眼角间距约等于一个眼宽
  const innerEyeSpacing = dist(pts[39], pts[42])
  const innerSpacingRatioDiff = Math.abs(innerEyeSpacing - avgEyeWidth) / avgEyeWidth

  const fiveEyesScore = 100 - (fiveEyesRatioDiff + innerSpacingRatioDiff) * 50

  const totalScore = (threeZonesScore * 0.5 + fiveEyesScore * 0.5)

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    threeZonesRatio: [ratio1, ratio2, ratio3],
    fiveEyesRatio: fiveEyesRatioDiff,
  }
}

/**
 * 完整的五官特征分析
 */
export function analyzeFaceFeatures(
  landmarks: faceapi.FaceLandmarks68,
  imageElement: HTMLImageElement | HTMLCanvasElement,
  faceBox: { x: number; y: number; width: number; height: number }
): FaceFeatureVector {
  const pts = landmarks.positions

  // 脸宽（两端下颌宽）
  const faceWidth = dist(pts[0], pts[16])
  // 脸高（下颌到眉间）
  const browCenter = centroid([pts[19], pts[20], pts[21], pts[22], pts[23], pts[24]])
  const faceHeight = dist(pts[8], browCenter)

  const eyes = analyzeEyes(pts, faceWidth)
  const brows = analyzeBrows(pts)
  const nose = analyzeNose(pts, faceWidth, faceHeight)
  const lips = analyzeLips(pts, faceWidth)
  const faceShape = analyzeFaceShape(pts)
  const skin = analyzeSkin(imageElement, faceBox)
  const symmetryScore = calculateSymmetry(pts)
  const goldenRatio = calculateGoldenRatio(pts)

  return {
    eyes,
    brows,
    nose,
    lips,
    faceShape,
    skin,
    symmetryScore,
    goldenRatioScore: goldenRatio.score,
    threeZonesRatio: goldenRatio.threeZonesRatio,
    fiveEyesRatio: goldenRatio.fiveEyesRatio,
  }
}

/**
 * 基于五官特征向量估算性别
 * 返回 'male' 或 'female'
 */
export function estimateGender(fv: FaceFeatureVector): 'male' | 'female' {
  let maleScore = 0
  // 男性特征：方脸或长脸、粗眉、下颌线清晰、鼻梁高
  if (fv.faceShape.type === '方脸' || fv.faceShape.type === '长脸') maleScore += 20
  if (fv.brows.thickness > 65) maleScore += 20  // 眉毛较粗
  if (fv.faceShape.jawlineSharpness > 65) maleScore += 20  // 下颌线清晰
  if (fv.nose.bridgeHeight > 60) maleScore += 10
  if (fv.eyes.heightRatio < 0.30) maleScore += 10  // 眼睛较小/窄
  if (fv.lips.fullness < 50) maleScore += 10  // 嘴唇不厚
  if (fv.faceShape.widthHeightRatio > 0.80) maleScore += 10  // 脸偏宽
  return maleScore >= 50 ? 'male' : 'female'
}

export { analyzeEyes, analyzeBrows, analyzeNose, analyzeLips, analyzeFaceShape, analyzeSkin, calculateSymmetry, calculateGoldenRatio }
