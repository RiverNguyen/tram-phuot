import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const hotelService = {
  getDetailHotel: async (slug: string) => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.getDetail(slug)}`,
    })
  },
  getTaxonomies: async (locale: string) => {
    return await fetchData({
      api: `${ENDPOINTS.taxonomies.get(locale, 'hotels')}`,
    })
  },
}

export default hotelService
