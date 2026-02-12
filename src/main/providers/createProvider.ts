import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'
import { configManager } from '@main/config'
import { ProviderType } from '@/types'

export function createProvider(providerName: ProviderType | string): BaseProvider {
  const config = configManager.get()
  const providerConfig = config.providerConfigs[providerName] || {}
  switch (providerName) {
    case ProviderType.Qianfan:
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey)
    case ProviderType.Dashscope:
    case ProviderType.DeepSeek:
    case ProviderType.OpenAI:
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error(`${providerName} API配置缺失：请在设置中配置 apiKey 和 baseUrl`)
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    default:
      // 处理自定义Provider，默认为OpenAI兼容
      if (
        providerConfig.type === 'openai' ||
        providerConfig.type === 'custom' ||
        (providerConfig.apiKey && providerConfig.baseUrl)
      ) {
        return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
      }
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
