import { ITaxonomy } from '@/interface/taxonomy.interface'

export function getSelectedOptionsFromParams({
  searchParams,
  tourTypeOptions,
  tourDurationOptions,
  tourLocationOptions,
}: {
  searchParams: URLSearchParams
  tourTypeOptions: ITaxonomy[]
  tourDurationOptions: ITaxonomy[]
  tourLocationOptions: ITaxonomy[]
}) {
  const getSelected = (key: string, list: ITaxonomy[]) => {
    const value = searchParams.get(key)
    if (!value) return []
    const slugs = value.split(',')
    return list.filter((item) =>
      slugs.includes(item.terms.find((term) => term.slug === value)?.slug || ''),
    )
  }

  return {
    selectedPackages: getSelected('tour-type', tourTypeOptions),
    selectedLocations: getSelected('locations', tourLocationOptions),
    selectedDurations: getSelected('tour-duration', tourDurationOptions),
  }
}
