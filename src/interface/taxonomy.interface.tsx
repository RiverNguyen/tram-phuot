export interface ITerm {
  id: number
  name: string
  slug: string
  count: number
}

export interface ITaxonomy {
  taxonomy: string
  label: string
  hierarchical: boolean
  terms: ITerm[]
}

export interface ILocation {
  id: number
  name: string
  slug: string
  count: number
  acf: {
    image: string
    desc: string
    order_index: string
  } | null
  stats: {
    hotels: string
    tours: string
  }
}

export interface ITaxonomyRes {
  success: boolean
  lang: string
  postType: string
  total: number
  data: ITaxonomy[]
}
