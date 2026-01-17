'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer2'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import { mapTaxonomyToFilter } from '@/utils/mapTaxonomyToFilter'
import { ICTrashcan } from '@/components/icons'
import ICCFilterLine from '@/components/icons/ICCFilterLine'
import SkeletonPromotion from './SkeletonPromotion'
import { Pagination } from '@/components/shared'
import { ICoupon, ICouponRes, ICouponTaxonomy } from '@/interface/coupon.interface'
import OngoingPromotionsCard from './OngoingPromotionsCard'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import EmptyResult from '@/modules/tours/_components/EmptyResult'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import { motion, AnimatePresence } from 'framer-motion'

// Taxonomy configuration
const TAXONOMY_CONFIG = [
  { key: 'locations', variant: 'radio' as const, translationKey: 'destination' },
  { key: 'tour-type', variant: 'checkbox' as const, translationKey: 'typeTour' },
] as const

interface WrapperOngoingPromotionsProps {
  taxonomies: ICouponTaxonomy[]
  couponRes: ICouponRes
  locale: string
  text2: string
}

const buildCouponKey = (locale: string, query: Record<string, string>) => {
  const params = new URLSearchParams()

  Object.entries(query)
    .filter(([, v]) => v && v !== '1')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([k, v]) => params.set(k, v))

  return `coupons:${locale}?${params.toString()}`
}

