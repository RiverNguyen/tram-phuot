import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homeService = {
  getHome: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.home[locale as keyof typeof ENDPOINTS.home],
    })
  },
}

export default homeService
