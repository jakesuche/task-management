import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFetch } from '@/composables/useFetch'
import { BASE_URL } from '@/util/constants'
import { flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '@/stores/task'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock Vue's onMounted
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
  }
})

describe('useFetch', () => {
  beforeEach(() => {
    // Create a fresh pinia instance and make it active for each test
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should fetch data and update store successfully', async () => {
    // Get store instance
    const store = useTaskStore()
    // Spy on the setTask method
    const setTaskSpy = vi.spyOn(store, 'setTask')

    // Mock data
    const mockData = { id: 1, name: 'Test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    // Use the composable
    const { data, isLoading, error } = useFetch('/test-endpoint')

    // Initial state
    expect(isLoading.value).toBe(true)
    expect(data.value).toBeNull()
    expect(error.value).toBeNull()

    // Wait for the fetch to complete
    await flushPromises()

    // Assertions after fetch
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/test-endpoint`)
    expect(data.value).toEqual(mockData)
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()

    // Verify store interaction
    expect(setTaskSpy).toHaveBeenCalledTimes(1)
    expect(setTaskSpy).toHaveBeenCalledWith(mockData)
  })

  it('should handle fetch error and not update store', async () => {
    // Get store instance
    const store = useTaskStore()
    // Spy on the setTask method
    const setTaskSpy = vi.spyOn(store, 'setTask')

    // Mock error response
    const errorMessage = 'Error 404: Not Found'
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    })

    const { data, isLoading, error } = useFetch('/test-endpoint')

    // Wait for the fetch to complete
    await flushPromises()

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(data.value).toBeNull()
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(errorMessage)

    // Verify store was not updated
    expect(setTaskSpy).not.toHaveBeenCalled()
  })

  it('should handle network error and not update store', async () => {
    // Get store instance
    const store = useTaskStore()
    // Spy on the setTask method
    const setTaskSpy = vi.spyOn(store, 'setTask')

    // Mock network error
    const networkError = new Error('Network error')
    mockFetch.mockRejectedValueOnce(networkError)

    const { data, isLoading, error } = useFetch('/test-endpoint')

    // Wait for the fetch to complete
    await flushPromises()

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(data.value).toBeNull()
    expect(isLoading.value).toBe(false)
    expect(error.value).toBe(networkError.message)

    // Verify store was not updated
    expect(setTaskSpy).not.toHaveBeenCalled()
  })

  it('should update store on successful refetch', async () => {
    // Get store instance
    const store = useTaskStore()
    // Spy on the setTask method
    const setTaskSpy = vi.spyOn(store, 'setTask')

    const mockData1 = { id: 1, name: 'Test 1' }
    const mockData2 = { id: 2, name: 'Test 2' }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData2),
      })

    const { data, refetch } = useFetch('/test-endpoint')

    // Wait for first fetch to complete
    await flushPromises()
    expect(data.value).toEqual(mockData1)
    expect(setTaskSpy).toHaveBeenCalledWith(mockData1)

    // Manual refetch
    await refetch()
    await flushPromises()

    // Check second fetch
    expect(data.value).toEqual(mockData2)
    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(setTaskSpy).toHaveBeenCalledWith(mockData2)
    expect(setTaskSpy).toHaveBeenCalledTimes(2)
  })
})
// const mockFetch = vi.fn()
// global.fetch = mockFetch

// // Mock Vue's onMounted
// vi.mock('vue', async () => {
//   const actual = await vi.importActual('vue')
//   return {
//     ...actual,
//     onMounted: (fn: () => void) => fn(),
//   }
// })

// describe('useFetch', () => {
//   beforeEach(() => {
//     vi.clearAllMocks()
//   })

//   afterEach(() => {
//     vi.resetAllMocks()
//   })

//   it('should fetch data successfully', async () => {
//     // Mock data
//     const mockData = { id: 1, name: 'Test' }
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     })

//     // Use the composable directly
//     const { data, isLoading, error } = useFetch('/test-endpoint')

//     // Initial state
//     expect(isLoading.value).toBe(true)
//     expect(data.value).toBeNull()
//     expect(error.value).toBeNull()

//     // Wait for the fetch to complete
//     await flushPromises()

//     // Assertions after fetch
//     expect(mockFetch).toHaveBeenCalledTimes(1)
//     expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/test-endpoint`)
//     expect(data.value).toEqual(mockData)
//     expect(isLoading.value).toBe(false)
//     expect(error.value).toBeNull()
//   })

//   it('should handle fetch error', async () => {
//     // Mock error response
//     const errorMessage = 'Error 404: Not Found'
//     mockFetch.mockResolvedValueOnce({
//       ok: false,
//       status: 404,
//       statusText: 'Not Found',
//     })

//     const { data, isLoading, error } = useFetch('/test-endpoint')

//     // Wait for the fetch to complete
//     await flushPromises()

//     expect(mockFetch).toHaveBeenCalledTimes(1)
//     expect(data.value).toBeNull()
//     expect(isLoading.value).toBe(false)
//     expect(error.value).toBe(errorMessage)
//   })

//   it('should handle network error', async () => {
//     // Mock network error
//     const networkError = new Error('Network error')
//     mockFetch.mockRejectedValueOnce(networkError)

//     const { data, isLoading, error } = useFetch('/test-endpoint')

//     // Wait for the fetch to complete
//     await flushPromises()

//     expect(mockFetch).toHaveBeenCalledTimes(1)
//     expect(data.value).toBeNull()
//     expect(isLoading.value).toBe(false)
//     expect(error.value).toBe(networkError.message)
//   })

//   it('should update loading state correctly', async () => {
//     const mockData = { id: 1, name: 'Test' }
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     })

//     const { isLoading } = useFetch('/test-endpoint')

//     // Initially loading should be true
//     expect(isLoading.value).toBe(true)

//     await flushPromises()

//     // After fetch completes, loading should be false
//     expect(isLoading.value).toBe(false)
//   })

//   it('should allow manual refetch', async () => {
//     const mockData1 = { id: 1, name: 'Test 1' }
//     const mockData2 = { id: 2, name: 'Test 2' }

//     mockFetch
//       .mockResolvedValueOnce({
//         ok: true,
//         json: () => Promise.resolve(mockData1),
//       })
//       .mockResolvedValueOnce({
//         ok: true,
//         json: () => Promise.resolve(mockData2),
//       })

//     const { data, refetch } = useFetch('/test-endpoint')

//     // Wait for first fetch to complete
//     await flushPromises()
//     expect(data.value).toEqual(mockData1)

//     // Manual refetch
//     await refetch()
//     await flushPromises()

//     // Check second fetch
//     expect(data.value).toEqual(mockData2)
//     expect(mockFetch).toHaveBeenCalledTimes(2)
//   })
// })
