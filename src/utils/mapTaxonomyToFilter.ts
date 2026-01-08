import { ITaxonomy } from '@/interface/taxonomy.interface'

export type FilterOption = {
  label: string
  value: string
}

export type FilterMap = Partial<Record<string, FilterOption[]>>

export function mapTaxonomyToFilter(
  data: ITaxonomy[] = [],
  allowedKeys?: string[],
): FilterMap {
  return data.reduce((acc, item) => {
    // If allowedKeys is provided, only include matching taxonomies
    if (allowedKeys && !allowedKeys.includes(item.taxonomy)) {
      return acc
    }

    acc[item.taxonomy] = item.terms.map((term) => ({
      label: term.name,
      value: term.slug,
    }))

    return acc
  }, {} as FilterMap)
}

