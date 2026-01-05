import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface IHomePage {
  banner: IBannerHomePage
  overview: IHomePageOverview
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
