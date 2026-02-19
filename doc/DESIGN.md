# 颜值评分应用 UI/UX 设计规范

> 版本：1.0.0 | 日期：2026-02-19

---

## 一、设计理念与风格

### 核心理念

**"轻盈、精致、有温度"**

颜值评分应用的设计语言围绕三个关键词展开：轻盈（减少视觉噪音，留白充分）、精致（细节处理到位，渐变与阴影恰到好处）、有温度（粉紫暖色调，让用户感受到被关注与呵护）。

### 设计风格参考

- 参考：美图秀秀、FaceApp、Lensa 的高级感 UI
- 风格：新拟物化（Soft Neumorphism）+ 毛玻璃质感（Glassmorphism）
- 气质：女性向为主、中性兼容，现代都市感

### 交互原则

1. **最少步骤**：首页一键上传，结果一屏展示核心分数，无需多余跳转
2. **即时反馈**：每一次点击都有视觉响应（涟漪、缩放、颜色变化）
3. **情绪化设计**：评分揭晓时的动画要制造期待感和仪式感
4. **无障碍友好**：文字与背景对比度 ≥ 4.5:1

---

## 二、配色方案

### 主渐变色

```
主渐变（蜜桃粉 → 薰衣草紫）
from: #FF6B9D
to:   #C084FC
方向: 135deg

备用渐变（玫瑰金 → 珊瑚橙）
from: #F472B6
to:   #FB923C
方向: 135deg

深色渐变（用于高光场景）
from: #EC4899
to:   #A855F7
方向: 135deg
```

### 背景色系

| 名称 | 用途 | HEX |
|------|------|-----|
| `bg-base` | 页面主背景 | `#FAFAF9` |
| `bg-soft` | 卡片/区块背景 | `#F5F3F4` |
| `bg-glass` | 毛玻璃基底（白半透明） | `rgba(255,255,255,0.72)` |
| `bg-glass-dark` | 深色毛玻璃 | `rgba(255,255,255,0.12)` |
| `bg-overlay` | 遮罩层 | `rgba(0,0,0,0.40)` |

### 文字色系

| 名称 | 用途 | HEX |
|------|------|-----|
| `text-primary` | 主要文字 | `#1C1917` |
| `text-secondary` | 次要文字 | `#57534E` |
| `text-tertiary` | 辅助说明 | `#A8A29E` |
| `text-disabled` | 禁用状态 | `#D6D3D1` |
| `text-on-gradient` | 渐变背景上的文字 | `#FFFFFF` |

### 功能色

| 名称 | 用途 | HEX |
|------|------|-----|
| `success` | 成功/高分 | `#22C55E` |
| `success-light` | 成功背景 | `#F0FDF4` |
| `warning` | 警告/中等 | `#F59E0B` |
| `warning-light` | 警告背景 | `#FFFBEB` |
| `error` | 错误/非人脸 | `#EF4444` |
| `error-light` | 错误背景 | `#FEF2F2` |
| `info` | 提示信息 | `#3B82F6` |
| `info-light` | 提示背景 | `#EFF6FF` |

### 评分颜色映射

| 分数区间 | 颜色描述 | 渐变 HEX |
|----------|----------|----------|
| 90-100 | 极美 - 金紫渐变 | `#FFD700` → `#A855F7` |
| 75-89 | 精致 - 粉紫渐变 | `#FF6B9D` → `#C084FC` |
| 60-74 | 清秀 - 蓝青渐变 | `#60A5FA` → `#34D399` |
| 45-59 | 普通 - 青灰渐变 | `#94A3B8` → `#64748B` |
| 0-44 | 暂未收录 - 灰色 | `#D1D5DB` → `#9CA3AF` |

### 阴影规范

```css
/* 卡片阴影 - 柔和 */
box-shadow: 0 4px 24px rgba(255, 107, 157, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);

/* 卡片悬浮阴影 */
box-shadow: 0 8px 32px rgba(255, 107, 157, 0.16), 0 2px 8px rgba(0, 0, 0, 0.06);

/* 按钮阴影（主按钮） */
box-shadow: 0 4px 16px rgba(255, 107, 157, 0.40);

/* 按钮悬浮阴影 */
box-shadow: 0 8px 24px rgba(255, 107, 157, 0.55);

/* 输入框焦点阴影 */
box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.20);
```

