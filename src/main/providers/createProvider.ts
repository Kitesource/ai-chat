import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'
import { configManager } from '@main/config'
import { ProviderType } from '@/types'

export function createProvider(providerName: ProviderType): BaseProvider {
  const config = configManager.get()
  const providerConfig = config.providerConfigs[providerName] || {}
  switch (providerName) {
    case ProviderType.Qianfan:
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey)
    case ProviderType.Dashscope:
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    case ProviderType.DeepSeek:
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
