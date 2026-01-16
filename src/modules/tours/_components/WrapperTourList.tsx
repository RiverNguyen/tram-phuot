'use client'

import { useState } from 'react'
import TourList from './TourList'
import { Pagination } from '@/components/shared'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { ITourRes } from '@/interface/tour.interface'
import ICFilter from '@/components/icons/ICFilter'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer'
import SkeletonTour from './SkeletonTour'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import EmptyResult from './EmptyResult'
import tourService from '@/services/tour'
import useSWR from 'swr'
import { scrollToSection } from '@/utils/scrollToSection'

interface WrapperTourListProps {
  taxonomies: ITaxonomy[]
  tourRes: ITourRes
  locale: string
}

const buildTourKey = (locale: string, query: Record<string, string>) => {
  const params = new URLSearchParams()

  Object.entries(query)
    .filter(([, v]) => v && v !== '1')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([k, v]) => params.set(k, v))

  return `tours:${locale}?${params.toString()}`
}

export default function WrapperTourList({ taxonomies, tourRes, locale }: WrapperTourListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const searchParams = useSearchParams()
  const t = useTranslations('ListTourPage')
  const currentPage = +(searchParams.get('page') || '1')
  const initialFilter = taxonomies.reduce(
    (acc, curr) => {
      const taxonomy = curr.taxonomy

      const param = searchParams.get(taxonomy)

      let value: string | string[] = param || ''

      if (taxonomy !== 'locations') {
        value = param ? param.split(',') : []
      }

      acc[taxonomy] = value
      return acc
    },
    {} as Record<string, string | string[]>,
  )
  const [filter, setFilter] = useState<Record<string, string | string[]>>(initialFilter)

  const handlePageChange = (page: number) => {
    scrollToSection('tour-list-container', 1, 5)

    const nextQuery = {
      ...query,
      page: page <= 1 ? '1' : page.toString(),
    }

    setQuery(nextQuery)
    syncUrl(nextQuery)
  }

  const getInitialQuery = () => {
    if (typeof window === 'undefined') {
      return {
        locations: '',
        'tour-type': '',
        'tour-duration': '',
        page: '1',
      }
    }

    const params = new URLSearchParams(window.location.search)

    return {
      locations: params.get('locations') || '',
      'tour-type': params.get('tour-type') || '',
      'tour-duration': params.get('tour-duration') || '',
      page: params.get('page') || '1',
    }
  }

  const [query, setQuery] = useState<Record<string, string>>(getInitialQuery)

  const { data: swrData, isLoading } = useSWR(
    buildTourKey(locale, query),
    () =>
      tourService.getTours({
        locale,
        locations: query.locations,
        tourType: query['tour-type'],
        tourDuration: query['tour-duration'],
        page: query.page,
        limit: 12,
      }),
    {
      fallbackData: tourRes,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  )

  const tours = swrData?.data ?? []
  const pages = swrData?.totalPages ?? 1

  const syncUrl = (nextQuery: Record<string, string>) => {
    const url = new URL(window.location.href)

    // 🔥 CLEAR TẤT CẢ QUERY CŨ
    url.search = ''

    Object.entries(nextQuery).forEach(([key, value]) => {
      // page=1 thì bỏ
      if (key === 'page' && value === '1') return

      if (value) {
        url.searchParams.set(key, value)
      }
    })

    window.history.replaceState(null, '', url.toString())
  }

  const onFilterChange = (taxonomy: string, value: string | string[]) => {
    const valueStr = typeof value === 'string' ? value : value.join(',')

    const nextQuery = {
      ...query,
      [taxonomy]: valueStr,
      page: '1',
    }

    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))

    setQuery(nextQuery)
    syncUrl(nextQuery)

    scrollToSection('tour-list-container', 1, 5)
  }

  const onMobileFilterChange = (taxonomy: string, value: string | string[]) => {
    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))
  }

  const handleApply = () => {
    const nextQuery: Record<string, string> = {
      ...query,
      page: '1',
    }

    for (const key in filter) {
      const value = filter[key]
      const valueStr = typeof value === 'string' ? value : value.join(',')

      if (valueStr) nextQuery[key] = valueStr
    }

    setQuery(nextQuery)
    syncUrl(nextQuery)
    setOpenDrawer(false)

    scrollToSection('tour-list-container', 1, 5)
  }

  const resetFilter = () => {
    const resetQuery = {
      locations: '',
      'tour-type': '',
      'tour-duration': '',
      page: '1',
    }

    setFilter(
      taxonomies.reduce(
        (acc, curr) => {
          acc[curr.taxonomy] = curr.taxonomy === 'locations' ? '' : []
          return acc
        },
        {} as Record<string, string | string[]>,
      ),
    )

    setQuery(resetQuery)
    syncUrl(resetQuery)

    scrollToSection('tour-list-container', 1, 5)
  }

  return (
    <div
      id='tour-list-container'
      className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative mx-auto flex h-full w-full max-w-[87.5rem] flex-col items-center gap-[3.75rem] pt-[5rem] pb-[3.75rem]'
    >
      <div className='xsm:gap-[1.5rem] flex w-full flex-col items-start gap-[2.5rem]'>
        {/* Filter Desktop */}
        <div className='xsm:hidden flex w-full items-center space-x-[0.75rem]'>
          {taxonomies.map((taxonomy, i) => (
            <FilterPopover
              key={i}
              options={taxonomy.terms.map((term) => ({ label: term.name, value: term.slug }))}
              label={t(taxonomy.label)}
              value={filter[taxonomy.taxonomy]}
              onValueChange={(value) => onFilterChange(taxonomy.taxonomy, value)}
              variant={taxonomy.taxonomy === 'locations' ? 'radio' : 'checkbox'}
            />
          ))}
          <button
            type='button'
            onClick={resetFilter}
            className='group font-montserrat flex h-[2.75rem] cursor-pointer items-center space-x-2 p-[0.75rem_0_0.75rem_0.75rem] text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'
          >
            <ICTrashcan className='size-[1.125rem]' />
            <span className='relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:opacity-0 after:bg-[#FF2019] after:transition-all after:duration-500 after:ease-out group-hover:after:opacity-100'>
              {t('reset')}
            </span>
          </button>
        </div>
        {/* Filter Mobile */}
        <div className='w-full sm:hidden'>
          <button
            type='button'
            onClick={() => setOpenDrawer(true)}
            className='flex h-[4.25rem] w-full items-center justify-between rounded-[0.25rem] border border-[#EDEDED] bg-white p-4 shadow-[266px_185px_91px_0_rgba(0,0,0,0.00),_170px_118px_83px_0_rgba(0,0,0,0.01),_96px_67px_70px_0_rgba(0,0,0,0.04),_42px_30px_52px_0_rgba(0,0,0,0.04),_11px_7px_28px_0_rgba(0,0,0,0.05)]'
          >
            <span className='font-montserrat bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[0.875rem] leading-[1.1375rem] font-bold tracking-[-0.03125rem] text-transparent uppercase'>
              {t('searchFilter')}
            </span>
            <div className='flex items-center justify-center rounded-[0.5rem] bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] p-[0.625rem]'>
              <ICFilter className='w-[1rem]' />
            </div>
          </button>
          <FilterDrawer
            data={taxonomies.map((taxonomy) => ({
              label: taxonomy.label,
              taxonomy: taxonomy.taxonomy,
              variant: taxonomy.taxonomy === 'locations' ? 'radio' : 'checkbox',
              options: taxonomy.terms.map((term) => ({ label: term.name, value: term.slug })),
            }))}
            values={filter}
            onApply={handleApply}
            onReset={resetFilter}
            open={openDrawer}
            setOpen={setOpenDrawer}
            onChange={onMobileFilterChange}
          />
        </div>

        {isLoading && (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-4 gap-x-[1.125rem] gap-y-[2rem]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonTour key={i} />
            ))}
          </div>
        )}

        {/* Tour list */}
        {!isLoading && (tours.length > 0 ? <TourList data={tours} /> : <EmptyResult />)}
      </div>

      {/* pagination */}
      {!isLoading && pages > 1 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
