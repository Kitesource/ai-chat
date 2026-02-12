# AI Chat

基于 Electron + Vue 3.5 + Vite 构建的跨平台 AI 聊天桌面应用，支持多种大语言模型。

## ✨ 特性

- **多模型支持**：无缝集成 DeepSeek、OpenAI、百度文心一言 (Qianfan)、阿里通义千问 (DashScope)。
- **本地存储**：使用 Dexie.js 进行聊天记录的本地持久化存储，保护用户隐私。
- **现代化 UI**：基于 Tailwind CSS 和 Radix Vue 构建的精美界面，支持深色模式。
- **Markdown 支持**：聊天内容支持 Markdown 渲染及代码高亮。
- **国际化**：内置 Vue I18n，支持多语言切换。
- **跨平台**：支持 Windows, macOS, Linux (通过 Electron)。

## 🛠️ 技术栈

**前端 (渲染进程)**

- [Vue 3.5](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - 强类型 JavaScript
- [Pinia](https://pinia.vuejs.org/) - Vue 专属状态管理库
- [Vue Router](https://router.vuejs.org/) - 路由管理
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Radix Vue](https://www.radix-vue.com/) - 无样式 UI 组件库
- [Vue I18n](https://vue-i18n.intlify.dev/) - 国际化插件
- [Dexie.js](https://dexie.org/) - IndexedDB 的封装库

**桌面端 (主进程)**

- [Electron](https://www.electronjs.org/) - 构建跨平台桌面应用
- [Electron Forge](https://www.electronforge.io/) - Electron 全套构建工具

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) (推荐 v16 或更高版本)
- [pnpm](https://pnpm.io/) (推荐使用的包管理器)

### 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/your-username/ai-chat.git
   cd ai-chat
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```

### 💻 开发与构建

**启动开发服务器**：

```bash
pnpm start
```

**打包应用 (不生成安装包)**：

```bash
pnpm package
```

**生成安装包 (Make)**：

```bash
pnpm make
```

**代码检查 (Lint)**：

```bash
pnpm lint
```

## 📂 项目结构

```
├── src/
│   ├── main/       # Electron 主进程代码
│   ├── preload/    # Electron 预加载脚本
│   └── renderer/   # Vue 渲染进程代码 (前端界面)
├── forge.config.ts # Electron Forge 配置文件
├── vite.*.config.ts # Vite 配置文件
└── ...
```

## 📄 许可证

[MIT License](LICENSE)
