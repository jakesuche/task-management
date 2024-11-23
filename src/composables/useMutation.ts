import { ref } from 'vue'

export function useMutation<TPayload, TResponse>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  options: {
    onSuccess?: (data: TResponse) => void
    onError?: (error: string) => void
  } = {},
) {
  const isPending = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const data = ref<TResponse | null>(null)
  const error = ref<string | null>(null)

  const mutate = async (payload: TPayload) => {
    isPending.value = true
    isSuccess.value = false
    isError.value = false
    error.value = null

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = (await response.json()) as TResponse
      data.value = result
      isSuccess.value = true

      if (options.onSuccess) {
        options.onSuccess(result)
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      isError.value = true

      if (options.onError) {
        options.onError(error.value as any)
      }
    } finally {
      isPending.value = false
    }
  }

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
    error,
  }
}
