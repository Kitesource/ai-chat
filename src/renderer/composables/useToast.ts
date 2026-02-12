import { ref } from 'vue'

interface ToastProps {
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  type?: 'success' | 'warning' | 'danger' | 'info'
  duration?: number
}

const toasts = ref<ToastProps[]>([])

export function useToast() {
  const toast = (props: ToastProps) => {
    if (!props.type) props.type = 'info'
    toasts.value.push(props)
    setTimeout(() => {
      toasts.value.shift()
    }, props.duration || 3000)
  }

  return {
    toast,
    toasts,
  }
}