---

## 三、字体规范

### 字体族

```css
/* 中文标题字体 - 优雅纤细 */
font-family-heading: "PingFang SC", "Noto Serif SC", "Source Han Serif SC", serif;

/* 中文正文字体 - 清晰易读 */
font-family-body: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;

/* 英文/数字字体 - 现代数字展示 */
font-family-number: "SF Pro Display", "Inter", "DM Sans", system-ui, sans-serif;

/* 代码/等宽 */
font-family-mono: "SF Mono", "JetBrains Mono", monospace;
```

### 字号层级

| 级别 | 用途 | 字号 | 字重 | 行高 | 字间距 |
|------|------|------|------|------|--------|
| `display` | 评分大数字 | `72px` | `700` | `1.0` | `-0.02em` |
| `h1` | 页面主标题 | `32px` | `700` | `1.2` | `-0.02em` |
| `h2` | 区块标题 | `24px` | `600` | `1.3` | `-0.01em` |
| `h3` | 卡片标题 | `20px` | `600` | `1.4` | `0` |
| `h4` | 小标题 | `17px` | `600` | `1.4` | `0` |
| `body-lg` | 大号正文 | `17px` | `400` | `1.6` | `0.01em` |
| `body` | 正文 | `15px` | `400` | `1.6` | `0.01em` |
| `body-sm` | 小号正文 | `13px` | `400` | `1.5` | `0.01em` |
| `caption` | 说明文字 | `12px` | `400` | `1.4` | `0.02em` |
| `label` | 标签/按钮文字 | `14px` | `500` | `1.2` | `0.02em` |

### 字体颜色使用规则

- 主标题：`text-primary` (`#1C1917`)
- 正文段落：`text-secondary` (`#57534E`)
- 辅助说明：`text-tertiary` (`#A8A29E`)
- 渐变背景上：`text-on-gradient` (`#FFFFFF`)
- 大数字评分：渐变色填充（`background-clip: text`）

---

## 四、组件设计规范

### 4.1 上传区域（Upload Zone）

```
尺寸：宽度 fill，高度 220px（移动端）/ 280px（桌面）
圆角：24px
背景：渐变色浅化版 rgba(255,107,157,0.04) 到 rgba(192,132,252,0.06)

边框：
  默认：2px dashed rgba(255,107,157,0.30)
  hover：2px dashed rgba(255,107,157,0.70)
  active/drag：2px dashed #FF6B9D，背景加深至 rgba(255,107,157,0.10)

内部图标：
  尺寸：56x56px
  样式：线性图标，渐变色填充
  图标：相机/照片上传图标

主文字："轻触选择照片" - h3，text-secondary
副文字："支持 JPG、PNG、HEIC，最大 10MB" - caption，text-tertiary

上传按钮（内嵌）：
  圆角：12px
  背景：主渐变
  内边距：12px 28px
  文字：label，white
```

**交互状态：**
- 默认态：虚线边框，灰色图标
- 悬浮态（hover）：边框变深，区域轻微上移（translateY -2px），阴影增加
- 拖拽悬停（drag-over）：背景变色，边框实线，图标变渐变色
- 加载中：整个区域禁用，显示加载动画

---

### 4.2 评分圆环（Score Ring）

```
圆环外径：200px（移动端）/ 240px（桌面）
圆环宽度：12px
背景轨道颜色：rgba(0,0,0,0.06)
进度弧：渐变色（根据分数映射色系）

中心内容（上到下）：
  - 星标图标：16px，渐变色
  - 评分数字：display 72px，渐变色填充
  - 单位"分"：h4，text-tertiary
  - 等级标签：label，渐变背景圆角标签
    圆角：20px，内边距：4px 12px

圆环阴影：0 0 40px rgba(255,107,157,0.30)（发光效果）
```

**SVG 参数：**
```
viewBox: "0 0 200 200"
cx/cy: 100
r: 88
stroke-width: 12
stroke-linecap: round
stroke-dasharray: 553 (2π×88)
stroke-dashoffset: 553 × (1 - score/100)
transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)

渐变定义（linearGradient）：
  id: scoreGradient
  x1: 0%, y1: 0%, x2: 100%, y2: 100%
  stop1: offset=0%, color=#FF6B9D
  stop2: offset=100%, color=#C084FC
```

