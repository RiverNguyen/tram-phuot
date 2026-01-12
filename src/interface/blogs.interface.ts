import { ITaxonomy, ITerm } from "./taxonomy.interface"

export interface IBlog {
  id: number
  title: string
  slug: string
  type: string
  published: string
  date: string
  thumbnail: {
    id: number
    url: string
  }
  taxonomies: {
    category: ITerm[]
    kind: ITerm[]
    'type-news': ITerm[]
  }
  acf: {
    short_description: string
  }
}

export interface IBlogRes {
  success: boolean
  lang: string
  total: number
  totalPages: number
  page: number
  limit: number
  count: number
  data: IBlog[]
}

export interface IBlogTaxonomyRes {
  success: boolean
  lang: string
  postType: 'post'
  total: number
  data: ITaxonomy[]
}