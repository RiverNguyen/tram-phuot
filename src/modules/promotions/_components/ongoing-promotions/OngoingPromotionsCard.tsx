import { CouponItem } from '@/types/coupon.type'
import Link from 'next/link'
import Image from 'next/image'

export default function OngoingPromotionsCard({ card }: { card: CouponItem }) {
  return (
    <Link
      href={card?.slug}
      className='xsm:gap-[0.875rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] relative flex flex-col justify-start items-center gap-[1.125rem] w-full h-full'
    >
      <Image
        src={card?.thumbnail?.url}
        alt={card?.title}
        width={1360}
        height={813}
        className='xsm:h-[13.4375rem] xsm:rounded-b-none w-full h-[16.9375rem] rounded-[1rem] object-cover'
      />
      <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
          <div className='flex items-center gap-[0.625rem] self-stretch'>
            <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] text-[#F56E0A] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
              {card?.taxonomies?.['tour-type'][0].name}
            </span>
            <span className='size-[0.25rem] rounded-full bg-[#3B3943]'></span>
            <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] text-[rgba(46,46,46,0.60)] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
              {card?.taxonomies?.locations[0].name}
            </span>
          </div>
          <h3 className='xsm:text-[1.125rem] xsm:leading-[1.2375rem] xsm:tracking-normal text-[#1F4D37] font-phu-du text-[1.75rem] font-medium leading-[2.0625rem] tracking-[-0.03125rem]'>
            {card?.title}
          </h3>
        </div>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem]'>
          <div className='xsm:text-[0.875rem] xsm:leading-[1.3125rem] xsm:tracking-normal flex items-start gap-[0.5rem] text-[#2E2E2E] font-montserrat text-[1rem] font-medium leading-[1.5rem] tracking-[-0.01563rem] opacity-[0.48]'>
            <span className='shrink-0'>Promotion code:</span>
            <span className='min-w-0 break-all'>{card.acf.code}</span>
          </div>
          <div className='flex flex-wrap items-start gap-[0.5rem]'>
            {card?.taxonomies?.['tour-type']?.map((tag) => (
              <div
                key={tag.id}
                className='h-[1.5rem] flex p-[0.5rem] items-center justify-center gap-[0.3125rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.40)] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem] opacity-[0.8]'
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
