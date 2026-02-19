import type { FaceFeatureVector, MakeupAdvice, BeautyType, MaleBeautyType } from '../types'

/**
 * 生成化妆/造型建议
 * gender: 'female' 返回女性化妆建议；'male' 返回男性造型建议
 */
export function generateMakeupAdvice(
  fv: FaceFeatureVector,
  beautyType: BeautyType | MaleBeautyType,
  gender: 'male' | 'female' = 'female'
): MakeupAdvice[] {
  if (gender === 'male') {
    return [
      generateMaleHairAdvice(fv),
      generateMaleSkincareAdvice(fv),
      generateMaleBrowAdvice(fv),
      generateMaleOutfitAdvice(fv),
      generateMaleBodyAdvice(fv),
      generateMaleOverallStyleAdvice(fv, beautyType as MaleBeautyType),
    ]
  }
  return [
    generateBrowAdvice(fv),
    generateEyeAdvice(fv),
    generateLipAdvice(fv),
    generateContourAdvice(fv),
    generateHairAdvice(fv),
    generateOverallStyleAdvice(fv, beautyType as BeautyType),
  ]
}

// ============================================================
// 男性建议
// ============================================================

function generateMaleHairAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { faceShape } = fv
  const tips: string[] = []
  let description = ''

  switch (faceShape.type) {
    case '圆脸':
      description = '圆脸建议选择增高顶部的发型，如高顶短发、背头，视觉上拉长脸型，避免两侧过于蓬松。'
      tips.push('推荐高顶背头或两侧短顶部长的渐变发型')
      tips.push('刘海向上梳，露出额头，增加脸部纵向视觉')
      tips.push('避免中分和圆弧型蘑菇头，会加宽脸型')
      break
    case '方脸':
      description = '方脸建议选择柔化棱角的发型，两侧适当留发，或顶部蓬松制造视觉高度，弱化方形轮廓。'
      tips.push('推荐两侧渐变短发，顶部留有层次感')
      tips.push('可以选择微卷或蓬松感的发型软化棱角')
      tips.push('避免两侧贴平的发型，会强调下颌方形')
      break
    case '长脸':
      description = '长脸建议选择增加横向宽度的发型，两侧蓬松或刘海覆盖额头，减少脸部纵向视觉。'
      tips.push('推荐两侧蓬松或带有层次的中长发')
      tips.push('有刘海覆盖部分额头，减少纵向延伸感')
      tips.push('避免将头发全部向后梳，会拉长脸型')
      break
    case '瓜子脸':
    case '心形脸':
    case '椭圆脸':
      description = '脸型比例优秀，几乎任何发型都能驾驭，可以根据个人风格大胆尝试。'
      tips.push('短发清爽干练，中长发文艺帅气，各有风格')
      tips.push('可以尝试背头、空气感、微卷等多种造型')
      break
    default:
      description = '脸型均衡，建议根据个人风格和发质选择适合的发型。'
      tips.push('日常推荐短发或清爽的渐变发型')
  }

  if (fv.skin.tone === '暖调') {
    tips.push('暖调肤色适合暖棕、栗色等暖色发色')
  } else if (fv.skin.tone === '冷调') {
    tips.push('冷调肤色适合亮黑、冷棕、亚麻等冷色发色')
  }

  return {
    category: '发型',
    title: '发型建议',
    description,
    icon: '♦',
    tips,
  }
}

function generateMaleSkincareAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { skin } = fv
  const tips: string[] = []
  let description = '男性护肤同样重要，良好的肤质是颜值加分的关键。'

  if (skin.brightness < 55) {
    description += '您的肤色偏暗，建议加强护肤和防晒，提亮肤色。'
    tips.push('每日使用防晒霜，防止紫外线导致肤色变深')
    tips.push('定期使用保湿精华，提升肤色亮度')
  } else {
    tips.push('坚持每日早晚清洁+保湿的基础护肤流程')
  }

  if (skin.uniformity < 60) {
    tips.push('肤色不均匀，建议使用含烟酰胺成分的护肤品')
    tips.push('轻柔去角质，每周1-2次，改善肤色')
  } else {
    tips.push('肤色均匀度良好，保持现有护肤习惯即可')
  }

  tips.push('运动后及时补水，保持皮肤水润状态')
  tips.push('保证充足睡眠，是最有效的"护肤品"')

  return {
    category: '护肤',
    title: '护肤建议',
    description,
    icon: '◆',
    tips,
  }
}

function generateMaleBrowAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { brows } = fv
  const tips: string[] = []
  let description = '眉形对男性面部颜值影响很大，适当修整眉形能显著提升整体气质。'

  if (brows.symmetry < 60) {
    tips.push('两眉不对称较明显，建议到专业店修眉，定期维护')
  }
  if (brows.thickness < 45) {
    tips.push('眉毛偏稀疏，可以使用眉笔轻轻填补空缺，自然即可')
  } else if (brows.thickness > 75) {
    tips.push('眉毛较浓密，建议修剪杂乱的眉毛，保持整洁感')
  }
  if (brows.shape === '下垂眉') {
    tips.push('眉尾有自然下垂，修掉下垂部分让眉形更有精神')
  }

  tips.push('男性修眉以整洁为主，保留眉毛的自然形态')
  tips.push('修掉眉毛上下缘的杂毛，让眉形更清晰')
  tips.push('避免修得过细，男性眉毛保持一定厚度更有型')

  return {
    category: '眉形',
    title: '眉形建议',
    description,
    icon: '✦',
    tips,
  }
}

function generateMaleOutfitAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { faceShape, skin } = fv
  const tips: string[] = []
  let description = '穿搭是展现气质的重要方式，合适的服装能让整体颜值提升一个档次。'

  if (faceShape.jawlineSharpness > 65) {
    description += '您的下颌线清晰，立领或高领能很好地展现颜值优势。'
    tips.push('推荐立领衬衫、高领毛衣，展现颈部线条')
  } else {
    tips.push('推荐V领或开领衬衫，拉长颈部视觉效果')
  }

  if (skin.tone === '暖调') {
    tips.push('暖调肤色适合大地色系、卡其色、橙棕色系穿搭')
  } else if (skin.tone === '冷调') {
    tips.push('冷调肤色适合黑白灰、冷蓝、深绿等冷色系穿搭')
  } else {
    tips.push('中性肤色包容性强，各种颜色均可尝试')
  }

  tips.push('版型比品牌更重要，合身的衣服是最好的加分项')
  tips.push('推荐基本款单品：白衬衫、牛仔裤、简洁运动鞋，百搭实用')

  return {
    category: '穿搭',
    title: '穿搭建议',
    description,
    icon: '▲',
    tips,
  }
}

function generateMaleBodyAdvice(_fv: FaceFeatureVector): MakeupAdvice {
  const tips: string[] = []
  const description = '良好的体态和体型能大幅提升整体气场，是男性颜值的重要组成部分。'

  tips.push('保持挺拔的体态，抬头挺胸，视觉上自带气场')
  tips.push('推荐力量训练：提升肩宽和整体体型线条感')
  tips.push('有氧运动改善肤色，有助于保持健康的肤质状态')
  tips.push('注意坐姿站姿，长期良好体态会自然改善颈部线条')
  tips.push('充足睡眠可以有效改善黑眼圈和肤色暗沉')

  return {
    category: '体态',
    title: '体态建议',
    description,
    icon: '◇',
    tips,
  }
}

