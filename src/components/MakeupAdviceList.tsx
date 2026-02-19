import { motion } from 'framer-motion'
import type { MakeupAdvice } from '../types'

interface MakeupAdviceListProps {
  advices: MakeupAdvice[]
}

const CATEGORY_CONFIG: Record<string, { icon: string; gradientFrom: string; gradientTo: string }> = {
  '眉形': { icon: '✏️', gradientFrom: '#C084FC', gradientTo: '#818CF8' },
  '眼妆': { icon: '👁️', gradientFrom: '#FF6B9D', gradientTo: '#C084FC' },
  '唇妆': { icon: '💄', gradientFrom: '#F472B6', gradientTo: '#FB923C' },
  '修容': { icon: '✨', gradientFrom: '#FCD34D', gradientTo: '#F472B6' },
  '发型': { icon: '💇‍♀️', gradientFrom: '#34D399', gradientTo: '#60A5FA' },
  '风格': { icon: '🎨', gradientFrom: '#60A5FA', gradientTo: '#34D399' },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export default function MakeupAdviceList({ advices }: MakeupAdviceListProps) {
  return (
    <div className="w-full mb-4">
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
        <h2 className="font-semibold text-lg" style={{ color: '#1C1917' }}>专属美妆建议</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
      >
        {advices.map((advice, index) => {
          const config = CATEGORY_CONFIG[advice.category] || {
            icon: advice.icon || '💡',
            gradientFrom: '#FF6B9D',
            gradientTo: '#C084FC',
          }

          return (
            <motion.div
              key={index}
              className="glass-card p-5 mb-3"
              variants={itemVariants}
              whileHover={{
                y: -2,
                boxShadow: '0 8px 32px rgba(255,107,157,0.16), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-start gap-3">
                {/* 分类图标 */}
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${config.gradientFrom}20 0%, ${config.gradientTo}20 100%)`,
                    border: `1px solid ${config.gradientFrom}20`,
                  }}
                >
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* 分类标签 + 标题 */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${config.gradientFrom}15 0%, ${config.gradientTo}15 100%)`,
                        color: config.gradientFrom,
                        border: `1px solid ${config.gradientFrom}25`,
                      }}
                    >
                      {advice.category}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: '#1C1917' }}
                    >
                      {advice.title}
                    </span>
                  </div>

                  {/* 描述文字 */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#57534E' }}
                  >
                    {advice.description}
                  </p>

                  {/* 小贴士 */}
                  {advice.tips && advice.tips.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {advice.tips.map((tip, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-xs"
                          style={{ color: '#A8A29E' }}
                        >
                          <span
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: config.gradientFrom }}
                          >•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
