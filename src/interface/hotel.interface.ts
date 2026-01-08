import { IMedia } from '@/interface/media.interface'
import { ITerm } from '@/interface/taxonomy.interface'

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
