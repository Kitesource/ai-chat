import { app } from 'electron'
import path from 'path'
import fs from 'fs/promises'
import { AppConfig, ProviderType } from '@/types'

const configPath = path.join(app.getPath('userData'), 'config.json')
export const DEFAULT_CONFIG: AppConfig = {
  language: 'zh',
  fontSize: 14,
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
  }
}
let config = { ...DEFAULT_CONFIG }

export const configManager = {
  async load() {
    try {
      const data = await fs.readFile(configPath, 'utf-8')
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
