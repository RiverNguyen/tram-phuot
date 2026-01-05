'use client'

import FilterDrawer from './FilterDrawer'
import FilterPopover from './FilterPopover'
import { FILTER_OPTIONS } from './constants'
import { ICTrashcan, ICFilter } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Pagination } from '@/components/shared'

export const PROMOTION_CARDS = [
  {
    id: 1,
    image: '/uu-dai/card.webp',
    category: 'Experience Tour',
    location: 'Ho Chi Minh City',
    title: 'Entrance Ticket to the Museum of Traditional Vietnamese Medicine',
    code: 'ABCD12345',
    tags: ['300K + Booking', '300K + Reviews', '300K + Reviews', 'Reviews', '300K + Rev'],
    href: '/uu-dai/promotion/1',
  },
  {
    id: 2,
    image: '/uu-dai/card.webp',
    category: 'Experience Tour',
    location: 'Ho Chi Minh City',
    title: 'Entrance Ticket to the Museum of Traditional Vietnamese Medicine',
    code: 'ABCD12345',
    tags: ['300K + Booking', '300K + Reviews'],
    href: '/uu-dai/promotion/2',
  },
]
export default function OngoingPromotions() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [destination, setDestination] = useState<string>('')
  const [typeTours, setTypeTours] = useState<string[]>([])
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [selectedTypeTours, setSelectedTypeTours] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

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
              options={FILTER_OPTIONS.destination}
              value={destination}
              onValueChange={(val) => setDestination(val as string)}
              variant='radio'
            />
            <FilterPopover
              label='type tour'
              options={FILTER_OPTIONS.typeTour}
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
            />
          </div>
        </div>
        <div className='xsm:grid-cols-1 w-full grid grid-cols-3 gap-[1.25rem]'>
          {/* promotion card */}
          {PROMOTION_CARDS.map((card) => (
            <Link
              href={card.href}
              key={card.id}
              className='xsm:gap-[0.875rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] relative flex flex-col justify-start items-center gap-[1.125rem] w-full h-full'
            >
              <Image
                src={card.image}
                alt={card.title}
                width={1360}
                height={813}
                className='xsm:h-[13.4375rem] xsm:rounded-b-none w-full h-[16.9375rem] rounded-[1rem] object-cover'
              />
              <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
                <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
                  <div className='flex items-center gap-[0.625rem] self-stretch'>
                    <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] text-[#F56E0A] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
                      {card.category}
                    </span>
                    <span className='size-[0.25rem] rounded-full bg-[#3B3943]'></span>
                    <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] text-[rgba(46,46,46,0.60)] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
                      {card.location}
                    </span>
                  </div>
                  <h3 className='xsm:text-[1.125rem] xsm:leading-[1.2375rem] xsm:tracking-normal text-[#1F4D37] font-phu-du text-[1.75rem] font-medium leading-[2.0625rem] tracking-[-0.03125rem]'>
                    {card.title}
                  </h3>
                </div>
                <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem]'>
                  <div className='xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-normal flex items-start gap-[0.5rem] text-[#2E2E2E] font-montserrat text-[1rem] font-medium leading-[1.5rem] tracking-[-0.01563rem] opacity-[0.48]'>
                    <span className='shrink-0'>Promotion code:</span>
                    <span className='min-w-0 break-all'>{card.code}</span>
                  </div>
                  <div className='flex flex-wrap items-start gap-[0.5rem]'>
                    {card.tags.map((tag, index) => (
                      <div
                        key={index}
                        className='h-[1.5rem] flex p-[0.5rem] items-center justify-center gap-[0.3125rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.40)] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem] opacity-[0.8]'
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
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
