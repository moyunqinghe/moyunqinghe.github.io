# 墨韵清河 · 个人主页

纯静态、无框架、无构建的单页个人主页。暖纸文艺风。

## 目录结构

```
├── index.html          # 唯一页面：内容都在这里
├── css/style.css       # 全部样式：配色、排版、响应式
├── assets/
│   ├── avatar.svg      # 头像（占位图，见下方替换方法）
│   └── favicon.svg     # 站点图标
└── README.md
```

## 修改内容

所有内容都在 `index.html` 里，直接搜改即可：

| 想改什么 | 改哪里 |
|---|---|
| 名字 / 身份 / 点睛句 | `<header class="card">` 里的 `h1.name` / `p.role` / `p.motto` |
| 邮箱 | `mailto:` 链接和显示文字（共两处） |
| GitHub / B站 | 对应 `<a>` 的 `href` 和 `.handle` 文字 |
| 页脚版权 | `<footer class="footer">` |
| 页面标题 / 简介 | `<title>` 和两个 `description` meta |

## 替换头像

1. 把一张方形照片放到 `assets/` 下（例如 `assets/avatar.jpg`）
2. 把 `index.html` 里的 `<img class="avatar" src="assets/avatar.svg" ...>` 改成新文件名

## 调整样式

配色、字体都在 `css/style.css` 顶部的 `:root` 变量里，改一处全站生效：

- `--paper` 页面底色 · `--surface` 卡片底色 · `--ink` 主文字
- `--accent` 强调色 · `--line` 边框线色

## 部署

纯静态文件，无构建步骤。把整个目录上传到服务器的 Web 目录即可（所有引用都是相对路径，放在任意子目录都能运行）。

## 设计文档

见 [`docs/superpowers/specs/2026-08-18-personal-homepage-design.md`](docs/superpowers/specs/2026-08-18-personal-homepage-design.md)。
