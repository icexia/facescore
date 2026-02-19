import { motion } from 'framer-motion'
import type { FeatureAnalysis as FeatureAnalysisType } from '../types'

interface FeatureAnalysisProps {
  features: FeatureAnalysisType
}

interface FeatureCardProps {
  icon: string
  name: string
  score: number
  description: string
  tags: string[]
  gradientFrom: string
  gradientTo: string
  index: number
}

function ProgressBar({ value, gradientFrom, gradientTo }: { value: number; gradientFrom: string; gradientTo: string }) {
  return (
    <div
      className="w-full relative rounded-full overflow-hidden"
      style={{ height: '8px', background: 'rgba(0,0,0,0.06)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          boxShadow: value > 80 ? `0 0 6px ${gradientTo}88` : 'none',
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{
          duration: 1.0,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.2,
        }}
      />
      {/* 高分时显示末端光点 */}
      {value > 80 && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: gradientTo,
            boxShadow: `0 0 8px ${gradientTo}`,
          }}
          initial={{ left: 0, opacity: 0 }}
          whileInView={{ left: `calc(${value}% - 6px)`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.0,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
        />
      )}
    </div>
  )
}

function FeatureCard({ icon, name, score, description, tags, gradientFrom, gradientTo, index }: FeatureCardProps) {
  return (
    <motion.div
      className="glass-card p-5 mb-3"
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
        delay: index * 0.1,
      }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(255,107,157,0.16), 0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* 卡片头部 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* 图标 */}
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}20 0%, ${gradientTo}20 100%)`,
            }}
          >
            {icon}
          </div>
          <span
            className="font-semibold text-base"
            style={{ color: '#1C1917' }}
          >
            {name}
          </span>
        </div>
        {/* 分数 */}
        <span
          className="text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {score}分
        </span>
      </div>

      {/* 进度条 */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs" style={{ color: '#A8A29E' }}>综合评分</span>
          <span className="text-xs" style={{ color: '#A8A29E' }}>{score}/100</span>
        </div>
        <ProgressBar value={score} gradientFrom={gradientFrom} gradientTo={gradientTo} />
      </div>

      {/* 分割线 */}
      <div className="border-t mb-3" style={{ borderColor: 'rgba(0,0,0,0.06)' }} />

      {/* 描述文字 */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#57534E' }}>
        {description}
      </p>

      {/* 特征标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}15 0%, ${gradientTo}15 100%)`,
                color: gradientFrom,
                border: `1px solid ${gradientFrom}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

const FEATURE_CONFIG = [
  {
    key: 'eyes' as const,
    icon: '👁️',
    name: '眼睛',
    gradientFrom: '#FF6B9D',
    gradientTo: '#C084FC',
    tagsFromDesc: ['双眼皮', '大眼睛', '眼神深邃'],
  },
  {
    key: 'brows' as const,
    icon: '✏️',
    name: '眉毛',
    gradientFrom: '#C084FC',
    gradientTo: '#818CF8',
    tagsFromDesc: ['眉形自然', '眉距适中', '浓密有型'],
  },
  {
    key: 'nose' as const,
    icon: '👃',
    name: '鼻子',
    gradientFrom: '#60A5FA',
    gradientTo: '#34D399',
    tagsFromDesc: ['鼻梁挺拔', '鼻翼精巧', '立体感强'],
  },
  {
    key: 'lips' as const,
    icon: '💋',
    name: '嘴唇',
    gradientFrom: '#F472B6',
    gradientTo: '#FB923C',
    tagsFromDesc: ['唇形饱满', '嘴角上扬', 'M峰明显'],
  },
  {
    key: 'face' as const,
    icon: '🫶',
    name: '脸型',
    gradientFrom: '#34D399',
    gradientTo: '#60A5FA',
    tagsFromDesc: ['瓜子脸', '轮廓清晰', '线条流畅'],
  },
  {
    key: 'skin' as const,
    icon: '✨',
    name: '肤质',
    gradientFrom: '#FCD34D',
    gradientTo: '#F472B6',
    tagsFromDesc: ['光泽感强', '肤色均匀', '细腻光滑'],
  },
]

export default function FeatureAnalysisComponent({ features }: FeatureAnalysisProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
        <h2 className="font-semibold text-lg" style={{ color: '#1C1917' }}>五官详细分析</h2>
      </motion.div>

      {/* 特征卡片列表 */}
      {FEATURE_CONFIG.map((config, index) => {
        const feature = features[config.key]
        // 从description提取或生成tags
        const tags = feature.details?.map(d => d.label) || config.tagsFromDesc

        return (
          <FeatureCard
            key={config.key}
            icon={config.icon}
            name={config.name}
            score={feature.score}
            description={feature.description}
            tags={tags}
            gradientFrom={config.gradientFrom}
            gradientTo={config.gradientTo}
            index={index}
          />
        )
      })}
    </motion.div>
  )
}
