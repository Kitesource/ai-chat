export interface ConversationProps {
  id: number
  title: string
  selectedModel: string
  createdAt: string
  updatedAt: string
  providerId: number
}

export enum ProviderType {
  OpenAI = 'openai',
  Qianfan = 'qianfan',
  Dashscope = 'dashscope',
  DeepSeek = 'deepseek',
  Custom = 'custom',
}

export interface ProviderProps {
  id: number
  name: ProviderType | string
  title?: string
  desc?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  models: string[]
}
export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error'

export interface MessageProps {
  id: number
  content: string
  type: 'question' | 'answer'
  conversationId: number
  status?: MessageStatus
  createdAt: string
  updatedAt: string
  imagePath?: string
}

export interface ChatMessageProps {
  role: string
  content: string
  imagePath?: string
}
export interface CreateChatProps {
  messages: ChatMessageProps[]
  providerName: ProviderType | string
  selectedModel: string
  messageId: number
}

export interface UpdatgedStreamData {
  messageId: number
  data: {
    is_end: boolean
    result: string
    is_error?: boolean
  }
}
export type OnUpdatedCallback = (data: UpdatgedStreamData) => void

export interface MessageListInstance {
  ref: HTMLDivElement
}

export interface UniversalChunkProps {
  is_end: boolean
  result: string
}

export interface BaiduChunkProps {
  is_end: boolean
  result: string
}

export interface AppConfig {
  language: 'zh-CN' | 'en'
  fontSize: number
  /** 主题：跟随系统 / 亮色 / 暗色 */
  theme: 'system' | 'light' | 'dark'
  /** 发送快捷键：Enter 或 Ctrl+Enter */
  sendKey: 'Enter' | 'Ctrl+Enter'
  /** 是否开机自启动 */
  launchAtLogin: boolean
  /** 是否显示消息时间戳 */
  showTimestamp: boolean
  providerConfigs: Partial<Record<string, Record<string, string>>>
}
