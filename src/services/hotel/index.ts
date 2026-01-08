import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ApplyHotelVoucherPayloadType } from '@/types/detail-hotel.type'

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
  getCoupons: async (slug: string) => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.getCoupons(slug)}`,
    })
  },
  applyVoucher: async (payload: ApplyHotelVoucherPayloadType) => {
    console.log(JSON.stringify(payload))
    return await fetchData({
      api: ENDPOINTS.hotel.applyVoucher,
      method: 'POST',
      option: {
        body: JSON.stringify(payload),
      },
    })
  },
}

export default hotelService
