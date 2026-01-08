import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'
import { ITourRes } from '@/interface/tour.interface'
import { ApplyVoucherPayloadType } from '@/types/details-tour.type'

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
    let query = `lang=${locale}&acf=price_person&paged=${page}&limit=${limit}&order=DESC&orderby=date`

    if (locations) {
      query += `&tax=locations&locations=${locations}`
    }

    if (tourType) {
      query += `&tax=tour-type&tour-type=${tourType}`
    }

    if (tourDuration) {
      query += `&tax=tour-duration&tour-duration=${tourDuration}`
    }

    return await fetchData({
      api: `${ENDPOINTS.tour.list}?${query}`,
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
  applyVoucher: async (payload: ApplyVoucherPayloadType) => {
    return await fetchData({
      api: ENDPOINTS.tour.applyVoucher,
      method: 'POST',
      option: {
        body: JSON.stringify(payload),
      },
    })
  },
  getRelatedTours: async (
    slug: string,
    locale: string,
    fields: string = '',
    postTypeKey: string = '',
  ) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.relatedTours}?slug=${slug}&locale=${locale}&fields=${fields}&post=${postTypeKey}`,
    })
  },
  getTourCoupons: async (slug: string, locale: string, postTypeKey: string) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.coupons}?slug=${slug}&locale=${locale}&post_type=${postTypeKey}`,
    })
  },
}

export default tourService
