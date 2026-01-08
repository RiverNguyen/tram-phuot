import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IHotelRes } from '@/interface/hotel.interface'

const homeService = {
  getHome: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.home[locale as keyof typeof ENDPOINTS.home],
    })
  },
  getHotels: async (locale: string): Promise<IHotelRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.list}?lang=${locale}&limit=8&order=DESC&orderby=date&acf=banner`,
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
  getTaxonomy: async (locale: string, taxonomy: string) => {
    return await fetchData({
      api: ENDPOINTS.taxonomy.get(locale, taxonomy),
    })
  },
}

export default homeService
