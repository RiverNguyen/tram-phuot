'use client'

import FilterDrawer from './FilterDrawer'
import FilterPopover from './FilterPopover'
import { mapTaxonomyToFilter } from './mapTaxonomyToFilter'
import { ICTrashcan, ICFilter } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Pagination } from '@/components/shared'
import { CouponItem, CouponTaxonomy } from '@/types/coupon.type'
import OngoingPromotionsCard from './OngoingPromotionsCard'

export default function OngoingPromotions({
  data,
  taxonomies,
}: {
  data: CouponItem[]
  taxonomies: CouponTaxonomy[]
}) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [destination, setDestination] = useState<string>('')
  const [typeTours, setTypeTours] = useState<string[]>([])
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [selectedTypeTours, setSelectedTypeTours] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const filters = mapTaxonomyToFilter(taxonomies)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: Fetch data for the new page
  }

  const handleReset = () => {
    setDestination('')
    setTypeTours([])
    setSelectedDestination('')
    setSelectedTypeTours([])
  }

  const handleApply = (filters: { destination: string; typeTours: string[] }) => {
    setSelectedDestination(filters.destination)
    setSelectedTypeTours(filters.typeTours)
    // Apply filter logic here - có thể filter PROMOTION_CARDS dựa trên filters
    setOpenDrawer(false)
  }

  return (
    <>
      <div className='xsm:gap-[1.25rem] xsm:px-[1rem] w-full max-w-[87.5rem] mx-auto flex flex-col items-start gap-[2.5rem] self-stretch'>
        <div className='xsm:flex-col xsm:gap-[0.875rem] xsm:items-start flex items-center gap-[2.5rem] self-stretch'>
          <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] w-[35.8125rem] text-[#2E2E2E] font-phu-du text-[2.125rem] font-medium leading-[2.3375rem]'>
            ongoing promotion
          </h2>
          <div className='xsm:hidden flex items-center gap-[0.75rem] flex-1'>
            <FilterPopover
              label='Destination'
              options={filters.locations ?? []}
              value={destination}
              onValueChange={(val) => setDestination(val as string)}
              variant='radio'
            />
            <FilterPopover
              label='type tour'
              options={filters['tour-type'] ?? []}
              value={typeTours}
              onValueChange={(val) => setTypeTours(val as string[])}
              variant='checkbox'
            />
            <button
              type='button'
              onClick={handleReset}
              className='flex h-[2.75rem] py-[0.75rem] pl-[0.75rem] items-center justify-center gap-[0.5rem] rounded-[0.5rem] shadow-[0_3px_40px_1px_rgba(214,214,221,0.40)] cursor-pointer'
            >
              <ICTrashcan className='size-[1.125rem] text-[#FF2019]' />
              <span className='text-[#FF2019] font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] uppercase'>
                Reset all
              </span>
            </button>
          </div>

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
              onReset={handleReset}
              onApply={handleApply}
              initialFilters={{
                destination: selectedDestination,
                typeTours: selectedTypeTours,
              }}
              taxonomies={taxonomies}
            />
          </div>
        </div>
        <div className='xsm:grid-cols-1 w-full grid grid-cols-3 gap-[1.25rem]'>
          {/* promotion card */}
          {data.map((card) => (
            <OngoingPromotionsCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      <Pagination
        pageCurrent={currentPage}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
