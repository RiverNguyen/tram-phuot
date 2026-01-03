import { IMedia } from '@/interface/media.interface'

export interface IHomePage {
  banner: IBannerHomePage
}

export interface IBannerHomePage {
  title: string
  gallery: IMedia[]
  gallery_mobile: IMedia[]
}
