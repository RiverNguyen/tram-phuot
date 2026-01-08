import { IMedia } from '@/interface/media.interface'

export type WPMedia = {
  url?: string
}

export type BannerACF = {
  title?: string
  background_pc?: WPMedia
  background_mobile?: WPMedia
}

export type PageBannerACF = {
  banner?: {
    title?: string
    background_pc?: IMedia
    background_mobile?: IMedia
  }
}
