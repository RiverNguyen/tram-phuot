'use client'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DetailsTourItineraryListItemType } from '@/types/details-tour.type'
import { convertRemToPx } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/free-mode'

interface NormalizedDetailsTourDetailItineraryType extends DetailsTourItineraryListItemType {
  value: string
}

interface TabListMbProps {
  items: NormalizedDetailsTourDetailItineraryType[]
}

export default function TabListMb({ items }: TabListMbProps) {
  return (
    <TabsList className='hidden_scroll xsm:flex hidden h-auto w-full justify-start space-x-1.5 overflow-x-auto rounded-[2.75rem] bg-transparent p-0'>
      {items?.map((item, index) => {
        return (
          <TabsTrigger
            key={index}
            value={item.value}
            className='font-phu-du xsm:min-w-[4.70225rem] xsm:bg-black/20 xsm:h-[1.6285rem] xsm:text-[0.75rem] xsm:tracking-[0.03rem] xsm:text-black flex h-8.5 min-w-25 flex-[unset] cursor-pointer items-center justify-center rounded-[2.75rem] border-none! bg-black/10 px-6 py-0 text-[0.875rem] leading-[1.6] font-bold tracking-[0.035rem] text-[#2E2E2E] uppercase shadow-none! ring-0! outline-0! data-[state=active]:bg-[#FFC542]'
          >
            {item.title}
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
