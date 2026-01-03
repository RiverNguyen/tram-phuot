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
  title: string
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

export type DetailsTourApiResponseType = {
  locale: string
  data: {
    acf: {
      banner: DetailsTourBannerType
      overview: DetailsTourOverviewType
      price_per_pax: string
      transport: string
      pickup_and_dropoff: string
      accommodation: string
    }
    title: string
    tour_duration: WPTaxonomy
  }
}
