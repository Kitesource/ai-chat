import { app } from 'electron'
import path from 'path'
import fs from 'fs/promises'
import { AppConfig, ProviderType } from '@/types'

const configPath = path.join(app.getPath('userData'), 'config.json')
export const DEFAULT_CONFIG: AppConfig = {
  language: 'zh-CN',
  fontSize: 14,
  theme: 'system',
  sendKey: 'Enter',
  launchAtLogin: false,
  showTimestamp: true,
  providerConfigs: {
    [ProviderType.Qianfan]: {
      accessKey: process.env.VITE_QIANFAN_ACCESS_KEY || '',
      secretKey: process.env.VITE_QIANFAN_SECRET_KEY || '',
    },
    [ProviderType.Dashscope]: {
      apiKey: process.env.VITE_DASHSCOPE_APIKEY || '',
      baseUrl: process.env.VITE_DASHSCOPE_BASEURL || '',
    },
    [ProviderType.DeepSeek]: {
      apiKey: process.env.VITE_DEEPSEEK_APIKEY || '',
      baseUrl: process.env.VITE_DEEPSEEK_BASEURL || '',
    },
    [ProviderType.OpenAI]: {
      apiKey: process.env.VITE_GPT_APIKEY || '',
      baseUrl: process.env.VITE_GPT_BASEURL || '',
    },
  },
}
let config = { ...DEFAULT_CONFIG }

export const configManager = {
  async load() {
    try {
      const data = await fs.readFile(configPath, 'utf-8')
      console.log('data', data)
      config = { ...DEFAULT_CONFIG, ...JSON.parse(data) }
    } catch {
      await this.save()
    }
    return config
  },

  async save() {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2))
    return config
  },

  async update(newConfig: Partial<AppConfig>) {
    config = { ...config, ...newConfig }
    await this.save()
    return config
  },

  get() {
    return config
  },
}
