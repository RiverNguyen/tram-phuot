'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { convertRemToPx } from '@/lib/utils'
import { BrandButton } from '@/components/shared'
import useIsMobile from '@/hooks/useIsMobile'

const testimonialsData = [
  {
    id: 1,
    avatar: '/home/avatar.webp',
    name: 'Alex M',
    date: '2024 - 11-20',
    rating: 4,
    title: 'Excelence',
    description:
      'Our team at Tigit carefully selects the most passionate freelance guides. Each one specializes in a unique area, ranging from',
  },
]

const repeatedTestimonials = Array.from({ length: 10 }, () => testimonialsData).flat()

const CardTestimonial = ({ testimonial }: { testimonial: (typeof testimonialsData)[0] }) => {
  return (
    <div className='xsm:w-[18.75rem] xsm:h-[13.9375rem] xsm:p-[1rem] xsm:shadow-[0_8px_24px_0_rgba(0,0,0,0.04)] shrink-0 relative flex w-[23.75rem] h-[15.875rem] p-[1.25rem] flex-col gap-[0.75rem] rounded-[1rem] bg-white shadow-[0_261px_73px_0_rgba(200,182,157,0.00),0_167px_67px_0_rgba(200,182,157,0.01),0_94px_56px_0_rgba(200,182,157,0.05),0_42px_42px_0_rgba(200,182,157,0.09),0_10px_23px_0_rgba(200,182,157,0.10)]'>
      <div className='xsm:gap-[0.75rem] flex items-center gap-[0.875rem]'>
        <Image
          src={testimonial.avatar}
          alt='Avatar'
          width={40}
          height={40}
          className='xsm:size-[2.5rem] size-[3rem] rounded-[6.25rem] object-cover shrink-0'
        />
        <div className='flex flex-col gap-[0.375rem] '>
          <h3 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal text-[#2E2E2E] font-phu-du text-[1.25rem] font-medium leading-[1.5rem] tracking-[0.025rem]'>
            {testimonial.name}
          </h3>
          <p className='xsm:text-[0.75rem] xsm:tracking-normal text-[#2E2E2E] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] opacity-[0.3]'>
            {testimonial.date}
          </p>
        </div>
      </div>
      <div className='flex gap-[0.25rem]'>
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <ICCircleDouble
            key={index}
            className='xsm:size-[1rem] size-[1.125rem]'
          />
        ))}
      </div>
      <div className='flex flex-col gap-[0.5rem] self-stretch'>
        <h4 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal text-[#1F4D37] font-phu-du text-[1.125rem] font-bold leading-[1.2375rem]'>
          {testimonial.title}
        </h4>
        <p className='xsm:text-[0.875rem] xsm:leading-[1.3125rem] self-stretch text-[rgba(46,46,46,0.75)] font-montserrat text-[1rem] leading-[1.5rem]'>
          {testimonial.description}
        </p>
      </div>
      <div className='xsm:size-[2rem] xsm:p-[0.39988rem_0.40206rem_0.35013rem_0.4rem] xsm:top-[1.25rem] xsm:right-[3.625rem] flex size-[2.5rem] px-[0.5rem] pt-[0.5rem] pb-[0.4375rem] justify-center items-center absolute right-[5.375rem] top-[1.75rem] rounded-[32.05125rem] bg-[#F2F2F2]'>
        <Image
          src='/home/google.svg'
          alt='Google'
          width={24}
          height={25}
          className='w-[1.5rem] h-auto'
        />
      </div>
      <div className='xsm:size-[2rem] xsm:p-[0.33325rem_0.31813rem_0.31825rem_0.33338rem] xsm:top-[1.25rem] xsm:right-[1rem] flex size-[2.5rem] p-[0.41663rem_0.39769rem_0.39775rem_0.41669rem] justify-center items-center absolute right-[2rem] top-[1.75rem] rounded-[32.05125rem] bg-[#33E0A0]'>
        <ICOwl />
      </div>
    </div>
  )
}

