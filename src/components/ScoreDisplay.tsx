import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ScoreGrade, ScoreColorMap } from '../types'

interface ScoreDisplayProps {
  score: number
  grade: ScoreGrade
  colorMap: ScoreColorMap
  summary: string
  imageUrl?: string
}

// SVG圆环参数
const CIRCLE_RADIUS = 88
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS // ≈ 553

function useCountUp(target: number, duration: number = 1600): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = 0
    const startValue = 0

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      setValue(Math.round(startValue + (target - startValue) * easedProgress))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}

export default function ScoreDisplay({ score, grade, colorMap, summary, imageUrl }: ScoreDisplayProps) {
  const displayScore = useCountUp(score, 1600)
  const [ringAnimated, setRingAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setRingAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const dashOffset = ringAnimated
    ? CIRCLE_CIRCUMFERENCE * (1 - score / 100)
    : CIRCLE_CIRCUMFERENCE

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* 评分圆环 + 头像区 */}
      <div
        className="w-full rounded-[24px] flex flex-col items-center py-8 px-6 mb-4"
        style={{
          background: `linear-gradient(135deg, rgba(255,107,157,0.08) 0%, rgba(192,132,252,0.08) 100%)`,
        }}
      >
        {/* 头像（小圆） */}
        {imageUrl && (
          <motion.div
            className="w-16 h-16 rounded-full overflow-hidden mb-4"
            style={{
              border: '3px solid white',
              boxShadow: '0 0 20px rgba(255,107,157,0.25)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <img src={imageUrl} alt="头像" className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* SVG圆环进度条 */}
        <div className="relative flex items-center justify-center" style={{ width: '200px', height: '200px' }}>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorMap.from} />
                <stop offset="100%" stopColor={colorMap.to} />
              </linearGradient>
            </defs>
            {/* 背景轨道 */}
            <circle
              cx="100"
              cy="100"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="12"
            />
            {/* 进度弧 */}
            <circle
              cx="100"
              cy="100"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                filter: 'drop-shadow(0 0 6px rgba(255,107,157,0.40))',
              }}
            />
          </svg>

          {/* 圆环中心内容 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* 星标 */}
            <motion.div
              className="mb-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorMap.from} />
                    <stop offset="100%" stopColor={colorMap.to} />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill="url(#starGradient)"
                />
              </svg>
            </motion.div>

            {/* 评分大数字 */}
            <div
              className="font-bold leading-none"
              style={{
                fontSize: '72px',
                fontFamily: '"SF Pro Display", "Inter", "DM Sans", system-ui, sans-serif',
                background: `linear-gradient(135deg, ${colorMap.from} 0%, ${colorMap.to} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              {displayScore}
            </div>

            {/* "分" 单位 */}
            <div
              className="text-sm font-medium -mt-1"
              style={{ color: '#A8A29E' }}
            >
              分
            </div>
          </div>
        </div>

        {/* 圆环下方：评级标签 */}
        <motion.div
          className="mt-3 px-4 py-1.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${colorMap.from} 0%, ${colorMap.to} 100%)`,
            boxShadow: `0 4px 12px ${colorMap.from}55`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="text-white text-sm font-semibold tracking-wider">
            {grade.grade} {grade.label}
          </span>
        </motion.div>

        {/* 一句话评语 */}
        <motion.p
          className="text-sm text-center mt-3 leading-relaxed px-4"
          style={{ color: '#57534E' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.4 }}
        >
          {summary}
        </motion.p>
      </div>
    </motion.div>
  )
}
