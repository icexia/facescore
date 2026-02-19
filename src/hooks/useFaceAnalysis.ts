import { useState, useCallback, useRef } from 'react'
import type { AppState, AppError, FaceAnalysisResult, Gender } from '../types'
import { loadModels, detectFace, createImageElement } from '../utils/faceDetection'
import { analyzeFaceFeatures, estimateGender } from '../utils/faceAnalysis'
import { calculateScore } from '../utils/scoreCalculator'
import { determineBeautyType, getBeautyTypeInfo, determineMaleBeautyType, getMaleBeautyTypeInfo } from '../utils/beautyType'
import { generateMakeupAdvice } from '../utils/makeupAdvice'
import { getScoreGrade } from '../types'

/**
 * 分析进度文案序列
 */
const PROGRESS_MESSAGES = [
  '正在识别人脸...',
  '分析五官比例...',
  '计算颜值评分...',
  '生成专属报告...',
]

interface UseFaceAnalysisReturn {
  state: AppState
  result: FaceAnalysisResult | null
  error: AppError | null
  progress: string
  analyzeImage: (imageSource: string | File | HTMLImageElement, gender?: Gender) => Promise<void>
  reset: () => void
}

/**
 * 人脸分析自定义 Hook
 * 封装完整的分析流程：模型加载 -> 人脸检测 -> 特征分析 -> 评分计算 -> 结果生成
 */
export function useFaceAnalysis(): UseFaceAnalysisReturn {
  const [state, setState] = useState<AppState>('idle')
  const [result, setResult] = useState<FaceAnalysisResult | null>(null)
  const [error, setError] = useState<AppError | null>(null)
  const [progress, setProgress] = useState<string>('')
  const abortRef = useRef<boolean>(false)

  const reset = useCallback(() => {
    abortRef.current = true
    setState('idle')
    setResult(null)
    setError(null)
    setProgress('')
    // 下一帧重置abort标志
    setTimeout(() => {
      abortRef.current = false
    }, 0)
  }, [])

  /**
   * 更新进度文案（模拟分阶段进度）
   */
  const updateProgress = async (messageIndex: number, delay: number = 800): Promise<void> => {
    if (abortRef.current) return
    const message = PROGRESS_MESSAGES[messageIndex] || PROGRESS_MESSAGES[PROGRESS_MESSAGES.length - 1]
    setProgress(message)
    await new Promise<void>((resolve) => setTimeout(resolve, delay))
  }

  /**
   * 将各种类型的图像输入转换为HTMLImageElement
   */
  const resolveImageElement = async (imageSource: string | File | HTMLImageElement): Promise<HTMLImageElement> => {
    if (imageSource instanceof HTMLImageElement) {
      return imageSource
    }
    if (imageSource instanceof File) {
      const objectUrl = URL.createObjectURL(imageSource)
      const img = await createImageElement(objectUrl)
      // 注意：调用方需要在使用完后revoke URL，这里为了简单不在此处处理
      return img
    }
    // 字符串 URL 或 DataURL
    return createImageElement(imageSource)
  }

  const analyzeImage = useCallback(async (imageSource: string | File | HTMLImageElement, gender: Gender = 'auto'): Promise<void> => {
    abortRef.current = false
    setState('analyzing')
    setError(null)
    setResult(null)

    try {
      // 阶段1：加载模型
      await updateProgress(0, 300)
      await loadModels()

      if (abortRef.current) return

      // 解析图像元素
      const imageElement = await resolveImageElement(imageSource)

      if (abortRef.current) return

      // 阶段2：人脸检测
      await updateProgress(1, 200)
      let detectionResult
      try {
        detectionResult = await detectFace(imageElement)
      } catch (detectionError) {
        // 检测失败（AppError 格式）
        const appError = detectionError as AppError
        if (appError.type) {
          setError(appError)
          setState('error')
          return
        }
        throw detectionError
      }

      if (abortRef.current) return

      // 处理人脸过小的情况（可继续分析，但给出提示）
      if (detectionResult.isFaceTooSmall) {
        // 这里我们不阻止分析，只是记录状态，UI层可以根据此状态展示提示
        console.warn('人脸过小，分析精度可能受影响')
      }

      // 阶段3：五官特征分析
      await updateProgress(2, 300)
      const featureVector = analyzeFaceFeatures(
        detectionResult.landmarks,
        imageElement,
        detectionResult.faceBox
      )

      if (abortRef.current) return

      // 阶段4：评分计算
      const { totalScore, dimensions, features } = calculateScore(featureVector)

      // 确定实际性别（auto 时自动估算）
      const resolvedGender: 'male' | 'female' =
        gender === 'auto' ? estimateGender(featureVector) : gender

      // 确定颜值类型（根据性别分支）
      let beautyType
      let beautyTypeInfo
      if (resolvedGender === 'male') {
        beautyType = determineMaleBeautyType(featureVector)
        beautyTypeInfo = getMaleBeautyTypeInfo(beautyType)
      } else {
        beautyType = determineBeautyType(featureVector)
        beautyTypeInfo = getBeautyTypeInfo(beautyType)
      }

      // 获取评分等级
      const grade = getScoreGrade(totalScore)

      // 生成化妆/造型建议
      const makeupAdvices = generateMakeupAdvice(featureVector, beautyType, resolvedGender)

      // 生成总结文案
      const summary = generateSummary(totalScore, grade.label, beautyType)

      await updateProgress(3, 400)

      if (abortRef.current) return

      // 构建完整结果
      const analysisResult: FaceAnalysisResult = {
        totalScore,
        gender: resolvedGender,
        beautyType,
        beautyTypeInfo,
        grade,
        summary,
        features,
        featureVector,
        dimensions,
        makeupAdvices,
        analyzedAt: new Date(),
        confidence: detectionResult.confidence,
        landmarks: detectionResult.landmarkPoints,
        expressions: detectionResult.expressionData,
        faceBox: detectionResult.faceBox,
      }

      setResult(analysisResult)
      setState('result')
      setProgress('')

    } catch (err) {
      if (abortRef.current) return

      console.error('人脸分析出错:', err)
      const appError: AppError = {
        type: 'unknown',
        message: '分析过程出现错误，请重试',
        suggestion: '请确保图片清晰，人脸完整可见',
      }
      setError(appError)
      setState('error')
      setProgress('')
    }
  }, [])

  return {
    state,
    result,
    error,
    progress,
    analyzeImage,
    reset,
  }
}

