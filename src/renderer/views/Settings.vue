<template>
  <div class="w-[80%] mx-auto p-8">
    <h1 class="text-2xl font-bold mb-8">{{ t('settings.title') }}</h1>

    <TabsRoot v-model="activeTab" class="w-full">
      <TabsList class="flex border-b border-gray-200 mb-6">
        <TabsTrigger
          value="general"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
        >
          {{ t('settings.general') }}
        </TabsTrigger>
        <TabsTrigger
          value="models"
          class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
        >
          {{ t('settings.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-6 max-w-[500px]">
        <!-- Language Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.language') }}
          </label>
          <SelectRoot v-model="config.language" class="w-[160px]">
            <SelectTrigger
              class="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
            >
              <SelectValue :placeholder="t('settings.selectLanguage')" />
              <SelectIcon>
                <Icon icon="radix-icons:chevron-down" />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="bg-white rounded-md shadow-lg border">
                <SelectViewport class="p-2">
                  <SelectGroup>
                    <SelectItem
                      value="zh-CN"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('common.chinese') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem
                      value="en"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('common.english') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <!-- Font Size Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.fontSize') }}
          </label>
          <NumberFieldRoot v-model="config.fontSize" class="inline-flex w-[100px]">
            <NumberFieldDecrement
              class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="radix-icons:minus" />
            </NumberFieldDecrement>
            <NumberFieldInput
              class="w-10 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
              :min="12"
              :max="20"
            />
            <NumberFieldIncrement
              class="px-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="radix-icons:plus" />
            </NumberFieldIncrement>
          </NumberFieldRoot>
        </div>

        <!-- Theme Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.theme') }}
          </label>
          <SelectRoot v-model="config.theme" class="w-[160px]">
            <SelectTrigger
              class="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
            >
              <SelectValue />
              <SelectIcon>
                <Icon icon="radix-icons:chevron-down" />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="bg-white rounded-md shadow-lg border">
                <SelectViewport class="p-2">
                  <SelectGroup>
                    <SelectItem
                      value="system"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('settings.themeSystem') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem
                      value="light"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('settings.themeLight') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem
                      value="dark"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('settings.themeDark') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <!-- Send Key Setting -->
        <div class="setting-item flex items-center gap-8">
          <label class="text-sm font-medium text-gray-700 w-24">
            {{ t('settings.sendKey') }}
          </label>
          <SelectRoot v-model="config.sendKey" class="w-[160px]">
            <SelectTrigger
              class="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
            >
              <SelectValue />
              <SelectIcon>
                <Icon icon="radix-icons:chevron-down" />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="bg-white rounded-md shadow-lg border">
                <SelectViewport class="p-2">
                  <SelectGroup>
                    <SelectItem
                      value="Enter"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('settings.sendKeyEnter') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem
                      value="Ctrl+Enter"
                      class="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-default hover:bg-gray-100"
                    >
                      <SelectItemText>{{ t('settings.sendKeyCtrlEnter') }}</SelectItemText>
                      <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <!-- Launch at Login Setting -->
        <div class="setting-item flex items-center gap-8">
          <div class="w-24">
            <p class="text-sm font-medium text-gray-700">{{ t('settings.launchAtLogin') }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ t('settings.launchAtLoginDesc') }}</p>
          </div>
          <SwitchRoot
            v-model:checked="config.launchAtLogin"
            class="relative w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            :class="config.launchAtLogin ? 'bg-green-500' : 'bg-gray-300'"
          >
            <SwitchThumb
              class="block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-1"
              :class="config.launchAtLogin ? 'translate-x-5' : 'translate-x-1'"
            />
          </SwitchRoot>
        </div>

        <!-- Show Timestamp Setting -->
        <div class="setting-item flex items-center gap-8">
          <div class="w-24">
            <p class="text-sm font-medium text-gray-700">{{ t('settings.showTimestamp') }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ t('settings.showTimestampDesc') }}</p>
          </div>
          <SwitchRoot
            v-model:checked="config.showTimestamp"
            class="relative w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            :class="config.showTimestamp ? 'bg-green-500' : 'bg-gray-300'"
          >
            <SwitchThumb
              class="block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-100"
              :class="config.showTimestamp ? 'translate-x-5' : 'translate-x-1'"
            />
          </SwitchRoot>
        </div>
      </TabsContent>

      <TabsContent value="models">
        <div class="flex justify-end mb-4">
          <DialogRoot v-model:open="isAddingProvider">
            <DialogTrigger
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {{ t('settings.addProvider') }}
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay class="fixed inset-0 bg-black/50" />
              <DialogContent
                class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
              >
                <DialogTitle class="text-lg font-bold mb-4">{{ t('settings.addCustomProvider') }}</DialogTitle>
                <DialogDescription class="text-sm text-gray-500 mb-4">
                  {{ t('settings.addProviderDesc') }}
                </DialogDescription>

                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-gray-700 block mb-1">{{ t('common.name') }}</label>
                    <input
                      v-model="newProvider.title"
                      type="text"
                      :placeholder="t('provider.placeholder.name')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-700 block mb-1">{{ t('provider.avatarUrl') }}</label>
                    <input
                      v-model="newProvider.avatar"
                      type="text"
                      :placeholder="t('provider.placeholder.avatar')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-700 block mb-1">{{ t('provider.baseUrl') }}</label>
                    <input
                      v-model="newProvider.baseUrl"
                      type="text"
                      :placeholder="t('provider.placeholder.baseUrl')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-700 block mb-1">{{ t('provider.apiKey') }}</label>
                    <input
                      v-model="newProvider.apiKey"
                      type="password"
                      :placeholder="t('provider.placeholder.apiKey')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-700 block mb-1">{{ t('provider.models') }}</label>
                    <input
                      v-model="newProvider.models"
                      type="text"
                      :placeholder="t('provider.placeholder.models')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div class="mt-6 flex justify-end gap-2">
                  <button
                    @click="isAddingProvider = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    {{ t('common.cancel') }}
                  </button>
                  <button
                    @click="saveProvider"
                    class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                    :disabled="!newProvider.title || !newProvider.baseUrl"
                  >
                    {{ t('common.save') }}
                  </button>
                </div>
                <DialogClose class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <Icon icon="radix-icons:cross-2" />
                </DialogClose>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </div>

        <AccordionRoot type="single" collapsible>
          <AccordionItem
            v-for="provider in providers"
            :key="provider.id"
            :value="provider.name"
            class="border rounded-lg mb-2"
          >
            <AccordionTrigger class="flex items-center justify-between w-full p-4 text-left">
              <div class="flex items-center gap-2">
                <img :src="provider.avatar" :alt="provider.name" class="w-6 h-6 rounded" />
                <span class="font-medium">{{ provider.title }}</span>
                <button
                  v-if="provider.name.startsWith('custom_')"
                  @click.stop="handleDeleteProvider(provider.id, provider.name)"
                  class="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  :title="t('common.delete')"
                >
                  <Icon icon="radix-icons:trash" />
                </button>
              </div>
              <Icon
                icon="radix-icons:chevron-down"
                class="transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
              />
            </AccordionTrigger>
            <AccordionContent class="p-4 pt-0">
              <div class="space-y-4">
                <div
                  v-for="config in getProviderConfig(provider.name)"
                  :key="config.key"
                  class="flex items-center gap-4"
                >
                  <label class="text-sm font-medium text-gray-700 w-24">{{ config.label }}</label>
                  <input
                    :type="config.type"
                    :placeholder="config.placeholder"
                    :required="config.required"
                    :value="config.value"
                    @input="e => updateProviderConfig(provider.name, config.key, (e.target as HTMLInputElement).value)"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { ProviderType } from '@/types'
import { setI18nLanguage } from '@renderer/i18n'
import { useProviderStore } from '@renderer/stores/provider'
import { useAppConfig } from '@renderer/composables/useAppConfig'
import { providerConfigs, ProviderConfigItem, apiKeyBaseUrlConfig } from '@renderer/config/providerConfig'
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  SwitchRoot,
  SwitchThumb,
} from 'radix-vue'
import { useToast } from '@renderer/composables/useToast'
import { formatDate } from '@renderer/utils/format'

