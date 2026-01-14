'use client'

import { useCallback, useEffect, useState } from 'react'
import TourList from './TourList'
import { Pagination } from '@/components/shared'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { ITour } from '@/interface/tour.interface'
import ICFilter from '@/components/icons/ICFilter'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer'
import { useTransition } from 'react'
import SkeletonTour from './SkeletonTour'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'
import EmptyTourResult from './EmptyTourResult'

interface WrapperTourListNewProps {
  initialPage: number
  initialTours: ITour[]
  initialTotalPages: number
  filterOptions: {
    label: string
    value: string
    variant: 'checkbox' | 'radio'
  }[]
  initialQueryParams: Record<string, string | string[]>
}

export default function WrapperTourListNew({
  initialPage,
  initialTours,
  initialTotalPages,
  filterOptions,
  initialQueryParams,
}: WrapperTourListNewProps) {
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

        {isPending && (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-4 gap-x-[1.125rem] gap-y-[2rem]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonTour key={i} />
            ))}
          </div>
        )}

        {/* Tour list */}
        {!isPending &&
          (data.length > 0 ? <TourList data={data} /> : <EmptyTourResult onReset={resetFilter} />)}
      </div>

      {/* pagination */}
      <Pagination
        pageCurrent={currentPage}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
