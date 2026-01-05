import { BrandButton } from '@/components/shared'
import BrandTitle from '@/components/shared/BrandTitle'
import Image from 'next/image'
import Link from 'next/link'

export const storiesData = [
  {
    id: 1,
    href: '/',
    tag: '#Corporate Sustainability',
    image: {
      src: '/uu-dai/card.webp',
      alt: 'our stories',
      width: 1360,
      height: 813,
    },
    title: '7 Hidden Routes in Vietnam Every Traveler Should Try Once',
    date: 'October 15, 2024',
  },
  {
    id: 2,
    href: '/',
    tag: '#Corporate Sustainability',
    image: {
      src: '/uu-dai/card.webp',
      alt: 'our stories',
      width: 1360,
      height: 813,
    },
    title: '7 Hidden Routes in Vietnam Every Traveler Should Try Once',
    date: 'October 15, 2024',
  },
  {
    id: 3,
    href: '/',
    tag: '#Corporate Sustainability',
    image: {
      src: '/uu-dai/card.webp',
      alt: 'our stories',
      width: 1360,
      height: 813,
    },
    title: '7 Hidden Routes in Vietnam Every Traveler Should Try Once',
    date: 'October 15, 2024',
  },
]

const StoriesCard = ({ story }: { story: (typeof storiesData)[0] }) => {
  return (
    <Link
      href={story?.href}
      className='xsm:w-[15.6875rem] relative flex w-[28.25rem] flex-col gap-[1.125rem] shrink-0'
    >
      <div className='xsm:left-[0.63rem] xsm:top-[0.56rem] xsm:h-[1.3125rem] xsm:px-[0.625rem] xsm:text-[0.625rem] xsm:leading-[1.25rem] xsm:tracking-[-0.0125rem] line-clamp-1 absolute top-[0.57rem] left-[0.63rem] flex h-[2rem] px-[0.88331rem] justify-center items-center rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] text-white font-phu-du text-[0.71763rem] font-medium leading-[1.43525rem] tracking-[-0.01438rem]'>
        {story?.tag}
      </div>
      <Image
        src={story?.image?.src}
        alt='our stories'
        width={story?.image?.width}
        height={story?.image?.height}
        className='xsm:h-[10.47088rem] w-auto h-[18.875rem] rounded-[1.25rem]'
      />
      <div className='xsm:w-full flex flex-col w-[27.08938rem] gap-[0.875rem]'>
        <h3 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal line-clamp-2 text-[#1F4D37] font-phu-du text-[1.75rem] font-medium leading-[2.0625rem] tracking-[-0.03125rem]'>
          {story?.title}
        </h3>
        <p className='line-clamp-1 text-[#FF7B4A] font-montserrat text-[0.875rem] font-normal font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
          {story?.date}
        </p>
      </div>
    </Link>
  )
}

export default function OurStories() {
  return (
    <div className='xsm:mt-[13.88rem] xsm:mb-[7.5rem] relative w-full h-full mt-[8.48rem] mb-[4.58rem]'>
      <div className='xsm:gap-[1.5rem] relative w-full max-w-[87.5rem] mx-auto h-full flex flex-col gap-[1.64rem]'>
        <div className='xsm:left-0 xsm:top-[-10.13rem] absolute left-[-3.19rem] top-[-9.71rem]'>
          <BrandTitle
            title='Our stories'
            subtitle='BLOG STORIES!'
            variant='green'
            classNameSubtitle='xsm:top-[2.6275rem] xsm:left-[2.06rem] xsm:w-[7.75rem] left-[4.54rem]'
          />
        </div>

        {/* tab buttons */}
        <div className='xsm:mx-auto inline-flex items-center justify-end gap-[0.5625rem]'>
          <button
            type='button'
            className='xsm:w-[10rem] xsm:bg-[#FCF4ED] xsm:backdrop-blur-[2px] flex h-[2.45925rem] px-[1.875rem] justify-center items-center gap-[0.5625rem] rounded-[0.625rem] border border-[#03328C] cursor-pointer'
          >
            <ICTravel className='xsm:w-[1rem] w-[0.94525rem] h-auto shrink-0' />
            <span className='xsm:text-[0.75rem] xsm:leading-[0.9rem] whitespace-nowrap font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)] bg-clip-text text-transparent'>
              Stay points
            </span>
          </button>
          <button
            type='button'
            className='xsm:w-[10.4375rem] flex h-[2.45925rem] px-[1.875rem] justify-center items-center gap-[0.5625rem] rounded-[0.625rem] bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)] cursor-pointer'
          >
            <ICGift className='size-[1.05769rem]' />
            <span className='text-[#F9EAD5] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase'>
              Tour and chill
            </span>
          </button>
        </div>

        {/* stories list */}
        <div className='xsm:flex xsm:overflow-x-auto xsm:px-[1rem] xsm:pb-0 w-full grid grid-cols-3 gap-[1.375rem] pb-[3.3125rem]'>
          {storiesData?.map((story, index) => (
            <StoriesCard
              key={index}
              story={story}
            />
          ))}
        </div>

        <div className='xsm:px-[1rem] w-full flex items-center gap-[1.625rem]'>
          <div className='xsm:hidden flex-1 h-[0.0625rem] bg-[#FFC542]' />
          <BrandButton
            variant='blueGradient'
            classNameButtonContainer='xsm:w-full'
          >
            Read More
          </BrandButton>
          <div className='xsm:hidden flex-1 h-[0.0625rem] bg-[#FFC542]' />
        </div>
      </div>
    </div>
  )
}

const ICTravel = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='19'
      viewBox='0 0 17 19'
      fill='none'
      {...props}
    >
      <path
        d='M11.1484 14.9544H13.1686C13.5489 14.9544 13.8572 14.6461 13.8572 14.2658V9.08703C13.8572 8.70675 13.5489 8.39844 13.1686 8.39844H11.1484'
        stroke='#016A60'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.78266 12.7173C6.47164 12.7173 7.03017 11.371 7.03017 9.71022C7.03017 8.04945 6.47164 6.70312 5.78266 6.70312C5.09368 6.70312 4.53516 8.04945 4.53516 9.71022C4.53516 11.371 5.09368 12.7173 5.78266 12.7173Z'
        stroke='#D9E45A'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.42282 2.37991H13.718M12.7298 4.14029H13.718M11.232 5.86393H15.0108C15.3911 5.86393 15.6994 5.55562 15.6994 5.17533V1.26672C15.6994 0.886436 15.3911 0.578125 15.0108 0.578125H6.13C5.74972 0.578125 5.44141 0.886436 5.44141 1.26672V3.99016'
        stroke='#016A60'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.6875 17.5052H15.0117C15.392 17.5052 15.7003 17.1969 15.7003 16.8166V6.54016C15.7003 6.15987 15.392 5.85156 15.0117 5.85156H10.9917'
        stroke='#016A60'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.78444 12.7173C7.44521 12.7173 8.79153 11.371 8.79153 9.71022C8.79153 8.04945 7.44521 6.70312 5.78444 6.70312C4.12367 6.70312 2.77734 8.04945 2.77734 9.71022C2.77734 11.371 4.12367 12.7173 5.78444 12.7173Z'
        stroke='#D9E45A'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.88034 14.6567H8.68647M9.48054 17.4983H1.26691C0.885415 17.4983 0.576172 17.1891 0.576172 16.8076V4.76105C0.576172 4.37956 0.885415 4.07031 1.26691 4.07031H9.48054C10.3146 4.07031 10.9907 4.74641 10.9907 5.58044V15.9882C10.9907 16.8222 10.3145 17.4983 9.48054 17.4983Z'
        stroke='#016A60'
        strokeWidth='1.15385'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const ICGift = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      {...props}
    >
      <path
        d='M15.6142 3.66294C16.278 2.49943 15.7701 0.578125 13.8898 0.578125C13.1676 0.578125 11.9541 1.12999 10.9214 1.68164M7.15412 1.68164C6.12147 1.13002 4.90816 0.578125 4.18573 0.578125C2.36626 0.578125 1.83174 2.37714 2.40046 3.54752'
        stroke='#D9E45A'
        strokeWidth='1.15385'
        strokeMiterlimit='22.9256'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.98138 6.56538H1.29737C0.89909 6.56538 0.576172 6.24243 0.576172 5.84426V4.49415C0.576172 4.09601 0.89909 3.77344 1.29737 3.77344H16.778C17.1762 3.77344 17.4992 4.09598 17.4992 4.49415V5.84426C17.4992 6.24239 17.1762 6.56535 16.778 6.56535H11.0941M16.7995 6.80714V16.7707C16.7995 17.174 16.4723 17.5011 16.0689 17.5011H2.00634C1.60295 17.5011 1.27592 17.174 1.27592 16.7707V6.80714'
        stroke='#F9EAD5'
        strokeWidth='1.15385'
        strokeMiterlimit='22.9256'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.9216 10.7854L9.03789 9.96472L7.1543 10.7854V2.52697C7.1543 1.85206 7.70132 1.30469 8.37658 1.30469H9.69934C10.3745 1.30469 10.9216 1.85206 10.9216 2.52697V10.7854Z'
        stroke='#D9E45A'
        strokeWidth='1.15385'
        strokeMiterlimit='22.9256'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
