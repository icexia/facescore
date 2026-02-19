/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 背景色系
        'bg-base': '#FAFAF9',
        'bg-soft': '#F5F3F4',
        // 文字色系
        'text-primary': '#1C1917',
        'text-secondary': '#57534E',
        'text-tertiary': '#A8A29E',
        'text-disabled': '#D6D3D1',
        // 功能色
        'color-success': '#22C55E',
        'color-warning': '#F59E0B',
        'color-error': '#EF4444',
        'color-info': '#3B82F6',
        // 主渐变主色
        'brand-pink': '#FF6B9D',
        'brand-purple': '#C084FC',
      },
      fontFamily: {
        heading: ['"PingFang SC"', '"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        body: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        number: ['"SF Pro Display"', '"Inter"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(255, 107, 157, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 32px rgba(255, 107, 157, 0.16), 0 2px 8px rgba(0, 0, 0, 0.06)',
        'btn': '0 4px 16px rgba(255, 107, 157, 0.40)',
        'btn-hover': '0 8px 24px rgba(255, 107, 157, 0.55)',
        'glow': '0 0 40px rgba(255, 107, 157, 0.30)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%)',
        'gradient-alt': 'linear-gradient(135deg, #F472B6 0%, #FB923C 100%)',
        'gradient-deep': 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, rgba(255,107,157,0.12) 0%, rgba(192,132,252,0.12) 100%)',
      },
      keyframes: {
        scanLine: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        faceDotPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        ringRotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        cardSlideIn: {
          from: { opacity: '0', transform: 'translateY(32px) scale(0.96)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        ripple: {
          from: { width: '0', height: '0', opacity: '0.4', transform: 'translate(-50%, -50%)' },
          to: { width: '200px', height: '200px', opacity: '0', transform: 'translate(-50%, -50%)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'face-dot': 'faceDotPulse 1s ease-in-out infinite',
        'ring-rotate': 'ringRotate 3s linear infinite',
        'card-slide-in': 'cardSlideIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'ripple': 'ripple 600ms ease-out',
        'fade-in': 'fadeIn 300ms ease-out',
        'count-up': 'countUp 200ms ease-out',
      },
    },
  },
  plugins: [],
}
