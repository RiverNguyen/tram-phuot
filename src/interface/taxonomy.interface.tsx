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

export interface ITaxonomyRes {
  success: boolean
  lang: string
  postType: string
  total: number
  data: ITaxonomy[]
}
