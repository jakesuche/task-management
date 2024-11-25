import { onMounted, onUnmounted, type Ref } from 'vue'

interface UseClickOutsideOptions {
  exclude?: string[] // CSS selectors to exclude from triggering the outside click
  enabled?: boolean // whether the listener is enabled
}

export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => void,
  options: UseClickOutsideOptions = {},
) {
  const { exclude = [], enabled = true } = options

  function handleClick(event: MouseEvent) {
    if (!enabled) {
      return
    }

    const target = event.target as HTMLElement
    const el = elementRef.value

    // Check if click was outside the element
    if (!el || el.contains(target)) {
      return
    }

    // Check excluded elements
    for (const selector of exclude) {
      const excludedEl = document.querySelector(selector)
      if (excludedEl?.contains(target)) {
        return
      }
    }

    callback(event)
  }

  onMounted(() => {
    document.addEventListener('click', handleClick, true)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick, true)
  })
}
