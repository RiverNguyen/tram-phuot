'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/i18n/navigation'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer2'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import { mapTaxonomyToFilter } from '@/utils/mapTaxonomyToFilter'
import { ICTrashcan } from '@/components/icons'
import SkeletonBlog from './SkeletonBlog'
import { Pagination } from '@/components/shared'
import { IBlog, IBlogRes } from '@/interface/blogs.interface'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import NewsList from './BlogList'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'
import EmptyResult from '@/modules/tours/_components/EmptyResult'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import { motion, AnimatePresence } from 'framer-motion'
import ICCFilterLine from '@/components/icons/ICCFilterLine'

// Sort options
const SORT_OPTIONS = [
  { value: 'newest-first', labelKey: 'sortNewestFirst' },
  { value: 'alphabetical-az', labelKey: 'sortAlphabeticalAZ' },
  { value: 'alphabetical-za', labelKey: 'sortAlphabeticalZA' },
] as const

// Taxonomy configuration
const TAXONOMY_CONFIG = [
  { key: 'type-news', variant: 'checkbox' as const },
  { key: 'kind', variant: 'checkbox' as const },
] as const

interface WrapperBlogListProps {
  taxonomies: ITaxonomy[]
  blogRes: IBlogRes
  locale: string
  title: string
}

const buildBlogKey = (locale: string, query: Record<string, string>) => {
  const params = new URLSearchParams()

  Object.entries(query)
    .filter(([, v]) => v && v !== '1' && v !== 'newest-first')
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([k, v]) => params.set(k, v))

  return `blogs:${locale}?${params.toString()}`
}

