export interface ConversationProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}

export enum ProviderType {
  OpenAI = 'openai',
  Qianfan = 'qianfan',
  Dashscope = 'dashscope',
  DeepSeek = 'deepseek'
}

export interface ProviderProps {
  id: number;
  name: ProviderType;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[];
}
export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error'

export interface MessageProps {
  id: number;
  content: string;
  type: 'question' | 'answer';
  conversationId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface ChatMessageProps {
  role: string; 
  content: string;
  imagePath?: string;
}
export interface CreateChatProps {
  messages: ChatMessageProps[];
  providerName: ProviderType;
  selectedModel: string;
  messageId: number;
}

export interface UpdatgedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
    is_error?: boolean;
  }
}
export type OnUpdatedCallback = (data: UpdatgedStreamData) => void;

export interface MessageListInstance {
  ref: HTMLDivElement
}

export interface UniversalChunkProps {
  is_end: boolean;
  result: string;
}

export interface BaiduChunkProps {
  is_end: boolean;
  result: string;
}

export interface AppConfig {
  language: 'zh' | 'en'
  fontSize: number
  providerConfigs: Partial<Record<ProviderType, Record<string, string>>>
}