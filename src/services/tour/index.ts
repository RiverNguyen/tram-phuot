import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const tourService = {
  getTours: async () => {
    return await fetchData({
      api: ENDPOINTS.tour.list,
    })
  },
  getDetailTour: async (slug: string, locale: string, post_type: string) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.detail}?slug=${slug}&locale=${locale}&post_type=${post_type}`,
    })
  },
}

export default tourService