const { t } = useI18n()
const { toast } = useToast()
const isAddingProvider = ref(false)
const newProvider = reactive({
  name: '',
  title: '',
  avatar: '',
  apiKey: '',
  baseUrl: '',
  models: '',
})

const showToastMessage = (title: string, description: string = '', type: 'success' | 'error' = 'success') => {
  toast({
    title,
    description,
    type: type === 'error' ? 'danger' : 'success',
  })
}

const handleDeleteProvider = async (id: number, name: string) => {
  if (confirm(t('common.confirmDelete'))) {
    await providerStore.deleteProvider(id)
    // 从 config 中移除该 provider 的配置
    if (config.value.providerConfigs[name]) {
      delete config.value.providerConfigs[name]
    }
    showToastMessage(t('toast.deleteSuccess'))
  }
}

const saveProvider = async () => {
  if (!newProvider.title || !newProvider.apiKey) return

  try {
    // 1. 保存Provider元数据到DB
    const providerId = await providerStore.addProvider({
      id: 0, // auto-increment
      name: ProviderType.Custom, // 使用 Custom 类型
      title: newProvider.title,
      desc: '自定义模型服务',
      avatar: newProvider.avatar || 'https://api.iconify.design/ri:robot-line.svg',
      models: newProvider.models
        .split(/[,，]/)
        .map(m => m.trim())
        .filter(Boolean),
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    })

    // 2. 保存配置到Config (使用Provider的Title作为Key的一部分，或者生成唯一ID，这里简化直接用Title，实际最好用ID或UUID)
    const configKey = `custom_${providerId}`

    // 更新 config
    if (!config.value.providerConfigs[configKey]) {
      config.value.providerConfigs[configKey] = {}
    }
    config.value.providerConfigs[configKey] = {
      apiKey: newProvider.apiKey,
      baseUrl: newProvider.baseUrl,
      type: 'custom', // 标记类型
    }

    // 重新获取刚刚添加的 provider 并更新它的 name
    // 由于 dexie add 返回 id，我们可以直接更新
    const provider = providerStore.getProviderById(providerId)
    if (provider) {
      provider.name = configKey
      await providerStore.updateProvider(provider)
      // 重新拉取 store
      await providerStore.fetchProviders()
      showToastMessage(t('toast.addSuccess'))
    }
  } catch (error) {
    console.error(error)
  }

  isAddingProvider.value = false
  // 重置表单
  newProvider.title = ''
  newProvider.avatar = ''
  newProvider.apiKey = ''
  newProvider.baseUrl = ''
  newProvider.models = ''
}
const activeTab = ref('general')
const providerStore = useProviderStore()
const providers = computed(() => providerStore.items)

