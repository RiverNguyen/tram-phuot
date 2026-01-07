import { ITerm } from './taxonomy.interface'

export interface IHotel {
  id: number
  title: string
  slug: string
  type: string
  published: string
  thumbnail: {
    id: number
    url: string
  }
  taxonomies: {
    'hotel-amenities'?: ITerm[]
    locations: ITerm[]
  }
  acf: IHotelACF | null
  lang: string
}

export interface IHotelRes {
  success: boolean
  lang: string
  total: number
  totalPages: number
  data: IHotel[]
}

export interface IHotelReview {
  image: string | false
  icon: string | false
  text: string
  rating: string | number | false
}

export interface IHotelBanner {
  address: string
  gallery: string[]
  review: IHotelReview
}

export interface IHotelACF {
  banner: IHotelBanner
}