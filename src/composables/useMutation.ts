

import { BASE_URL } from "@/util/constants"
import { ref } from "vue"




export function useMutation<TPayload, TResponse>(
  url: string | (() => string), // Allow static or dynamic URLs
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

  const mutate = async (
    payload?: TPayload,
    callbacks: {
      onSuccess?: (data: TResponse) => void
      onError?: (error: string) => void
    } = {},
  ) => {
    isPending.value = true
    isSuccess.value = false
    isError.value = false
    error.value = null

    try {
      const resolvedUrl = typeof url === 'function' ? url() : url

      const response = await fetch(`${BASE_URL}${resolvedUrl}`, {
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

      // Trigger the success callback (local > global)
      if (callbacks.onSuccess) {
        callbacks.onSuccess(result)
      } else if (options.onSuccess) {
        options.onSuccess(result)
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      isError.value = true

      // Trigger the error callback (local > global)
      if (callbacks.onError) {
        callbacks.onError(error.value as any)
      } else if (options.onError) {
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
