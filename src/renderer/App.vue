<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ t('common.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            {{ t('common.settings') }}
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
    <ToastProvider />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { initI18n } from '@renderer/i18n'
import { initProviders } from '@main/db'
import { useConversationStore } from '@renderer/stores/conversation'
import { useProviderStore } from '@renderer/stores/provider'
import { useAppConfig } from '@renderer/composables/useAppConfig'
import ConversationList from '@renderer/components/ConversationList.vue'
import Button from '@renderer/components/Button.vue'
import ToastProvider from '@renderer/components/ToastProvider.vue'

const router = useRouter()
const { t } = useI18n()
const conversationStore = useConversationStore()
const providerStore = useProviderStore()
const items = computed(() => conversationStore.items)

// 初始化全局应用配置（主题切换等）
useAppConfig()

// 监听菜单事件
window.electronAPI.onMenuNewConversation(() => {
  router.push('/')
})

window.electronAPI.onMenuOpenSettings(() => {
  router.push('/settings')
})

onMounted(async () => {
  await initI18n()
  await initProviders()
  // 获取最初需要的数据
  conversationStore.fetchConversations()
  providerStore.fetchProviders()
})
</script>
