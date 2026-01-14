'use client'

import gsap from 'gsap'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'

import ENDPOINTS from '@/configs/endpoints'
import { fetcher } from '@/lib/swr'
import useIsMobile from '@/hooks/useIsMobile'
import { ITour } from '@/interface/tour.interface'
import { ITaxonomy } from '@/interface/taxonomy.interface'

export function useFetchTours({
  initialQueryParams,
  initialTours,
  initialPage,
  initialTotalPages,
  tourTypeOptions,
  tourLocationOptions,
  tourDurationOptions,
}: {
  initialQueryParams: string
  initialTours: ITour[]
  initialPage: number
  initialTotalPages: number
  tourTypeOptions: ITaxonomy[]
  tourLocationOptions: ITaxonomy[]
  tourDurationOptions: ITaxonomy[]
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const [pagination, setPagination] = useState({
    page: initialPage,
    totalPages: initialTotalPages,
  })

  const [filters, setFilters] = useState<Record<string, string | string[]>>(() => {
    const params = getSelectedOptionsFromParams({
      searchParams,
      tourLocationOptions,
      tourDurationOptions,
      tourTypeOptions,
    })
    return {
      tour_type: params.selectedPackages,
      tour_location: params.selectedLocations,
      tour_duration: params.selectedDurations,
    }
  })

  const query = useMemo(() => {
    if (initialQueryParams === searchParamsString) return null
    // if (!searchParams?.size) return null
    const params = new URLSearchParams(searchParamsString)
    params.set('page', String(pagination.page) || '1')
    params.set('limit', '12')
    params.set('order', 'DESC')

    return ENDPOINTS.tour.list(params.toString())
  }, [searchParamsString, pagination.page, initialQueryParams])

  const { data: tourListData, isLoading } = useSWR<TourListDataApiResType>(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })

  const latestData = useMemo(() => {
    return Array.isArray(tourListData?.data?.items) ? tourListData?.data?.items : initialTours
  }, [tourListData, initialTours])

  const scrollToTop = () => {
    const container = containerRef.current
    if (!container) return

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (container) {
        gsap.to(window, {
          duration: isMobile ? 1 : 0.5,
          scrollTo: { y: container.offsetTop - 80 },
          ease: 'power2.out',
        })
      }
    }, 100)
  }

  const updateURLWithoutRender = (params: URLSearchParams) => {
    if (params.get('page') === '1') {
      params.delete('page')
    }
    // Use replaceState instead of pushState to avoid adding to history stack
    window.history.replaceState({}, '', `${pathname}?${params.toString()}`)
  }

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    setPagination((prev) => ({ ...prev, page }))
    updateURLWithoutRender(params)
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = useCallback((key: string, filter: { slug: string }[]) => {
    scrollToTop()
    const params = new URLSearchParams(searchParams.toString())
    if (filter.length > 0) {
      params.set(key, filter.map((v) => v.slug).join(','))
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    setPagination((prev) => ({ ...prev, page: 1 }))
    updateURLWithoutRender(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterOnMobile = useCallback(
    (filters: Record<FilterTourKeyParam, TaxonomyACFType[]>) => {
      scrollToTop()
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(filters).forEach(([key, value]) => {
        if (value.length > 0) {
          params.set(key, value.map((v) => v.slug).join(','))
        } else {
          params.delete(key)
        }
      })
      params.set('page', '1')
      setPagination((prev) => ({ ...prev, page: 1 }))
      updateURLWithoutRender(params)
    },
    [],
  )

  useEffect(() => {
    if (tourListData && searchParams?.size) {
      setPagination((prev) => ({
        ...prev,
        totalPages: tourListData?.data?.pagination?.total_pages || 1,
      }))
    } else if (query === null) {
      setPagination((prev) => ({
        ...prev,
        totalPages: initialTotalPages,
      }))
    }
  }, [tourListData, searchParams?.size, query, initialTotalPages])

  return {
    containerRef,
    filters,
    setFilters,
    handleFilterChange,
    handleFilterOnMobile,
    handlePageChange,
    latestData,
    isLoading,
    pagination,
  }
}
