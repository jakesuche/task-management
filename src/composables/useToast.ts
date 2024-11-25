import { defineStore } from 'pinia'
import { ref } from 'vue'


export interface Toast {
  id: number
  severity: 'success' | 'info' | 'error' | 'secondary' | 'warn' | 'contrast'
  summary: string
  detail?: string
  life?: number
}


export const useToast = defineStore('toast', () => {

  const toasts = ref<Toast[]>([])
  let toastId = 0

  /**
   * Add a new toast notification
   *
   * @param {Omit<Toast, "id">} toast - Toast notification without an ID
   * @example
   * useToast().addToast({
   *   severity: 'success',
   *   summary: 'Operation successful!',
   *   detail: 'Your changes have been saved.',
   *   life: 5000
   * });
   */
  const addToast = (toast: Omit<Toast, 'id'>) => {
    toastId += 1
    toasts.value.push({ id: toastId, ...toast })
    removeToastAfterDelay(toastId, toast?.life || 3000)
  }
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  const removeToastAfterDelay = (id: number, life: number) => {
    setTimeout(() => {
      removeToast(id)
    }, life)
  }

  return {
    toasts,
    addToast,
    removeToast,
  }
})
