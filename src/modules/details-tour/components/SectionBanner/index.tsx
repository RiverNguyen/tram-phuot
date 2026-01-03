import ICCompass from '@/components/icons/ICCompass'
import { Breadcrumb } from '@/components/shared'
import ICAccommodation from '@/modules/details-tour/icons/ICAccommodation'
import ICCalendar from '@/modules/details-tour/icons/ICCalendar'
import ICMap from '@/modules/details-tour/icons/ICMap'
import ICSeparator from '@/modules/details-tour/icons/ICSeparator'
import ICTransport from '@/modules/details-tour/icons/ICTransport'
import { WPTaxonomy } from '@/types/acf-wordpress.type'
import { DetailsTourBannerType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface SectionBannerProps {
  title: string
  banner: DetailsTourBannerType
  pricePerPax: string
  tourDuration: WPTaxonomy
  transport: string
  accommodation: string
  pickupAndDropoff: string
}

export default function SectionBanner({
  title,
  banner,
  pricePerPax,
  tourDuration,
  transport,
  accommodation,
  pickupAndDropoff,
}: SectionBannerProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  const breadcrumbItems = [
    { label: translateDetailsTourPage('breadcrumbHome'), href: '/' },
    { label: translateDetailsTourPage('breadcrumbTourList'), href: '/danh-sach-tour' },
    { label: title, href: '' },
  ]
  const metaInfoList = [
    {
      icon: <ICCalendar className='size-7' />,
      label: translateDetailsTourPage('metaTourDuration'),
      value: tourDuration?.name || '',
    },
    {
      icon: <ICMap className='size-7' />,
      label: translateDetailsTourPage('metaPickupAndDropoff'),
      value: pickupAndDropoff || '',
    },
    {
      icon: <ICTransport className='size-7' />,
      label: translateDetailsTourPage('metaTransport'),
      value: transport || '',
    },
    {
      icon: <ICAccommodation className='size-7' />,
      label: translateDetailsTourPage('metaAccommodation'),
      value: accommodation || '',
    },
  ]
  return (
    <section className='xsm:h-124.75 relative h-160 overflow-hidden 2xl:h-screen'>
      <div className='xsm:bottom-14 xsm:px-4 absolute right-0 bottom-23.5 left-0 z-5 mx-auto flex max-w-350 items-end justify-between'>
        <div className='xsm:w-full w-151.5 shrink-0'>
          <Breadcrumb
            breadcrumbItems={breadcrumbItems}
            classNameBreadcrumbList='mb-8 xsm:mb-4.5'
          />
          <h1 className='font-phu-du xsm:text-[0_2.661px_2.661px_rgba(0,0,0,0.50)] xsm:mb-[0.7125rem] xsm:text-[1.5rem] mb-5 text-[2.125rem] leading-[1.1] font-medium text-white text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)]'>
            {title || ''}
          </h1>
          <div className='xsm:space-x-2.5 flex items-center space-x-4'>
            <p className='xsm:space-x-[0.57rem] flex items-center space-x-4'>
              <ICCompass className='xsm:size-[0.90106rem] xsm:mt-[0.2rem] mt-1.5 size-[1.59194rem] text-[#FFC542]' />
              <span className='xsm:space-x-[0.28rem] flex items-center space-x-2'>
                <span className='font-phu-du xsm:text-[1.25rem] text-[2.5rem] leading-12 font-medium text-[#FFC542]'>
                  {pricePerPax || '0'}$ USD
                </span>
                <span className='font-montserrat xsm:text-[0.75rem] inline-block text-[1rem] leading-6 text-white'>
                  /{translateDetailsTourPage('textPerson')}
                </span>
              </span>
            </p>
            <ICSeparator className='text-[#FFC542]' />
            <p className='font-montserrat xsm:text-[0.75rem] text-[1rem] leading-normal text-white'>
              {tourDuration?.name || ''}
            </p>
          </div>
        </div>
        <div className='font-montserrat xsm:hidden w-172.5 shrink-0'>
          <ul className='w-full space-y-3 rounded-[0.75rem] border border-solid border-white/25 bg-black/20 p-5 backdrop-blur-[2px]'>
            {metaInfoList?.map((item, index) => {
              return (
                <li
                  key={index}
                  className='flex items-center space-x-2'
                >
                  <span className='shrink-0'>{item?.icon}</span>
                  <span className='shrink-0 text-[1rem] leading-normal text-[#FFC542]'>
                    {item?.label}
                  </span>
                  <span className='text-[1rem] leading-normal tracking-[-0.0125rem] text-white/90'>
                    {item?.value}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='xsm:hidden pointer-events-none absolute right-0 bottom-0 left-0 z-1 h-126.75 bg-[linear-gradient(180deg,rgba(2,3,5,0.00)_0%,#000_89.18%)] opacity-68 backdrop-blur-[2px]'></div>
      <div className='xsm:hidden pointer-events-none absolute right-0 bottom-0 left-0 z-1 h-67 bg-[linear-gradient(180deg,rgba(2,3,5,0.00)_0%,#000_89.18%)] opacity-68 backdrop-blur-[2px]'></div>
      <div className='xsm:block pointer-events-none absolute bottom-0 left-0 z-1 hidden h-173 w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)] opacity-68 backdrop-blur-[2px]'></div>
      <div className='xsm:hidden absolute top-0 left-0 block size-full'>
        {banner?.background_pc && (
          <Image
            height={640}
            width={1600}
            loading='eager'
            src={banner?.background_pc?.url}
            alt={banner?.background_pc?.alt || ''}
            className='size-full object-cover'
          />
        )}
      </div>
      <div className='xsm:block absolute top-0 left-0 hidden size-full'>
        {banner?.background_mobile && (
          <Image
            width={375}
            height={500}
            loading='eager'
            src={banner?.background_mobile?.url}
            alt={banner?.background_mobile?.alt || ''}
            className='size-full object-cover'
          />
        )}
      </div>
      <div className='xsm:hidden pointer-events-none absolute right-0 bottom-[-2px] left-0 z-10 block'>
        <Image
          alt=''
          width={1600}
          height={50}
          quality={100}
          unoptimized={true}
          src='/details-tour/image-decor-bottom.webp'
          className='h-auto w-full'
        />
      </div>
      <div className='xsm:block pointer-events-none absolute right-0 bottom-[-2px] left-0 z-10 hidden'>
        <Image
          alt=''
          width={375}
          height={30}
          quality={100}
          unoptimized={true}
          src='/details-tour/image-decor-bottom-mobile.webp'
          className='h-auto w-full'
        />
      </div>
    </section>
  )
}
