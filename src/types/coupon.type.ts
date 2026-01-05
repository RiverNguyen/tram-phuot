export type CouponResponse = {
  success: boolean
  lang: string
  total: number
  totalPages: number
  data: CouponItem[]
}

export type CouponItem = {
  id: number
  title: string
  slug: string
  type: 'coupon'
  thumbnail: {
    id: number
    url: string
  }
  taxonomies: CouponTaxonomies
  acf: CouponACF
  lang: string
}

export type CouponTaxonomies = {
  locations: TaxonomyTerm[]
  'tour-type': TaxonomyTerm[]
}

export type TaxonomyTerm = {
  id: number
  name: string
  slug: string
  /** only exists in taxonomy API */
  count?: number
}

export type CouponTaxonomyResponse = {
  success: boolean
  lang: string
  postType: 'coupon'
  total: number
  data: CouponTaxonomy[]
}

export type CouponTaxonomy = {
  taxonomy: keyof CouponTaxonomies | string
  label: string
  hierarchical: boolean
  terms: TaxonomyTerm[]
}

export type CouponACF = {
  select: 'percent' | 'amount'
  percent_sale: string
  code: string
  for_whom: string
  minimum_total_price: string
  minimum_number_of_nights: string
  booking_time: DateRange
  time_goes: DateRange
  hotel_or_tour_applicable: ApplicablePost[]
  private: boolean
}

export type DateRange = {
  start: string
  end: string
}

export type ApplicablePost = {
  ID: number
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: 'publish' | 'draft'
  comment_status: string
  ping_status: string
  post_password: string
  post_name: string
  post_parent: number
  guid: string
  menu_order: number
  post_type: 'tour' | string
  post_mime_type: string
  comment_count: string
  filter: 'raw'
}
