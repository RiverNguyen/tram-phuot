import { cn } from '@/lib/utils'
import GalleryImage from '@/modules/details-tour/components/SectionOverview/GalleryImage'
import { DetailsTourOverviewType } from '@/types/details-tour.type'
import Image from 'next/image'
import OverviewVideo from '@/modules/details-tour/components/SectionOverview/OverviewVideo'
import { SiteSettingsResType } from '@/types/wordpress.type'
import { useTranslations } from 'next-intl'
import '@/modules/details-tour/components/SectionOverview/style.css'

type OverviewServiceType = 'included' | 'excluded'

interface OverviewServiceItemType {
  title: string
  description: string
  type: OverviewServiceType
}
interface SectionOverviewProps {
  overview: DetailsTourOverviewType
  siteSettings: SiteSettingsResType
}

export default function SectionOverview({ overview, siteSettings }: SectionOverviewProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  const OVERVIEW_SERVICE: OverviewServiceItemType[] = [
    {
      title: translateDetailsTourPage('sectionOverviewIncludedTitle'),
      description: overview?.service?.included_service || '',
      type: 'included',
    },
    {
      title: translateDetailsTourPage('sectionOverviewExcludedTitle'),
      description: overview?.service?.excluded_service || '',
      type: 'excluded',
    },
  ]

  return (
    <section
      id='section-overview'
      className='xsm:px-4 relative'
    >
      <div className='section-box xsm:shadow-none xsm:space-y-4 xsm:py-4 xsm:px-3 xsm:rounded-[0.75rem] relative w-full space-y-6 rounded-[1.5rem] p-8'>
        <div className='space-y-4'>
          <h2 className='xsm:border-[#EDEDED] xsm:w-full xsm:text-[1.25rem] xsm:pb-[0.725rem] xsm:border-b xsm:border-solid font-phu-du section-title-h2 w-fit pr-2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem]'>
            {translateDetailsTourPage('sectionOverviewTitle')}
          </h2>
          <p className='font-montserrat xsm:text-[0.75rem] text-body/75 text-[1rem] leading-normal'>
            {overview?.description || ''}
          </p>
        </div>

        <div className='xsm:block xsm:h-auto xsm:space-x-0 xsm:space-y-2 flex h-129.5 space-x-3'>
          <div className='xsm:w-full xsm:h-[35.25rem] h-full w-73 shrink-0'>
            <OverviewVideo
              overviewVideo={overview?.video || {}}
              siteSettings={siteSettings}
            />
          </div>
          <div className='xsm:w-full xsm:h-auto xsm:justify-baseline xsm:space-y-2 flex h-full w-124.75 shrink-0 flex-col justify-between'>
            <div className='xsm:h-[12.14806rem] h-76.25 w-full'>
              <GalleryImage
                imageList={overview?.album_image?.image_list || []}
                previewImage={overview?.album_image?.preview_image || {}}
              />
            </div>
            <div className='xsm:h-[8.0058rem] xsm:space-x-2 flex h-50.25 w-full justify-between space-x-3'>
              {Array.isArray(overview?.decor_image) &&
                overview?.decor_image?.map((item, index) => (
                  <div
                    key={index}
                    className='xsm:max-w-[9.6985rem] max-w-[15.2187rem] flex-1 shrink-0'
                  >
                    <Image
                      alt={item?.url || ''}
                      width={245}
                      height={200}
                      src={item?.url}
                      className='xsm:rounded-[0.63725rem] size-full rounded-[1rem] object-cover'
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className='xsm:space-y-4 space-y-3.5'>
          {OVERVIEW_SERVICE.map(({ title, description, type }, index) => (
            <article
              key={index}
              className={cn(
                'xsm:p-4 xsm:rounded-[0.75rem] relative space-y-3 rounded-[1rem] p-5',
                type === 'included' && 'bg-[#F1F8F6]',
                type === 'excluded' && 'bg-[#FFF8F2]',
              )}
            >
              <h3 className='text-body-t1 xsm:text-[1rem] xsm:leading-normal xsm:pb-3 xsm:border-b xsm:border-solid xsm:border-[#EDEDED] font-phu-du text-[1.5rem] leading-[1.3] font-bold tracking-[0.01875rem]'>
                {title}
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className={cn(
                  'font-montserrat text-body/75 overview-service xsm:text-[0.75rem] xsm:font-medium xsm:leading-[1.6] xsm:tracking-[-0.0075rem] text-[1rem] leading-normal',
                  type === 'included' && 'overview-service--included',
                  type === 'excluded' && 'overview-service--excluded',
                )}
              ></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
