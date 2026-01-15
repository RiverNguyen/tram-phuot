  /* eslint-disable @typescript-eslint/no-explicit-any */

  import ENV from '@/configs/env'

  export type RequestPostGuest = {
    api: string
    headers?: any
    option?: any
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
    notJson?: boolean
    skipNextCache?: boolean // Bỏ qua next.revalidate khi dùng với unstable_cache
  }

  export default async function fetchData(request: RequestPostGuest) {
    console.log('🔥 CALL CMS API', `${request.api}`)
    try {
      const fetchOptions: RequestInit = {
        method: request.method || 'GET',
        headers: {
          ...(!request.notJson && { 'Content-Type': 'application/json' }),
          ...request.headers,
        },
        ...request.option,
      }

      // Chỉ thêm next.revalidate nếu không skip cache (khi dùng với unstable_cache)
      if (!request.skipNextCache) {
        fetchOptions.next = {
          revalidate: 60,
        }
      }

      const res = await fetch(`${ENV.CMS}${ENV.API!}${request.api}`, fetchOptions)

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }

      return res.json()
    } catch (error: unknown) {
      // Convert the error to a string or handle based on its type
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`${ENV.CMS}${ENV.API!}${request.api}: ${errorMessage}`)
    }
  }
