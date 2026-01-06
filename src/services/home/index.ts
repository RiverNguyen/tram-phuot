import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homeService = {
  getHome: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.home[locale as keyof typeof ENDPOINTS.home],
    })
  },
  getReviews: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.review.getAll(locale),
    })
  },
  getOurStories: async (locale: string, kind: string) => {
    return await fetchData({
      api: ENDPOINTS.our_stories.get(locale, kind),
    })
  },
  getTaxonomies: async (locale: string, type: string) => {
    return await fetchData({
      api: ENDPOINTS.taxonomies.get(locale, type),
    })
  },
}

export default homeService
