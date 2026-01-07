import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IHotelRes } from '@/interface/hotel.interface'

const hotelService = {
  getHotels: async (locale: string): Promise<IHotelRes> => {
    return await fetchData({
      api: `${ENDPOINTS.hotel.list}?lang=${locale}&limit=8&order=DESC&orderby=date&acf=banner`,
    })
  },
}

export default hotelService
