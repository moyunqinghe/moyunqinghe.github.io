# 遥遥领先的一天

> 一个AI应用使能优化工程师的抽象日常网页

🔗 **在线访问**: https://moyunqinghe.github.io

## 📁 项目结构

```
.
├── index.html              # 主页面
├── css/
│   ├── style.css          # 主样式表
│   └── animations.css     # 动画样式表
├── js/
│   ├── main.js            # 主脚本（交互逻辑）
│   └── animations.js      # 动画控制脚本
├── assets/
│   └── images/            # 图片资源目录
└── README.md              # 项目说明
```

## 🚀 部署到 GitHub Pages

### 方法一：直接上传（推荐）

1. 将所有文件上传到你的 GitHub 仓库 `moyunqinghe.github.io`
2. 进入仓库 Settings → Pages
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main" 或 "master"，文件夹选择 "/ (root)"
5. 等待 1-2 分钟，访问 https://moyunqinghe.github.io

### 方法二：Git 命令行

```bash
# 克隆仓库
git clone https://github.com/moyunqinghe/moyunqinghe.github.io.git
cd moyunqinghe.github.io

# 复制项目文件到仓库
# ... 复制 index.html, css/, js/ 等文件 ...

# 提交并推送
git add .
git commit -m "🚀 添加遥遥领先的一天网页"
git push origin main
```

## ✨ 功能特性

### 🎭 页面模块

1. **开屏 Hero** - 土味金光闪闪标题 + 疯狂向下箭头
2. **第一幕：起床困难户** - 闹钟 emoji 轰炸 "优化！优化！优化！"
3. **第二幕：战绩墙**（核心）- 8条抽象战绩，滚动触发飞入动画
4. **第三幕：B面人生** - 下班后的 emo + 摆烂氛围
5. **结尾 & 彩蛋** - 时间统计、假薪资弹窗、烟花特效

### 🎨 视觉风格

- 配色：品红 #FF00FF、青色 #00FFFF、黄色 #FFFF00
- 字体：Noto Sans SC + Microsoft YaHei + Comic Sans MS
- 特效：Glitch 故障效果、彩虹渐变、发光阴影

### 🎮 交互功能

- 滚动触发动画（Intersection Observer）
- 时间统计器（显示在页停留时间）
- 假薪资弹窗（点击查看"遥遥领先"薪资）
- 回到顶部按钮
- Konami Code 彩蛋（↑↑↓↓←→←→BA）
- 双击战绩卡片触发粒子效果

## 🛠 技术栈

- **纯前端**: HTML5 + CSS3 + 原生 JavaScript
- **动画**: CSS Keyframes + Intersection Observer API
- **字体**: Google Fonts (Noto Sans SC)
- **部署**: GitHub Pages

## 📱 浏览器兼容性

- Chrome / Edge / Firefox / Safari 最新版
- 支持移动端响应式布局
- 支持 `prefers-reduced-motion` 减少动画偏好

## 📝 自定义内容

### 修改战绩内容

编辑 `index.html` 中的 `.achievement-card` 元素：

```html
<div class="achievement-card" data-index="0">
    <div class="card-icon">⏱️</div>
    <h3 class="card-title">你的标题</h3>
    <div class="card-content">
        <p class="highlight">高亮内容</p>
        <p class="detail">详细描述</p>
    </div>
</div>
```

### 修改配色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --color-magenta: #FF00FF;
    --color-cyan: #00FFFF;
    --color-yellow: #FFFF00;
    /* ... */
}
```

## 🎯 项目特点

- ✅ 纯静态页面，无需后端
- ✅ 零依赖，无 npm 包
- ✅ 自动适配 GitHub Pages
- ✅ 响应式设计，支持移动端
- ✅ 丰富的交互动画
- ✅ 土味抽象搞笑风格

## 📄 License

MIT License - 自由使用和修改

---

Made with 🚀 遥遥领先精神 by 墨韵清河
