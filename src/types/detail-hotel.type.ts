import { VoucherType } from './details-tour.type'

export type ApplyHotelVoucherPayloadType = {
  checkInDate: string
  checkOutDate: string
  hotelSlug: string
  voucherCode: string
  rooms: {
    title: string
    quantity: number
    pricePerNight: number
  }[]
  adults: number
  children: number
  bookingTime: string
  hotelTitle: string
}

export type ApplyHotelVoucherResponseType = {
  success: boolean
  number_of_nights: number
  provisional_price: number
  final_price: number
  voucher: {
    code: string
    type: VoucherType
    discount: number
  }
}

