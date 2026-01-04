'use client'

import { useState } from 'react'
import Banner from './sections/Banner'
import SpecialOffers from './sections/SpecialOffers'
import OngoingPromotions from './sections/OngoingPromotions'
import { Pagination } from '@/components/shared'

export default function page() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: Fetch data for the new page
  }

  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full max-w-[87.5rem] mx-auto flex flex-col items-center gap-[5.625rem] py-[5rem]'>
        {/* Special offer just for you! */}
        <SpecialOffers />

        {/* ongoing promotion */}
        <OngoingPromotions />

        {/* pagination */}
        <Pagination
          pageCurrent={currentPage}
          pageCount={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  )
}
