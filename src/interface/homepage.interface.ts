import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface IHomePage {
  banner: IBannerHomePage
  overview: IHomePageOverview
  our_tours: IOurTourHomePage
}

export interface IBannerHomePage {
  title: string
  gallery: IMedia[]
  gallery_mobile: IMedia[]
}

export interface IHomePageOverview {
  text_decor_1: string
  text_decor_2: string
  title: {
    line_1: string
    line_2: string
    line_3: string
    line_4: string
  }
  description: string
  button_1: ILink
  button_2: ILink
}

export interface IPost {
  ID: number
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: string
  comment_status: string
  ping_status: string
  post_password: string
  post_name: string
  to_ping: string
  pinged: string
  post_modified: string
  post_modified_gmt: string
  post_content_filtered: string
  post_parent: number
  guid: string
  menu_order: number
  post_type: string
  post_mime_type: string
  comment_count: string
  filter: string
}

export interface IOurTourHomePage {
  text_decor: string
  title: string
  stay_points: IPost[]
  tour_and_chill: IPost[]
  button: ILink
}
