<template>
  <div class="message-list" ref="_ref">
    <div class="message-item mb-6" v-for="message in messages" :key="message.id">
      <div class="flex items-start gap-3" :class="{ 'flex-row-reverse': message.type === 'question' }">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <img
            :src="message.type === 'question' ? userAvatar : aiAvatar"
            class="w-10 h-10 rounded-full object-cover border border-gray-200 bg-white"
            alt="Avatar"
          />
        </div>

        <!-- Content Wrapper -->
        <div class="max-w-[60%]">
          <!-- Date -->
          <div
            v-if="config.showTimestamp"
            class="text-xs text-gray-400 mb-1"
            :class="{ 'text-right': message.type === 'question' }"
          >
            {{ formatDate(message.createdAt) }}
          </div>

          <!-- Message Bubble -->
          <div
            class="rounded-lg overflow-hidden shadow-sm"
            :class="{
              'bg-green-600 text-white p-3': message.type === 'question',
              'bg-white text-gray-800 border border-gray-100 p-4':
                message.type !== 'question' && message.status !== 'error',
              'bg-red-50 text-red-700 border border-red-200 p-4':
                message.status === 'error' && message.type !== 'question',
            }"
          >
            <!-- Image Attachment (User) -->
            <img
              v-if="message.imagePath"
              :src="`safe-file://${message.imagePath}`"
              alt="Message image"
              class="max-h-60 w-auto object-contain rounded mb-2 bg-black/5"
            />

            <!-- User Text Content (Simple) -->
            <div v-if="message.type === 'question'" class="whitespace-pre-wrap leading-relaxed">
              {{ message.content }}
            </div>

            <!-- AI Content (Rich / Markdown) -->
            <div v-else class="min-h-[20px]">
              <!-- Loading State -->
              <div v-if="message.status === 'loading'" class="flex items-center gap-1 text-gray-400">
                <Icon icon="eos-icons:three-dots-loading" class="w-6 h-6" />
                <span class="text-xs">Thinking...</span>
              </div>

              <!-- Error State -->
              <div v-else-if="message.status === 'error'" class="flex items-center gap-2">
                <Icon icon="radix-icons:exclamation-triangle" class="w-5 h-5" />
                <span>{{ message.content }}</span>
              </div>

              <!-- Normal Markdown Content -->
              <div
                v-else
                class="prose prose-slate prose-sm max-w-none prose-headings:my-2 prose-p:my-1.5 dark:prose-invert"
              >
                <vue-markdown :source="message.content" :plugins="plugins" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import { MessageProps } from '@/types'
import { formatDate } from '@renderer/utils/format'
import { useAppConfig } from '@renderer/composables/useAppConfig'

defineProps<{
  messages: MessageProps[]
  aiAvatar: string
  userAvatar: string
}>()

const plugins = [markdownItHighlightjs]
const { config } = useAppConfig()
const _ref = ref<HTMLDivElement>()
defineExpose({
  ref: _ref,
})
</script>
