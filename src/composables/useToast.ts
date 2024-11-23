import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Interface representing a toast notification
 */
export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: number;
  /**
   * Severity of the toast (e.g. success, error, info, etc.)
   */
  severity: 'success' | 'info' | 'error' | 'secondary' | 'warn' | 'contrast';
  /**
   * Summary text of the toast
   */
  summary: string;
  /**
   * Optional detailed text of the toast
   */
  detail?: string;
  /**
   * Optional lifetime of the toast in milliseconds
   */
  life?: number;
}

/**
 * Pinia store for managing toast notifications
 */
export const useToast = defineStore("toast", () => {
  /**
   * Reactive array of toast notifications
   */
  const toasts = ref<Toast[]>([]);
  let toastId = 0;

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
  const addToast = (toast: Omit<Toast, "id">) => {
    toastId += 1;
    toasts.value.push({ id: toastId, ...toast });
    removeToastAfterDelay(toastId, toast?.life || 3000);
  };

  /**
   * Remove a toast notification by ID
   * 
   * @param {number} id - ID of the toast to remove
   * @example
   * useToast().removeToast(1);
   */
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  /**
   * Remove a toast notification after a delay
   * 
   * @param {number} id - ID of the toast to remove
   * @param {number} life - Delay in milliseconds
   */
  const removeToastAfterDelay = (id: number, life: number) => {
    setTimeout(() => {
      removeToast(id);
    }, life);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
});