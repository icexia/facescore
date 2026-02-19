import * as faceapi from 'face-api.js'
import type { AppError, FaceLandmark, ExpressionAnalysis } from '../types'

const MODEL_URL = '/models'

let modelsLoaded = false
let modelsLoading = false

/**
 * 加载所有需要的 face-api.js 模型
 */
export async function loadModels(): Promise<void> {
  if (modelsLoaded) return
  if (modelsLoading) {
    // 等待已有的加载完成
    await new Promise<void>((resolve) => {
      const check = setInterval(() => {
        if (modelsLoaded) {
          clearInterval(check)
          resolve()
        }
      }, 100)
    })
    return
  }

  modelsLoading = true
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])
    modelsLoaded = true
  } finally {
    modelsLoading = false
  }
}

export interface FaceDetectionResult {
  detection: faceapi.FaceDetection
  landmarks: faceapi.FaceLandmarks68
  expressions: faceapi.FaceExpressions
  landmarkPoints: FaceLandmark[]
  expressionData: ExpressionAnalysis
  faceBox: {
    x: number
    y: number
    width: number
    height: number
  }
  confidence: number
  isFaceTooSmall: boolean
}

/**
 * 多策略检测参数：从高精度到低阈值依次尝试
 * - inputSize 越大能检测越小的人脸，但耗时更长
 * - scoreThreshold 越低越容易检出但误检也更多
 */
const DETECTION_STRATEGIES = [
  { inputSize: 416, scoreThreshold: 0.4 },
  { inputSize: 608, scoreThreshold: 0.3 },
  { inputSize: 320, scoreThreshold: 0.3 },
  { inputSize: 224, scoreThreshold: 0.2 },
] as const

/** 最终置信度过滤阈值 */
const MIN_CONFIDENCE = 0.5

/**
 * 预处理：将过大的图片缩放到合理尺寸
 * 手机拍照常见 4000+ 像素，过大图片会导致检测效果下降
 */
function preprocessImage(
  imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
): HTMLImageElement | HTMLCanvasElement | HTMLVideoElement {
  if (!(imageElement instanceof HTMLImageElement)) return imageElement

  const MAX_DIM = 1600
  const w = imageElement.naturalWidth || imageElement.width
  const h = imageElement.naturalHeight || imageElement.height

  if (w <= MAX_DIM && h <= MAX_DIM) return imageElement

  const scale = MAX_DIM / Math.max(w, h)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(w * scale)
  canvas.height = Math.round(h * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) return imageElement
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)
  return canvas
}

/**
 * 检测人脸，返回检测结果
 * - 多策略检测：依次尝试不同 inputSize 和 scoreThreshold
 * - 置信度 >= 0.5 才认为是有效人脸
 * - 多人脸时取面积最大的
 * - 人脸面积 < 图片面积 5% 时标记为过小
 */
export async function detectFace(
  imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): Promise<FaceDetectionResult> {
  await loadModels()

  // 预处理大图
  const processedElement = preprocessImage(imageElement)

  // 多策略依次尝试
  for (const strategy of DETECTION_STRATEGIES) {
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: strategy.inputSize,
      scoreThreshold: strategy.scoreThreshold,
    })

    const detections = await faceapi
      .detectAllFaces(processedElement, options)
      .withFaceLandmarks()
      .withFaceExpressions()

    if (!detections || detections.length === 0) continue

    // 过滤置信度低的检测结果
    const validDetections = detections.filter(
      (d) => d.detection.score >= MIN_CONFIDENCE,
    )

    if (validDetections.length === 0) continue

    // 取面积最大的人脸
    const largest = validDetections.reduce((prev, curr) => {
      const prevArea = prev.detection.box.width * prev.detection.box.height
      const currArea = curr.detection.box.width * curr.detection.box.height
      return currArea > prevArea ? curr : prev
    })

    // 计算图片总面积（使用原始图片尺寸）
    const imageWidth = imageElement instanceof HTMLImageElement
      ? imageElement.naturalWidth || imageElement.width
      : imageElement.width
    const imageHeight = imageElement instanceof HTMLImageElement
      ? imageElement.naturalHeight || imageElement.height
      : imageElement.height

    const imageArea = imageWidth * imageHeight
    const faceBox = largest.detection.box

    // 如果用了缩放后的 canvas，需要将坐标还原到原始图片坐标系
    let scaledFaceBox = faceBox
    if (processedElement !== imageElement && processedElement instanceof HTMLCanvasElement) {
      const scaleX = imageWidth / processedElement.width
      const scaleY = imageHeight / processedElement.height
      scaledFaceBox = {
        x: faceBox.x * scaleX,
        y: faceBox.y * scaleY,
        width: faceBox.width * scaleX,
        height: faceBox.height * scaleY,
      } as typeof faceBox
    }

    const faceArea = scaledFaceBox.width * scaledFaceBox.height
    const faceRatio = faceArea / imageArea

    // 检查人脸是否过小（小于图片面积5%）
    const isFaceTooSmall = faceRatio < 0.05

    // 转换 landmarks 为标准格式（同样需要坐标还原）
    let landmarkPoints: FaceLandmark[]
    if (processedElement !== imageElement && processedElement instanceof HTMLCanvasElement) {
      const scaleX = imageWidth / processedElement.width
      const scaleY = imageHeight / processedElement.height
      landmarkPoints = largest.landmarks.positions.map((pt, i) => ({
        x: pt.x * scaleX,
        y: pt.y * scaleY,
        type: getLandmarkType(i),
      }))
    } else {
      landmarkPoints = largest.landmarks.positions.map((pt, i) => ({
        x: pt.x,
        y: pt.y,
        type: getLandmarkType(i),
      }))
    }

    // 转换表情数据
    const expressions = largest.expressions
    const expressionData: ExpressionAnalysis = {
      neutral: expressions.neutral,
      happy: expressions.happy,
      sad: expressions.sad,
      angry: expressions.angry,
      fearful: expressions.fearful,
      disgusted: expressions.disgusted,
      surprised: expressions.surprised,
    }

    return {
      detection: largest.detection,
      landmarks: largest.landmarks,
      expressions: largest.expressions,
      landmarkPoints,
      expressionData,
      faceBox: {
        x: scaledFaceBox.x,
        y: scaledFaceBox.y,
        width: scaledFaceBox.width,
        height: scaledFaceBox.height,
      },
      confidence: largest.detection.score,
      isFaceTooSmall,
    }
  }

  // 所有策略都未检测到人脸
  const error: AppError = {
    type: 'no-face',
    message: '未检测到人脸',
    suggestion: '请上传光线充足、正面拍摄的清晰照片，建议人脸占画面 1/3 以上',
  }
  throw error
}

/**
 * 根据特征点索引获取类型标注（68点模型）
 */
function getLandmarkType(index: number): string {
  if (index >= 0 && index <= 16) return 'jawline'
  if (index >= 17 && index <= 21) return 'leftBrow'
  if (index >= 22 && index <= 26) return 'rightBrow'
  if (index >= 27 && index <= 35) return 'nose'
  if (index >= 36 && index <= 41) return 'leftEye'
  if (index >= 42 && index <= 47) return 'rightEye'
  if (index >= 48 && index <= 67) return 'mouth'
  return 'unknown'
}

/**
 * 检查模型是否已加载
 */
export function isModelsLoaded(): boolean {
  return modelsLoaded
}

/**
 * 从图像URL创建HTMLImageElement
 */
export function createImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = src
  })
}
