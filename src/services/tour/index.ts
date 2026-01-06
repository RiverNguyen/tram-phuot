import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'
import { ITourRes } from '@/interface/tour.interface'

const tourService = {
  getTours: async ({
    locale,
    locations = '',
    tourType = '',
    tourDuration = '',
    page = '1',
    limit = 8,
  }: {
    locale: string
    locations?: string
    tourType?: string
    tourDuration?: string
    page?: string
    limit?: number
  }): Promise<ITourRes> => {
    return await fetchData({
      api: `${ENDPOINTS.tour.list}?lang=${locale}&tax=locations,tour-type,tour-duration&locations=${locations}&tour-type=${tourType}&tour-duration=${tourDuration}&acf=price_person&paged=${page}&limit=${limit}`,
    })
  },
  getTaxonomies: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.tour.taxonomies}?lang=${locale}`,
    })
  },
  getDetailTour: async (slug: string, locale: string, post_type: string) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.detail}?slug=${slug}&locale=${locale}&post_type=${post_type}`,
    })
  },
}

export default tourService