function generateMaleOverallStyleAdvice(_fv: FaceFeatureVector, beautyType: MaleBeautyType): MakeupAdvice {
  const styleMap: Record<MaleBeautyType, { description: string; tips: string[] }> = {
    '阳光运动型': {
      description: '您天生阳光正能量，推荐走清爽运动风路线，简洁利落的造型最能展现您的魅力。',
      tips: [
        '服装推荐运动休闲风：Polo衫、运动裤、清爽运动鞋',
        '颜色以白色、浅蓝、橙色等明亮色系为主',
        '保持清爽短发或利落造型，展现精神气质',
        '香水推荐清爽海洋调或运动型香氛',
      ],
    },
    '儒雅书生型': {
      description: '您的气质温润儒雅，推荐走知性文艺路线，简约而有内涵的造型最适合您。',
      tips: [
        '服装推荐简约文艺风：衬衫、针织衫、简洁裤装',
        '颜色以白色、米色、浅蓝、深棕等低调色系为主',
        '推荐细框眼镜，能很好地强化文艺气质',
        '香水推荐木质调或淡雅花香，低调有品位',
      ],
    },
    '霸气总裁型': {
      description: '您天生自带气场，推荐走成熟商务路线，质感强的服装最能彰显您的霸气。',
      tips: [
        '服装推荐商务休闲风：西装、剪裁感衬衫、皮鞋',
        '颜色以黑色、深灰、深蓝等深沉色系为主',
        '保持利落发型，整体造型干净有力量感',
        '香水推荐东方木质调或皮革香调，彰显气场',
      ],
    },
    '邻家暖男型': {
      description: '您的亲和力是最大魅力，推荐走温暖日常路线，让人感觉舒适自在的造型最适合。',
      tips: [
        '服装推荐温暖休闲风：针织衫、牛仔衣、帆布鞋',
        '颜色以暖白、卡其、焦糖等温暖色系为主',
        '保持自然清爽的发型，笑容是最好的配饰',
        '香水推荐温暖木质调或淡淡甜香，亲切宜人',
      ],
    },
    '冷酷型男型': {
      description: '您自带冷感帅气，推荐走简约冷酷路线，极简风格和深色系最能彰显您的魅力。',
      tips: [
        '服装推荐极简暗黑风：黑色T恤、修身裤、皮革单品',
        '颜色以黑白灰为主，偶尔点缀深蓝或墨绿',
        '发型保持简洁，线条利落，无需过多修饰',
        '香水推荐冷调木质或烟熏香，冷酷神秘感',
      ],
    },
    '文艺清新型': {
      description: '您的气质内敛有深度，推荐走文艺清新路线，有品位而不张扬的造型最适合您。',
      tips: [
        '服装推荐文艺休闲风：棉麻衬衫、宽松裤、布鞋',
        '颜色以白色、灰色、卡其、浅绿等清新色系为主',
        '可以搭配简约的配饰：细手链、素色帆布袋',
        '香水推荐清新草木调或淡雅花草香',
      ],
    },
    '潮流先锋型': {
      description: '您天生时尚感极强，推荐走潮流先锋路线，大胆前卫的搭配能完美展现您的个性。',
      tips: [
        '服装推荐潮牌街头风：oversize卫衣、潮流运动鞋、个性配饰',
        '颜色可以大胆撞色或尝试印花、图案等元素',
        '发型可以尝试个性染色或潮流造型',
        '香水推荐个性独特的小众香水，彰显辨识度',
      ],
    },
    '硬汉型男型': {
      description: '您散发着强烈的男性魅力，推荐走硬朗粗犷路线，有力量感的造型最能彰显您的气质。',
      tips: [
        '服装推荐硬朗户外风：工装裤、皮夹克、军靴',
        '颜色以橄榄绿、卡其、深棕、黑色等硬朗色系为主',
        '推荐寸头、平头或利落短发，彰显硬汉气质',
        '香水推荐木质或皮革调，充满力量感',
      ],
    },
  }

  const style = styleMap[beautyType] || {
    description: '根据您的整体特征，建议注重整洁感，打造自然有品位的形象。',
    tips: ['保持整洁的发型和服装', '建立适合自己的风格定位'],
  }

  return {
    category: '风格',
    title: '整体风格定位',
    description: style.description,
    icon: '★',
    tips: style.tips,
  }
}

/**
 * 眉形建议
 */
function generateBrowAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { faceShape, brows, eyes } = fv
  const tips: string[] = []
  let description = ''

  switch (faceShape.type) {
    case '圆脸':
      description = '圆脸建议选择微上扬的拱形眉或平直眉，拉长脸部视觉比例，避免圆弧眉让脸显得更圆。'
      tips.push('画眉时眉峰位置稍靠外，可以拉宽额头视觉')
      tips.push('眉尾略微上扬，增加立体感')
      tips.push('眉毛适当拉长，有效拉伸脸型')
      break
    case '方脸':
      description = '方脸建议选择弓形眉，柔化脸部线条，使整体看起来更加柔和优雅。'
      tips.push('避免直平眉，会强调脸部的方形轮廓')
      tips.push('眉头不要画得太靠近，避免加宽额头')
      tips.push('弓形眉的弧度不宜过大，保持自然感')
      break
    case '长脸':
      description = '长脸适合平眉或接近水平的眉形，减少脸部拉长感，呈现均衡比例。'
      tips.push('眉形尽量水平，不要有太多上扬或下垂')
      tips.push('眉毛不宜过细，适当增加眉毛存在感')
      tips.push('眉尾不要拉太长，避免进一步拉长脸型')
      break
    case '瓜子脸':
    case '心形脸':
      description = '瓜子脸/心形脸是最理想的脸型，几乎任何眉形都适合，可以大胆尝试当下流行的眉形。'
      tips.push('当前流行平直眉，展现干净清爽的气质')
      tips.push('若想更甜美，可以尝试微上扬的拱形眉')
      tips.push('定期修剪眉毛下边缘，保持眉形整洁')
      break
    case '菱形脸':
      description = '菱形脸建议选择弧度圆润的眉形，柔化颧骨棱角感，增加亲和力。'
      tips.push('避免过于锐利的眉峰，会突显颧骨')
      tips.push('眉头位置适当放宽，平衡面部视觉')
      break
    default:
      description = '椭圆脸是最理想的脸型，适合多种眉形，根据个人喜好选择即可。'
      tips.push('推荐自然感眉形，保留真实眉毛轮廓')
  }

  // 根据当前眉形添加针对性建议
  if (brows.shape === '下垂眉') {
    tips.push('眉尾有自然下垂，可以修掉下垂部分，用眉笔补画上扬眉尾')
  }
  if (brows.symmetry < 60) {
    tips.push('两眉不对称较明显，可以用遮瑕盖住多余眉毛后重新描绘')
  }
  if (eyes.type === '单眼皮') {
    tips.push('单眼皮建议不要画太粗的眉，避免双眼间距看起来过短')
  }

  return {
    category: '眉形',
    title: '眉形建议',
    description,
    icon: '✦',
    tips,
  }
}

/**
 * 眼妆建议
 */
function generateEyeAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { eyes } = fv
  const tips: string[] = []
  let description = ''

  switch (eyes.type) {
    case '单眼皮':
      description = '单眼皮拥有独特的清冷气质，是许多人羡慕的眼型。建议使用烟熏眼影叠层晕染，在眼折处加深，通过渐变眼影制造深邃感。'
      tips.push('从眼折处往上晕染中深色眼影，制造立体双眼皮效果')
      tips.push('眼线要细而精准，可以拉长眼尾增加性感感')
      tips.push('推荐灰棕、烟灰、深紫等冷调眼影色')
      tips.push('下眼线用棕色轻扫，增加眼神深邃感')
      break
    case '内双':
      description = '内双是最神秘迷人的眼型，视觉上比较精巧。建议强化眼折以上的眼影，并适当拉长眼线。'
      tips.push('重点加强上眼睑折痕以上的眼影晕染')
      tips.push('眼线建议从眼中开始加粗，向眼尾延伸')
      tips.push('睫毛膏着重刷中间到外侧，让眼睛更开阔')
      tips.push('可以尝试卧蚕妆增加眼部存在感')
      break
    case '双眼皮':
      description = '双眼皮是最容易打造各种妆容的眼型。可以根据场合随意切换甜美、御姐、可爱等不同风格。'
      tips.push('日常推荐大地色系眼影，自然百搭')
      tips.push('约会妆可以用玫瑰金、珊瑚色增加甜美感')
      tips.push('职场妆推荐棕色眼线加咖啡色眼影，知性优雅')
      break
    default:
      description = '您的眼型比例均衡，具有良好的可塑性，适合多种眼妆风格。'
      tips.push('尝试不同风格的眼妆，找到最适合自己的那款')
  }

  // 眼距建议
  if (eyes.spacing < 55) {
    description += '\n眼距较宽，建议使用深色眼影在眼头内侧晕染，视觉上拉近眼距。'
    tips.push('眼头内侧画深色眼影或深色眼线，收窄眼距视觉效果')
  } else if (eyes.spacing > 80) {
    description += '\n眼距较近，建议眼影重点集中在眼尾部分，避免眼头深色，适当拉开眼距。'
    tips.push('眼影重心放在眼尾，眼头留亮色')
  }

  // 眼睛大小建议
  if (eyes.size < 50) {
    tips.push('眼睛较小，使用白色或肉粉色卧蚕色，让眼睛显得更大更有神')
    tips.push('下睫毛和下眼线对大眼效果非常重要，不要忽略')
  }

  return {
    category: '眼妆',
    title: '眼妆建议',
    description,
    icon: '◆',
    tips,
  }
}

