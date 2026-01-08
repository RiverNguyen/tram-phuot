'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer2'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import { mapTaxonomyToFilter } from '@/utils/mapTaxonomyToFilter'
import { ICTrashcan } from '@/components/icons'
import ICCFilterLine from '@/components/icons/ICCFilterLine'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/shared'
import { ICoupon, ICouponTaxonomy } from '@/interface/coupon.interface'
import OngoingPromotionsCard from './OngoingPromotionsCard'
import { scrollToSection } from '@/utils/scrollToSection'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  createQueryString,
  parseFilterStateFromURL,
  formatFiltersForURL,
  hasActiveFilters,
} from '@/utils/filterHelpers'

// Taxonomy configuration
const TAXONOMY_CONFIG = [
  { key: 'locations', variant: 'radio' as const, translationKey: 'destination' },
  { key: 'tour-type', variant: 'checkbox' as const, translationKey: 'typeTour' },
] as const

export default function OngoingPromotions({
  data,
  taxonomies,
  totalPages,
  text2,
}: {
  data: ICoupon[]
  taxonomies: ICouponTaxonomy[]
  totalPages?: number
  text2: string
}) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('ListCouponPage')

  const filters = mapTaxonomyToFilter(
    taxonomies,
    TAXONOMY_CONFIG.map((t) => t.key),
  )

  const taxonomiesWithVariant = TAXONOMY_CONFIG.map((config) => ({
    taxonomy: config.key,
    variant: config.variant,
  }))

  const [filterState, setFilterState] = useState<Record<string, string | string[]>>(() =>
    parseFilterStateFromURL(searchParams, taxonomiesWithVariant),
  )

  const currentPage = Math.max(1, Number(searchParams.get('paged')) || 1)

  const pushFilters = (next: Record<string, string | string[]>) => {
    setFilterState(next)
    startTransition(() => {
      const updates = formatFiltersForURL(next)
      updates.paged = undefined
      const query = createQueryString(searchParams, updates)
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  const handleFilterChange = (key: string, value: string | string[]) => {
    pushFilters({
      ...filterState,
      [key]: value,
    })
  }

  const handleReset = () => {
    if (!hasActiveFilters(filterState)) {
      if (currentPage <= 1) return
      startTransition(() => {
        const query = createQueryString(searchParams, { paged: undefined })
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
      })
      return
    }

    const reset: Record<string, string | string[]> = {}
    taxonomiesWithVariant.forEach(({ taxonomy, variant }) => {
      reset[taxonomy] = variant === 'radio' ? '' : []
    })
    pushFilters(reset)
  }

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const query = createQueryString(searchParams, {
        paged: page > 1 ? String(page) : undefined,
      })
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  useEffect(() => {
    setFilterState(parseFilterStateFromURL(searchParams, taxonomiesWithVariant))
  }, [searchParams])

  useEffect(() => {
    if (!isPending) return
    if (!sectionRef.current) return
    scrollToSection('ongoing-promotions-section', 1, 7.5)
  }, [isPending])

  const visibleData = data.filter((item) => !item?.acf?.private)

  return (
    <>
      <div
        ref={sectionRef}
        id='ongoing-promotions-section'
        className='xsm:gap-[1.25rem] xsm:px-[1rem] xsm:mb-[2.25rem] mx-auto flex w-full max-w-[87.5rem] flex-col items-start gap-[2.5rem] self-stretch'
      >
        <div className='xsm:flex-col xsm:gap-[0.875rem] xsm:items-start flex items-center gap-[2.5rem] self-stretch'>
          <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] line-clamp-1 font-phu-du w-[35.8125rem] text-[2.125rem] leading-[2.3375rem] font-medium text-[#2E2E2E]'>
            {text2}
          </h2>

          {/* Desktop Filters */}
          <div className='xsm:hidden flex flex-1 items-center gap-[0.75rem]'>
            {TAXONOMY_CONFIG.map((config) => (
              <FilterPopover
                key={config.key}
                label={t(config.translationKey)}
                options={filters[config.key] ?? []}
                value={filterState[config.key]}
                onValueChange={(val) => handleFilterChange(config.key, val)}
                variant={config.variant}
              />
            ))}
            <button
              type='button'
              onClick={handleReset}
              className='flex h-[2.75rem] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] py-[0.75rem] pl-[0.75rem]'
            >
              <ICTrashcan className='size-[1.125rem] text-[#FF2019]' />
              <span className='font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'>
                {t('reset')}
              </span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <div className='w-full sm:hidden'>
            <button
              onClick={() => setOpenDrawer(true)}
              type='button'
              className='flex w-full items-center justify-between rounded-[0.5rem] bg-white px-[0.75rem] py-[0.625rem] shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]'
            >
              <span className='font-montserrat text-[0.875rem] leading-[1.3125rem] font-medium text-[rgba(46,46,46,0.75)]'>
                {t('category')}
              </span>
              <ICCFilterLine className='size-[1.28125rem]' />
            </button>
            <FilterDrawer
              open={openDrawer}
              onOpenChange={setOpenDrawer}
              sections={TAXONOMY_CONFIG.map((config) => ({
                type: config.variant,
                key: config.key,
                title: t(config.translationKey),
                options: filters[config.key] || [],
              }))}
              filters={filterState}
              onApply={(next) => pushFilters(next)}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Promotion Cards */}
        <div className='xsm:grid-cols-1 grid w-full grid-cols-3 gap-[1.25rem]'>
          {isPending ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className='flex w-full animate-pulse flex-col gap-3'
              >
                {/* Image */}
                <Skeleton className='h-64 w-full rounded-xl' />

                {/* Title + subtitle */}
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-4 w-1/2 rounded' />

                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-16 rounded' />
                  <Skeleton className='h-6 w-12 rounded' />
                  <Skeleton className='h-6 w-20 rounded' />
                </div>
              </div>
            ))
          ) : visibleData.length > 0 ? (
            visibleData.map((card) => (
              <OngoingPromotionsCard
                key={card.id}
                card={card}
              />
            ))
          ) : (
            <div className='col-span-3 flex w-full items-center justify-center'>
              <span className='font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#2E2E2E]'>
                {t('noResult')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {visibleData.length > 0 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