---

### 4.3 分析卡片（Analysis Card）

```
圆角：20px
背景：rgba(255,255,255,0.72)
backdrop-filter：blur(20px) saturate(180%)
边框：1px solid rgba(255,255,255,0.80)
阴影：0 4px 24px rgba(255,107,157,0.08), 0 1px 4px rgba(0,0,0,0.04)
内边距：20px

卡片头部（header）：
  左侧：图标（24x24px 渐变色）+ 维度标题（h4，text-primary）
  右侧：分数标签（label，渐变色文字）
  间距：图标与标题 8px，header 下方 16px

维度进度条区域：
  标签：body-sm，text-secondary
  进度条：见 4.4
  标签与进度条间距：6px
  多条进度条间距：12px

底部描述文字：
  body-sm，text-tertiary，行高 1.6
  上方分割线：1px，rgba(0,0,0,0.06)，margin-top 16px

卡片间距：12px
```

---

### 4.4 进度条（Progress Bar）

```
容器高度：8px
圆角：4px（全圆角）
背景轨道：rgba(0,0,0,0.06)

进度填充：
  渐变：与当前卡片维度色系匹配，默认主渐变
  圆角：4px
  transition: width 1.0s cubic-bezier(0.34, 1.56, 0.64, 1)

高亮进度条（>80分）：
  高度：10px
  进度条末端小圆点：
    尺寸：12x12px
    颜色：渐变尾色
    box-shadow：0 0 8px 渐变尾色（发光）
```

---

### 4.5 按钮样式

#### 主按钮（Primary Button）

```
高度：52px（移动端）
圆角：16px
背景：主渐变（135deg, #FF6B9D → #C084FC）
文字：label，16px，#FFFFFF，font-weight: 600
内边距：水平 32px
阴影：0 4px 16px rgba(255,107,157,0.40)

hover 状态：
  transform: translateY(-2px)
  box-shadow: 0 8px 24px rgba(255,107,157,0.55)
  transition: all 0.2s ease

active 状态：
  transform: translateY(0px) scale(0.98)
  box-shadow: 0 2px 8px rgba(255,107,157,0.30)

disabled 状态：
  opacity: 0.5
  cursor: not-allowed
  transform: none
```

#### 次按钮（Secondary Button）

```
高度：52px
圆角：16px
背景：transparent
边框：1.5px solid rgba(255,107,157,0.40)
文字：label，16px，渐变色（background-clip: text）

hover 状态：
  背景：rgba(255,107,157,0.06)
  边框：1.5px solid rgba(255,107,157,0.80)
```

#### 图标按钮（Icon Button）

```
尺寸：44x44px（最小触控区域）
圆角：12px
背景：rgba(0,0,0,0.04)
图标：20x20px，text-secondary

hover 状态：
  背景：rgba(255,107,157,0.08)
  图标颜色：#FF6B9D
```

#### 幽灵按钮（Ghost / Text Button）

```
高度：auto
背景：transparent
无边框
文字：label，渐变色填充
下划线：hover 时显示渐变下划线
```

---

### 4.6 非人脸提示组件（Non-Face Notice）

```
容器：
  圆角：20px
  背景：rgba(239,68,68,0.06)（error-light 调整版）
  边框：1.5px solid rgba(239,68,68,0.20)
  内边距：24px
  margin：自动居中

图标区域：
  尺寸：64x64px 圆形
  背景：rgba(239,68,68,0.10)
  图标：32px，错误/人脸被遮挡图标，颜色 #EF4444

标题："未检测到人脸"
  h3，text-primary，margin-top 16px，居中

说明文字：
  body，text-secondary，居中
  内容："请上传包含清晰人脸的照片，确保光线充足、正面朝前"

重试按钮：
  type: 主按钮
  文字："重新上传"
  margin-top: 20px
  宽度：fill（移动端）/ 200px（桌面）
```

---

### 4.7 加载状态组件（Loading State）

