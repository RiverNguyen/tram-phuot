'use client'

import { useState } from 'react'
import TourList from './TourList'
import { Pagination } from '@/components/shared'

export default function WrapperTourList() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: Fetch data for the new page
  }
  return (
    <>
      {/* Tour list */}
      <TourList />
      {/* pagination */}
      <Pagination
        pageCurrent={currentPage}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
