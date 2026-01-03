import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const wordpressService = {
  getSiteSettings: async (locale: string, field: string = '') => {
    return await fetchData({
      api: `${ENDPOINTS.wordpress.siteSettings}?locale=${locale}&field=${field}`,
    })
  },
}

export default wordpressService
