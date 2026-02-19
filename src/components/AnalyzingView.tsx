import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnalyzingViewProps {
  imageUrl: string
  onCancel?: () => void
}

const ANALYZING_STEPS = [
  '正在识别人脸...',
  '分析五官比例...',
  '计算颜值评分...',
  '生成专属报告...',
]

export default function AnalyzingView({ imageUrl, onCancel }: AnalyzingViewProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 文案切换：每1.5秒切换一次
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < ANALYZING_STEPS.length - 1) return prev + 1
        return prev
      })
    }, 1500)

    // 进度条：模拟渐进
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 8 + 2
      if (currentProgress >= 95) {
        currentProgress = 95
        clearInterval(progressInterval)
      }
      setProgress(currentProgress)
    }, 200)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1.0] }}
    >
      {/* 照片 + 扫描动画区域 */}
      <div className="relative mb-10" style={{ width: '180px', height: '180px' }}>
        {/* 旋转虚线圆环 */}
        <div
          className="absolute rounded-full"
          style={{
            width: '180px',
            height: '180px',
            top: '0',
            left: '0',
            border: '2px dashed rgba(255,107,157,0.40)',
            animation: 'ringRotate 8s linear infinite',
          }}
        />
        {/* 渐变发光外圈 */}
        <div
          className="absolute rounded-full"
          style={{
            width: '160px',
            height: '160px',
            top: '10px',
            left: '10px',
            background: 'transparent',
            boxShadow: '0 0 32px rgba(255,107,157,0.30)',
          }}
        />

        {/* 照片容器 */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: '140px',
            height: '140px',
            top: '20px',
            left: '20px',
            border: '3px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%) border-box',
            boxShadow: '0 0 32px rgba(255,107,157,0.30)',
          }}
        >
          <img
            src={imageUrl}
            alt="分析中"
            className="w-full h-full object-cover"
          />

          {/* 扫描线 */}
          <div
            className="absolute left-0 right-0"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #FF6B9D 30%, #C084FC 70%, transparent 100%)',
              animation: 'scanLine 2s ease-in-out infinite',
              boxShadow: '0 0 8px rgba(255,107,157,0.80)',
            }}
          />

          {/* 扫描遮罩 */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(192,132,252,0.05) 100%)',
            }}
          />

          {/* 人脸关键点（装饰性）- 相对于照片容器定位 */}
          {[
            { top: '28%', left: '30%', delay: '0s' },
            { top: '28%', left: '70%', delay: '0.15s' },
            { top: '50%', left: '50%', delay: '0.3s' },
            { top: '65%', left: '35%', delay: '0.45s' },
            { top: '65%', left: '65%', delay: '0.6s' },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                top: dot.top,
                left: dot.left,
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
                animation: `faceDotPulse 1s ease-in-out ${dot.delay} infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 状态文字 */}
      <div className="h-8 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            className="text-base font-medium"
            style={{ color: '#57534E' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {ANALYZING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 进度条 */}
      <div
        className="rounded-full overflow-hidden mb-8"
        style={{
          width: '200px',
          height: '4px',
          background: 'rgba(0,0,0,0.06)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #FF6B9D 0%, #C084FC 100%)',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* 步骤指示点 */}
      <div className="flex gap-2 mb-8">
        {ANALYZING_STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: i === stepIndex ? '20px' : '6px',
              height: '6px',
              background: i <= stepIndex
                ? 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)'
                : 'rgba(0,0,0,0.10)',
            }}
            animate={{ width: i === stepIndex ? 20 : 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* 取消按钮 */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: '#A8A29E' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#FF6B9D'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#A8A29E'
          }}
        >
          取消
        </button>
      )}
    </motion.div>
  )
}
