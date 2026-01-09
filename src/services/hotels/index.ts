import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'
import { IHotelRes } from '@/interface/hotel.interface'

const hotelService = {
  getHotels: async ({
    locale,
    locations = '',
    hotelAmenities = '',
    page = '1',
    limit = 8,
  }: {
    locale: string
    locations?: string
    hotelAmenities?: string
    page?: string
    limit?: number
  }): Promise<IHotelRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.list}?lang=${locale}&acf=banner&tax=locations,hotel-amenities&locations=${locations}&hotel-amenities=${hotelAmenities}&paged=${page}&limit=${limit}`,
    })
  },
  getTaxonomies: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.taxonomies}?lang=${locale}`,
    })
  },
  getDetailHotel: async (slug: string, locale: string, post_type: string) => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.detail}?slug=${slug}&locale=${locale}&post_type=${post_type}`,
    })
  },
}

export default hotelService
