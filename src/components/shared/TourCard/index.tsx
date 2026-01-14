import ICLocation from '@/components/icons/ICLocation'
import ICLocation2 from '@/components/icons/ICLocation2'
import NavigateButton from '@/components/shared/NavigateButton'
import { cn } from '@/lib/utils'
import { ITerm } from '@/interface/taxonomy.interface'
import { WPImage } from '@/types/acf-wordpress.type'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

type TourCardSize = 'small' | 'medium' | 'large'

interface TourCardProps {
  tourType: string
  tourName: string
  tourLocation: string
  tourPrice: number
  tourThumbnail: WPImage
  tourSlug: string
  type?: 'tour' | 'hotel'
  size?: TourCardSize
  classNameCard?: string
  tourDuration?: ITerm[]
}

export default function TourCard({
  tourType,
  tourName,
  tourLocation,
  tourPrice,
  tourThumbnail,
  tourSlug,
  type = 'tour',
  size = 'medium',
  classNameCard,
  tourDuration,
}: TourCardProps) {
  const locale = useLocale()
  const tourListLink = locale === 'vi' ? '/danh-sach-tour' : '/tours'

  const tourCardSizeClassNames: Record<TourCardSize, string> = {
    small: 'h-90.75',
    medium: 'h-110.75',
    large: 'h-110.75',
  }

  return (
    <Link
      href={`${type === 'tour' ? tourListLink : 'hotels'}/${tourSlug}`}
      className={cn(
        'group xsm:rounded-[0.4085rem] relative inline-block overflow-hidden rounded-[0.5rem]',
        tourCardSizeClassNames[size],
        classNameCard,
      )}
    >
      <article className='relative h-full w-full rounded-[inherit]'>
        {tourThumbnail && (
          <Image
            alt=''
            width={305}
            height={450}
            src={tourThumbnail.url}
            className='pointer-events-none size-full rounded-[inherit] object-cover select-none lg:transition-all lg:duration-500 lg:ease-[cubic-bezier(0.65,0.01,0.28,0.98)] lg:group-hover:scale-110'
          />
        )}

        {tourType && (
          <p className='flex-center xsm:top-2 xsm:left-[0.6125rem] xsm:rounded-tl-[0.61275rem] xsm:rounded-br-[0.61275rem] absolute top-2.5 left-3 z-1 h-6.25 rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] px-[0.88331rem]'>
            <span className='font-phu-du xsm:text-[0.63775rem] xsm:tracking-[-0.01275rem] text-[0.75rem] leading-none font-medium tracking-[-0.015rem] text-white'>
              {tourType}
            </span>
          </p>
        )}

        <div className='xsm:px-[0.6125rem] xsm:pb-4 xsm:pt-[2.55rem] absolute right-0 bottom-0 left-0 bg-[linear-gradient(180deg,rgba(6,42,25,0.00)_0%,rgba(6,42,25,0.58)_24.91%,#062A19_100%)] px-3 pt-12.5 pb-4.75'>
          {/* tour duration */}
          <div className='xsm:gap-[0.42031rem] xsm:mb-[0.61275rem] flex w-full flex-wrap items-center gap-[0.375rem] mb-[0.75rem]'>
            {Array.isArray(tourDuration) &&
              tourDuration.map((duration, i) => (
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

          <div className='xsm:mb-3 mb-3.25'>
            <h3 className='font-phu-du xsm:text-[1rem] xsm:leading-none line-clamp-2 text-[1.125rem] leading-[1.1] font-medium text-white'>
              {tourName}
            </h3>
          </div>

          <div className='xsm:space-x-5 flex items-end justify-between space-x-[1.8rem]'>
            <div className='flex h-9 flex-1 shrink-0 items-start justify-between border-t-[0.0625rem] border-solid border-white/8 pt-3'>
              <p className='xsm:space-[0.2rem] flex items-center space-x-2'>
                <ICLocation className='xsm:size-2.5 size-3 shrink-0' />
                <span className='xsm:text-[0.75rem] xsm:tracking-[-0.0075rem] xsm:leading-[1.6] font-montserrat text-[0.875rem] leading-[1.3] font-semibold tracking-[-0.00875rem] text-white/48'>
                  {tourLocation}
                </span>
              </p>

              <p className='font-phu-du xsm:text-[0.875rem] text-[1rem] leading-[1.3] font-medium text-[#FFC542] uppercase'>
                {tourPrice} USD
              </p>
            </div>

            <NavigateButton variant='right' />
          </div>
        </div>
      </article>
    </Link>
  )
}
