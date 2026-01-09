import { IMedia } from '@/interface/media.interface'
import { ITerm } from '@/interface/taxonomy.interface'
import { RelatedTourType } from '@/types/details-tour.type'

export interface IHotelDetail {
  slug: string
  title: string
  thumbnail: string
  acf: {
    banner: {
      address: string
      gallery: string[]
      review: {
        image: string
        icon: string
        rating: string
        text: string
      }
    }
    overview: {
      content: string
    }
    location: {
      detail: string
      image: IMedia
      link_gg_map: string
    }
    policy: {
      content: string
    }
    room_and_dorm: {
      select: IRoom[]
    }
    related_hotels?: {
      hotels: RelatedTourType[]
    }
  }
}

export interface IRoom {
  title: string
  taxonomies: {
    locations: ITerm[]
    'room-and-dorm-type': ITerm[]
  }
  acf: {
    gallery: string[]
    price: string
    price_reduced: string
    area: string
    number_of_beds: string
  }
}

export interface ITaxonomies {
  label: string
  taxonomy: string
  terms: {
    name: string
    slug: string
  }[]
}

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
  price_person?: number | string
}