// Client-side fetcher for SWR
const blogFetcher = async ({
  locale,
  kind,
  typeNews,
  sort,
  page,
  limit,
}: {
  locale: string
  kind?: string
  typeNews?: string
  sort?: string
  page?: string
  limit?: number
}): Promise<IBlogRes> => {
  const query = new URLSearchParams()
  query.set('lang', locale)
  query.set('acf', 'true')
  query.set('tax', 'category,kind,type-news')
  query.set('limit', String(limit || 6))

  if (kind) query.set('kind', kind)
  if (typeNews) query.set('type-news', typeNews)
  if (page && Number(page) > 1) query.set('paged', page)

  // Handle sort
  if (sort === 'newest-first') {
    query.set('order', 'DESC')
    query.set('orderby', 'date')
  } else if (sort === 'alphabetical-az') {
    query.set('order', 'ASC')
    query.set('orderby', 'title')
  } else if (sort === 'alphabetical-za') {
    query.set('order', 'DESC')
    query.set('orderby', 'title')
  }

  const res = await fetch(`${ENV.CMS}${ENV.API!}${ENDPOINTS.blogs.list}?${query.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch blogs')
  return res.json()
}

export default function WrapperBlogList({ taxonomies, blogRes, locale, title }: WrapperBlogListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const shouldBeFixedRef = useRef(false)
  const footerVisibleRef = useRef(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const t = useTranslations('BlogsPage')

  const filters = mapTaxonomyToFilter(
    taxonomies,
    TAXONOMY_CONFIG.map((t) => t.key),
  )

  const taxonomiesWithVariant = TAXONOMY_CONFIG.map((config) => ({
    taxonomy: config.key,
    variant: config.variant,
  }))

  const currentPage = +(searchParams.get('page') || searchParams.get('paged') || '1')
  const sortValue = searchParams.get('sort') || 'newest-first'

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
    scrollToSection('blog-list-container', 1, 5)

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
        kind: '',
        'type-news': '',
        sort: 'newest-first',
        page: '1',
      }
    }

    const params = new URLSearchParams(window.location.search)

    return {
      kind: params.get('kind') || '',
      'type-news': params.get('type-news') || '',
      sort: params.get('sort') || 'newest-first',
      page: params.get('page') || params.get('paged') || '1',
    }
  }

  const initialQuery = useMemo(() => getInitialQuery(), [])
  const [query, setQuery] = useState<Record<string, string>>(initialQuery)

  // Reset query when route changes (e.g., navigating from blogs page 2 to hotels)
  useEffect(() => {
    const newQuery = getInitialQuery()
    setQuery(newQuery)
  }, [pathname, searchParams])

  const { data: swrData, isLoading } = useSWR(
    buildBlogKey(locale, query),
    () =>
      blogFetcher({
        locale,
        kind: query.kind,
        typeNews: query['type-news'],
        sort: query.sort,
        page: query.page,
        limit: 6,
      }),
    {
      fallbackData: blogRes,
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 5000,
    },
  )

  const blogs = swrData?.data ?? blogRes?.data ?? []
  const pages = swrData?.totalPages ?? blogRes?.totalPages ?? 1

  // Check xem query hiện tại có khác với query ban đầu không
  const isQueryChanged =
    query.kind !== initialQuery.kind ||
    query['type-news'] !== initialQuery['type-news'] ||
    query.sort !== initialQuery.sort ||
    query.page !== initialQuery.page

  // Show loading khi:
  // 1. Đang loading VÀ (query đã thay đổi HOẶC không có data từ server)
  const shouldShowLoading = isLoading && (isQueryChanged || !blogRes?.data?.length)

  const syncUrl = (nextQuery: Record<string, string>) => {
    const url = new URL(window.location.href)

    // 🔥 CLEAR TẤT CẢ QUERY CŨ
    url.search = ''

    Object.entries(nextQuery).forEach(([key, value]) => {
      // page=1 thì bỏ
      if (key === 'page' && value === '1') return
      // sort=newest-first thì bỏ
      if (key === 'sort' && value === 'newest-first') return

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

    // Delay scroll để đợi data load và DOM render
    setTimeout(() => {
      scrollToSection('blog-list-container', 1, 5)
    }, 300)
  }

  const handleSortChange = (value: string | string[]) => {
    const sortVal = typeof value === 'string' ? value : value[0] || 'newest-first'

    const nextQuery = {
      ...query,
      sort: sortVal,
      page: '1',
    }

    setQuery(nextQuery)
    syncUrl(nextQuery)

    // Delay scroll để đợi data load và DOM render
    setTimeout(() => {
      scrollToSection('blog-list-container', 1, 5)
    }, 300)
  }

  const handleApply = (appliedFilters: Record<string, string | string[]>) => {
    const { sort, ...filters } = appliedFilters
    const sortVal = (sort as string) || 'newest-first'

    const nextQuery: Record<string, string> = {
      ...query,
      sort: sortVal,
      page: '1',
    }

    for (const key in filters) {
      const value = filters[key]
      const valueStr = typeof value === 'string' ? value : value.join(',')

      if (valueStr) nextQuery[key] = valueStr
    }

    setFilter(filters)
    setQuery(nextQuery)
    syncUrl(nextQuery)

    // Delay scroll để đợi data load và DOM render
    setTimeout(() => {
      scrollToSection('blog-list-container', 1, 5)
    }, 300)
  }

  const resetFilter = () => {
    const resetQuery = {
      kind: '',
      'type-news': '',
      sort: 'newest-first',
      page: '1',
    }

    setFilter(
      taxonomies.reduce(
        (acc, curr) => {
          acc[curr.taxonomy] = []
          return acc
        },
        {} as Record<string, string | string[]>,
      ),
    )

    setQuery(resetQuery)
    syncUrl(resetQuery)

    // Delay scroll để đợi data load và DOM render
    setTimeout(() => {
      scrollToSection('blog-list-container', 1, 5)
    }, 300)
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

  // Prepare sections for FilterDrawer2
  const sections = [
    {
      type: 'radio' as const,
      key: 'sort',
      title: t('sortBy'),
      options: SORT_OPTIONS.map((opt) => ({
        label: t(opt.labelKey),
        value: opt.value,
      })),
    },
    ...TAXONOMY_CONFIG.map((config) => {
      const taxonomy = taxonomies.find((t) => t.taxonomy === config.key)
      return {
        type: config.variant,
        key: config.key,
        title: t(config.key === 'type-news' ? 'typeNews' : 'kind'),
        options: filters[config.key] || [],
      }
    }),
  ]

  return (
    <div
      id='blog-list-container'
      className='xsm:space-y-[1rem] xsm:px-[1rem] flex w-full flex-col space-y-[2rem] xsm:mb-[2.5rem]'
    >
      <div className='flex items-center justify-center gap-[3.75rem]'>
        <h2 className='xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du w-[28.5625rem] text-[3rem] leading-[3rem] font-medium text-[#2E2E2E] uppercase'>
          {title}
        </h2>
        {/* filters */}
        <div className='xsm:hidden flex flex-1 justify-between items-center gap-[0.75rem]'>
          {/* Sort by */}
          <FilterPopover
            options={SORT_OPTIONS.map((opt) => ({
              label: t(opt.labelKey),
              value: opt.value,
            }))}
            label={t('sortBy')}
            value={query.sort}
            onValueChange={handleSortChange}
            variant='radio'
            showAllOption={false}
          />
          {/* Type news */}
          {filters['type-news'] && (
            <FilterPopover
              options={filters['type-news']}
              label={t('typeNews')}
              value={filter['type-news']}
              onValueChange={(value) => onFilterChange('type-news', value)}
              variant='checkbox'
            />
          )}
          {/* Kind */}
          {filters['kind'] && (
            <FilterPopover
              options={filters['kind']}
              label={t('kind')}
              value={filter['kind']}
              onValueChange={(value) => onFilterChange('kind', value)}
              variant='checkbox'
            />
          )}
          {/* Reset button */}
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
      </div>

      {/* Mobile Filter */}
      <>
        {/* Sentinel element để detect khi scroll qua */}
        <div
          ref={sentinelRef}
          className='w-full sm:hidden mb-0'
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
          sections={sections}
          filters={{
            ...filter,
            sort: query.sort,
          }}
          onApply={handleApply}
          onReset={resetFilter}
        />
      </>

      {shouldShowLoading && (
        <div className='xsm:gap-[1.25rem] flex flex-col gap-[1.875rem]'>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlog key={i} />
          ))}
        </div>
      )}

      {/* News list */}
      {!shouldShowLoading && (blogs.length > 0 ? <NewsList blogsData={blogs} /> : <EmptyResult />)}

      {/* Pagination */}
      {!shouldShowLoading && blogs.length > 0 && pages > 1 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={pages}
          onPageChange={handlePageChange}
          className='xsm:mt-[1.25rem] mt-[2.5rem]'
        />
      )}
    </div>
  )
}
