import { IHotelDetail } from '@/interface/hotel.interface'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Location = ({ location }: { location: IHotelDetail['acf']['location'] }) => {
  const t = useTranslations('DetailHotelPage')
  return (
    <section className='bg-white p-8 rounded-[0.5rem] mt-8 xsm:bg-transparent xsm:p-0 xsm:pt-8 xsm:rounded-none xsm:border-black/10 xsm:border-t'>
      <div className='flex-y-center space-x-[0.625rem] xsm:px-4'>
        <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
          {t('textLocation')}
        </h3>
        <p className='text-[#2E2E2E]/60 text-[0.875rem] leading-[1.5]'>{location?.detail}</p>
      </div>
      <div className='mt-6 relative w-full group h-[25.125rem] overflow-hidden xsm:mb-[3rem]'>
        <Image
          src={location?.image.url}
          alt={location?.image.alt}
          width={630}
          height={355}
          className='w-full h-full object-cover lg:hover:scale-105 transition-all duration-300'
        />
        <Link
          href={location?.link_gg_map}
          target='_blank'
          className='absolute top-[0.625rem] right-4 h-[1.625rem] flex-center p-[0.375rem] rounded-[0.25rem] bg-[#2e2e2e]/40 backdrop-blur-[4px]'
        >
          <div className='flex-y-center space-x-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              className='size-[0.875rem]'
            >
              <path
                d='M11.8882 12.3265C11.7715 12.3265 11.6607 12.2798 11.579 12.1982L7.85734 8.47649C7.68818 8.30732 7.68818 8.02732 7.85734 7.85816L12.3665 3.34899C12.4774 3.23816 12.6465 3.19732 12.7982 3.23816C12.9498 3.28482 13.0665 3.40732 13.1015 3.55899C13.2123 4.05482 13.2707 4.60899 13.2707 5.25065V8.75065C13.2707 10.3665 12.9323 11.4573 12.1973 12.1982C12.1157 12.2798 11.9932 12.2973 11.8882 12.3265ZM8.78484 8.16732L11.8532 11.2357C12.2207 10.6698 12.3957 9.86482 12.3957 8.75065V5.25065C12.3957 5.01149 12.3898 4.78982 12.3723 4.57982L8.78484 8.16732Z'
                fill='white'
              />
              <path
                d='M3.6588 13.1146C3.6238 13.1146 3.59464 13.1088 3.55964 13.103C1.62881 12.6596 0.730469 11.2771 0.730469 8.7513V5.2513C0.730469 2.0838 2.0838 0.730469 5.2513 0.730469H8.7513C11.2771 0.730469 12.6596 1.62881 13.103 3.55964C13.138 3.70547 13.0913 3.86297 12.9863 3.96797L3.96796 12.9863C3.8863 13.068 3.77546 13.1146 3.6588 13.1146ZM5.2513 1.60547C2.56214 1.60547 1.60547 2.56214 1.60547 5.2513V8.7513C1.60547 10.7755 2.16547 11.7905 3.52464 12.193L12.1871 3.53047C11.7905 2.1713 10.7696 1.6113 8.74546 1.6113H5.2513V1.60547Z'
                fill='white'
              />
              <path
                d='M8.74924 13.2707H5.24924C4.60758 13.2707 4.05925 13.2182 3.55758 13.1015C3.40008 13.0665 3.27757 12.9498 3.23673 12.7982C3.19007 12.6465 3.23674 12.4832 3.34757 12.3665L7.85674 7.85734C8.02591 7.68818 8.30591 7.68818 8.47507 7.85734L12.1967 11.579C12.2784 11.6607 12.3251 11.7715 12.3251 11.8882C12.3251 12.0048 12.2784 12.1157 12.1967 12.1973C11.4559 12.9323 10.3651 13.2707 8.74924 13.2707ZM4.57841 12.3723C4.78841 12.3898 5.01008 12.3957 5.24924 12.3957H8.74924C9.86924 12.3957 10.6684 12.2207 11.2342 11.8532L8.16591 8.78484L4.57841 12.3723Z'
                fill='white'
              />
              <path
                d='M5.32037 7.76558C4.95287 7.76558 4.58537 7.63141 4.2937 7.35724C3.3662 6.47641 2.99288 5.50808 3.21455 4.56308C3.43621 3.59475 4.28204 2.94141 5.32037 2.94141C6.35871 2.94141 7.20455 3.59475 7.42622 4.56308C7.64205 5.51391 7.26871 6.47641 6.34121 7.35724C6.05537 7.62558 5.68787 7.76558 5.32037 7.76558ZM4.06621 4.75557C3.87954 5.54891 4.41621 6.26058 4.90037 6.72141C5.13954 6.94891 5.50704 6.94891 5.74037 6.72141C6.21871 6.26641 6.75537 5.55474 6.57454 4.75557C6.41704 4.06141 5.79871 3.81058 5.32037 3.81058C4.84204 3.81058 4.22954 4.06141 4.06621 4.75557Z'
                fill='white'
              />
              <path
                d='M5.33724 5.53776C5.01641 5.53776 4.75391 5.27526 4.75391 4.95443C4.75391 4.63359 5.01057 4.37109 5.33724 4.37109H5.34308C5.66391 4.37109 5.92641 4.63359 5.92641 4.95443C5.92641 5.27526 5.65807 5.53776 5.33724 5.53776Z'
                fill='white'
              />
            </svg>
            <p className='text-[0.75rem] text-white font-medium leading-[1.6] tracking-[-0.0075rem]'>
              {t('textViewOnGoogleMap')}
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Location