/**
 * 唇妆建议
 */
function generateLipAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { lips, skin } = fv
  const tips: string[] = []
  let description = ''

  switch (lips.shape) {
    case '厚唇':
      description = '丰厚的嘴唇是性感的标志，建议使用唇线收紧轮廓，选择哑光唇色更显精致。'
      tips.push('用唇线笔沿真实唇线内侧轻轻勾勒，视觉上收薄')
      tips.push('中心涂深一度的唇色，两侧用浅色，制造渐变效果')
      tips.push('推荐哑光质地，避免玻璃唇显得嘴唇更厚')
      tips.push('深玫瑰色、暗红色等深色系很适合厚唇')
      break
    case '薄唇':
      description = '薄唇轮廓清晰，适合适当外扩来增加饱满感，水润或镜面质地能有效提升丰盈感。'
      tips.push('用唇线笔沿唇线外侧0.5-1mm描绘，向外扩大唇形')
      tips.push('优先选择水润光泽质地的唇品，如唇釉、镜面唇')
      tips.push('全唇统一涂色，避免唇中过深让唇看起来更薄')
      tips.push('裸粉色、珊瑚色等浅色系更适合薄唇')
      break
    case 'M型峰唇':
      description = '唇峰明显的M型唇自带高级感，轮廓分明，是许多人羡慕的唇形。哑光或微光质地都非常适合。'
      tips.push('保留自然的唇峰形状，用唇线笔强调轮廓')
      tips.push('不同场合可以尝试：职场选哑光正红，约会选微光玫瑰')
      tips.push('唇中用亮色提亮，唇角用深一度的色号，增加立体感')
      break
    default:
      description = '您的唇形比例均衡，几乎任何唇色和质地都适合，可以大胆尝试各种风格。'
      tips.push('大红唇展现自信，珊瑚橘展现活力，豆沙色展现日常')
      tips.push('叠色技巧：先涂打底唇膏，再叠加唇釉，持久度高又水润')
  }

  // 肤色建议
  if (skin.tone === '冷调') {
    tips.push('冷调肤色适合冷调唇色：正红、玫瑰红、莓果色都是好选择')
  } else if (skin.tone === '暖调') {
    tips.push('暖调肤色适合暖调唇色：珊瑚橘、砖红、橙棕色系更显肤色健康')
  }

  // 嘴角角度建议
  if (lips.cornerAngle < -5) {
    tips.push('嘴角略微下垂，可以在嘴角处点一点亮色唇彩，视觉上提亮嘴角')
  }

  return {
    category: '唇妆',
    title: '唇妆建议',
    description,
    icon: '◇',
    tips,
  }
}

/**
 * 修容建议
 */
function generateContourAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { faceShape, nose } = fv
  const tips: string[] = []
  let description = ''

  switch (faceShape.type) {
    case '圆脸':
      description = '圆脸修容重点是塑造脸部轮廓感，通过阴影收窄两颊，高光集中在脸中央，打造立体瘦脸效果。'
      tips.push('两颊太阳穴到下颌角刷阴影，从发际线向颧骨方向斜向晕开')
      tips.push('高光集中在额头中央、鼻梁、颧骨高点和下巴尖')
      tips.push('腮红以横向拍打为主，避免圆形打法')
      break
    case '方脸':
      description = '方脸修容重点是柔化下颌角，在颧骨以下到下颌角区域加深阴影，减少方形感。'
      tips.push('下颌角两侧各刷阴影，向颧骨方向晕开，软化边角')
      tips.push('额头两侧鬓角处也可以加一点阴影，避免额头太宽')
      tips.push('腮红以斜向打法为主，拉长脸型视觉效果')
      break
    case '长脸':
      description = '长脸修容需要视觉上缩短脸的长度，在发际线和下颌处加深阴影，腮红横向打可以增加脸的宽度感。'
      tips.push('发际线处刷一道阴影，视觉上降低发际线')
      tips.push('下巴处轻刷阴影，减少下巴凸出感')
      tips.push('腮红横向拍打两颊，增加脸部宽度视觉效果')
      tips.push('避免鼻梁修容拉太长，会进一步拉长脸型')
      break
    case '心形脸':
    case '瓜子脸':
      description = '瓜子/心形脸是修容界的幸运儿，轮廓本身已经很完美，只需要基础高光和轻微阴影即可。'
      tips.push('鼻梁打高光让面中更立体')
      tips.push('苹果肌处打球形腮红，增加甜美感')
      tips.push('不需要大面积阴影，保持轻盈感即可')
      break
    default:
      description = '您的脸型比例均衡，基础修容即可。重点打好高光位置，增加面部立体感。'
      tips.push('高光重点：额头中央、鼻梁、颧骨高点、下巴尖')
      tips.push('阴影轻扫两颊收窄脸型即可')
  }

  // 鼻梁修容建议
  if (nose.bridgeHeight < 50) {
    tips.push('鼻梁偏低，可以在鼻梁中间竖向打高光，两侧用阴影塑造鼻影，视觉提鼻梁')
  }
  if (nose.wingWidth < 50) {
    tips.push('鼻翼偏宽，用修容粉在鼻翼两侧轻刷，收窄鼻翼视觉效果')
  }

  return {
    category: '修容',
    title: '修容建议',
    description,
    icon: '▲',
    tips,
  }
}

