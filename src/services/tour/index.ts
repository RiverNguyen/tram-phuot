import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ApplyVoucherPayloadType } from '@/types/details-tour.type'

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
}

export default tourService
