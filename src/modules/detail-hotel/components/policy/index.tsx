import { IHotelDetail } from '@/interface/hotel.interface'
import { useTranslations } from 'next-intl'

const Policy = ({ policy }: { policy: IHotelDetail['acf']['policy'] }) => {
  const t = useTranslations('DetailHotelPage')
  return (
    <section className='bg-white rounded-[0.5rem] mt-8 p-8 xsm:bg-transparent xsm:px-4 xsm:pb-8 xsm:pt-3 xsm:mt-0 xsm:rounded-none xsm:border-black/10 xsm:border-b'>
      <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit mb-8 xsm:text-[1.125rem] xsm:mb-5'>
        {t('textPolicy')}
      </h3>
      <article
        className='[&_ul]:list-disc xsm:text-[0.875rem] xsm:[&_strong]:text-base [&_hr]:my-[1.125rem] [&_hr]:h-[0.0625rem] [&_hr]:bg-[#EDEDED] [&_ul]:list-inside [&_ul_li::marker]:text-orange-500 text-body-t1/75 leading-[1.5] [&_strong]:font-phu-du [&_strong]:font-bold [&_strong]:leading-[1.1] [&_strong]:text-[#2E2E2E] [&_ul]:mt-3'
        dangerouslySetInnerHTML={{ __html: policy?.content || '' }}
      />
    </section>
  )
}

export default Policy