export default function TheExplorers2() {
  const isMobile = useIsMobile()

  return (
    <div className='xsm:mt-[6rem] relative w-full h-full mt-[1.79rem]'>
      {/* <Image
        src='/home/bg-explorers-2.webp'
        alt='Bg Explorers 2'
        width={3199}
        height={2895}
        className='w-full h-full object-cover'
      /> */}
      <div className='w-full h-full flex flex-col gap-[2rem]'>
        {!isMobile && (
          <Swiper
            slidesPerView='auto'
            centeredSlides={true}
            initialSlide={Math.floor(repeatedTestimonials.length / 2)}
            loop={true}
            grabCursor={true}
            spaceBetween={convertRemToPx(1.5)}
            className='w-full h-[15.875rem] !overflow-visible relative !z-0'
          >
            {repeatedTestimonials?.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className='!w-[23.75rem] !h-[15.875rem]'
              >
                <CardTestimonial testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className='sm:hidden'>
          <div className='w-full flex gap-[0.75rem] overflow-x-auto overflow-y-visible px-[1rem]'>
            {repeatedTestimonials?.map((testimonial, index) => (
              <CardTestimonial
                key={index}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        <div className='xsm:px-[1rem] xsm:flex-col xsm:items-start inline-flex items-center gap-[1.25rem] justify-center self-stretch'>
          <BrandButton
            variant='transparent'
            classNameButtonContainer='xsm:w-full'
          >
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <span className='xsm:text-[0.75rem] xsm:leading-[0.9rem] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] bg-clip-text text-transparent'>
                Google Review
              </span>
              <Image
                src='/home/google.svg'
                alt='Google'
                width={24}
                height={25}
                className='w-[1.37388rem] h-auto'
              />
            </div>
          </BrandButton>
          <BrandButton
            variant='transparent'
            classNameButtonContainer='xsm:w-full'
          >
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <span className='xsm:text-[0.75rem] xsm:leading-[0.9rem] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] bg-clip-text text-transparent'>
                Tripadvisor
              </span>
              <div className='size-[1.56413rem] p-[0.26075rem_0.24863rem_0.24881rem_0.26094rem] flex items-center justify-center rounded-[20.05269rem] bg-[#33E0A0]'>
                <ICOwl className='w-[1.05463rem] h-auto' />
              </div>
            </div>
          </BrandButton>
        </div>
      </div>
    </div>
  )
}

const ICCircleDouble = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      {...props}
    >
      <circle
        cx='9'
        cy='9'
        r='6'
        fill='#479064'
      />
      <circle
        cx='9'
        cy='9'
        r='8.25'
        stroke='#479064'
        strokeWidth='1.5'
      />
    </svg>
  )
}

const ICOwl = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='27'
      height='18'
      viewBox='0 0 27 18'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_2269_13968)'>
        <path
          d='M11.3271 15.0039C8.62437 17.506 4.4558 17.3312 1.9655 14.8029C0.626171 13.4428 -0.0347333 11.7958 0.00140557 9.888C0.0375445 7.97529 0.824387 6.38301 2.17412 5.04049C1.44258 4.24408 0.723636 3.46136 0.00523848 2.67863L0.0183799 2.64851C0.0660176 2.64851 0.113655 2.64851 0.161293 2.64851C1.68515 2.64851 3.20846 2.64851 4.73232 2.6507C4.84457 2.6507 4.93765 2.62605 5.03293 2.56251C6.79881 1.38104 8.72895 0.605435 10.8206 0.234066C12.0318 0.0193518 13.2523 -0.0485681 14.4794 0.0341408C17.2134 0.218729 19.7223 1.06992 22.0029 2.59264C22.0593 2.63043 22.1414 2.64577 22.2115 2.64577C23.7436 2.64851 25.2756 2.64796 26.8072 2.64796C26.8521 2.64796 26.8975 2.64796 26.9424 2.64796L26.9627 2.6759C26.2476 3.45478 25.5325 4.23367 24.8075 5.02351C24.8595 5.08212 24.9071 5.13799 24.9559 5.19222C25.5812 5.88785 26.1205 6.6377 26.4781 7.5119C27.8043 10.7545 26.3543 14.5597 23.2059 16.0944C22.1014 16.6329 20.9379 16.864 19.7163 16.7709C18.188 16.6548 16.8498 16.0764 15.7043 15.0559C15.6862 15.04 15.6671 15.0253 15.6392 15.0028C14.9229 15.7817 14.2106 16.5573 13.4829 17.3493C12.7623 16.5655 12.0488 15.7883 11.3271 15.0039ZM20.2195 14.5909C22.7443 14.5827 24.7757 12.5473 24.7703 10.0315C24.7648 7.51409 22.7218 5.48416 20.2009 5.49128C17.681 5.4984 15.6632 7.54257 15.6693 10.0814C15.6753 12.5615 17.7308 14.5986 20.2195 14.5909ZM6.73255 14.5909C9.22778 14.5975 11.2866 12.5681 11.2959 10.0929C11.3052 7.54695 9.28911 5.50388 6.76322 5.49019C4.23951 5.47595 2.19986 7.54093 2.19383 10.0326C2.18781 12.5407 4.22035 14.5843 6.73255 14.5909ZM18.5001 3.21378C15.148 1.89755 11.8139 1.89701 8.46558 3.21378C11.2291 4.43743 13.0974 6.35014 13.4829 9.32492C13.8705 6.35124 15.7355 4.43962 18.5001 3.21378Z'
          fill='#1D1D1D'
        />
        <path
          d='M20.2299 7.63281C21.5599 7.63884 22.6238 8.71843 22.6178 10.0571C22.6118 11.3706 21.5243 12.4447 20.2086 12.4365C18.872 12.4277 17.8157 11.3487 17.8223 9.99851C17.8283 8.69324 18.9136 7.62733 20.2299 7.63336V7.63281Z'
          fill='#1A1A1A'
        />
        <path
          d='M6.74054 7.63285C8.04811 7.62518 9.13611 8.69876 9.14378 10.0051C9.15199 11.3433 8.08808 12.4294 6.76189 12.4371C5.44118 12.4448 4.35592 11.3783 4.3477 10.0643C4.33949 8.71848 5.39957 7.64052 6.73999 7.63285H6.74054Z'
          fill='#1A1A1A'
        />
      </g>
      <defs>
        <clipPath id='clip0_2269_13968'>
          <rect
            width='26.97'
            height='17.3491'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
