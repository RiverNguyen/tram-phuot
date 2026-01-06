// useCouponFilters.ts
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CouponTaxonomies } from '@/types/coupon.type'
import type { CouponItem, CouponResponse } from '@/types/coupon.type'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/configs/endpoints'

export type CouponFilterValue = string | string[] | undefined
export type CouponFilterState = Partial<Record<keyof CouponTaxonomies, CouponFilterValue>>

// các key multi-select
const MULTI_SELECT_KEYS: (keyof CouponTaxonomies)[] = ['tour-type']

type UseCouponFiltersOptions = {
  locale: string
  initialData?: CouponItem[]
  initialTotalPages?: number
  initialTotal?: number
}

type UseCouponFiltersReturn = {
  filters: {
    locations: string
    'tour-type': string[]
  }
  page: number
  total: number
  totalPages: number
  coupons: CouponItem[]
  loading: boolean
  error: string | null
  getFilterValue: (key: keyof CouponTaxonomies) => CouponFilterValue
  setFilterValue: (key: keyof CouponTaxonomies, value?: CouponFilterValue) => void
  setFilterValues: (next: CouponFilterState) => void
  resetFilters: () => void
  setPage: (page: number) => void
}

export function useCouponFilters({
  locale,
  initialData,
  initialTotalPages,
  initialTotal,
}: UseCouponFiltersOptions): UseCouponFiltersReturn {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getFilterValue = (key: keyof CouponTaxonomies): CouponFilterValue => {
    const value = searchParams.get(key)
    if (!value) return MULTI_SELECT_KEYS.includes(key) ? [] : ''
    return MULTI_SELECT_KEYS.includes(key) ? value.split(',') : value
  }

  const page = useMemo(() => {
    const current = Number(searchParams.get('paged')) || 1
    return Math.max(1, current)
  }, [searchParams])

  const filters = useMemo(() => {
    return {
      locations: (getFilterValue('locations') as string) || '',
      'tour-type': (getFilterValue('tour-type') as string[]) || [],
    }
  }, [searchParams])

  const buildQueryString = (nextFilters: CouponFilterState, nextPage?: number) => {
    const params = new URLSearchParams()

    Object.entries(nextFilters)
      .filter(([_, v]) => v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0))
      .forEach(([k, v]) => {
        if (Array.isArray(v)) {
          params.set(k, v.join(','))
          return
        }
        params.set(k, v)
      })

    if (nextPage && nextPage > 1) {
      params.set('paged', nextPage.toString())
    }

    return params.toString()
  }

  const setFilterValues = (next: CouponFilterState) => {
    const query = buildQueryString(next, 1)
    router.replace(query ? `?${query}` : '?', { scroll: false })
  }

  const setFilterValue = (key: keyof CouponTaxonomies, value?: CouponFilterValue) => {
    const next: CouponFilterState = {
      locations: (filters.locations || '') as CouponFilterValue,
      'tour-type': (filters['tour-type'] || []) as CouponFilterValue,
    }

    if (value === undefined || (Array.isArray(value) && value.length === 0) || value === '') {
      delete next[key]
    } else {
      next[key] = value
    }

    setFilterValues(next)
  }

  const resetFilters = () => {
    if(filters.locations === '' && filters['tour-type'].length === 0) return
    router.replace('?', { scroll: false })
  }

  const setPage = (nextPage: number) => {
    const normalized = Math.max(1, nextPage)
    const nextFilters: CouponFilterState = {
      locations: (filters.locations || '') as CouponFilterValue,
      'tour-type': (filters['tour-type'] || []) as CouponFilterValue,
    }
    const query = buildQueryString(nextFilters, normalized)
    router.replace(query ? `?${query}` : '?', { scroll: false })
  }

  const [coupons, setCoupons] = useState<CouponItem[]>(initialData ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(() => {
    return typeof initialTotalPages === 'number' && initialTotalPages > 0 ? initialTotalPages : 1
  })
  const [total, setTotal] = useState(() => {
    return typeof initialTotal === 'number' && initialTotal >= 0 ? initialTotal : 0
  })

  const hasActiveFilters = !!filters.locations || filters['tour-type'].length > 0
  const didInitRef = useRef(false)

  useEffect(() => {
    const shouldUseInitial = !hasActiveFilters && page === 1 && (initialData?.length ?? 0) > 0
    if (!didInitRef.current) {
      didInitRef.current = true
      if (shouldUseInitial) return
    }

    const fetchCoupons = async () => {
      setLoading(true)
      setError(null)

      const query = new URLSearchParams()
      query.set('lang', locale || 'en')
      query.set('acf', 'true')
      query.set('tax', 'locations,tour-type')
      query.set('limit', '9')

      if (filters.locations) query.set('locations', filters.locations)
      if (filters['tour-type'].length > 0) query.set('tour-type', filters['tour-type'].join(','))
      if (page > 1) query.set('paged', page.toString())

      try {
        const json: CouponResponse = await fetchData({
          api: `${endpoints.promotion.coupon}?${query.toString()}`,
        })

        setCoupons(json?.data ?? [])
        setTotalPages(json?.totalPages || 1)
        setTotal(json?.total || 0)
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e)
        setError(message)
        setCoupons([])
        setTotalPages(1)
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }

    fetchCoupons()
  }, [filters, page, locale])

  return {
    filters,
    page,
    total,
    totalPages,
    coupons,
    loading,
    error,
    getFilterValue,
    setFilterValue,
    setFilterValues,
    resetFilters,
    setPage,
  }
}
