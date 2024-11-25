import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest'
import { useToast } from '@/composables/useToast'

describe('useToast', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with empty toasts array', () => {
    const store = useToast()
    expect(store.toasts).toEqual([])
  })

  it('should add a toast with default life of 3000ms', () => {
    const store = useToast()
    const toast = {
      severity: 'success' as const,
      summary: 'Test Toast',
    }

    store.addToast(toast)

    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0]).toEqual({
      id: 1,
      severity: 'success',
      summary: 'Test Toast',
    })
  })

  it('should add multiple toasts with incremental IDs', () => {
    const store = useToast()

    store.addToast({ severity: 'success', summary: 'First' })
    store.addToast({ severity: 'error', summary: 'Second' })

    expect(store.toasts).toHaveLength(2)
    expect(store.toasts[0].id).toBe(1)
    expect(store.toasts[1].id).toBe(2)
  })

  it('should remove toast by ID', () => {
    const store = useToast()

    store.addToast({ severity: 'info', summary: 'Test' })
    expect(store.toasts).toHaveLength(1)

    store.removeToast(1)
    expect(store.toasts).toHaveLength(0)
  })

  it('should auto-remove toast after specified life time', () => {
    const store = useToast()

    store.addToast({
      severity: 'warn',
      summary: 'Custom Life',
      life: 5000,
    })

    expect(store.toasts).toHaveLength(1)

    // Fast-forward time by 5000ms
    vi.advanceTimersByTime(5000)

    expect(store.toasts).toHaveLength(0)
  })

  it('should auto-remove toast after default life time (3000ms)', () => {
    const store = useToast()

    store.addToast({
      severity: 'info',
      summary: 'Default Life',
    })

    expect(store.toasts).toHaveLength(1)

    // Fast-forward time by 3000ms
    vi.advanceTimersByTime(3000)

    expect(store.toasts).toHaveLength(0)
  })

  it('should handle multiple toasts with different life times', () => {
    const store = useToast()

    store.addToast({
      severity: 'info',
      summary: 'Short Life',
      life: 2000,
    })

    store.addToast({
      severity: 'warn',
      summary: 'Long Life',
      life: 5000,
    })

    expect(store.toasts).toHaveLength(2)

    // After 2000ms, first toast should be removed
    vi.advanceTimersByTime(2000)
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0].summary).toBe('Long Life')

    // After 3000 more ms (5000ms total), second toast should be removed
    vi.advanceTimersByTime(3000)
    expect(store.toasts).toHaveLength(0)
  })

  it('should handle optional detail property', () => {
    const store = useToast()

    store.addToast({
      severity: 'success',
      summary: 'With Detail',
      detail: 'Detailed message',
    })

    expect(store.toasts[0].detail).toBe('Detailed message')
  })

  it('should handle all severity types', () => {
    const store = useToast()
    const severities = ['success', 'info', 'error', 'secondary', 'warn', 'contrast'] as const

    severities.forEach((severity, index) => {
      store.addToast({
        severity,
        summary: `${severity} toast`,
      })

      expect(store.toasts[index].severity).toBe(severity)
    })

    expect(store.toasts).toHaveLength(severities.length)
  })
})