/**
 * 发型建议
 */
function generateHairAdvice(fv: FaceFeatureVector): MakeupAdvice {
  const { faceShape, skin } = fv
  const tips: string[] = []
  let description = ''

  switch (faceShape.type) {
    case '圆脸':
      description = '圆脸适合拉长脸型的发型，推荐中分或三七分的直发、卷发，刘海以斜刘海或无刘海为佳。'
      tips.push('推荐中分直发或大波浪，视觉上拉长脸型')
      tips.push('斜刘海可以遮住部分额头，修饰圆脸')
      tips.push('避免齐刘海或蘑菇头，会让脸显得更圆')
      tips.push('发色推荐深棕到黑色渐变，避免过度漂浅')
      break
    case '方脸':
      description = '方脸适合柔化棱角的卷发或有层次感的发型，两侧留适量发量遮住下颌角。'
      tips.push('推荐中长发梨花卷，刘海遮住额角，两侧发量覆盖下颌角')
      tips.push('斜刘海或8字形分缝刘海适合方脸')
      tips.push('避免超短发或背发全部往后，会暴露脸型')
      break
    case '长脸':
      description = '长脸适合增加横向宽度感的发型，推荐有刘海的短发或中发，卷发效果更好。'
      tips.push('推荐齐刘海或圆弧刘海，减少脸部纵向长度')
      tips.push('短发、波波头很适合长脸')
      tips.push('两侧发量丰富一些，增加脸部宽度感')
      break
    case '瓜子脸':
    case '心形脸':
      description = '瓜子/心形脸是公认的最上镜脸型，各种发型都驾驭，可以根据个人喜好尝试各种风格。'
      tips.push('几乎任何发型都适合，可以大胆尝试')
      tips.push('披肩长发、短发、盘发各具风格魅力')
      tips.push('刘海有无都好看，根据当下流行趋势选择')
      break
    default:
      description = '您的脸型均衡，各种发型都有尝试空间，推荐根据自己的生活风格选择。'
      tips.push('日常推荐自然顺直的长发或空气感短发')
  }

  // 发色建议
  if (skin.tone === '冷调') {
    tips.push('冷调肤色适合冷色发色：亮黑、冷棕、浅灰、亚麻色')
  } else if (skin.tone === '暖调') {
    tips.push('暖调肤色适合暖色发色：暖棕、红棕、栗色、巧克力色')
  } else {
    tips.push('中性肤色包容性强，暖棕或冷棕都可以尝试')
  }

  return {
    category: '发型',
    title: '发型建议',
    description,
    icon: '♦',
    tips,
  }
}

/**
 * 整体风格建议
 */
