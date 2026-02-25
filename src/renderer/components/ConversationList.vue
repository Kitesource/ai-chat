<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-100 hover:bg-gray-300': store.selectedId === item.id,
        'bg-white hover:bg-gray-200': store.selectedId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
      @contextmenu.prevent="showContextMenu(item.id)"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ formatDate(item.updatedAt, 'YYYY/MM/DD') }}</span>
        </div>
        <h2
          class="font-semibold leading-6 text-gray-900 truncate"
          :class="store.selectedId === item.id ? 'text-gray-900' : 'dark:text-white'"
        >
          {{ item.title }}
        </h2>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ConversationProps } from '@/types'
import { useConversationStore } from '@renderer/stores/conversation'
import { formatDate } from '@renderer/utils/format'

defineProps<{ items: ConversationProps[] }>()
const router = useRouter()
const store = useConversationStore()

const showContextMenu = (id: number) => {
  window.electronAPI.showContextMenu(id)
}

onMounted(() => {
  window.electronAPI.onDeleteConversation(async (id: number) => {
    await store.deleteConversation(id)
    if (store.selectedId === id) {
      store.selectedId = -1
      router.push('/')
    }
  })
})

const goToConversation = (id: number) => {
  router.push({ path: `/conversation/${id}` })
  store.selectedId = id
}
</script>