```
容器：全屏居中覆盖
背景：bg-base 或半透明遮罩

扫描动画：
  外圆：80x80px，border: 2px solid rgba(255,107,157,0.20)，圆形
  扫描线：水平线，高度 2px，渐变色，从上到下循环移动
    动画：scanLine 2s ease-in-out infinite
    keyframes: 从 top: 0 到 top: 100%

人脸轮廓：
  SVG 点状人脸框（眼睛、鼻子、嘴巴关键点）
  颜色：渐变色，opacity 0.6

文字状态提示（循环切换）：
  "正在检测面部特征..."
  "分析五官比例..."
  "计算颜值指数..."
  "生成个性化报告..."
  字体：body，text-secondary，居中
  切换间隔：1.5s，淡入淡出

进度条：
  宽度：200px，高度：4px，圆角 2px
  从 0 到 85%（伪随机，最后跳到100%）
  transition: width 0.5s ease
```

---

## 五、动画规范

### 5.1 全局动画时间函数

```css
/* 弹性入场 - 用于卡片、模态框出现 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* 标准缓出 - 用于颜色、透明度过渡 */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1.0);

/* 标准缓入 - 用于元素消失 */
--ease-in: cubic-bezier(0.4, 0.0, 1.0, 1.0);

/* 标准过渡 - 通用 */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);
```

### 5.2 页面切换动画

```
进入（新页面滑入）：
  from: translateX(100%), opacity: 0
  to:   translateX(0), opacity: 1
  duration: 300ms
  easing: --ease-out

退出（旧页面滑出）：
  from: translateX(0), opacity: 1
  to:   translateX(-30%), opacity: 0
  duration: 300ms
  easing: --ease-in
```

### 5.3 评分揭晓动画

```
阶段1 - 圆环绘制（0ms - 1500ms）：
  圆环从0%开始，以 --ease-spring 跑到目标百分比
  duration: 1500ms

阶段2 - 数字跳动（200ms - 1800ms，与圆环并行）：
  从 0 计数到目标分数
  使用 requestAnimationFrame 逐帧更新
  每帧增量：非线性，先快后慢（easeOutExpo）
  duration: 1600ms

阶段3 - 评级标签弹入（1500ms - 1700ms）：
  from: scale(0.5), opacity: 0
  to:   scale(1.0), opacity: 1
  duration: 200ms，--ease-spring

阶段4 - 分析卡片依次入场（1800ms - 2800ms）：
  每张卡片间隔 100ms 依次出现
  单张卡片：
    from: translateY(24px), opacity: 0
    to:   translateY(0), opacity: 1
    duration: 400ms，--ease-spring
```

### 5.4 人脸扫描加载动画

```css
@keyframes scanLine {
  0%   { top: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@keyframes faceDotPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1.2); }
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

扫描线持续时间：2s，infinite
人脸关键点脉冲：1s，stagger 0.1s，infinite
外圈旋转：3s linear，infinite
```

### 5.5 卡片滑入动画

```css
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 使用 animation-delay 实现依次入场 */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }
.card:nth-child(4) { animation-delay: 300ms; }
/* 以此类推 */

animation-duration: 400ms;
animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
animation-fill-mode: both;
```

### 5.6 点击涟漪效果

```css
/* 按钮点击涟漪 */
@keyframes ripple {
  from {
    width: 0; height: 0;
    opacity: 0.4;
    transform: translate(-50%, -50%);
  }
  to {
    width: 200px; height: 200px;
    opacity: 0;
    transform: translate(-50%, -50%);
  }
}

涟漪颜色：rgba(255,255,255,0.40)（主按钮上）
duration：600ms
timing：ease-out
```

### 5.7 Hover 缩放反馈

```css
/* 卡片 hover */
.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 32px rgba(255,107,157,0.16), 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 图片预览 hover */
.preview-img:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
}
```

---

## 六、响应式断点

### 断点定义

| 断点名 | 范围 | 布局策略 |
|--------|------|----------|
| `mobile` | < 640px | 单列，全宽 |
| `tablet` | 640px - 1024px | 单列居中，最大宽度 540px |
| `desktop` | > 1024px | 居中展示，最大宽度 480px（保持移动端体验） |

> **设计哲学**：本应用核心场景为手机自拍上传，桌面端以"居中的手机框架"方式呈现，保持一致的竖屏体验，不强行做宽屏布局。

### 间距系统（基于 4px 基准）

