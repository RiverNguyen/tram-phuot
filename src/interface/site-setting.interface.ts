import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface ISiteSetting {
  data: {
    header: IHeader
    footer: {
      footer_content: {
        social_media: ISocialMedia[]
      }
    }
  }
}

export interface IHeader {
  logo: IMedia
  navigations: {
    select: 'parent' | 'normal'
    page_link_normal: ILink
    page_link_parent: {
      title: ILink
      link: {
        item: ILink
      }[]
      image: IMedia
    }
  }[]
}

export interface ISocialMedia {
  image: IMedia
  link: ILink
}
