import { ITerm } from './taxonomy.interface'

export interface IBlogDetail {
  id: number
  type: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  thumbnail: {
    url: string
    alt: string
  }
  acf?: {
    short_description: string
  } | null
  taxonomies: {
    category: ITerm[]
    ['type-news']: ITerm[]
    kind: ITerm[]
  }
}

export interface IRelatedBlog {
  id: number
  title: string
  slug: string
  type: string
  published: string
  thumbnail: {
    id: number
    url: string
  }
  taxonomies: {
    category: ITerm[]
    ['type-news']: ITerm[]
    kind: ITerm[]
  }
  acf?: {
    short_description: string
  } | null
  lang: 'en'
}