```
space-1:  4px
space-2:  8px
space-3:  12px
space-4:  16px
space-5:  20px
space-6:  24px
space-8:  32px
space-10: 40px
space-12: 48px
space-16: 64px

页面水平内边距（移动端）：16px
页面水平内边距（平板）：24px
页面水平内边距（桌面容器内）：24px
```

### 圆角系统

```
radius-sm:   8px   （标签、小图标）
radius-md:   12px  （小按钮、输入框）
radius-lg:   16px  （主按钮、小卡片）
radius-xl:   20px  （大卡片、模态框）
radius-2xl:  24px  （上传区域）
radius-full: 9999px（圆形、胶囊标签）
```

---

## 七、页面布局

### 7.1 首页（上传页）

```
页面结构（从上到下）：

1. 顶部导航栏
   高度：56px
   内容：应用名称（h3，渐变色）居中，右侧历史记录图标按钮
   背景：bg-glass，backdrop-blur: 20px
   边框：下方 1px rgba(0,0,0,0.06)
   position: sticky top: 0, z-index: 50

2. 主内容区（可滚动）
   padding-top: 56px（导航栏高度）
   padding-x: 16px
   padding-bottom: 100px（底部按钮高度 + 安全区）

3. Hero 区域
   margin-top: 32px
   上传区域组件（见 4.1）
   高度：220px

4. 快速示例（可选）
   标题："示例效果" - caption，text-tertiary，margin-top: 24px
   3-4 个圆形示例头像，横向排列，gap: 8px
   每个示例：52x52px 圆形，border: 2px solid white，阴影

5. 功能介绍区
   margin-top: 32px
   3个特性卡片（水平排列，gap: 8px）：
   - 智能分析 / 多维评分 / 改善建议
   每个卡片：flex-1，圆角 16px，背景 bg-soft，内边距 12px
   图标：24px，渐变色
   文字：caption，text-secondary

6. 固定底部操作栏
   position: fixed; bottom: 0; left: 0; right: 0
   背景：bg-glass，backdrop-blur: 20px
   边框：上方 1px rgba(0,0,0,0.06)
   内边距：12px 16px + 系统安全区（safe-area-inset-bottom）
   内容：主按钮"开始颜值测评"，宽度 fill
```

---

### 7.2 分析中页面

```
页面结构：

1. 全屏覆盖层（或独立页面）
   背景：bg-base
   居中布局（flex column, justify-center, align-center）

2. 用户照片预览
   尺寸：140x140px
   圆角：70px（正圆）
   边框：3px solid transparent，渐变色边框（使用 border-image 或 outline + box-shadow）
   object-fit: cover
   阴影：0 0 32px rgba(255,107,157,0.30)

3. 扫描动画容器（覆盖在照片上）
   position: absolute
   覆盖照片区域
   包含：扫描线 + 人脸关键点（见 4.7）

4. 状态文字
   margin-top: 40px
   见 4.7 加载组件文字规范

5. 进度条
   margin-top: 16px
   宽度：200px（居中）

6. 取消按钮
   margin-top: 32px
   type: Ghost Button
   文字："取消"
```

---

### 7.3 结果页

```
页面结构（从上到下）：

1. 顶部栏
   高度：56px
   左侧：返回按钮（图标按钮）
   中间："颜值报告"（h4）
   右侧：分享按钮（图标按钮）
   背景：bg-glass，backdrop-blur: 20px
   position: sticky top: 0

2. 主内容区（可垂直滚动）
   padding: 16px
   padding-bottom: 120px

3. 照片 + 评分圆环区块
   布局：上下叠放，居中
   照片：100x100px 圆形，居中显示，margin-bottom: -20px（z-index 低）
   评分圆环：200px，覆盖在照片上方区域居中

   整体背景卡片：
     圆角：24px
     背景：渐变（135deg, rgba(255,107,157,0.08) → rgba(192,132,252,0.08)）
     内边距：32px 24px 24px
     margin-bottom: 16px

   等级标签：
     居中显示在圆环下方
     背景：主渐变
     圆角：full（胶囊形）
     内边距：6px 16px
     文字：label，white，font-weight: 600

   一句话评价：
     body，text-secondary
     居中，margin-top: 12px
     示例："精致五官，深邃眼神，整体颜值高于88%的用户"

4. 维度分析卡片列表（垂直排列）
   每个维度一张卡片（见 4.3）
   维度建议：五官对称、眼型、鼻梁、肤色、气质等
   卡片间距：12px
   动画：依次从下方滑入（见 5.5）

5. 综合建议区块
   卡片样式，同分析卡片
   标题："个性化建议"
   内容：1-3条针对性建议，每条带图标

6. 底部固定操作栏
   左侧：次按钮"再测一次"
   右侧：主按钮"分享报告"（宽度 2:1 或 1:1）
   背景：bg-glass，backdrop-blur: 20px
   内边距：12px 16px + 安全区
```

