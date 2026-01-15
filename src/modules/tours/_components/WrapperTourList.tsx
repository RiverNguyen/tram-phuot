'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import TourList from './TourList'
import { Pagination } from '@/components/shared'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { usePathname, useRouter } from '@/i18n/navigation'
import { ITourRes } from '@/interface/tour.interface'
import ICFilter from '@/components/icons/ICFilter'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer'
import SkeletonTour from './SkeletonTour'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import EmptyResult from './EmptyResult'
import tourService from '@/services/tour'
import useSWR from 'swr'
import { scrollToSection } from '@/utils/scrollToSection'

interface WrapperTourListProps {
  taxonomies: ITaxonomy[]
  tourRes: ITourRes
  locale: string
}

const tourFetcher = async (key: {
  locale: string
  locations?: string
  tourType?: string
  tourDuration?: string
  page?: string
}) => {
  return tourService.getTours({
    locale: key.locale,
    locations: key.locations,
    tourType: key.tourType,
    tourDuration: key.tourDuration,
    page: key.page,
  })
}

export default function WrapperTourList({ taxonomies, tourRes, locale }: WrapperTourListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('ListTourPage')
  const currentPage = +(searchParams.get('page') || '1')
  const prevSearchRef = useRef<string | null>(null)

  const swrKey = {
    locale,
    locations: searchParams.get('locations') || undefined,
    tourType: searchParams.get('tour-type') || undefined,
    tourDuration: searchParams.get('tour-duration') || undefined,
    page: searchParams.get('page') || '1',
  }

  const { data: swrData, isLoading } = useSWR(swrKey, tourFetcher, {
    fallbackData: tourRes,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  const tours = swrData?.data ?? []
  const pages = swrData?.totalPages ?? 1

  const initialFilter = taxonomies.reduce(
    (acc, curr) => {
      const taxonomy = curr.taxonomy

      const param = searchParams.get(taxonomy)

      let value: string | string[] = param || ''

      if (taxonomy !== 'locations') {
        value = param ? param.split(',') : []
      }

      acc[taxonomy] = value
      return acc
    },
    {} as Record<string, string | string[]>,
  )

  const [filter, setFilter] = useState<Record<string, string | string[]>>(initialFilter)

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString('page', page <= 1 ? '' : page.toString())}`, {
      scroll: false,
    })
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.delete('page')

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  const onFilterChange = async (taxonomy: string, value: string | string[]) => {
    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))

    router.push(
      `${pathname}?${createQueryString(taxonomy, typeof value === 'string' ? value : value.join(','))}`,
      {
        scroll: false,
      },
    )
  }

  const onMobileFilterChange = (taxonomy: string, value: string | string[]) => {
    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('page')

    for (const key in filter) {
      const taxonomy = filter[key]

      const taxonomyStr = typeof taxonomy === 'string' ? taxonomy : taxonomy.join(',')

      if (taxonomyStr) {
        params.set(key, taxonomyStr)
      } else {
        params.delete(key)
      }
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const resetFilter = () => {
    const sp = searchParams.toString()
    if (!sp) return

    const newPathname = currentPage > 1 ? `${pathname}?page=${currentPage}` : pathname

    const resetFilter = taxonomies.reduce(
      (acc, curr) => {
        const taxonomy = curr.taxonomy

        let value: string | string[] = ''

        if (taxonomy !== 'locations') {
          value = []
        }

        acc[taxonomy] = value
        return acc
      },
      {} as Record<string, string | string[]>,
    )

    setFilter(resetFilter)

    router.push(newPathname, {
      scroll: false,
    })
  }

  useEffect(() => {
    const current = searchParams.toString()

    if (prevSearchRef.current === null) {
      prevSearchRef.current = current
      return
    }

    if (prevSearchRef.current !== current) {
      scrollToSection('tour-list-container', 1, 5)
      prevSearchRef.current = current
    }
  }, [searchParams])

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

        {isLoading && (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-4 gap-x-[1.125rem] gap-y-[2rem]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonTour key={i} />
            ))}
          </div>
        )}

        {/* Tour list */}
        {!isLoading && (tours.length > 0 ? <TourList data={tours} /> : <EmptyResult />)}
      </div>

      {/* pagination */}
      <Pagination
        pageCurrent={currentPage}
        pageCount={pages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
