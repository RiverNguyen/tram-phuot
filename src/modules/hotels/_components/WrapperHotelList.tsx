'use client'

import { useCallback, useEffect, useState } from 'react'
import HotelList from './HotelList'
import { Pagination } from '@/components/shared'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { IHotel } from '@/interface/hotel.interface'
import ICFilter from '@/components/icons/ICFilter'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer'
import { useTransition } from 'react'
import SkeletonHotel from './SkeletonHotel'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'

interface WrapperHotelListProps {
  taxonomies: ITaxonomy[]
  data: IHotel[]
  totalPages: number
}

export default function WrapperHotelList({ taxonomies, data, totalPages }: WrapperHotelListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(+(searchParams.get('page') || '1'))
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('ListHotelPage')

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
    setCurrentPage(page)
    startTransition(() => {
      router.push(`${pathname}?${createQueryString('page', page <= 1 ? '' : page.toString())}`, {
        scroll: false,
      })
    })
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

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

    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString(taxonomy, typeof value === 'string' ? value : value.join(','))}`,
        {
          scroll: false,
        },
      )
    })
  }

  const onMobileFilterChange = (taxonomy: string, value: string | string[]) => {
    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())

    for (const key in filter) {
      const taxonomy = filter[key]

      const taxonomyStr = typeof taxonomy === 'string' ? taxonomy : taxonomy.join(',')

      if (taxonomyStr) {
        params.set(key, taxonomyStr)
      } else {
        params.delete(key)
      }
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  const resetFilter = () => {
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

    startTransition(() => {
      router.push(newPathname, {
        scroll: false,
      })
    })
  }

  useEffect(() => {
    if (isPending) {
      scrollToSection('hotel-list-container', 1, 5)
    }
  }, [isPending])

  return (
    <div
      id='hotel-list-container'
      className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full h-full max-w-[87.5rem] mx-auto flex flex-col items-center gap-[3.75rem] pt-[5rem] pb-[3.75rem]'
    >
      <div className='xsm:gap-[1.5rem] w-full flex flex-col items-start gap-[2.5rem]'>
        {/* Filter Desktop */}
        <div className='flex w-full items-center space-x-[0.75rem] xsm:hidden'>
          {taxonomies.map((taxonomy, i) => (
            <FilterPopover
              key={i}
              options={taxonomy.terms.map((term) => ({ label: term.name, value: term.slug }))}
              label={taxonomy.label}
              value={filter[taxonomy.taxonomy]}
              onValueChange={(value) => onFilterChange(taxonomy.taxonomy, value)}
              variant={taxonomy.taxonomy === 'locations' ? 'radio' : 'checkbox'}
            />
          ))}
          <button
            type='button'
            onClick={resetFilter}
            className='flex items-center h-[2.75rem] p-[0.75rem_0_0.75rem_0.75rem] items-center space-x-2 font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] uppercase text-[#FF2019] cursor-pointer'
          >
            <ICTrashcan className='size-[1.125rem]' />
            <span>{t('reset')}</span>
          </button>
        </div>
        {/* Filter Mobile */}
        <div className='sm:hidden w-full'>
          <button
            type='button'
            onClick={() => setOpenDrawer(true)}
            className='h-[4.25rem] w-full rounded-[0.25rem] flex items-center p-4 justify-between bg-white border border-[#EDEDED] shadow-[266px_185px_91px_0_rgba(0,0,0,0.00),_170px_118px_83px_0_rgba(0,0,0,0.01),_96px_67px_70px_0_rgba(0,0,0,0.04),_42px_30px_52px_0_rgba(0,0,0,0.04),_11px_7px_28px_0_rgba(0,0,0,0.05)]
  '
          >
            <span className='bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-transparent font-montserrat text-[0.875rem] font-bold leading-[1.1375rem] tracking-[-0.03125rem]'>
              {t('searchFilter')}
            </span>
            <div className='bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] rounded-[0.5rem] p-[0.625rem] flex items-center justify-center'>
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
          <div className='xsm:grid-cols-1 gap-y-[1.5rem] w-full grid grid-cols-4 gap-y-[2rem] gap-x-[1.125rem]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonHotel key={i} />
            ))}
          </div>
        )}

        {/* Hotel list */}
        {!isPending &&
          (data.length > 0 ? (
            <HotelList data={data} />
          ) : (
            <p className='text-center mx-auto'>{t('noResult')}</p>
          ))}
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