// Client-side fetcher for SWR
const couponFetcher = async ({
  locale,
  locations,
  tourType,
  page,
  limit,
}: {
  locale: string
  locations?: string
  tourType?: string
  page?: string
  limit?: number
}): Promise<ICouponRes> => {
  const query = new URLSearchParams()
  query.set('lang', locale)
  query.set('acf', 'true')
  query.set('tax', 'locations,tour-type')
  query.set('limit', String(limit || 9))

  if (locations) query.set('locations', locations)
  if (tourType) query.set('tour-type', tourType)
  if (page && Number(page) > 1) query.set('paged', page)

  const res = await fetch(`${ENV.CMS}${ENV.API!}${ENDPOINTS.promotion.coupon}?${query.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch coupons')
  return res.json()
}

export default function WrapperOngoingPromotions({
  taxonomies,
  couponRes,
  locale,
  text2,
}: WrapperOngoingPromotionsProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const shouldBeFixedRef = useRef(false)
  const footerVisibleRef = useRef(false)
  const searchParams = useSearchParams()
  const t = useTranslations('ListCouponPage')

  const filters = mapTaxonomyToFilter(
    taxonomies,
    TAXONOMY_CONFIG.map((t) => t.key),
  )

  const taxonomiesWithVariant = TAXONOMY_CONFIG.map((config) => ({
    taxonomy: config.key,
    variant: config.variant,
  }))

  const currentPage = +(searchParams.get('page') || searchParams.get('paged') || '1')

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
    scrollToSection('ongoing-promotions-section', 1, 7.5)

    const nextQuery = {
      ...query,
      page: page <= 1 ? '1' : page.toString(),
    }

    setQuery(nextQuery)
    syncUrl(nextQuery)
  }

  const getInitialQuery = () => {
    if (typeof window === 'undefined') {
      return {
        locations: '',
        'tour-type': '',
        page: '1',
      }
    }

    const params = new URLSearchParams(window.location.search)

    return {
      locations: params.get('locations') || '',
      'tour-type': params.get('tour-type') || '',
      page: params.get('page') || params.get('paged') || '1',
    }
  }

  const initialQuery = useMemo(() => getInitialQuery(), [])
  const [query, setQuery] = useState<Record<string, string>>(initialQuery)

  const { data: swrData, isLoading } = useSWR(
    buildCouponKey(locale, query),
    () =>
      couponFetcher({
        locale,
        locations: query.locations,
        tourType: query['tour-type'],
        page: query.page,
        limit: 9,
      }),
    {
      fallbackData: couponRes,
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 5000,
    },
  )

  const coupons = swrData?.data ?? couponRes?.data ?? []
  const pages = swrData?.totalPages ?? couponRes?.totalPages ?? 1

  // Filter out private coupons
  const visibleCoupons = coupons.filter((item) => !item?.acf?.private)

  // Check xem query hiện tại có khác với query ban đầu không
  const isQueryChanged =
    query.locations !== initialQuery.locations ||
    query['tour-type'] !== initialQuery['tour-type'] ||
    query.page !== initialQuery.page

  // Show loading khi:
  // 1. Đang loading VÀ (query đã thay đổi HOẶC không có data từ server)
  const shouldShowLoading = isLoading && (isQueryChanged || !couponRes?.data?.length)

  const syncUrl = (nextQuery: Record<string, string>) => {
    const url = new URL(window.location.href)

    // 🔥 CLEAR TẤT CẢ QUERY CŨ
    url.search = ''

    Object.entries(nextQuery).forEach(([key, value]) => {
      // page=1 thì bỏ
      if (key === 'page' && value === '1') return

      if (value) {
        // Convert 'page' to 'paged' for URL
        const urlKey = key === 'page' ? 'paged' : key
        url.searchParams.set(urlKey, value)
      }
    })

    window.history.replaceState(null, '', url.toString())
  }

  const onFilterChange = (taxonomy: string, value: string | string[]) => {
    const valueStr = typeof value === 'string' ? value : value.join(',')

    const nextQuery = {
      ...query,
      [taxonomy]: valueStr,
      page: '1',
    }

    setFilter((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))

    setQuery(nextQuery)
    syncUrl(nextQuery)

    scrollToSection('ongoing-promotions-section', 1, 7.5)
  }

  const handleApply = (appliedFilters: Record<string, string | string[]>) => {
    const nextQuery: Record<string, string> = {
      ...query,
      page: '1',
    }

    for (const key in appliedFilters) {
      const value = appliedFilters[key]
      const valueStr = typeof value === 'string' ? value : value.join(',')

      if (valueStr) nextQuery[key] = valueStr
    }

    setFilter(appliedFilters)
    setQuery(nextQuery)
    syncUrl(nextQuery)

    scrollToSection('ongoing-promotions-section', 1, 7.5)
  }

  const resetFilter = () => {
    const resetQuery = {
      locations: '',
      'tour-type': '',
      page: '1',
    }

    setFilter(
      taxonomies.reduce(
        (acc, curr) => {
          acc[curr.taxonomy] = curr.taxonomy === 'locations' ? '' : []
          return acc
        },
        {} as Record<string, string | string[]>,
      ),
    )

    setQuery(resetQuery)
    syncUrl(resetQuery)

    scrollToSection('ongoing-promotions-section', 1, 7.5)
  }

  useEffect(() => {
    if (!sentinelRef.current) return

    // Observer cho sentinel để detect khi scroll qua
    const sentinelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Khi sentinel không còn visible (scroll qua) thì có thể fixed button
          shouldBeFixedRef.current = !entry.isIntersecting
          setIsFixed(shouldBeFixedRef.current && !footerVisibleRef.current)
        })
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    )

    sentinelObserver.observe(sentinelRef.current)

    // Observer cho footer để detect khi footer vào viewport
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          footerVisibleRef.current = entry.isIntersecting
          // Nếu footer visible thì không fixed button
          setIsFixed(shouldBeFixedRef.current && !footerVisibleRef.current)
        })
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    )

    // Tìm footer element với delay để đảm bảo footer đã render
    const checkFooter = () => {
      const footer = document.querySelector('footer')
      if (footer) {
        footerObserver.observe(footer)
      } else {
        // Retry nếu footer chưa render
        setTimeout(checkFooter, 100)
      }
    }

    checkFooter()

    return () => {
      sentinelObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  return (
    <>
      <div
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
                value={filter[config.key]}
                onValueChange={(val) => onFilterChange(config.key, val)}
                variant={config.variant}
              />
            ))}
            <button
              type='button'
              onClick={resetFilter}
              className='group flex h-[2.75rem] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.5rem] py-[0.75rem] pl-[0.75rem] font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'
            >
              <ICTrashcan className='size-[1.125rem]' />
              <span className='relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:opacity-0 after:bg-[#FF2019] after:transition-all after:duration-500 after:ease-out group-hover:after:opacity-100'>
                {t('reset')}
              </span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <>
            {/* Sentinel element để detect khi scroll qua */}
            <div
              ref={sentinelRef}
              className='w-full sm:hidden'
            />
            {/* Button trong document flow - ẩn khi fixed */}
            <div className={`w-full sm:hidden ${isFixed ? 'invisible' : ''}`}>
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
            </div>
            {/* Button fixed - hiện khi scroll qua với animation mượt */}
            <AnimatePresence>
              {isFixed && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className='fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 w-full sm:hidden'
                >
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
                </motion.div>
              )}
            </AnimatePresence>
            <FilterDrawer
              open={openDrawer}
              onOpenChange={setOpenDrawer}
              sections={TAXONOMY_CONFIG.map((config) => ({
                type: config.variant,
                key: config.key,
                title: t(config.translationKey),
                options: filters[config.key] || [],
              }))}
              filters={filter}
              onApply={handleApply}
              onReset={resetFilter}
            />
          </>
        </div>

        {/* Promotion Cards */}
        {shouldShowLoading ? (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-3 gap-x-[1.25rem] gap-y-[2.5rem]'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonPromotion key={idx} />
            ))}
          </div>
        ) : visibleCoupons.length > 0 ? (
          <div className='xsm:grid-cols-1 grid w-full grid-cols-3 gap-x-[1.25rem] gap-y-[2.5rem]'>
            {visibleCoupons.map((card) => (
              <OngoingPromotionsCard
                key={card.id}
                card={card}
              />
            ))}
          </div>
        ) : (
          <EmptyResult />
        )}
      </div>

      {/* Pagination */}
      {!shouldShowLoading && visibleCoupons.length > 0 && pages > 1 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={pages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
