'use client'

import { useEffect, useRef, useState } from 'react'
import FilterDrawer from './FilterDrawer'
import FilterPopover from './FilterPopover'
import { mapTaxonomyToFilter } from './mapTaxonomyToFilter'
import { ICTrashcan, ICFilter } from '@/components/icons'
import { Pagination } from '@/components/shared'
import { CouponItem, CouponTaxonomy } from '@/types/coupon.type'
import OngoingPromotionsCard from './OngoingPromotionsCard'
import { useCouponFilters } from './useCouponFilters'

export default function OngoingPromotions({
  data,
  taxonomies,
  locale,
  totalPages: initialTotalPages,
  total: initialTotal,
}: {
  data: CouponItem[]
  taxonomies: CouponTaxonomy[]
  locale: string
  totalPages?: number
  total?: number
}) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { filters: filtersState, coupons, loading, totalPages, page, setFilterValues, resetFilters, setPage } =
    useCouponFilters({
      locale,
      initialData: data,
      initialTotalPages,
      initialTotal,
    })

  const filters = mapTaxonomyToFilter(taxonomies)

  const handleFilterChange = (key: 'locations' | 'tour-type', value: string | string[]) => {
    setFilterValues({
      locations: key === 'locations' ? (value as string) : filtersState.locations,
      'tour-type': key === 'tour-type' ? (value as string[]) : filtersState['tour-type'],
    })
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const offset = 120
    const elementTop = sectionRef.current.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth',
    })
  }, [page])

  return (
    <>
      <div
        ref={sectionRef}
        className='xsm:gap-[1.25rem] xsm:px-[1rem] w-full max-w-[87.5rem] mx-auto flex flex-col items-start gap-[2.5rem] self-stretch'
      >
        <div className='xsm:flex-col xsm:gap-[0.875rem] xsm:items-start flex items-center gap-[2.5rem] self-stretch'>
          <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] w-[35.8125rem] text-[#2E2E2E] font-phu-du text-[2.125rem] font-medium leading-[2.3375rem]'>
            ongoing promotion
          </h2>

          {/* Desktop Filters */}
          <div className='xsm:hidden flex items-center gap-[0.75rem] flex-1'>
            <FilterPopover
              label='Destination'
              options={filters.locations ?? []}
              value={filtersState.locations}
              onValueChange={(val) => handleFilterChange('locations', val as string)}
              variant='radio'
            />
            <FilterPopover
              label='type tour'
              options={filters['tour-type'] ?? []}
              value={filtersState['tour-type']}
              onValueChange={(val) => handleFilterChange('tour-type', val as string[])}
              variant='checkbox'
            />
            <button
              type='button'
              onClick={resetFilters}
              className='flex h-[2.75rem] py-[0.75rem] pl-[0.75rem] items-center justify-center gap-[0.5rem] rounded-[0.5rem] cursor-pointer'
            >
              <ICTrashcan className='size-[1.125rem] text-[#FF2019]' />
              <span className='text-[#FF2019] font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] uppercase'>
                Reset all
              </span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <div className='sm:hidden w-full'>
            <button
              onClick={() => setOpenDrawer(true)}
              type='button'
              className='w-full flex py-[0.625rem] px-[0.75rem] justify-between items-center rounded-[0.5rem] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]'
            >
              <span className='text-[rgba(46,46,46,0.75)] font-montserrat text-[0.875rem] font-medium leading-[1.3125rem]'>
                Category
              </span>
              <ICFilter className='size-[1.28125rem]' />
            </button>
            <FilterDrawer
              open={openDrawer}
              onOpenChange={setOpenDrawer}
              taxonomies={taxonomies}
              filters={filtersState}
              onApply={(next) => setFilterValues(next)}
              onReset={resetFilters}
            />
          </div>
        </div>

        {/* Promotion Cards */}
        <div className='xsm:grid-cols-1 w-full grid grid-cols-3 gap-[1.25rem]'>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => <OngoingPromotionsCardSkeleton key={idx} />)
            : coupons.map((card) => (
                <OngoingPromotionsCard
                  key={card.id}
                  card={card}
                />
              ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        pageCurrent={page}
        pageCount={totalPages}
        onPageChange={setPage}
      />
    </>
  )
}

function OngoingPromotionsCardSkeleton() {
  return (
    <div className='xsm:gap-[0.875rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] relative flex flex-col justify-start items-center gap-[1.125rem] w-full h-full animate-pulse'>
      <div className='xsm:h-[13.4375rem] xsm:rounded-b-none w-full h-[16.9375rem] rounded-[1rem] bg-black/10' />
      <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
          <div className='flex items-center gap-[0.625rem] self-stretch'>
            <div className='h-[1rem] w-[6rem] rounded bg-black/10' />
            <div className='size-[0.25rem] rounded-full bg-black/10' />
            <div className='h-[1rem] w-[5rem] rounded bg-black/10' />
          </div>
          <div className='h-[1.75rem] w-[80%] rounded bg-black/10' />
        </div>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem]'>
          <div className='h-[1.5rem] w-[70%] rounded bg-black/10' />
          <div className='flex flex-wrap items-start gap-[0.5rem]'>
            <div className='h-[1.5rem] w-[4.5rem] rounded bg-black/10' />
            <div className='h-[1.5rem] w-[3.5rem] rounded bg-black/10' />
            <div className='h-[1.5rem] w-[5rem] rounded bg-black/10' />
          </div>
        </div>
      </div>
    </div>
  )
}
