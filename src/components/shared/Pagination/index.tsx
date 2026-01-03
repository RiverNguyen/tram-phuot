'use client'
import { gsap } from 'gsap'
import EaselPlugin from 'gsap/EaselPlugin'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import React from 'react'
import ReactPaginate from 'react-paginate'

import { cn } from '@/lib/utils'
import useIsMobile from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollToPlugin, EaselPlugin)

type TProps = {
  pageCurrent: number
  pageCount: number
  className?: string
  onPageChange: (page: number) => void
}

const Pagination = ({ pageCurrent, pageCount = 10, className, onPageChange }: TProps) => {
  const isMobile = useIsMobile()
  const handlePageChange = (page: number) => {
    onPageChange(page)
  }

  return (
    <ReactPaginate
      activeClassName='after:opacity-100 text-white lg:hover:bg-text-title-h2 cursor-pointer'
      pageClassName='relative size-[2rem] text-[0.875rem] rounded-full flex-center text-[#043424] leading-[1.5] bg-[#043424]/10 [&>a]:size-full [&>a]:flex-center [&_a]:relative [&_a]:z-2 select-none lg:hover:after:opacity-100 lg:hover:text-white cursor-pointer font-montserrat transition-all duration-300 after:absolute after:z-1 after:rounded-[inherit] after:size-full after:inset-0 after:bg-text-title-h2 after:opacity-0 after:transition-opacity after:duration-300'
      previousLabel={null}
      nextLabel={null}
      breakClassName='pointer-events-none [&_a]:flex [&_a]:size-full size-[2rem] flex-center select-none'
      breakLabel={
        <div className='xsm:gap-x-1 flex size-full items-center justify-center gap-x-[0.325rem]'>
          <div className='xsm:size-[0.175rem]! size-1! shrink-0 rounded-full bg-[#043424]'></div>
          <div className='xsm:size-[0.175rem]! size-1! shrink-0 rounded-full bg-[#043424]'></div>
          <div className='xsm:size-[0.175rem]! size-1! shrink-0 rounded-full bg-[#043424]'></div>
        </div>
      }
      onPageChange={(e) => {
        handlePageChange(Number(e?.selected) + 1)
      }}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      marginPagesDisplayed={isMobile ? 1 : 2}
      forcePage={pageCurrent - 1}
      className={cn(
        'font-lens *:font-lens mx-auto flex w-fit items-center space-x-[0.5rem]',
        className,
      )}
    />
  )
}

export default React.memo(Pagination)

const ICArrowPagination = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      className={className}
    >
      <path
        d='M0.881836 9.42871L11.0332 18.8564V12.2715L14.3389 15.3428V10.0166L17.1182 12.5996V6.25781L14.3389 8.83984V3.51465L11.0332 6.58496V0L0.881836 9.42871Z'
        fill='#F05B47'
      />
    </svg>
  )
}
