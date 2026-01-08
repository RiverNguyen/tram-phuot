'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterDrawer from './FilterDrawer'
import FilterPopover from './FilterPopover'
import { mapTaxonomyToFilter } from './mapTaxonomyToFilter'
import { ICTrashcan } from '@/components/icons'
import ICCFilterLine from '@/components/icons/ICCFilterLine'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/shared'
import { CouponItem, CouponTaxonomy } from '@/types/coupon.type'
import OngoingPromotionsCard from './OngoingPromotionsCard'
import { scrollToSection } from '@/utils/scrollToSection'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function OngoingPromotions({
  data,
  taxonomies,
  totalPages,
}: {
  data: CouponItem[]
  taxonomies: CouponTaxonomy[]
  totalPages?: number
}) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const filters = mapTaxonomyToFilter(taxonomies)

  const [filterState, setFilterState] = useState<{ locations: string; 'tour-type': string[] }>({
    locations: searchParams.get('locations') || '',
    'tour-type': (searchParams.get('tour-type') || '').split(',').filter(Boolean),
  })

  const currentPage = Math.max(1, Number(searchParams.get('paged')) || 1)

  const createQueryString = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([k, v]) => {
        if (v && v.length > 0) params.set(k, v)
        else params.delete(k)
      })

      return params.toString()
    },
    [searchParams],
  )

  const pushFilters = (next: { locations: string; 'tour-type': string[] }) => {
    setFilterState(next)
    startTransition(() => {
      const query = createQueryString({
        locations: next.locations || undefined,
        'tour-type': next['tour-type'].length > 0 ? next['tour-type'].join(',') : undefined,
        paged: undefined,
      })
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  const handleFilterChange = (key: 'locations' | 'tour-type', value: string | string[]) => {
    pushFilters({
      locations: key === 'locations' ? (value as string) : filterState.locations,
      'tour-type': key === 'tour-type' ? (value as string[]) : filterState['tour-type'],
    })
  }

  const handleReset = () => {
    if (filterState.locations === '' && filterState['tour-type'].length === 0) return
    pushFilters({ locations: '', 'tour-type': [] })
  }

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const query = createQueryString({
        paged: page > 1 ? String(page) : undefined,
      })
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  useEffect(() => {
    setFilterState({
      locations: searchParams.get('locations') || '',
      'tour-type': (searchParams.get('tour-type') || '').split(',').filter(Boolean),
    })
  }, [searchParams])

  useEffect(() => {
    if (!isPending) return
    if (!sectionRef.current) return
    scrollToSection('ongoing-promotions-section', 1, 7.5)
  }, [isPending])

  const visibleData = data.filter((item) => !item?.acf?.private)

  return (
    <>
      <div
        ref={sectionRef}
        id='ongoing-promotions-section'
        className='xsm:gap-[1.25rem] xsm:px-[1rem] xsm:mb-[2.25rem] mx-auto flex w-full max-w-[87.5rem] flex-col items-start gap-[2.5rem] self-stretch'
      >
        <div className='xsm:flex-col xsm:gap-[0.875rem] xsm:items-start flex items-center gap-[2.5rem] self-stretch'>
          <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du w-[35.8125rem] text-[2.125rem] leading-[2.3375rem] font-medium text-[#2E2E2E]'>
            ongoing promotion
          </h2>

          {/* Desktop Filters */}
          <div className='xsm:hidden flex flex-1 items-center gap-[0.75rem]'>
            <FilterPopover
              label='Destination'
              options={filters.locations ?? []}
              value={filterState.locations}
              onValueChange={(val) => handleFilterChange('locations', val as string)}
              variant='radio'
            />
            <FilterPopover
              label='type tour'
              options={filters['tour-type'] ?? []}
              value={filterState['tour-type']}
              onValueChange={(val) => handleFilterChange('tour-type', val as string[])}
              variant='checkbox'
            />
            <button
              type='button'
              onClick={handleReset}
              className='flex h-[2.75rem] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] py-[0.75rem] pl-[0.75rem]'
            >
              <ICTrashcan className='size-[1.125rem] text-[#FF2019]' />
              <span className='font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'>
                Reset all
              </span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <div className='w-full sm:hidden'>
            <button
              onClick={() => setOpenDrawer(true)}
              type='button'
              className='flex w-full items-center justify-between rounded-[0.5rem] bg-white px-[0.75rem] py-[0.625rem] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]'
            >
              <span className='font-montserrat text-[0.875rem] leading-[1.3125rem] font-medium text-[rgba(46,46,46,0.75)]'>
                Category
              </span>
              <ICCFilterLine className='size-[1.28125rem]' />
            </button>
            <FilterDrawer
              open={openDrawer}
              onOpenChange={setOpenDrawer}
              taxonomies={taxonomies}
              filters={filterState}
              onApply={(next) => pushFilters(next)}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Promotion Cards */}
        <div className='xsm:grid-cols-1 grid w-full grid-cols-3 gap-[1.25rem]'>
          {isPending ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className='flex w-full animate-pulse flex-col gap-3'
              >
                {/* Image */}
                <Skeleton className='h-64 w-full rounded-xl' />

                {/* Title + subtitle */}
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-4 w-1/2 rounded' />

                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-16 rounded' />
                  <Skeleton className='h-6 w-12 rounded' />
                  <Skeleton className='h-6 w-20 rounded' />
                </div>
              </div>
            ))
          ) : visibleData.length > 0 ? (
            visibleData.map((card) => (
              <OngoingPromotionsCard
                key={card.id}
                card={card}
              />
            ))
          ) : (
            <div className='col-span-3 flex w-full items-center justify-center'>
              <span className='font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#2E2E2E]'>
                Not found
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {visibleData.length > 0 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