function generateOverallStyleAdvice(_fv: FaceFeatureVector, beautyType: BeautyType): MakeupAdvice {
  const styleMap: Record<BeautyType, { description: string; tips: string[] }> = {
    '清冷仙气型': {
      description: '您适合走清冷高级风，妆容以低饱和哑光为主，整体造型干净利落，避免过于甜美浮夸的元素。',
      tips: [
        '服装推荐黑白灰、烟蓝、莫兰迪色系',
        '饰品选择简洁冷调的金属质感',
        '香水推荐清木质调或冷香调',
        '整体造型追求"高级感"，少即是多',
      ],
    },
    '甜系邻家型': {
      description: '您适合走清甜学院风或甜美可爱风，妆容以粉嫩色系为主，整体造型充满青春活力。',
      tips: [
        '服装推荐粉白色系、格纹、碎花等甜美元素',
        '饰品选择可爱的小动物或花朵主题',
        '香水推荐甜果香或花香调',
        '日常推荐淡妆，突出自然好气色',
      ],
    },
    '御姐女王型': {
      description: '您适合走成熟高冷路线，浓艳妆容和利落服装都能完美驾驭，散发出不可抗拒的气场。',
      tips: [
        '服装推荐黑色、深红、墨绿等深沉色系',
        '服装轮廓推荐剪裁感强的西装或修身连衣裙',
        '饰品选择存在感强的大耳环或粗项链',
        '香水推荐东方香调或皮革香调',
      ],
    },
    '元气少女型': {
      description: '您适合走青春元气路线，清新活泼的妆容和明亮色系服装能完美衬托出您充满活力的特质。',
      tips: [
        '服装推荐明亮活泼的色系：橙色、黄色、浅蓝',
        '推荐运动休闲风或活泼休闲风',
        '饰品选择趣味性强的潮流单品',
        '香水推荐清新果香或水果调',
      ],
    },
    '高级混血型': {
      description: '您适合走高级大片感路线，大地色系或金属质感的妆容和服装都能彰显您独特的异域气质。',
      tips: [
        '服装推荐大地色系或金属光泽感面料',
        '推荐具有民族风元素的高级搭配',
        '饰品选择立体感强的金色或黄铜系列',
        '香水推荐东方木质调或琥珀香',
      ],
    },
    '英气飒爽型': {
      description: '您适合走利落帅气路线，干净的中性风服装和简洁的妆容最能彰显您的英气之美。',
      tips: [
        '服装推荐中性风西装、皮质单品、高领衫',
        '配色推荐黑白对比或低饱和配色',
        '饰品选择简洁金属质感，如细圆耳钉',
        '香水推荐清爽木质调或麝香调',
      ],
    },
    '知性优雅型': {
      description: '您适合走都市知性风，经典款式和优质材料最能衬托您沉稳优雅的气质。',
      tips: [
        '服装推荐经典剪裁款式，如风衣、A字裙、直筒裤',
        '配色推荐经典色系：驼色、米白、深海军蓝',
        '饰品选择低调优雅的珍珠或细金链',
        '香水推荐木质花香调或清雅花香',
      ],
    },
    '复古东方型': {
      description: '您适合走东方古典美路线，旗袍、汉服或具有东方元素的现代服装都非常适合您。',
      tips: [
        '服装推荐具有中式元素的设计：旗袍领、盘扣、刺绣',
        '配色推荐朱砂红、碧玉绿、墨黑、玫瑰棕',
        '饰品选择玉石、流苏、中式古典风格',
        '香水推荐东方麝香或沉香木调',
      ],
    },
    '少年感中性型': {
      description: '您适合走中性先锋风，打破性别界限的服装搭配最能展现您独特的个人魅力。',
      tips: [
        '服装推荐中性剪裁：oversize衫、阔腿裤、机车夹克',
        '配色推荐黑、白、灰为主，或大胆撞色',
        '饰品选择骷髅、金属钉等个性单品',
        '香水推荐中性木质调或烟熏香',
      ],
    },
    '暖系治愈型': {
      description: '您适合走温暖治愈风，柔和的色调和舒适的服装搭配能完美呈现您温暖可亲的特质。',
      tips: [
        '服装推荐奶油色、裸粉、浅橘等暖调色系',
        '推荐柔软材质：羊绒、棉麻、针织',
        '饰品选择温柔可爱的设计，如花朵、爱心',
        '香水推荐甜蜜奶香调或温柔花果香',
      ],
    },
  }

  const style = styleMap[beautyType] || {
    description: '根据您的整体特征，建议妆容以自然为主，找到属于自己的风格定位。',
    tips: ['保持自然妆感，用妆容强调优势', '服装搭配以舒适度优先'],
  }

  return {
    category: '风格',
    title: '整体风格定位',
    description: style.description,
    icon: '★',
    tips: style.tips,
  }
}
