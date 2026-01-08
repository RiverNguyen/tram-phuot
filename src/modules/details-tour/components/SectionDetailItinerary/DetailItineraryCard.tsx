import ICDetailItinerary from '@/modules/details-tour/icons/ICDetailItinerary'
import { DetailsTourItineraryListItemType } from '@/types/details-tour.type'

interface DetailItineraryCardProps {
  data: DetailsTourItineraryListItemType
}

export default function DetailItineraryCard({ data }: DetailItineraryCardProps) {
  return (
    <article className='relative w-full space-y-3.5'>
      <h3 className='font-phu-du xsm:flex xsm:leading-[1.3] space-x-2 text-[1rem] leading-[1.1] font-bold uppercase'>
        <ICDetailItinerary className='xsm:hidden inline-block h-[1.406rem] w-6' />
        <span className='xsm:shrink-0 text-[#074B25]'>{data?.title || ''}</span>
        <span className='xsm:shrink-0 text-[#2E2E2E]'>-</span>
        <span className='text-[#2E2E2E]'>{data?.location || ''}</span>
      </h3>

      <div className='font-montserrat w-full space-y-5 rounded-[1rem] bg-[rgba(242,242,242,0.60)] p-4'>
        <div
          dangerouslySetInnerHTML={{ __html: data?.content || '' }}
          className='text-body/75 [&_strong]:text-body-t1 xsm:[&_strong]:text-[0.875rem] xsm:text-[0.75rem] xsm:[&_strong]:leading-normal xsm:[&_strong]:tracking-normal space-y-3 text-[0.875rem] leading-normal [&_li]:ml-8 [&_ol]:list-decimal [&_ul]:list-disc'
        ></div>
        <ul className='space-y-2.5'>
          {Array.isArray(data?.service) &&
            data?.service?.map((item, index) => {
              return (
                <li
                  key={index}
                  className='text-body-t1 text-[0.875rem] leading-normal font-bold'
                >
                  {item?.service_item || ''}
                </li>
              )
            })}
        </ul>
      </div>
    </article>
  )
}
