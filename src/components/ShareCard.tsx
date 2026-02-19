import type { FaceAnalysisResult } from '../types'
import { getScoreColorMap } from '../types'
import { DISCLAIMER } from '../config/disclaimer'

interface ShareCardProps {
  result: FaceAnalysisResult
  imageUrl: string
}

const FEATURE_EMOJI: Record<string, string> = {
  '眼睛': '👁️',
  '鼻子': '👃',
  '嘴唇': '👄',
  '眉毛': '✏️',
  '脸型': '💎',
  '肤质': '✨',
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
  '阳光运动型': '🏀',
  '儒雅书生型': '📖',
  '霸气总裁型': '🏢',
  '邻家暖男型': '🌻',
  '冷酷型男型': '🧊',
  '文艺清新型': '🎨',
  '潮流先锋型': '🔥',
  '硬汉型男型': '💪',
}

/**
 * 紧凑型分享卡片 — 专为截图导出设计
 * CSS 保持简单，兼容 html2canvas：
 * - 不使用 background-clip: text（html2canvas 不支持）
 * - 不使用 backdrop-filter
 * - 不使用 CSS Grid（用 flexbox 替代）
 * - 全部 inline style
 */
export default function ShareCard({ result, imageUrl }: ShareCardProps) {
  const colorMap = getScoreColorMap(result.totalScore)
  const { grade, beautyTypeInfo, features, totalScore } = result
  const emoji = BEAUTY_TYPE_EMOJI[beautyTypeInfo.type] || '✨'

  const featureList = [
    features.eyes,
    features.nose,
    features.lips,
    features.brows,
    features.face,
    features.skin,
  ]

  return (
    <div
      style={{
        width: '375px',
        background: '#FAFAF9',
        fontFamily: '"PingFang SC", "Noto Sans SC", "Helvetica Neue", system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 顶部渐变装饰条 */}
      <div
        style={{
          height: '4px',
          background: `linear-gradient(90deg, ${colorMap.from} 0%, ${colorMap.to} 100%)`,
        }}
      />

      {/* Header 品牌 */}
      <div style={{ textAlign: 'center', padding: '20px 24px 0' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#FF6B9D',
            letterSpacing: '2px',
          }}
        >
          颜值评分
        </span>
        <div style={{ fontSize: '11px', color: '#D6D3D1', marginTop: '4px' }}>
          AI 智能颜值测评
        </div>
      </div>

      {/* 评分区域：头像 + 评分 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          margin: '20px 24px',
          padding: '20px',
          borderRadius: '20px',
          background: 'white',
          boxShadow: '0 2px 16px rgba(255,107,157,0.08)',
        }}
      >
        {/* 头像 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid white',
            boxShadow: '0 2px 12px rgba(255,107,157,0.20)',
          }}
        >
          <img
            src={imageUrl}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* 分数 + 等级 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                fontSize: '56px',
                fontWeight: 800,
                lineHeight: 1,
                color: colorMap.from,
                fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              {totalScore}
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#A8A29E',
              }}
            >
              分
            </span>
          </div>
          <div
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 14px',
              borderRadius: '20px',
              background: `linear-gradient(135deg, ${colorMap.from} 0%, ${colorMap.to} 100%)`,
              color: 'white',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            {grade.grade} {grade.label}
          </div>
        </div>
      </div>

      {/* 颜值类型 */}
      <div
        style={{
          margin: '0 24px 16px',
          padding: '14px 16px',
          borderRadius: '16px',
          background: `${beautyTypeInfo.colors.primary}12`,
          border: `1px solid ${beautyTypeInfo.colors.primary}25`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>{emoji}</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1C1917' }}>
              {beautyTypeInfo.type}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: beautyTypeInfo.colors.primary,
                fontWeight: 500,
                marginTop: '1px',
              }}
            >
              {beautyTypeInfo.label}
            </div>
          </div>
        </div>
      </div>

      {/* 五官评分网格 — 用 flexbox 模拟 3 列网格 */}
      <div
        style={{
          margin: '0 24px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {featureList.map((f) => (
          <div
            key={f.name}
            style={{
              width: 'calc(33.33% - 6px)',
              padding: '10px 8px',
              borderRadius: '12px',
              textAlign: 'center',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.04)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: '18px', marginBottom: '2px' }}>
              {FEATURE_EMOJI[f.name] || '✨'}
            </div>
            <div style={{ fontSize: '11px', color: '#A8A29E', marginBottom: '2px' }}>
              {f.name}
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1C1917',
              }}
            >
              {f.score}
            </div>
          </div>
        ))}
      </div>

      {/* 底部水印 */}
      <div
        style={{
          textAlign: 'center',
          padding: '12px 24px 16px',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontSize: '11px', color: '#D6D3D1' }}>
          {DISCLAIMER.shareWatermark} · facescore.pages.dev
        </div>
      </div>
    </div>
  )
}
