import VoucherListPC from '@/components/shared/SectionVoucher/VoucherListPC'
import { TourCouponItemType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'

import '@/components/shared/SectionVoucher/style.css'
import { SVGProps } from 'react'
import VoucherListMB from '@/components/shared/SectionVoucher/VoucherListMB'

interface SectionVoucherProps {
  tourCoupons: TourCouponItemType[]
}

export default function SectionVoucher({ tourCoupons }: SectionVoucherProps) {
  const translateComponents = useTranslations('Components')

  if (!Array.isArray(tourCoupons) || !tourCoupons.length) return null

  return (
    <section className='relative w-full'>
      <div className='section-box xsm:rounded-none xsm:bg-transparent xsm:border-none! xsm:shadow-none! relative overflow-hidden rounded-[1.5rem] border border-solid border-[#EDEDED] bg-white pt-8'>
        <div className='bg-orange-gradient xsm:hidden absolute -top-9 -right-16.5 h-25.25 w-36 rounded-[3.15625rem]'>
          <div className='absolute top-11.5 left-6 size-[2.25913rem]'>
            <ICStar className='size-full' />
          </div>
        </div>
        <div className='xsm:px-4 xsm:pb-0 px-8 pb-3'>
          <h2 className='sm:section-title-h2 xsm:text-[1.25rem] xsm:pr-0 xsm:tracking-[0.025rem] xsm:leading-[1.2] xsm:text-body-t1 font-phu-du w-fit pr-2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
            {translateComponents('SectionVoucher.title')}
          </h2>
        </div>
        <div className='relative w-full'>
          <VoucherListPC tourCoupons={tourCoupons} />
          <VoucherListMB tourCoupons={tourCoupons} />
        </div>
      </div>
    </section>
  )
}

function ICStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='37'
      height='37'
      viewBox='0 0 37 37'
      fill='none'
      {...props}
    >
      <path
        d='M20.6786 5.28639L23.3293 10.5879C23.6908 11.3258 24.6547 12.0337 25.468 12.1693L30.2724 12.9675C33.3449 13.4796 34.0678 15.7086 31.8538 17.9075L28.1187 21.6426C27.4861 22.2752 27.1397 23.4951 27.3355 24.3686L28.4049 28.9924C29.2483 32.6522 27.3054 34.0679 24.0673 32.1552L19.5641 29.4894C18.7508 29.0074 17.4104 29.0074 16.582 29.4894L12.0788 32.1552C8.85572 34.0679 6.8978 32.6371 7.74121 28.9924L8.81054 24.3686C9.00633 23.4951 8.65993 22.2752 8.02737 21.6426L4.29225 17.9075C2.09334 15.7086 2.80121 13.4796 5.87365 12.9675L10.6781 12.1693C11.4763 12.0337 12.4402 11.3258 12.8017 10.5879L15.4524 5.28639C16.8983 2.40974 19.2478 2.40974 20.6786 5.28639Z'
        fill='#FFEBB4'
      />
    </svg>
  )
}
