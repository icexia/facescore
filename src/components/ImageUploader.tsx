import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Gender } from '../types'
import CameraView from './CameraView'

interface ImageUploaderProps {
  onImageSelected: (file: File, imageUrl: string) => void
  gender: Gender
  onGenderChange: (gender: Gender) => void
  disabled?: boolean
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']

export default function ImageUploader({ onImageSelected, gender, onGenderChange, disabled = false }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
      return '请上传 JPG、PNG、WEBP 格式的图片'
    }
    if (file.size > MAX_FILE_SIZE) {
      return '图片大小不能超过 10MB'
    }
    return null
  }

  const processFile = useCallback((file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setTimeout(() => setError(null), 3000)
      return
    }
    setError(null)
    const imageUrl = URL.createObjectURL(file)
    onImageSelected(file, imageUrl)
  }, [onImageSelected])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input value so same file can be selected again
    e.target.value = ''
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click()
  }

  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!disabled) setShowCamera(true)
  }

  const handleAlbumClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!disabled) fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      {/* 相机视图 */}
      <AnimatePresence>
        {showCamera && (
          <CameraView
            onCapture={(file, imageUrl) => {
              setShowCamera(false)
              onImageSelected(file, imageUrl)
            }}
            onClose={() => setShowCamera(false)}
          />
        )}
      </AnimatePresence>

      {/* 主上传区域 */}
      <motion.div
        className="relative w-full cursor-pointer select-none"
        style={{ height: '220px' }}
        whileHover={!disabled ? { y: -2 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* 边框容器 */}
        <div
          className="w-full h-full rounded-[24px] flex flex-col items-center justify-center transition-all duration-200"
          style={{
            background: isDragging
              ? 'linear-gradient(135deg, rgba(255,107,157,0.10) 0%, rgba(192,132,252,0.10) 100%)'
              : 'linear-gradient(135deg, rgba(255,107,157,0.04) 0%, rgba(192,132,252,0.06) 100%)',
            border: isDragging
              ? '2px dashed #FF6B9D'
              : '2px dashed rgba(255,107,157,0.30)',
            boxShadow: isDragging ? '0 0 0 4px rgba(255,107,157,0.08)' : 'none',
          }}
        >
          {/* 上传图标 */}
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{
              background: isDragging
                ? 'linear-gradient(135deg, rgba(255,107,157,0.20) 0%, rgba(192,132,252,0.20) 100%)'
                : 'linear-gradient(135deg, rgba(255,107,157,0.12) 0%, rgba(192,132,252,0.12) 100%)',
            }}
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B9D" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                stroke="url(#uploadGradient)"
                strokeWidth="1.8"
              />
              <polyline
                points="17 8 12 3 7 8"
                stroke="url(#uploadGradient)"
                strokeWidth="1.8"
              />
              <line
                x1="12" y1="3" x2="12" y2="15"
                stroke="url(#uploadGradient)"
                strokeWidth="1.8"
              />
            </svg>
          </motion.div>

          {/* 文字 */}
          <AnimatePresence mode="wait">
            {isDragging ? (
              <motion.div
                key="dragging"
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="font-semibold text-base" style={{ color: '#FF6B9D' }}>松开即可上传</p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="font-semibold text-base mb-1" style={{ color: '#57534E' }}>
                  轻触选择照片
                </p>
                <p className="text-xs" style={{ color: '#A8A29E' }}>
                  或拖拽到这里
                </p>
                <p className="text-xs mt-1" style={{ color: '#D6D3D1' }}>
                  支持 JPG、PNG、WEBP，最大 10MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 性别选择 */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-xs" style={{ color: '#A8A29E' }}>性别：</span>
        <div className="flex gap-2">
          {[
            { value: 'auto' as Gender, label: '自动识别', icon: '🤖' },
            { value: 'female' as Gender, label: '女生', icon: '👩' },
            { value: 'male' as Gender, label: '男生', icon: '👨' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={(e) => { e.stopPropagation(); onGenderChange(item.value) }}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: gender === item.value
                  ? 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)'
                  : 'rgba(0,0,0,0.04)',
                color: gender === item.value ? '#fff' : '#57534E',
                boxShadow: gender === item.value ? '0 2px 8px rgba(255,107,157,0.30)' : 'none',
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 移动端按钮区域 */}
      <div className="flex gap-3 mt-4">
        <motion.button
          type="button"
          className="flex-1 h-[48px] rounded-[16px] flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 border"
          style={{
            background: 'transparent',
            borderColor: 'rgba(255,107,157,0.35)',
            color: '#57534E',
          }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,107,157,0.05)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCameraClick}
          disabled={disabled}
        >
          <span>📷</span>
          <span>拍照</span>
        </motion.button>

        <motion.button
          type="button"
          className="flex-1 h-[48px] rounded-[16px] flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 border"
          style={{
            background: 'transparent',
            borderColor: 'rgba(255,107,157,0.35)',
            color: '#57534E',
          }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,107,157,0.05)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAlbumClick}
          disabled={disabled}
        >
          <span>📁</span>
          <span>相册</span>
        </motion.button>
      </div>

      {/* 错误提示 */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-3 px-4 py-3 rounded-[12px] text-sm text-center"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.20)',
              color: '#EF4444',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 隐藏的文件输入 - 相册选择 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {/* 隐藏的文件输入 - 相机拍照 */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  )
}
