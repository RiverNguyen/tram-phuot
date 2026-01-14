import { ICoupon } from '@/interface/coupon.interface'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function OngoingPromotionsCard({ card }: { card: ICoupon }) {
  if (card?.acf?.private) return null
  const t = useTranslations('ListCouponPage')

  return (
    <div className='xsm:gap-[0.875rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] relative flex h-full w-full flex-col items-center justify-start gap-[1.125rem]'>
      <Image
        src={card?.thumbnail?.url || '/default.webp'}
        alt={card?.title}
        width={1360}
        height={813}
        className='xsm:h-[13.4375rem] xsm:rounded-b-none h-[16.9375rem] w-full rounded-[1rem] object-cover'
      />
      <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
          {card?.taxonomies?.['tour-type']?.[0]?.name && card?.taxonomies?.locations?.[0]?.name ? (
            <div className='flex items-center gap-[0.625rem] self-stretch'>
              <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.875rem] leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-[#F56E0A]'>
                {card?.taxonomies?.['tour-type']?.[0]?.name}
              </span>
              {card?.taxonomies?.['tour-type']?.[0]?.name &&
                card?.taxonomies?.locations?.length > 0 && (
                  <span className='size-[0.25rem] rounded-full bg-[#3B3943]'></span>
                )}
              <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.875rem] leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-[rgba(46,46,46,0.60)]'>
                {card?.taxonomies?.locations?.[0]?.name}
                {/* {card?.taxonomies?.locations?.map((location) => location.name).join(', ')} */}
              </span>
            </div>
          ) : (
            <div className='invisible'>placeholder</div>
          )}
          {card?.title ? (
            <h3 className='xsm:text-[1.125rem] xsm:leading-[1.2375rem] xsm:tracking-normal font-phu-du text-[1.75rem] leading-[2.0625rem] font-medium tracking-[-0.03125rem] text-[#1F4D37]'>
              {card?.title}
            </h3>
          ) : (
            <div className='invisible'>placeholder</div>
          )}
        </div>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem]'>
          {card?.acf?.code ? (
            <div className='xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-normal font-montserrat flex items-start gap-[0.5rem] text-[1rem] leading-[1.5rem] font-medium tracking-[-0.01563rem] text-[#2E2E2E] opacity-[0.48]'>
              <span className='shrink-0'>{t('code')}:</span>
              <span className='min-w-0 break-all'>{card?.acf?.code}</span>
            </div>
          ) : (
            <div className='invisible'>placeholder</div>
          )}
          {card?.taxonomies?.['tour-type']?.length > 0 ? (
            <div className='flex flex-wrap items-start gap-[0.5rem]'>
              {card?.taxonomies?.['tour-type']?.map((tag) => (
                <div
                  key={tag.id}
                  className='font-montserrat flex h-[1.5rem] items-center justify-center gap-[0.3125rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.40)] p-[0.5rem] text-[0.75rem] leading-[1.2rem] font-medium tracking-[-0.0075rem] text-white opacity-[0.8]'
                >
                  {tag.name}
                </div>
              ))}
            </div>
          ) : (
            <div className='invisible'>placeholder</div>
          )}
        </div>
      </div>
    </div>
  )
}
