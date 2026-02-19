import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CameraViewProps {
  onCapture: (file: File, imageUrl: string) => void
  onClose: () => void
}

export default function CameraView({ onCapture, onClose }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flash, setFlash] = useState(false)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('当前浏览器不支持摄像头功能')
          return
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        })

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            if (!cancelled) setReady(true)
          }
        }
      } catch (err: unknown) {
        if (cancelled) return
        const name = err instanceof DOMException ? err.name : ''
        if (name === 'NotAllowedError') {
          setError('摄像头权限被拒绝，请在浏览器设置中允许访问')
        } else if (name === 'NotFoundError') {
          setError('未找到可用的摄像头设备')
        } else {
          setError('无法启动摄像头，请检查设备和权限')
        }
      }
    }

    startCamera()

    return () => {
      cancelled = true
      stopCamera()
    }
  }, [stopCamera])

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !ready) return

    // 快门闪光效果
    setFlash(true)
    setTimeout(() => setFlash(false), 200)

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 水平翻转（前置摄像头镜像）
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera_${Date.now()}.jpg`, {
            type: 'image/jpeg',
          })
          const imageUrl = URL.createObjectURL(file)
          stopCamera()
          onCapture(file, imageUrl)
        }
      },
      'image/jpeg',
      0.92,
    )
  }, [ready, stopCamera, onCapture])

  const handleClose = useCallback(() => {
    stopCamera()
    onClose()
  }, [stopCamera, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60">
        <button
          onClick={handleClose}
          className="text-white text-sm px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          取消
        </button>
        <span className="text-white/70 text-sm">前置摄像头</span>
        <div className="w-14" />
      </div>

      {/* 视频区域 */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          /* 错误状态 */
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <div className="text-5xl mb-4">📷</div>
            <p className="text-white/90 text-center text-base mb-2">
              {error}
            </p>
            <p className="text-white/50 text-center text-sm mb-6">
              请确保已授权摄像头权限，或使用相册上传
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full text-sm font-medium"
              style={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
                color: 'white',
              }}
            >
              返回上传
            </button>
          </div>
        ) : (
          <>
            {/* 视频流 */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />

            {/* 人脸引导框 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border-2 border-dashed"
                style={{
                  width: '220px',
                  height: '280px',
                  borderColor: 'rgba(255,255,255,0.4)',
                  boxShadow: ready
                    ? '0 0 0 2000px rgba(0,0,0,0.3)'
                    : 'none',
                }}
              />
              {!ready && (
                <div className="absolute text-white/60 text-sm mt-[320px]">
                  正在启动摄像头...
                </div>
              )}
              {ready && (
                <div className="absolute text-white/60 text-sm mt-[320px]">
                  将面部放入框内
                </div>
              )}
            </div>

            {/* 快门闪光 */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* 底部拍照按钮 */}
      {!error && (
        <div className="flex items-center justify-center py-8 bg-black/60">
          <motion.button
            className="relative flex items-center justify-center"
            style={{ width: '72px', height: '72px' }}
            onClick={handleCapture}
            disabled={!ready}
            whileTap={{ scale: 0.9 }}
          >
            {/* 外圈 */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '4px solid rgba(255,255,255,0.8)',
              }}
            />
            {/* 内圈 */}
            <div
              className="rounded-full"
              style={{
                width: '58px',
                height: '58px',
                background: ready
                  ? 'white'
                  : 'rgba(255,255,255,0.3)',
                transition: 'background 0.2s',
              }}
            />
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}
