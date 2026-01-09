'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterDrawer from '@/components/shared/Filter/FilterDrawer2'
import FilterPopover from '@/components/shared/Filter/FilterPopover'
import { mapTaxonomyToFilter } from '@/utils/mapTaxonomyToFilter'
import { ICTrashcan } from '@/components/icons'
import ICFilter from '@/components/icons/ICFilter'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/shared'
import { IBlog } from '@/interface/blogs.interface'
import { ITaxonomy } from '@/interface/taxonomy.interface'
import NewsList from './index'
import { scrollToSection } from '@/utils/scrollToSection'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  createQueryString,
  parseFilterStateFromURL,
  formatFiltersForURL,
  hasActiveFilters,
} from '@/utils/filterHelpers'
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
  blogsData: IBlog[]
  totalPages: number
  title: string
}

export default function WrapperBlogList({
  taxonomies,
  blogsData,
  totalPages,
  title,
}: WrapperBlogListProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('BlogsPage')

  const filters = mapTaxonomyToFilter(
    taxonomies,
    TAXONOMY_CONFIG.map((t) => t.key),
  )

  const taxonomiesWithVariant = TAXONOMY_CONFIG.map((config) => ({
    taxonomy: config.key,
    variant: config.variant,
  }))

  // Parse sort from URL (default to 'newest-first')
  const sortValue = searchParams.get('sort') || 'newest-first'

  const [filterState, setFilterState] = useState<Record<string, string | string[]>>(() =>
    parseFilterStateFromURL(searchParams, taxonomiesWithVariant),
  )

  const currentPage = Math.max(1, Number(searchParams.get('paged')) || 1)

  const pushFilters = (next: Record<string, string | string[]>, sort?: string) => {
    setFilterState(next)
    startTransition(() => {
      const updates = formatFiltersForURL(next)
      updates.paged = undefined
      if (sort !== undefined) {
        updates.sort = sort === 'newest-first' ? undefined : sort
      }
      const query = createQueryString(searchParams, updates)
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  const handleFilterChange = (key: string, value: string | string[]) => {
    pushFilters(
      {
        ...filterState,
        [key]: value,
      },
      sortValue,
    )
  }

  const handleSortChange = (value: string | string[]) => {
    pushFilters(filterState, typeof value === 'string' ? value : value[0] || 'newest-first')
  }

  const handleReset = () => {
    if (!hasActiveFilters(filterState) && sortValue === 'newest-first') {
      if (currentPage <= 1) {
        setOpenDrawer(false)
        return
      }
      startTransition(() => {
        const query = createQueryString(searchParams, { paged: undefined })
        router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
      })
      setOpenDrawer(false)
      return
    }

    const reset: Record<string, string | string[]> = {}
    taxonomiesWithVariant.forEach(({ taxonomy }) => {
      reset[taxonomy] = []
    })
    pushFilters(reset, 'newest-first')
    setOpenDrawer(false)
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
    scrollToSection('blog-list-container', 1, 5)
  }, [isPending])

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
      ref={sectionRef}
      className='xsm:gap-[1rem] xsm:px-[1rem] flex w-full flex-col gap-[2rem]'
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
            value={sortValue}
            onValueChange={handleSortChange}
            variant='radio'
            showAllOption={false}
          />
          {/* Type news */}
          {filters['type-news'] && (
            <FilterPopover
              options={filters['type-news']}
              label={t('typeNews')}
              value={filterState['type-news']}
              onValueChange={(value) => handleFilterChange('type-news', value)}
              variant='checkbox'
            />
          )}
          {/* Kind */}
          {filters['kind'] && (
            <FilterPopover
              options={filters['kind']}
              label={t('kind')}
              value={filterState['kind']}
              onValueChange={(value) => handleFilterChange('kind', value)}
              variant='checkbox'
            />
          )}
          {/* Reset button */}
          {/* {(hasActiveFilters(filterState) || sortValue !== 'newest-first') && ( */}
          <button
            type='button'
            onClick={handleReset}
            className='font-montserrat flex h-[2.75rem] cursor-pointer items-center space-x-2 p-[0.75rem_0_0.75rem_0.75rem] text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-[#FF2019] uppercase'
          >
            <ICTrashcan className='size-[1.125rem]' />
            <span>{t('reset')}</span>
          </button>
          {/* )} */}
        </div>
      </div>

      {/* Mobile Filter */}
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
          sections={sections}
          filters={{
            ...filterState,
            sort: sortValue,
          }}
          onApply={(next) => {
            const { sort, ...filters } = next
            pushFilters(filters, sort as string)
            setOpenDrawer(false)
          }}
          onReset={handleReset}
        />
      </div>

      {isPending && (
        <div className='xsm:gap-[1.25rem] flex flex-col gap-[1.875rem]'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='xsm:flex-col xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] xsm:gap-[0.875rem] flex items-center gap-[4.5rem]'
            >
              <Skeleton className='xsm:h-[13.8125rem] xsm:rounded-[0.75rem] xsm:w-full h-[19.75rem] w-[34rem] shrink-0 rounded-[1.25rem]' />
              <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] xsm:gap-[1.25rem] flex flex-1 flex-col gap-[4rem]'>
                <div>
                  <Skeleton className='h-[0.875rem] w-[6rem] mb-[1rem]' />
                  <Skeleton className='h-[2.125rem] w-full mb-[0.5rem]' />
                  <Skeleton className='h-[1rem] w-full' />
                </div>
                <Skeleton className='h-[0.875rem] w-[8rem]' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News list */}
      {!isPending && <NewsList blogsData={blogsData} />}

      {/* Pagination */}
      {!isPending && blogsData?.length > 0 && (
        <Pagination
          pageCurrent={currentPage}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          className='xsm:mt-[1.25rem] mt-[2.5rem]'
        />
      )}
    </div>
  )
}
