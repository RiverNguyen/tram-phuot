import VoucherItem from '@/components/shared/SectionVoucher/VoucherItem'
import { TourCouponItemType } from '@/types/details-tour.type'

interface VoucherListPCProps {
  tourCoupons: TourCouponItemType[]
}

export default function VoucherListMB({ tourCoupons }: VoucherListPCProps) {
  return (
    <div className='xsm:flex hidden_scroll hidden space-x-4 overflow-x-auto pt-5 pb-4'>
      {tourCoupons?.map((item, index) => (
        <div
          key={index}
          className='h-[8.94919rem] w-80.25 shrink-0 first:ml-4 last:mr-4'
        >
          <VoucherItem
            couponTitle={item?.title}
            couponType={item?.type}
            couponApplyStartDate={item?.time_goes?.start}
            couponCode={item?.code}
            couponLocation={item?.locations?.[0]?.name}
            couponDiscountPercent={item?.percent_sale}
            couponDiscountPrice={item?.price_discount}
            couponForWhom={item?.for_whom}
            couponMinPrice={item?.minimum_total_price}
            classNameCard='xsm:size-full '
          />
        </div>
      ))}
    </div>
  )
}
