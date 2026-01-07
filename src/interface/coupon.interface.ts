import { ITaxonomy, ITerm } from './taxonomy.interface'

export interface ICoupon {
  id: number
  title: string
  slug: string
  type: 'coupon'
  thumbnail: {
    id: number
    url: string
  }
  taxonomies: {
    locations: ITerm[]
    'tour-type': ITerm[]
  }
  acf: {
    select: 'percent' | 'amount'
    percent_sale: string
    code: string
    for_whom: string
    minimum_total_price: string
    minimum_number_of_nights: string
    booking_time: {
      start: string
      end: string
    }
    time_goes: {
      start: string
      end: string
    }
    hotel_or_tour_applicable: any[]
    private: boolean
    price_discount: string
  }
  lang: string
}

export type ICouponTaxonomies = ICoupon['taxonomies']
export type ICouponACF = ICoupon['acf']

export interface ICouponRes {
  success: boolean
  lang: string
  total: number
  totalPages: number
  data: ICoupon[]
}

export type ICouponTaxonomy = Omit<ITaxonomy, 'taxonomy'> & {
  taxonomy: 'locations' | 'tour-type' | string
}

export interface ICouponTaxonomyRes {
  success: boolean
  lang: string
  postType: 'coupon'
  total: number
  data: ICouponTaxonomy[]
}
