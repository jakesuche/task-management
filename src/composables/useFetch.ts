import { useTaskStore } from '@/stores/task'
import { BASE_URL } from '@/util/constants'

import { onMounted, ref } from 'vue'

export function useFetch<T>(url: string, options?: RequestInit) {

  const data = ref<T | null>(null)
  const isLoading = ref(true)
  const error = ref<null | string>(null)
  const {setTask} = useTaskStore()

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${BASE_URL}${url}`, options)
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const result = await response.json()
      setTask(result)
      data.value = result
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(()=>{
    fetchData()
  })


  return { data, isLoading, error, refetch: fetchData }
}
