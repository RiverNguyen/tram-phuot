import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface ISiteSetting {
  data: {
    header: IHeader
    footer: IFooter
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

export interface IMenuFooter {
  navigations: ILink
}

export interface ISocialFooter {
  image: IMedia
  link: string
}

export interface IFooter {
  form_footer: {
    form_title: string
    form_text_decor: string
    form_text_decor_2: string
    background: {
      desktop: IMedia
      mobile: IMedia
    }
    image: {
      desktop: IMedia
      mobile: IMedia
    }
    button_submit: string
  }
  footer_content: {
    logo: IMedia
    menu: IMenuFooter[]
    station_stop: IMenuFooter[]
    tours: IMenuFooter[]
    address: {
      detail: string
      google_map_link: string
    }
    hotline: string
    email: string
    social_media: ISocialFooter[]
  }
}
