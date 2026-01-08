import { ReadonlyURLSearchParams } from 'next/navigation'

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  updates: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams(searchParams.toString())

  Object.entries(updates).forEach(([k, v]) => {
    if (v && v.length > 0) {
      params.set(k, v)
    } else {
      params.delete(k)
    }
  })

  return params.toString()
}

export function parseFilterStateFromURL(
  searchParams: ReadonlyURLSearchParams,
  taxonomies: Array<{ taxonomy: string; variant?: 'radio' | 'checkbox' }>,
): Record<string, string | string[]> {
  const state: Record<string, string | string[]> = {}

  taxonomies.forEach((taxonomy) => {
    const param = searchParams.get(taxonomy.taxonomy)
    const isRadio = taxonomy.variant === 'radio'

    if (isRadio) {
      state[taxonomy.taxonomy] = param || ''
    } else {
      state[taxonomy.taxonomy] = param ? param.split(',').filter(Boolean) : []
    }
  })

  return state
}

export function formatFiltersForURL(
  filters: Record<string, string | string[]>,
): Record<string, string | undefined> {
  const updates: Record<string, string | undefined> = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'string') {
      updates[key] = value || undefined
    } else {
      updates[key] = value.length > 0 ? value.join(',') : undefined
    }
  })

  return updates
}

export function hasActiveFilters(filters: Record<string, string | string[]>): boolean {
  return Object.values(filters).some((v) => {
    if (typeof v === 'string') return v !== ''
    return v.length > 0
  })
}
