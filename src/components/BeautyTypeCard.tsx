import { motion } from 'framer-motion'
import type { BeautyTypeInfo } from '../types'

interface BeautyTypeCardProps {
  beautyTypeInfo: BeautyTypeInfo
}

const BEAUTY_TYPE_EMOJI: Record<string, string> = {
  '清冷仙气型': '❄️',
  '甜系邻家型': '🍬',
  '御姐女王型': '👑',
  '元气少女型': '⚡',
  '高级混血型': '🌟',
  '英气飒爽型': '⚔️',
  '知性优雅型': '📚',
  '复古东方型': '🏮',
  '少年感中性型': '🎭',
  '暖系治愈型': '☀️',
}

export default function BeautyTypeCard({ beautyTypeInfo }: BeautyTypeCardProps) {
  const { type, label, description, features, celebrities, makeupStyle, colors } = beautyTypeInfo
  const emoji = BEAUTY_TYPE_EMOJI[type] || '✨'

  return (
    <motion.div
      className="w-full mb-4"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* 区块标题 */}
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="w-1 h-5 rounded-full"
          style={{ background: 'linear-gradient(180deg, #FF6B9D 0%, #C084FC 100%)' }}
        />
        <h2 className="font-semibold text-lg" style={{ color: '#1C1917' }}>颜值类型</h2>
      </motion.div>

      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.80)',
          boxShadow: '0 4px 24px rgba(255,107,157,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        {/* 渐变背景头部 */}
        <div
          className="px-5 pt-6 pb-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`,
          }}
        >
          {/* 装饰性大圆 */}
          <div
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            }}
          />
          <div
            className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
            }}
          />

          {/* 主内容 */}
          <div className="relative flex items-start gap-4">
            {/* 大号Emoji图标 */}
            <motion.div
              className="w-16 h-16 rounded-[18px] flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}25 0%, ${colors.secondary}25 100%)`,
                border: `1px solid ${colors.primary}30`,
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {emoji}
            </motion.div>

            <div className="flex-1 min-w-0">
              {/* 类型名称 */}
              <h3
                className="text-xl font-bold mb-0.5"
                style={{ color: '#1C1917' }}
              >
                {type}
              </h3>
              {/* 英文标签 */}
              <span
                className="text-sm font-medium"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {label}
              </span>
            </div>
          </div>
        </div>

        {/* 卡片主体 */}
        <div className="px-5 pb-5">
          {/* 描述文字 */}
          <p
            className="text-sm leading-relaxed mt-4 mb-4"
            style={{ color: '#57534E' }}
          >
            {description}
          </p>

          {/* 特征标签 */}
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: '#A8A29E' }}>主要特征</p>
            <div className="flex flex-wrap gap-1.5">
              {features.map((feature, i) => (
                <motion.span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 100%)`,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}25`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>

          {/* 分割线 */}
          <div className="border-t mb-4" style={{ borderColor: 'rgba(0,0,0,0.06)' }} />

          {/* 代表明星 */}
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: '#A8A29E' }}>代表明星</p>
            <div className="flex flex-wrap gap-2">
              {celebrities.map((celeb, i) => (
                <span
                  key={i}
                  className="text-sm font-medium"
                  style={{ color: '#57534E' }}
                >
                  {i > 0 && <span className="mr-2 text-xs" style={{ color: '#D6D3D1' }}>·</span>}
                  {celeb}
                </span>
              ))}
            </div>
          </div>

          {/* 推荐化妆风格 */}
          <div
            className="rounded-[12px] px-4 py-3"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
            }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: '#A8A29E' }}>💄 推荐化妆风格</p>
            <p className="text-sm" style={{ color: '#57534E' }}>{makeupStyle}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
