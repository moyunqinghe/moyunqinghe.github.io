# 个人主页（纯静态）设计文档

- 日期：2026-08-18
- 项目：`~/个人/学习/blog` —— 墨韵清河的个人主页
- 状态：已确认（用户授权"我听你的"，由设计者拍板细节）

## 1. 定位与范围

一个纯静态、无框架、无构建工具的单页个人主页（"自留地"），用于自我介绍与展示联系方式。部署到自有域名/服务器。

**范围内：**

- 单页滚动，两个内容区块：名片区、找到我（联系方式）
- 暖纸文艺视觉风格，系统衬线字体
- 响应式（移动端适配）、基础 SEO 与 Open Graph、可访问性
- README（改内容/部署指引）

**范围外（明确不做，留待未来）：**

- 博客/文章系统、友链区、兴趣标签、暗色模式
- JavaScript（零 JS；邮箱用 `mailto:`，不防爬、不做点按复制）
- web 字体（国内网络不可依赖 Google Fonts；不引入字体文件）

## 2. 信息架构（页面自上而下）

| 区块 | 内容 |
|---|---|
| 名片区（首屏主体） | 圆形头像（SVG 占位，"墨"字水墨风）· 名字「墨韵清河」（衬线大字）· 身份「AI Agent 工程师」· 点睛句「喜欢就去做」 |
| 找到我 | 三个文字排版条目（平台名 + 账号名，无图标）：<br>① Email → `zzhdyyds@gmail.com`（`mailto:` 直连）<br>② GitHub → `moyunqinghe`（https://github.com/moyunqinghe，新标签页）<br>③ B站 → `299503081`（https://space.bilibili.com/299503081，新标签页） |
| 页脚 | `© 2026 墨韵清河` |

`<title>`：`墨韵清河 · 喜欢就去做`
meta description：`墨韵清河的个人主页 —— AI Agent 工程师。喜欢就去做。`

## 3. 文件结构（方案 A：极简两文件 + 素材目录）

```
blog/
├── index.html          # 唯一页面，语义化 HTML5
├── css/
│   └── style.css       # 全部样式：变量、排版、组件、响应式
├── assets/
│   ├── avatar.svg      # 头像占位（可替换为任意方形图片）
│   └── favicon.svg     # 站点图标
└── README.md           # 改内容/换头像/部署指引
```

- 所有资源引用使用**相对路径**，放在服务器任意子目录均可运行
- 零 JS，不预留 JS 文件；将来需要时再加 `js/` 目录
- 不初始化构建配置、不引依赖

## 4. 视觉规范（暖纸文艺）

### 色彩

| 变量 | 色值 | 用途 |
|---|---|---|
| `--paper` | `#f6efe3` | 页面底色（米白纸感） |
| `--surface` | `#fffdf7` | 卡片/条目底（暖白） |
| `--ink` | `#3d2f1e` | 主文字（深褐墨色） |
| `--ink-soft` | `#8a7a5f` | 次级文字（灰褐） |
| `--accent` | `#a4552f` | 链接、强调（赭石） |
| `--line` | `#e7dcc8` | 细线、边框 |

### 字体

- 全站衬线：`"Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", Georgia, serif`
- 账号名（邮箱/GitHub/B站 ID）用等宽小字：`ui-monospace, Menlo, Consolas, monospace`
- 中文正文行高 1.8；名字、标题加字距（0.06em–0.3em）营造排版感

### 版式

- 单列居中，正文容器 `max-width: 40rem`，大量纵向留白
- 名片区：居中布局，96px 圆形头像，暖白卡片 + 1px 细边 + 极淡阴影
- 「找到我」标题两侧饰细线；条目为卡片行，hover 时边框转赭石色并轻微上浮
- 移动端（≤480px）：缩小内边距与头像，条目内容允许换行

### 装饰细节

- `::selection` 选中色为赭石半透明
- `focus-visible` 赭石描边，保证键盘可达
- `theme-color` meta 与纸色一致

## 5. SEO / 可访问性 / 语义

- `<html lang="zh-CN">`、UTF-8、viewport
- 语义标签：`<main>` / `<header>` / `<section>` / `<footer>` / `<ul>`，标题层级 h1→h2
- 外链 `rel="noopener"`；头像带 alt；联系方式区块 `aria-labelledby`
- OG 标签：`og:title`、`og:description`、`og:type=website`（无 og:image，SVG 兼容性差）

## 6. 部署

纯静态文件，整体上传自有服务器即可（任意静态文件服务/目录）。无构建步骤、无环境变量。README 中写明：上传目录结构、替换头像、修改文案的入口。

## 7. 验收标准

1. 浏览器直接打开 `index.html` 正常显示，样式完整（不依赖任何服务器特性）
2. 移动端宽度（375px）下布局不破，文字可读，链接可点（触控目标 ≥44px）
3. 三个联系方式均可正确跳转
4. Lighthouse 式自查：语义结构、对比度（`#3d2f1e`/`#f6efe3` ≈ 10:1）、focus 样式达标
