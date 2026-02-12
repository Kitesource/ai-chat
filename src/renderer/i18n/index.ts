import { createI18n } from 'vue-i18n'
import en from '@renderer/locales/en'
import zhCN from '@renderer/locales/zh-CN'

type MessageSchema = typeof zhCN
type LanguageType = 'zh-CN' | 'en'

export const i18n = createI18n<[MessageSchema], LanguageType>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-CN': zhCN,
  },
})

// 初始化i18n的语言设置
export async function initI18n() {
  const config = await window.electronAPI.getConfig()
  setI18nLanguage(config.language)
}

export function setI18nLanguage(locale: LanguageType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
}