/**
 * 根据评分和颜值类型生成一句话总结
 */
function generateSummary(score: number, gradeLabel: string, beautyType: string): string {
  const scoreDescriptions: Record<string, string[]> = {
    '绝世': [
      `${gradeLabel}级颜值，您的五官精致度和整体协调性达到了极高水准，是真正令人心动的容颜。`,
      `恭喜！AI评估您的颜值达到${gradeLabel}级，五官精致协调，是万中难觅的天赐容颜。`,
    ],
    '倾城': [
      `${gradeLabel}级颜值，您的面部轮廓和五官比例都非常出色，在人群中绝对是耀眼的存在。`,
      `${gradeLabel}级美貌，您的颜值远超平均水平，五官精致且协调，令人过目难忘。`,
    ],
    '出众': [
      `${gradeLabel}级颜值，您的五官各有亮点，整体形象清新好看，是同龄人中的佼佼者。`,
      `${gradeLabel}级颜值在线，您的面部特征和谐自然，展现出令人愉悦的美丽。`,
    ],
    '亮眼': [
      `${gradeLabel}级颜值，您的外貌有明显亮点，整体看起来清新自然、赏心悦目。`,
      `${gradeLabel}级的你，五官各有特色，通过妆容和造型能进一步提升整体魅力。`,
    ],
    '可人': [
      `${gradeLabel}级颜值，五官端正，散发出自然亲和的气质，是很耐看的类型。`,
      `${gradeLabel}级的你，拥有自然朴素的美感，整体形象温和可亲，给人良好印象。`,
    ],
    '普通': [
      `${gradeLabel}级颜值，外貌平和自然，气质胜于颜值，有很大的提升空间。`,
      `${gradeLabel}型外貌，颜值虽平凡，但通过精心的妆容和造型可以大幅提升个人魅力。`,
    ],
    '潜力': [
      `${gradeLabel}级颜值，别担心，通过妆容和造型的改造，您的颜值可以大幅提升！`,
      `${gradeLabel}级的你，颜值改造空间很大，参考我们的专业建议，绽放你的独特魅力。`,
    ],
    '个性': [
      `${gradeLabel}级颜值，您的外貌风格独特，与主流审美有所不同，但个性魅力同样珍贵。`,
      `${gradeLabel}级的你，颜值不在常规范畴内，但风格定位比分数更重要，找到属于你的独特美学。`,
    ],
  }

  const descriptions = scoreDescriptions[gradeLabel]
  if (descriptions) {
    const idx = Math.floor(score / 10) % descriptions.length
    return `${descriptions[idx]} 颜值类型：${beautyType}。`
  }

  return `综合评分 ${score} 分，颜值类型为${beautyType}，${gradeLabel}级颜值展现出独特的个人魅力。`
}
