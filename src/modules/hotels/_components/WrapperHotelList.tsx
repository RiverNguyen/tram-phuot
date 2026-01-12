'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import HotelList from './HotelList'
import { Pagination } from '@/components/shared'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { IHotel } from '@/interface/hotel.interface'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'
import { mapTaxonomyToFilter } from '@/utils/mapTaxonomyToFilter'
import ICFilter from '@/components/icons/ICFilter'
import {
  createQueryString,
  parseFilterStateFromURL,
  formatFiltersForURL,
  hasActiveFilters,
} from '@/utils/filterHelpers'
import { Skeleton } from '@/components/ui/skeleton'

interface WrapperHotelListProps {
  taxonomies: ITaxonomy[]
  data: IHotel[]
  totalPages: number
}

// Helper to get variant for taxonomy
const getTaxonomyVariant = (taxonomy: string): 'radio' | 'checkbox' => {
  return taxonomy === 'locations' ? 'radio' : 'checkbox'
}

export default function WrapperHotelList({ taxonomies, data, totalPages }: WrapperHotelListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('ListHotelPage')

  const filters = mapTaxonomyToFilter(taxonomies)

  // Map taxonomies with variants
  const taxonomiesWithVariant = taxonomies.map((taxonomy) => ({
    taxonomy: taxonomy.taxonomy,
    variant: getTaxonomyVariant(taxonomy.taxonomy),
  }))

  const [filterState, setFilterState] = useState<Record<string, string | string[]>>(() =>
    parseFilterStateFromURL(searchParams, taxonomiesWithVariant),
  )

  const currentPage = Math.max(1, Number(searchParams.get('paged')) || 1)

  const pushFilters = (next: Record<string, string | string[]>) => {
    setFilterState(next)
    startTransition(() => {
      const updates = formatFiltersForURL(next)
      updates.paged = undefined
      const query = createQueryString(searchParams, updates)
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  const handleFilterChange = (key: string, value: string | string[]) => {
    pushFilters({
      ...filterState,
      [key]: value,
    })
  }

  const handleMobileFilterChange = (taxonomy: string, value: string | string[]) => {
    setFilterState((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))
  }

  const handleApply = () => {
    pushFilters(filterState)
    setOpenDrawer(false)
  }

  const handleReset = () => {
    if (!hasActiveFilters(filterState)) {
      if (currentPage <= 1) {
        setOpenDrawer(false)
        return
      }
      startTransition(() => {
        const query = createQueryString(searchParams, { paged: undefined })
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
      })
      setOpenDrawer(false)
      return
    }

    const reset: Record<string, string | string[]> = {}
    taxonomiesWithVariant.forEach(({ taxonomy, variant }) => {
      reset[taxonomy] = variant === 'radio' ? '' : []
    })
    pushFilters(reset)
    setOpenDrawer(false)
  }

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const query = createQueryString(searchParams, {
        paged: page > 1 ? String(page) : undefined,
      })
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  // Sync filter state with searchParams
  useEffect(() => {
    setFilterState(parseFilterStateFromURL(searchParams, taxonomiesWithVariant))
  }, [searchParams])

  useEffect(() => {
    if (!isPending) return
    if (!sectionRef.current) return
    scrollToSection('hotel-list-container', 1, 5)
  }, [isPending])

  return (
    <div
      ref={sectionRef}
      id='hotel-list-container'
      className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative mx-auto flex h-full w-full max-w-[87.5rem] flex-col items-center gap-[3.75rem] pt-[5rem] pb-[3.75rem]'
    >
      <div className='xsm:gap-[1.5rem] flex w-full flex-col items-start gap-[2.5rem]'>
        {/* Filter Desktop */}
        <div className='xsm:hidden flex w-full items-center space-x-[0.75rem]'>
          {taxonomies.map((taxonomy) => (
            <FilterPopover
              key={taxonomy.taxonomy}
              options={filters[taxonomy.taxonomy] ?? []}
              label={t(taxonomy.label)}
              value={filterState[taxonomy.taxonomy]}
              onValueChange={(value) => handleFilterChange(taxonomy.taxonomy, value)}
              variant={getTaxonomyVariant(taxonomy.taxonomy)}
            />
          ))}
          <button
            type='button'
            onClick={handleReset}
            className='font-montserrat flex h-[2.75rem] cursor-pointer items-center space-x-2 p-[0.75rem_0_0.75rem_0.75rem] text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'
          >
            <ICTrashcan className='size-[1.125rem]' />
            <span>{t('reset')}</span>
          </button>
        </div>
        {/* Filter Mobile */}
        <div className='w-full sm:hidden'>
          <button
            type='button'
            onClick={() => setOpenDrawer(true)}
            className='flex h-[4.25rem] w-full items-center justify-between rounded-[0.25rem] border border-[#EDEDED] bg-white p-4 shadow-[266px_185px_91px_0_rgba(0,0,0,0.00),_170px_118px_83px_0_rgba(0,0,0,0.01),_96px_67px_70px_0_rgba(0,0,0,0.04),_42px_30px_52px_0_rgba(0,0,0,0.04),_11px_7px_28px_0_rgba(0,0,0,0.05)]'
          >
            <span className='font-montserrat bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[0.875rem] leading-[1.1375rem] font-bold tracking-[-0.03125rem] text-transparent'>
              {t('searchFilter')}
            </span>
            <div className='flex items-center justify-center rounded-[0.5rem] bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] p-[0.625rem]'>
              <ICFilter className='w-[1rem]' />
            </div>
          </button>
          <FilterDrawer
            open={openDrawer}
            setOpen={setOpenDrawer}
            data={taxonomies.map((taxonomy) => ({
              label: t(taxonomy.label),
              taxonomy: taxonomy.taxonomy,
              variant: getTaxonomyVariant(taxonomy.taxonomy),
              options: filters[taxonomy.taxonomy] || [],
            }))}
            values={filterState}
            onChange={handleMobileFilterChange}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>

        {isPending && (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-4 gap-x-[1.125rem] gap-y-[1.5rem] gap-y-[2rem]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='flex w-full animate-pulse flex-col gap-3'
              >
                <Skeleton className='h-[22.6875rem] w-full rounded-[0.5rem]' />
                <Skeleton className='h-5 w-24 rounded' />
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-6 w-1/2 rounded' />
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-5 w-28 rounded' />
                  <Skeleton className='h-5 w-20 rounded' />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hotel list */}
        {!isPending &&
          (data.length > 0 ? (
            <HotelList data={data} />
          ) : (
            <p className='mx-auto text-center'>{t('noResult')}</p>
          ))}
      </div>

      {/* pagination */}
      {data.length > 0 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
