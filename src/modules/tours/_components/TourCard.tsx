'use client'
import ICChevronright from '@/components/icons/ICChevronright'
import ICLocation from '@/components/icons/ICLocation'
import { Link } from '@/i18n/navigation'
import { ITour } from '@/interface/tour.interface'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function TourCard({ tour, className }: { tour: ITour; className?: string }) {
  const { locale } = useParams()

  const href = locale === 'en' ? `/tours/${tour.slug}` : `/danh-sach-tour/${tour.slug}`

  return (
    <Link
      href={href}
      className={cn(
        'xsm:h-[31.03531rem] xsm:rounded-[0.56044rem] group relative block h-[22.6875rem] w-full overflow-hidden rounded-[0.5rem] bg-[#FFFCE3]',
        className,
      )}
    >
      {/* background */}
      <Image
        src={tour?.thumbnail.url}
        alt='tour card'
        fill
        className='object-cover transition-all duration-500 ease-[cubic-bezier(0.65,0.01,0.28,0.98)] lg:group-hover:scale-107'
      />
      {/* Tour Type */}
      {Array.isArray(tour?.taxonomies['tour-type']) && tour.taxonomies['tour-type'].length > 0 && (
        <div className='xsm:px-[0.84069rem] xsm:py-[0.70056rem] absolute top-0 left-0 inline-flex w-full px-[0.75rem] py-[0.625rem]'>
          <div className='xsm:h-[1.75144rem] xsm:px-[0.99013rem] xsm:rounded-tl-[0.84069rem] xsm:rounded-br-[0.84069rem] flex h-[1.5625rem] items-center justify-center rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] px-[0.88331rem]'>
            <span className='xsm:text-[0.625rem] xsm:leading-[1.75rem] xsm:tracking-[-0.0175rem] font-phu-du line-clamp-1 text-[0.75rem] leading-[1.5rem] font-medium tracking-[-0.015rem] text-white'>
              {tour?.taxonomies['tour-type'][0].name}
            </span>
          </div>
        </div>
      )}
      {/* content */}
      <div className='xsm:min-h-auto xsm:pt-[3.50288rem] xsm:px-[0.84069rem] xsm:pb-[1rem] xsm:items-center absolute bottom-0 left-0 flex min-h-[12.375rem] w-full items-end justify-between bg-[linear-gradient(180deg,rgba(6,42,25,0.00)_0%,rgba(6,42,25,0.58)_24.91%,#062A19_100%)] px-[0.75rem] pt-[3.125rem] pb-[1.1875rem]'>
        <div className='xsm:gap-[0.91075rem] flex h-full w-full flex-col items-start gap-[0.8125rem]'>
          {/* content top */}
          <div className='xsm:gap-[0.84069rem] flex flex-col justify-center gap-[0.75rem] self-stretch'>
            {/* tour duration */}
            <div className='xsm:gap-[0.42031rem] flex w-full flex-wrap items-center gap-[0.375rem]'>
              {Array.isArray(tour?.taxonomies['tour-duration']) &&
                tour?.taxonomies['tour-duration'].map((duration, i) => (
                  <div
                    key={i}
                    className='xsm:h-[1.2rem] flex h-[1.375rem] items-center justify-center rounded-[6.25rem] bg-[rgba(255,255,255,0.08)] p-[0.3125rem_0.375rem_0.3125rem_0.4375rem]'
                  >
                    <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.75rem] leading-[1.2rem] font-medium tracking-[-0.0075rem] text-white opacity-[0.8]'>
                      {duration?.name}
                    </span>
                  </div>
                ))}
            </div>
            {/* title */}
            <h3 className='xsm:text-[1rem] xsm:leading-[1.25rem] xsm:tracking-normal font-phu-du line-clamp-2 text-[1rem] leading-[1.3rem] font-medium text-white uppercase'>
              {tour?.title}
            </h3>
          </div>

          {/* content bottom */}
          <div className='xsm:justify-between xsm:items-end flex h-full w-full items-center gap-[0.625rem]'>
            <div className='xsm:gap-[0.5rem] xsm:shrink-0 flex flex-1 flex-col items-start gap-[0.9375rem]'>
              {/* line */}
              <div className='xsm:h-[0.07006rem] h-[0.0625rem] w-full bg-[rgba(255,255,255,0.1)]' />
              <div className='flex w-full items-center justify-between'>
                <div className='xsm:gap-[0.28025rem] flex items-center gap-[0.25rem]'>
                  <ICLocation className='xsm:size-[0.84069rem] size-[0.75rem]' />
                  <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.01rem] font-montserrat text-[0.875rem] leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-white opacity-[0.48]'>
                    {Array.isArray(tour?.taxonomies?.locations)
                      ? tour?.taxonomies?.locations[0]?.name
                      : ''}
                  </span>
                </div>
                <p className='xsm:leading-[1.1375rem] font-phu-du leading-[1.3rem] font-medium uppercase'>
                  <span className='xsm:text-[0.875rem] xsm:leading-[1.1375rem] text-[1rem] text-[#FFC542]'>
                    {tour?.acf?.price_person} USD
                  </span>
                  <span className='xsm:hidden text-[1rem] text-[#FFC542]'>/</span>
                  <span className='xsm:hidden text-[0.75rem] text-[rgba(255,255,255,0.80)]'>
                    {locale === 'en' ? 'person' : 'người'}
                  </span>
                </p>
              </div>
            </div>
            <div className='xsm:size-[2rem] xsm:py-[0.91188rem] xsm:shrink-0 xsm:rounded-[0.684rem] flex size-[2.25rem] items-center justify-center rounded-[0.5625rem] bg-[#F56E0A] py-[0.75rem]'>
              <ICChevronright className='xsm:w-[0.684rem] xsm:h-[0.91194rem] h-[0.75rem] w-[0.5625rem]' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
