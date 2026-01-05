'use client'

import { useState } from 'react'
import OngoingPromotions from './OngoingPromotions'
import { Pagination } from '@/components/shared'

export default function WrapperOngoingPromotions() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: Fetch data for the new page
  }
  return (
    <>
      <OngoingPromotions />
      {/* pagination */}
      <Pagination
        pageCurrent={currentPage}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
