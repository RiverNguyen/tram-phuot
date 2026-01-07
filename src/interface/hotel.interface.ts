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
    'hotel-amenities': ITerm[]
    locations: ITerm[]
  }
  acf: {
    price_person: string
    banner: {
      review: {
        rating: string
      }
    }
  }
  lang: string
}

export interface IHotelRes {
  success: boolean
  lang: string
  total: number
  totalPages: number
  data: IHotel[]
}