// 使用全局共享配置（useAppConfig 内部已处理持久化读取和主题应用）
const { config } = useAppConfig()

// 监听配置变化并自动保存到主进程
watch(
  config,
  async newConfig => {
    const configToSave = {
      language: newConfig.language,
      fontSize: newConfig.fontSize,
      theme: newConfig.theme,
      sendKey: newConfig.sendKey,
      launchAtLogin: newConfig.launchAtLogin,
      showTimestamp: newConfig.showTimestamp,
      providerConfigs: JSON.parse(JSON.stringify(newConfig.providerConfigs)),
    }
    await window.electronAPI.updateConfig(configToSave)
    // 更新界面语言
    setI18nLanguage(newConfig.language)
  },
  { deep: true },
)

// 获取provider对应的配置项
const getProviderConfig = (providerName: string): ProviderConfigItem[] => {
  const configs = providerConfigs[providerName] || apiKeyBaseUrlConfig
  // 确保配置值被初始化
  if (!config.value.providerConfigs[providerName]) {
    config.value.providerConfigs[providerName] = {}
  }
  return configs.map(c => ({
    ...c,
    value: config.value.providerConfigs[providerName]?.[c.key] || c.value,
  }))
}

// 更新provider配置值
const updateProviderConfig = (providerName: string, key: string, value: string) => {
  if (!config.value.providerConfigs[providerName]) {
    config.value.providerConfigs[providerName] = {}
  }
  config.value.providerConfigs[providerName][key] = value
}
</script>
