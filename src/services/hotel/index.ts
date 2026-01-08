import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IHotelRes } from '@/interface/hotel.interface'

const hotelService = {
  getHotels: async ({
    locale,
    locations = '',
    limit = 8,
  }: {
    locale: string
    locations?: string
    limit?: number
  }): Promise<IHotelRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.list}?lang=${locale}&limit=${limit}&order=DESC&orderby=date&acf=banner&tax=locations&locations=${locations}`,
    })
  },
}

export default hotelService
