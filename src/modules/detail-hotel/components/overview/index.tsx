import { IHotelDetail, ITaxonomies } from '@/interface/hotel.interface'
import { useTranslations } from 'next-intl'

const Overview = ({
  overview,
  taxonomies,
}: {
  overview: IHotelDetail['acf']['overview']
  taxonomies: ITaxonomies[]
}) => {
  const t = useTranslations('DetailHotelPage')
  return (
    <section className='p-8 rounded-[0.5rem] bg-white xsm:bg-transparent xsm:px-4 xsm:py-0'>
      <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit mb-5 xsm:mb-4 xsm:text-[1.125rem]'>
        {t('textOverview')}
      </h3>
      <article
        className='[&_ul]:list-disc [&_ul]:list-inside [&_ul_li::marker]:text-orange-500 text-body-t1/75 leading-[1.5] xsm:text-[0.875rem]'
        dangerouslySetInnerHTML={{ __html: overview?.content || '' }}
      />
      <div className='p-4 bg-[#f8f8f8] rounded-[0.5rem] mt-6 xsm:mt-[2.25rem] xsm:bg-transparent xsm:p-0'>
        <p className='text-[#2E2E2E] font-bold leading-[1.1] font-phu-du'>{t('textAmenities')}</p>
        <div className='grid grid-cols-2 mt-[0.875rem] gap-[0.625rem]'>
          {taxonomies
            ?.find((taxonomy) => taxonomy.taxonomy === 'hotel-amenities')
            ?.terms.map((term) => (
              <div
                key={term.slug}
                className='flex space-x-2 items-center'
              >
                <AmenitiesIcon className='size-4' />
                <p className='text-[#2e2e2e]/75 leading-[1.5] xsm:text-[0.875rem]'>{term.name}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

const AmenitiesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    {...props}
  >
    <g clipPath='url(#clip0_1153_14686)'>
      <path
        d='M16.9411 10.7328C16.5873 10.1824 16.2335 9.65175 15.8797 9.1014C15.8011 8.98347 15.8011 8.90485 15.8797 8.78692C16.2335 8.25623 16.5677 7.72554 16.9215 7.19485C17.3342 6.56589 17.118 5.95657 16.4104 5.70106C15.8208 5.48485 15.2311 5.24899 14.6415 5.03278C14.5235 4.99347 14.4646 4.91485 14.4646 4.77726C14.4449 4.12864 14.4056 3.48002 14.3663 2.85106C14.327 2.16313 13.7963 1.77002 13.128 1.94692C12.4991 2.10416 11.8701 2.28106 11.2608 2.45795C11.1232 2.49726 11.0446 2.45795 10.9463 2.35968C10.5532 1.84864 10.1404 1.35726 9.74733 0.865884C9.31492 0.315539 8.64664 0.315539 8.19457 0.865884C7.80147 1.35726 7.38871 1.84864 7.01526 2.34002C6.91699 2.47761 6.81871 2.49726 6.66147 2.45795C6.05216 2.28106 5.44285 2.12382 5.01044 2.00588C4.16526 1.80933 3.65423 2.14347 3.61492 2.85106C3.57561 3.49968 3.5363 4.1483 3.51664 4.81657C3.51664 4.95416 3.45768 5.01313 3.33975 5.07209C2.73044 5.30795 2.12113 5.54381 1.51182 5.77968C0.882851 6.0352 0.686299 6.64451 1.05975 7.21451C1.41354 7.76485 1.76733 8.29554 2.12112 8.84588C2.19974 8.96382 2.19974 9.04243 2.12112 9.18002C1.74768 9.73037 1.39388 10.2807 1.04009 10.8507C0.705953 11.3814 0.922158 12.0104 1.51181 12.2462C2.12112 12.4821 2.75009 12.718 3.3594 12.9538C3.49698 12.9931 3.53629 13.0718 3.53629 13.2093C3.55595 13.8383 3.63457 14.4476 3.63457 15.0766C3.63457 15.7055 4.18491 16.2755 4.95146 16.0397C5.56078 15.8431 6.17008 15.7055 6.7794 15.5286C6.89733 15.4893 6.97595 15.509 7.05457 15.6269C7.46733 16.138 7.86043 16.6293 8.27319 17.1404C8.72526 17.6907 9.37388 17.6907 9.80629 17.1404C10.2191 16.6293 10.6122 16.138 11.0249 15.6269C11.1035 15.5286 11.1625 15.4893 11.3001 15.5286C11.929 15.7055 12.558 15.8628 13.187 16.0397C13.8356 16.2166 14.3859 15.8235 14.4056 15.1552C14.4449 14.5066 14.4842 13.858 14.5039 13.1897C14.5039 13.0324 14.5825 12.9735 14.7004 12.9342C15.2901 12.718 15.8994 12.4821 16.489 12.2462C17.118 11.9317 17.3146 11.3028 16.9411 10.7328ZM12.2435 7.50933L8.31251 11.4404C8.21423 11.5386 8.07664 11.6173 7.93906 11.6369C7.89975 11.6369 7.84078 11.6566 7.80147 11.6566C7.62458 11.6566 7.42803 11.578 7.29044 11.4404L5.67871 9.82864C5.40354 9.55347 5.40354 9.1014 5.67871 8.82623C5.95389 8.55106 6.40596 8.55106 6.68113 8.82623L7.78182 9.92692L11.2018 6.50692C11.477 6.23175 11.9291 6.23175 12.2042 6.50692C12.5187 6.78209 12.5187 7.23416 12.2435 7.50933Z'
        fill='#2BAB7D'
      />
    </g>
    <defs>
      <clipPath id='clip0_1153_14686'>
        <rect
          width='18'
          height='18'
          fill='white'
        />
      </clipPath>
    </defs>
  </svg>
)

export default Overview
