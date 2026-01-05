'use client'

import Image from 'next/image'
import { BrandButton } from '@/components/shared'
import ICOwl from '@/components/icons/ICOwl'
import TestimonialItem from './TestimonialItem'
import Journey from './Journey'
import dynamic from 'next/dynamic'

const TestimonialSlide = dynamic(() => import('./TestimonialSlide'), { ssr: false })

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

export default function TheExplorers() {
  return (
    <>
      <Journey />

      <div className='xsm:mt-[4rem] relative w-full h-full mt-[1.79rem]'>
        <Image
          src='/home/bg-explorers-2.webp'
          alt='Bg Explorers 2'
          width={3199}
          height={2895}
          className='xsm:hidden absolute top-[-8.16rem] left-0 w-full h-auto mix-blend-soft-light pointer-events-none'
        />
        <div className='xsm:gap-0 w-full h-full flex flex-col gap-[2rem]'>
          <div className='xsm:hidden'>
            <TestimonialSlide testimonials={repeatedTestimonials} />
          </div>

          <div className='sm:hidden overflow-x-auto'>
            <div className='w-max flex gap-[0.75rem] py-[2rem] px-[1rem]'>
              {repeatedTestimonials?.map((testimonial, index) => (
                <TestimonialItem
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
    </>
  )
}