---

## 八、图标规范

### 图标风格

- **线性（Outline）**：用于导航、操作类图标
- **填充（Filled）**：用于状态激活、强调图标
- **渐变**：用于卡片内的维度图标（如眼睛、鼻子、嘴巴、肤色等）

### 图标尺寸

| 场景 | 尺寸 |
|------|------|
| 导航栏图标 | 24x24px |
| 卡片维度图标 | 24x24px |
| 大型展示图标 | 48x48px（加载页面） |
| 按钮内图标 | 20x20px |
| 标签/小图标 | 16x16px |
| 错误提示图标 | 32x32px |

### 推荐图标库

- [Lucide Icons](https://lucide.dev/)（线性，MIT 协议）
- [Heroicons](https://heroicons.com/)（线性/填充，MIT 协议）
- 面部特征图标需自定义 SVG 绘制

---

## 九、深色/浅色模式适配

### 浅色模式（默认）

已在以上章节描述的颜色均为浅色模式。

### 深色模式

通过 CSS `@media (prefers-color-scheme: dark)` 或 `.dark` class 切换：

| 浅色 token | 深色对应值 | 说明 |
|-----------|-----------|------|
| `bg-base` `#FAFAF9` | `#0C0A09` | 极深暖黑 |
| `bg-soft` `#F5F3F4` | `#1C1917` | 深暖灰 |
| `bg-glass` `rgba(255,255,255,0.72)` | `rgba(28,25,23,0.72)` | 深色毛玻璃 |
| `text-primary` `#1C1917` | `#FAFAF9` | 主文字反转 |
| `text-secondary` `#57534E` | `#A8A29E` | 次文字反转 |
| `text-tertiary` `#A8A29E` | `#57534E` | 辅助文字 |
| 卡片边框 `rgba(255,255,255,0.80)` | `rgba(255,255,255,0.08)` | 深色边框 |

**主渐变色在深色模式下不变**，渐变本身已具备足够对比度。

---

## 十、核心 CSS 变量声明（参考实现）

```css
:root {
  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #FF6B9D 0%, #C084FC 100%);
  --gradient-primary-soft: linear-gradient(135deg, rgba(255,107,157,0.12) 0%, rgba(192,132,252,0.12) 100%);
  --gradient-alt: linear-gradient(135deg, #F472B6 0%, #FB923C 100%);

  /* 背景 */
  --bg-base: #FAFAF9;
  --bg-soft: #F5F3F4;
  --bg-glass: rgba(255, 255, 255, 0.72);

  /* 文字 */
  --text-primary: #1C1917;
  --text-secondary: #57534E;
  --text-tertiary: #A8A29E;
  --text-disabled: #D6D3D1;

  /* 功能色 */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* 间距 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* 动画时间函数 */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);

  /* 阴影 */
  --shadow-card: 0 4px 24px rgba(255, 107, 157, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
  --shadow-card-hover: 0 8px 32px rgba(255, 107, 157, 0.16), 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-btn: 0 4px 16px rgba(255, 107, 157, 0.40);
  --shadow-btn-hover: 0 8px 24px rgba(255, 107, 157, 0.55);
  --shadow-glow: 0 0 40px rgba(255, 107, 157, 0.30);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-base: #0C0A09;
    --bg-soft: #1C1917;
    --bg-glass: rgba(28, 25, 23, 0.72);
    --text-primary: #FAFAF9;
    --text-secondary: #A8A29E;
    --text-tertiary: #57534E;
  }
}
```

---

*文档由 UI/UX 设计团队编写，开发时如有疑问请参照本文档或联系设计师确认。*
