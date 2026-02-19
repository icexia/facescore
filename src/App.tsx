import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import ImageUploader from './components/ImageUploader'
import AnalyzingView from './components/AnalyzingView'
import ScoreDisplay from './components/ScoreDisplay'
import FeatureAnalysisComponent from './components/FeatureAnalysis'
import BeautyTypeCard from './components/BeautyTypeCard'
import MakeupAdviceList from './components/MakeupAdviceList'
import ErrorPrompt from './components/ErrorPrompt'
import ShareButton from './components/ShareButton'
import ShareCard from './components/ShareCard'

import type { FaceAnalysisResult, Gender } from './types'
import { getScoreColorMap } from './types'
import { useFaceAnalysis } from './hooks/useFaceAnalysis'

// ============================================================
// Header 组件
// ============================================================
function Header({ onBack, showBack }: { onBack?: () => void; showBack?: boolean }) {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        height: '56px',
      }}
    >
      <div
        className="max-w-[480px] mx-auto px-4 h-full flex items-center justify-between"
      >
        {/* 左侧：返回按钮（结果页用）或空 */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(0,0,0,0.04)' }}
              aria-label="返回"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,107,157,0.08)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57534E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* 中间：标题 */}
        <h1
          className="font-bold text-lg"
          style={{
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: '"PingFang SC", "Noto Serif SC", serif',
          }}
        >
          颜值评分
        </h1>

        {/* 右侧：占位 */}
        <div className="w-10" />
      </div>
    </header>
  )
}

// ============================================================
// 结果视图
// ============================================================
interface ResultViewProps {
  result: FaceAnalysisResult
  imageUrl: string
  onRestart: () => void
}

function ResultView({ result, imageUrl, onRestart }: ResultViewProps) {
  const shareRef = useRef<HTMLDivElement>(null)
  const colorMap = getScoreColorMap(result.totalScore)

  return (
    <div>
      {/* 隐藏的紧凑分享卡片（用于截图导出） */}
      <div
        style={{
          position: 'fixed',
          left: '-10000px',
          top: '0',
          pointerEvents: 'none',
        }}
      >
        <div ref={shareRef}>
          <ShareCard result={result} imageUrl={imageUrl} />
        </div>
      </div>

      {/* 评分展示 */}
      <ScoreDisplay
        score={result.totalScore}
        grade={result.grade}
        colorMap={colorMap}
        summary={result.summary}
        imageUrl={imageUrl}
      />

      {/* 颜值类型 */}
      <BeautyTypeCard beautyTypeInfo={result.beautyTypeInfo} />

      {/* 五官分析 */}
      <FeatureAnalysisComponent features={result.features} />

      {/* 化妆建议 */}
      <MakeupAdviceList advices={result.makeupAdvices} />

      {/* 底部操作栏 */}
      <div
        className="fixed bottom-0 left-0 right-0 safe-bottom"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-[480px] mx-auto px-4 py-3 flex gap-3">
          {/* 再测一次 */}
          <motion.button
            className="flex-1 h-[52px] rounded-[16px] font-semibold text-base transition-all border"
            style={{
              background: 'transparent',
              borderColor: 'rgba(255,107,157,0.40)',
              color: '#FF6B9D',
            }}
            onClick={onRestart}
            whileHover={{ backgroundColor: 'rgba(255,107,157,0.06)' }}
            whileTap={{ scale: 0.97 }}
          >
            再测一次
          </motion.button>

          {/* 保存报告 */}
          <div className="flex-1">
            <ShareButton reportRef={shareRef} />
          </div>
        </div>
      </div>

      {/* 底部操作栏占位高度 */}
      <div style={{ height: '80px' }} />
    </div>
  )
}

// ============================================================
// 首页视图
// ============================================================
interface HomeViewProps {
  onImageSelected: (file: File, imageUrl: string) => void
  gender: Gender
  onGenderChange: (gender: Gender) => void
}

function HomeView({ onImageSelected, gender, onGenderChange }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Slogan */}
      <div className="text-center mb-6 pt-2">
        <p className="text-sm" style={{ color: '#A8A29E' }}>
          AI 智能颜值测评 · 专属五官分析报告
        </p>
      </div>

      {/* 上传组件 */}
      <ImageUploader
        onImageSelected={onImageSelected}
        gender={gender}
        onGenderChange={onGenderChange}
      />

      {/* 功能介绍 */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {[
          { icon: '🔍', title: '智能分析', desc: 'AI 深度识别' },
          { icon: '📊', title: '多维评分', desc: '8大维度' },
          { icon: '💄', title: '美妆建议', desc: '专属推荐' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[16px] p-3 text-center"
            style={{ background: '#F5F3F4' }}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-sm font-medium mb-0.5" style={{ color: '#1C1917' }}>
              {item.title}
            </div>
            <div className="text-xs" style={{ color: '#A8A29E' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 隐私说明 */}
      <p className="text-xs text-center mt-5" style={{ color: '#D6D3D1' }}>
        🔒 照片在本地处理，不上传服务器，保护您的隐私
      </p>
    </motion.div>
  )
}

// ============================================================
// 主 App 组件
// ============================================================
export default function App() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [gender, setGender] = useState<Gender>('auto')

  const {
    state: appState,
    result: analysisResult,
    error: appError,
    progress: _progress,
    analyzeImage,
    reset,
  } = useFaceAnalysis()

  const handleImageSelected = useCallback(async (file: File, url: string) => {
    setImageUrl(url)
    await analyzeImage(file, gender)
  }, [analyzeImage, gender])

  const handleRestart = useCallback(() => {
    // 释放 Object URL 内存
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl('')
    reset()
  }, [imageUrl, reset])

  const handleCancelAnalysis = useCallback(() => {
    handleRestart()
  }, [handleRestart])

  const showBack = appState === 'result' || appState === 'error'

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* 顶部导航 */}
      <Header
        showBack={showBack}
        onBack={handleRestart}
      />

      {/* 主内容区 */}
      <main className="max-w-[480px] mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {appState === 'idle' && (
            <motion.div key="idle">
              <HomeView
                onImageSelected={handleImageSelected}
                gender={gender}
                onGenderChange={setGender}
              />
            </motion.div>
          )}

          {appState === 'analyzing' && imageUrl && (
            <motion.div key="analyzing">
              <AnalyzingView
                imageUrl={imageUrl}
                onCancel={handleCancelAnalysis}
              />
            </motion.div>
          )}

          {appState === 'result' && analysisResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
            >
              <ResultView
                result={analysisResult}
                imageUrl={imageUrl}
                onRestart={handleRestart}
              />
            </motion.div>
          )}

          {appState === 'error' && appError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
            >
              <ErrorPrompt error={appError} onRetry={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
