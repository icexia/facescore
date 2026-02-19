import { motion } from 'framer-motion'
import type { AppError } from '../types'

interface ErrorPromptProps {
  error: AppError
  onRetry: () => void
}

const ERROR_CONFIG: Record<string, {
  icon: string
  title: string
  subtitle: string
  tips: string[]
}> = {
  'no-face': {
    icon: '🙈',
    title: '未检测到人脸',
    subtitle: '请上传包含清晰正面人脸的照片，确保光线充足、正面朝前',
    tips: [
      '人脸占画面 1/3 以上效果最佳',
      '确保光线充足，避免逆光拍摄',
      '请正面对着镜头，不要遮挡面部',
      '建议使用自然光下拍摄的近照',
    ],
  },
  'face-too-small': {
    icon: '🔍',
    title: '人脸图像太小',
    subtitle: '检测到的人脸区域过小，建议上传更清晰的近距离照片',
    tips: [
      '建议人脸占画面 1/3 以上',
      '靠近镜头拍摄，效果更精准',
      '避免全身照，建议上半身或证件照风格',
    ],
  },
  'multiple-faces': {
    icon: '👥',
    title: '检测到多张人脸',
    subtitle: '请上传只包含一张人脸的照片，以获得准确的分析结果',
    tips: [
      '请使用只有您一人的单人照',
      '裁剪照片去除其他人物',
    ],
  },
  'low-quality': {
    icon: '📷',
    title: '图片质量不足',
    subtitle: '图片模糊或分辨率过低，请上传更清晰的照片',
    tips: [
      '使用高清照片，分辨率至少 500×500',
      '避免截图或经过压缩的图片',
      '确保照片对焦清晰，不模糊',
    ],
  },
  'file-error': {
    icon: '⚠️',
    title: '图片读取失败',
    subtitle: '图片文件损坏或格式不支持，请更换图片',
    tips: [
      '支持格式：JPG、PNG、WEBP',
      '文件大小不超过 10MB',
    ],
  },
  'unknown': {
    icon: '😔',
    title: '分析出现问题',
    subtitle: '暂时无法完成分析，请稍后重试',
    tips: [
      '检查网络连接是否正常',
      '尝试上传其他照片',
      '刷新页面后重试',
    ],
  },
}

export default function ErrorPrompt({ error, onRetry }: ErrorPromptProps) {
  const config = ERROR_CONFIG[error.type] || ERROR_CONFIG['unknown']

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="rounded-[20px] p-6"
        style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1.5px solid rgba(239,68,68,0.20)',
        }}
      >
        {/* 图标区域 */}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
          style={{
            background: 'rgba(239,68,68,0.10)',
          }}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {config.icon}
        </motion.div>

        {/* 标题 */}
        <motion.h3
          className="text-xl font-semibold text-center mb-2"
          style={{ color: '#1C1917' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {config.title}
        </motion.h3>

        {/* 副文案 */}
        <motion.p
          className="text-sm text-center leading-relaxed mb-5"
          style={{ color: '#57534E' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {error.message || config.subtitle}
        </motion.p>

        {/* 小贴士 */}
        <motion.div
          className="rounded-[12px] p-4 mb-5"
          style={{ background: 'rgba(239,68,68,0.06)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-medium mb-2.5" style={{ color: '#EF4444' }}>
            💡 什么样的照片效果最好？
          </p>
          {config.tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs mb-1.5 last:mb-0"
              style={{ color: '#57534E' }}
            >
              <span className="mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }}>✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </motion.div>

        {/* 重新选择照片按钮 */}
        <motion.button
          className="w-full h-[52px] rounded-[16px] text-white font-semibold text-base btn-gradient"
          onClick={onRetry}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(255,107,157,0.55)' }}
          whileTap={{ scale: 0.98 }}
        >
          重新选择照片
        </motion.button>
      </div>
    </motion.div>
  )
}
