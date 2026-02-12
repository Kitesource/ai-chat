<template>
  <ToastProvider>
    <ToastRoot
      v-for="(toast, index) in toasts"
      :key="index"
      :open="true"
      class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'icon_title'_'icon_description'] grid-cols-[max-content_auto] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-swipeOut mb-2 border-l-4"
      :class="{
        'border-green-500': toast.type === 'success',
        'border-yellow-500': toast.type === 'warning',
        'border-red-500': toast.type === 'danger',
        'border-blue-500': toast.type === 'info' || !toast.type,
      }"
    >
      <div class="[grid-area:_icon] flex items-center justify-center">
        <Icon v-if="toast.type === 'success'" icon="radix-icons:check-circled" class="w-6 h-6 text-green-500" />
        <Icon
          v-else-if="toast.type === 'warning'"
          icon="radix-icons:exclamation-triangle"
          class="w-6 h-6 text-yellow-500"
        />
        <Icon v-else-if="toast.type === 'danger'" icon="radix-icons:cross-circled" class="w-6 h-6 text-red-500" />
        <Icon v-else icon="radix-icons:info-circled" class="w-6 h-6 text-blue-500" />
      </div>
      <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-[15px] text-slate12">
        {{ toast.title }}
      </ToastTitle>
      <ToastDescription
        v-if="toast.description"
        class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
      >
        {{ toast.description }}
      </ToastDescription>
    </ToastRoot>
    <ToastViewport
      class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
    />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider, ToastViewport, ToastRoot, ToastTitle, ToastDescription } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { useToast } from '@renderer/composables/useToast'

const { toasts } = useToast()
</script>
