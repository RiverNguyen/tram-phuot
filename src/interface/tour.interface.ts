import { ITerm } from './taxonomy.interface'

export interface ITour {
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
    'tour-duration': ITerm[]
    'tour-type': ITerm[]
    locations: ITerm[]
  }
  acf: {
    price_person: string
  }
  lang: string
}

export interface ITourRes {
  success: boolean
  lang: string
  total: number
  totalPages: number
  data: ITour[]
}
