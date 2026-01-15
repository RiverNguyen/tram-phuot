import ENV from '@/configs/env'

const basePath = ENV.API!
export const fetcher = async (url: string, baseCustom?: string) => {
  const base = baseCustom || `${ENV.CMS}${basePath}`
  const response = await fetch(`${base}${url}`)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}

export const fetcherCMS = async (url: string) => {
  const response = await fetch(`${ENV.CMS}${url}`)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}
