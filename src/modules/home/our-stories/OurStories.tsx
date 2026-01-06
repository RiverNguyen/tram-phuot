'use client'

import { BrandButton } from '@/components/shared'
import BrandTitle from '@/components/shared/BrandTitle'
import { IHomePage, IOurStoriesData, ITaxonomies } from '@/interface/homepage.interface'
import { fetcherCMS } from '@/lib/swr'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import type { Swiper as SwiperType } from 'swiper'
import TabButtons from './_components/TabButtons'
import StoriesSwiper from './_components/StoriesSwiper'

export default function OurStories({
  data,
  blogs,
  taxonomies,
}: {
  data: IHomePage['our_stories']
  blogs: IOurStoriesData[]
  taxonomies: ITaxonomies[]
}) {
  const kindTerms = taxonomies?.[1]?.terms || []
  const defaultTab = kindTerms[0]?.slug || 'stay_points'
  const [activeTab, setActiveTab] = useState<string>(defaultTab)
  const locale = useLocale()
  const swiperRef = useRef<SwiperType | null>(null)

  const query = `/wp-json/api/v1/get-all/post?lang=${locale}&tax=kind&kind=${activeTab}&limit=8&order=DESC&orderby=date`

  const { data: storiesData, isLoading } = useSWR(query, fetcherCMS, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })

  // Reset Swiper to first slide when tab changes
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0)
    }
  }, [activeTab])

  return (
    <div className='xsm:pt-[13.88rem] xsm:pb-[7.5rem] relative w-full h-full pt-[8.48rem] pb-[4.58rem]'>
      <div className='xsm:gap-[1.5rem] relative w-full max-w-[87.5rem] mx-auto h-full flex flex-col gap-[1.64rem]'>
        <div className='xsm:left-0 xsm:top-[-10.13rem] absolute left-[-3.19rem] top-[-9.71rem]'>
          <BrandTitle
            title={data?.text_decor}
            subtitle={data?.title}
            variant='green'
            classNameSubtitle='xsm:top-[2.6275rem] xsm:left-[2.06rem] xsm:w-[7.75rem] left-[4.54rem]'
          />
        </div>

        {/* tab buttons */}
        <TabButtons
          kindTerms={kindTerms}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* stories list */}
        <div className='w-full pb-[3.3125rem] xsm:pb-0'>
          <StoriesSwiper
            isLoading={isLoading}
            storiesData={storiesData?.data}
            blogs={blogs}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          />
        </div>

        <div className='xsm:px-[1rem] w-full flex items-center gap-[1.625rem]'>
          <div className='xsm:hidden flex-1 h-[0.0625rem] bg-[#FFC542]' />
          <Link
            href={data?.button?.url || ''}
            className='xsm:w-full'
          >
            <BrandButton
              variant='blueGradient'
              classNameButtonContainer='xsm:w-full'
            >
              {data?.button?.title}
            </BrandButton>
          </Link>
          <div className='xsm:hidden flex-1 h-[0.0625rem] bg-[#FFC542]' />
        </div>
      </div>
    </div>
  )
}
