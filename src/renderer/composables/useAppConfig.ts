/**
 * 全局应用配置 composable
 * 统一读取和响应式管理 AppConfig，供各组件使用
 */
import { ref, watch, onMounted } from 'vue'
import type { AppConfig } from '@/types'

// 使用模块级单例，保证全应用共享同一份响应式配置
const config = ref<AppConfig>({
  language: 'zh-CN',
  fontSize: 14,
  theme: 'system',
  sendKey: 'Enter',
  launchAtLogin: false,
  showTimestamp: true,
  providerConfigs: {},
})

let initialized = false

/** 将主题应用到 <html> 元素 */
function applyTheme(theme: AppConfig['theme']) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', isDark)
}

/** 将字体大小应用到根元素（px 单位，组件内 em 相对于它缩放） */
function applyFontSize(size: number) {
  document.documentElement.style.fontSize = `${size}px`
}

export function useAppConfig() {
  onMounted(async () => {
    if (!initialized) {
      initialized = true
      // 从主进程读取持久化配置
      const saved = await window.electronAPI.getConfig()
      config.value = { ...config.value, ...saved }
      applyTheme(config.value.theme)
      applyFontSize(config.value.fontSize)

      // 监听系统颜色方案变化（跟随系统模式时实时响应）
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (config.value.theme === 'system') {
          applyTheme('system')
        }
      })
    }
  })

  // 监听 theme 变化，实时切换
  watch(
    () => config.value.theme,
    newTheme => applyTheme(newTheme),
  )

  // 监听 fontSize 变化，实时生效
  watch(
    () => config.value.fontSize,
    newSize => applyFontSize(newSize),
  )

  return { config }
}
