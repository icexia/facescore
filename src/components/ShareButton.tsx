import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonProps {
  reportRef: React.RefObject<HTMLDivElement | null>
  fileName?: string
}

export default function ShareButton({ reportRef, fileName = '颜值报告' }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSaveReport = async () => {
    if (isGenerating || !reportRef.current) return
    setIsGenerating(true)

    try {
      // 动态加载 html2canvas（减少初始包体积）
      const html2canvas = (await import('html2canvas')).default

      const canvas = await html2canvas(reportRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAFAF9',
        scale: 2, // 2x分辨率，更清晰
        logging: false,
        foreignObjectRendering: false,
      })

      // 触发下载
      const link = document.createElement('a')
      link.download = `${fileName}_${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2500)
    } catch (error) {
      console.error('生成图片失败:', error)
      alert('保存失败，请截图保存')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="relative">
      <motion.button
        className="w-full h-[52px] rounded-[16px] text-white font-semibold text-base relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
          boxShadow: '0 4px 16px rgba(255,107,157,0.40)',
        }}
        onClick={handleSaveReport}
        disabled={isGenerating}
        whileHover={!isGenerating ? { y: -2, boxShadow: '0 8px 24px rgba(255,107,157,0.55)' } : {}}
        whileTap={!isGenerating ? { scale: 0.98 } : {}}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 旋转加载图标 */}
              <svg
                className="animate-spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12" cy="12" r="10"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>正在生成图片...</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>保存报告图片</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 成功提示 */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-[10px] text-sm text-white font-medium"
            style={{
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              boxShadow: '0 4px 12px rgba(34,197,94,0.35)',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
          >
            ✅ 图片已保存到相册
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
