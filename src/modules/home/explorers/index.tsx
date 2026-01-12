'use client'

import { BrandButton } from '@/components/shared'
import { IExplorers, IReview } from '@/interface/homepage.interface'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Journey from './Journey'
import TestimonialItem from './TestimonialItem'
import Marquee from '@/components/ui/marquee'

const TestimonialSlide = dynamic(() => import('./TestimonialSlide'), { ssr: false })

export default function TheExplorers({
  explorers,
  reviews,
}: {
  explorers: IExplorers
  reviews: IReview[]
}) {
  return (
    <section className='overflow-hidden'>
      <Journey explorers={explorers} />

      <div className='xsm:mt-[4rem] relative w-full h-full mt-[1.79rem] overflow-hidden'>
        <Image
          src='/home/bg-explorers-2.webp'
          alt='Bg Explorers 2'
          width={3199}
          height={2895}
          className='xsm:hidden absolute top-[-8.16rem] left-0 w-full h-auto mix-blend-soft-light pointer-events-none'
        />
        <div className='xsm:gap-0 w-full h-full flex flex-col gap-[2rem]'>
          <div className='xsm:hidden'>
            <TestimonialSlide testimonials={reviews} />
          </div>

          <div className='sm:hidden overflow-hidden'>
            <Marquee
              className='w-full'
              baseVelocity={12}
              repeat={4}
              draggable={false}
              slowDownFactor={0.1}
              slowdownOnHover
              direction='left'
            >
              {reviews?.map((review, index) => (
                <TestimonialItem
                  key={index}
                  review={review}
                />
              ))}
            </Marquee>
          </div>

          <div className='xsm:px-[1rem] xsm:flex-col xsm:items-start inline-flex items-center gap-[1.25rem] xsm:mt-[2.5rem] justify-center self-stretch'>
            <Link
              href={explorers?.button_1?.link?.url || ''}
              target={'_blank'}
              className='xsm:w-full'
            >
              <BrandButton
                variant='transparent'
                classNameButtonContainer='xsm:w-full'
              >
                <div className='flex items-center justify-center gap-[0.625rem]'>
                  <span>{explorers?.button_1?.link?.title}</span>
                  <Image
                    src={explorers?.button_1?.image?.url || ''}
                    alt={explorers?.button_1?.image?.alt || ''}
                    width={24}
                    height={25}
                    className='w-[1.37388rem] h-auto'
                  />
                </div>
              </BrandButton>
            </Link>
            <Link
              href={explorers?.button_2?.link?.url || ''}
              target={'_blank'}
              className='xsm:w-full'
            >
              <BrandButton
                variant='transparent'
                classNameButtonContainer='xsm:w-full group'
              >
                <div className='flex items-center justify-center gap-[0.625rem]'>
                  <span>{explorers?.button_2?.link?.title}</span>
                  <Image
                    src={explorers?.button_2?.image?.url || ''}
                    alt={explorers?.button_2?.image?.alt || ''}
                    width={24}
                    height={25}
                    className='w-[1.37388rem] h-auto'
                  />
                </div>
              </BrandButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
