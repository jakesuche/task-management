import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMutation } from '@/composables/useMutation'
import { BASE_URL } from '@/util/constants'
import { flushPromises } from '@vue/test-utils'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('should handle successful POST mutation', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
        { name: string },
        typeof mockResponse
      >('/test', 'POST')

      expect(isPending.value).toBe(false)
      expect(isSuccess.value).toBe(false)
      expect(isError.value).toBe(false)
      expect(data.value).toBeNull()
      expect(error.value).toBeNull()

      const payload = { name: 'Test' }
      mutate(payload)

      expect(isPending.value).toBe(true)

      await flushPromises()

      expect(isPending.value).toBe(false)
      expect(isSuccess.value).toBe(true)
      expect(isError.value).toBe(false)
      expect(data.value).toEqual(mockResponse)
      expect(error.value).toBeNull()

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    })

    it('should handle API error', async () => {
      const errorMessage = 'Error 404: Not Found'
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
        { name: string },
        any
      >('/test', 'POST')

      await mutate({ name: 'Test' })

      expect(isPending.value).toBe(false)
      expect(isSuccess.value).toBe(false)
      expect(isError.value).toBe(true)
      expect(data.value).toBeNull()
      expect(error.value).toBe(errorMessage)
    })

    it('should handle network error', async () => {
      const networkError = new Error('Network error')
      mockFetch.mockRejectedValueOnce(networkError)

      const { mutate, isPending, isSuccess, isError, data, error } = useMutation<
        { name: string },
        any
      >('/test', 'POST')

      await mutate({ name: 'Test' })

      expect(isPending.value).toBe(false)
      expect(isSuccess.value).toBe(false)
      expect(isError.value).toBe(true)
      expect(data.value).toBeNull()
      expect(error.value).toBe(networkError.message)
    })
  })

  describe('Callback Handling', () => {
    it('should call global success callback', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const onSuccess = vi.fn()
      const { mutate } = useMutation<{ name: string }, typeof mockResponse>('/test', 'POST', {
        onSuccess,
      })

      await mutate({ name: 'Test' })

      expect(onSuccess).toHaveBeenCalledWith(mockResponse)
    })

    it('should call local success callback over global', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const globalOnSuccess = vi.fn()
      const localOnSuccess = vi.fn()

      const { mutate } = useMutation<{ name: string }, typeof mockResponse>('/test', 'POST', {
        onSuccess: globalOnSuccess,
      })

      await mutate({ name: 'Test' }, { onSuccess: localOnSuccess })

      expect(localOnSuccess).toHaveBeenCalledWith(mockResponse)
      expect(globalOnSuccess).not.toHaveBeenCalled()
    })

    it('should call global error callback', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const onError = vi.fn()
      const { mutate } = useMutation('/test', 'POST', { onError })

      await mutate({ name: 'Test' })

      expect(onError).toHaveBeenCalledWith('Error 404: Not Found')
    })

    it('should call local error callback over global', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const globalOnError = vi.fn()
      const localOnError = vi.fn()

      const { mutate } = useMutation('/test', 'POST', { onError: globalOnError })

      await mutate({ name: 'Test' }, { onError: localOnError })

      expect(localOnError).toHaveBeenCalledWith('Error 404: Not Found')
      expect(globalOnError).not.toHaveBeenCalled()
    })
  })

  describe('URL Handling', () => {
    it('should handle static URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })

      const { mutate } = useMutation('/static-url', 'POST')
      await mutate()

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/static-url`, expect.any(Object))
    })

    it('should handle dynamic URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })

      const id = 123
      const { mutate } = useMutation(() => `/dynamic-url/${id}`, 'POST')
      await mutate()

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/dynamic-url/123`, expect.any(Object))
    })
  })

  describe('HTTP Methods', () => {
    it('should handle PUT request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })

      const { mutate } = useMutation('/test', 'PUT')
      const payload = { id: 1, name: 'Updated' }
      await mutate(payload)

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/test`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    })

    it('should handle DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })

      const { mutate } = useMutation('/test/1', 'DELETE')
      await mutate()

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/test/1`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: undefined,
      })
    })
  })
})
