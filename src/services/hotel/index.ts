import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IHotelRes } from '@/interface/hotel.interface'
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
    return await fetchData({
      api: ENDPOINTS.hotel.applyVoucher,
      method: 'POST',
      option: {
        body: JSON.stringify(payload),
      },
    })
  },
  getHotels: async ({
    locale,
    locations = '',
    limit = 12,
  }: {
    locale: string
    locations?: string
    limit?: number
  }): Promise<IHotelRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.list}?lang=${locale}&limit=${limit}&order=DESC&orderby=date&acf=banner,price_person&tax=locations&locations=${locations}`,
    })
  },
}
export default hotelService
