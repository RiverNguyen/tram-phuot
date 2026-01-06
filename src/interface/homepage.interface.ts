import { IMedia } from '@/interface/media.interface'
import { ILink } from '@/interface/link.interface'

export interface IHomePage {
  banner: IBannerHomePage
  overview: IHomePageOverview
  our_stories: IOurStories
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

export interface IExplorers {
  title: string
  text_decor: string
  social_media: {
    image: IMedia
    link: string
  }[]
  gallery: IMedia[]
  desc: string
  button_1: {
    link: ILink
    image: IMedia
  }
  button_2: {
    link: ILink
    image: IMedia
  }
}

export interface IReview {
  title: string
  published: string
  acf: {
    avatar: string
    soical_link: {
      image: string
      link: string
    }[]
    rate: string
    rate_type: string
    desc: string
  }
}

export interface IOurStories {
  text_decor: string
  title: string
  button: ILink
}

export interface IOurStoriesData {
  title: string
  slug: string
  published: string
  thumbnail: IMedia
  taxonomies: {
    kind: {
      name: string
      slug: string
    }[]
    'type-news': {
      name: string
      slug: string
    }[]
  }[]
}

export interface ITaxonomies {
  label: string
  taxonomy: string
  terms: {
    name: string
    slug: string
  }[]
}
