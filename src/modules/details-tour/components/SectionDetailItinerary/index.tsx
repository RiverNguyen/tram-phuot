import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DetailItineraryCard from '@/modules/details-tour/components/SectionDetailItinerary/DetailItineraryCard'
import { DetailsTourDetailItineraryType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'

import TabListPC from '@/modules/details-tour/components/SectionDetailItinerary/TabListPC'
import TabListMb from '@/modules/details-tour/components/SectionDetailItinerary/TabListMb'
interface SectionDetailItineraryProps {
  detailItinerary: DetailsTourDetailItineraryType
}

export default function SectionDetailItinerary({ detailItinerary }: SectionDetailItineraryProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  if (
    !Array.isArray(detailItinerary?.itinerary_list) ||
    detailItinerary?.itinerary_list?.length === 0
  )
    return null

  const normalizedDetailItinerary = detailItinerary?.itinerary_list?.map((item, index) => {
    return {
      value: `detail-itinerary-${index}`,
      ...item,
    }
  })

  return (
    <section
      id='section-detail-itinerary'
      className='xsm:px-4 relative w-full'
    >
      <div className='section-box xsm:py-4 xsm:shadow-none xsm:px-3 xsm:rounded-[0.75rem] xsm:space-y-4 space-y-5 rounded-[2.25rem] p-8'>
        <h2 className='xsm:text-[1.25rem] xsm:w-full font-phu-du section-title-h2 xsm:pb-[0.725rem] xsm:border-b xsm:border-solid xsm:border-[#EDEDED] w-fit pr-2 pb-1 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
          {translateDetailsTourPage('sectionDetailItineraryTitle')}
        </h2>
        <Tabs
          defaultValue={normalizedDetailItinerary?.[0]?.value}
          className='xsm:space-y-7.5 w-full gap-0 space-y-6.5'
        >
          <div>
            <TabListPC items={normalizedDetailItinerary} />
            <TabListMb items={normalizedDetailItinerary} />
          </div>
          <div className='w-full'>
            {normalizedDetailItinerary?.map((item, index) => {
              return (
                <TabsContent
                  key={index}
                  value={item.value}
                >
                  <DetailItineraryCard data={item} />
                </TabsContent>
              )
            })}
          </div>
        </Tabs>
      </div>
    </section>
  )
}
