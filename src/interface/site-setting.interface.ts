import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface ISiteSetting {
  data: {
    header: IHeader
    footer: IFooter
    social: ISocial[]
    contact: IContact
    cta: {
      list: {
        icon: string
        link: string
      }[]
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
  social_media: {
    image: string
    link: string
  }
}

export interface IMenuFooter {
  navigations: ILink
}

export interface ISocialMedia {
  image: IMedia
  link: ILink
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
    social_media: ISocialMedia[]
  }
}

export interface ISocial {
  social_image: IMedia
  social_link: string
}

export interface IContact {
  contact_item: IContactItem[]
  google_map_link: string
}

export interface IContactItem {
  label: string
  value: string
  icon: IMedia
}
