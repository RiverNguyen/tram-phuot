import { ILink } from '@/interface/link.interface'
import { IMedia } from '@/interface/media.interface'

export interface IAboutUsContent1 {
  title: string
  subtitle: string
  description: string
}

export interface IAboutUsContent {
  title: string
  description: string
}

export interface IAboutUsDecorImages {
  inked_image: IMedia
  framed_image_1: IMedia
  framed_image_2: IMedia
  framed_image_3: IMedia
}

export interface IAboutUs {
  content_1: IAboutUsContent1
  content_2: IAboutUsContent
  content_3: IAboutUsContent
  decor_images: IAboutUsDecorImages
}

export interface ITitle {
  line_1: string
  line_2: string
}

export interface IButtonLinks {
  link_google_review: ILink
  link_tripadvisor: ILink
}

export interface IWhoWeAreItem {
  title: string
  subtitle: string
  description: string
}

export interface IContentAbout {
  title: ITitle
  story_content: string

  button_links: IButtonLinks
  text_brand: false | string

  who_we_are: false | IWhoWeAreItem[]
}

export interface IWhereDreamsTakeFlight {
  title: string
  subtitle: string
  tag: string
}

export interface ITheExplorers {
  subtitle: string
  title: string
}

export interface IVideoAbout {
  video_file: string | false
  video_type: string
  video_youtube: string
}