import { WPFile, WPImage, WPTaxonomy } from '@/types/acf-wordpress.type'

export type DetailsTourBannerType = {
  background_pc: WPImage
  background_mobile: WPImage
}
export type OverviewVideoType = 'video_tiktok' | 'video_upload'
export type OverviewVideoResType = {
  video_type: OverviewVideoType
  video_upload: WPFile
  video_tiktok: string
}
export type DetailsTourOverviewType = {
  album_image: {
    image_list: WPImage[]
    preview_image: WPImage
  }
  decor_image: WPImage[]
  description: string
  service: {
    excluded_service: string
    included_service: string
  }
  video: OverviewVideoResType
}
export type DetailsTourItineraryListItemType = {
  title: string
  content: string
  location: string
  service: { service_item: string }[]
}
export type DetailsTourDetailItineraryType = {
  itinerary_list: DetailsTourItineraryListItemType[]
}
export interface TourDurationType extends WPTaxonomy {
  day_number: string
}
export type DetailsTourPricePerPaxType = {
  adults: number
  children58: number
  children14: number
}

export type DetailsTourPolicyType = {
  children_policy: string
  cancellation_policy: string
  what_to_bring_policy: string
}

export type DetailsTourBriefItineraryType = {
  brief_image: WPImage
}

export type DetailsTourApiResponseType = {
  locale: string
  data: {
    acf: {
      banner: DetailsTourBannerType
      overview: DetailsTourOverviewType
      detail_itinerary: DetailsTourDetailItineraryType
      price_per_pax: DetailsTourPricePerPaxType
      transport: string
      pickup_and_dropoff: string
      accommodation: string
      policy: DetailsTourPolicyType
      brief_itinerary: DetailsTourBriefItineraryType
    }
    title: string
    tour_duration: TourDurationType
  }
}

export type ApplyVoucherPayloadType = {
  startDate: Date
  endDate: Date
  tourSlug: string
  voucherCode: string
  paxQuantity: {
    adults: number
    children58: number
    children14: number
  }
}
export type VoucherType = 'price' | 'percent'
export type ApplyVoucherResponseType = {
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
