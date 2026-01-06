import VoucherList from '@/components/shared/SectionVoucher/VoucherList'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useTranslations } from 'next-intl'

export default function SectionVoucher() {
  const translateComponents = useTranslations('Components')

  return (
    <section className='relative w-full'>
      <div className='section-box flex flex-col gap-y-6 rounded-[1.5rem] border border-solid border-[#EDEDED] bg-white px-8 pt-8 pb-4'>
        <h2 className='section-title-h2 font-phu-du w-fit pr-2 pb-3 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
          {translateComponents('SectionVoucher.title')}
        </h2>
        <div className='relative w-full'>
          <VoucherList />
        </div>
      </div>
    </section>
  )
}
