'use client'
import { PopupGallery } from '@/components/shared'
import BrandButton2 from '@/components/shared/BrandButton2'
import useIsMobile from '@/hooks/use-is-mobile'
import Image from 'next/image'
import { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import './style.css'

const datas = [
  '/detail-hotel/image-1.png',
  '/detail-hotel/image-2.png',
  '/detail-hotel/image-3.png',
  '/detail-hotel/image-4.png',
  '/detail-hotel/image-5.png',
]

export default function Banner() {
  const [openGallery, setOpenGallery] = useState(false)
  const { isMobile, isLoading } = useIsMobile()

  return (
    <>
      {/*<PopupGallery
        open={openGallery}
        setOpen={setOpenGallery}
        items={imageList}
      />*/}
      <section
        id='banner'
        className='relative max-w-[87.5rem] mx-auto xsm:max-w-full'
      >
        {/* Mobile */}
        {!isLoading && isMobile && (
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {datas.map((data, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={data}
                  alt=''
                  width={1600}
                  height={1334}
                  className='h-[18.125rem] w-full object-cover'
                />
              </SwiperSlide>
            ))}
            <button
              type='button'
              onClick={() => setOpenGallery(true)}
              className='absolute right-[0.75rem] bottom-[0.75rem] bg-white cursor-pointer rounded-[62.5rem] flex items-center justify-center p-[0.0625rem_0.5rem] space-x-[0.1875rem] font-phu-du text-[0.625rem] font-medium tracking-[-0.0125rem] text-black z-2'
            >
              <Image
                src='/detail-hotel/gallery.svg'
                alt=''
                width={0}
                height={0}
                className='size-[0.625rem] object-cover'
              />
              <span>Show Gallery</span>
            </button>
          </Swiper>
        )}

        <div className='flex items-end justify-between xsm:flex-col xsm:justify-start xsm:items-start pb-[2rem] xsm:pt-7 xsm:px-4'>
          <div className='xsm:order-2'>
            <h1 className='font-phu-du text-[2.125rem] font-medium leading-[2.3375rem] text-black mb-6 xsm:mb-4 xsm:text-[1.25rem] xsm:leading-[1.375rem]'>
              Hotel Du Lac Signature
            </h1>
            <div className='flex items-center space-x-3.5 xsm:flex-col xsm:space-x-0 xsm:space-y-2.5 xsm:items-start'>
              <div className='flex items-center space-x-1.5 font-montserrat text-[1rem] leading-[1.2rem] text-[rgba(46,46,46,0.75)] xsm:text-[0.75rem] xsm:leading-[1.05rem]'>
                <Image
                  src='/detail-hotel/location.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='size-[1.25rem] xsm:size-[0.875rem] object-cover'
                />
                <span>05 P. Từ Hoa, Quảng An, Tây Hồ, Hà Nội, Vietnam</span>
              </div>
              <Image
                src='/detail-hotel/circle.svg'
                alt=''
                width={0}
                height={0}
                className='size-[0.25rem] shrink-0 object-cover xsm:hidden'
              />
              <div className='flex items-center space-x-1.5 font-montserrat text-[1rem] leading-[1.2rem] text-[rgba(46,46,46,0.75)] xsm:text-[0.75rem] xsm:leading-[1.05rem]'>
                <Image
                  src='/detail-hotel/tripadvisor.png'
                  alt=''
                  width={20}
                  height={20}
                  className='size-[1.25rem] xsm:size-[0.75rem] object-cover'
                />
                <span className='mr-[0.5rem]'>Tripadvisor</span>
                <div className='flex items-center space-x-1'>
                  <Image
                    src='/detail-hotel/tripadvisor-star.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.125rem] xsm:size-[0.75rem] object-cover'
                  />
                  <Image
                    src='/detail-hotel/tripadvisor-star.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.125rem] xsm:size-[0.75rem] object-cover'
                  />
                  <Image
                    src='/detail-hotel/tripadvisor-star.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.125rem] xsm:size-[0.75rem] object-cover'
                  />
                  <Image
                    src='/detail-hotel/tripadvisor-star.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.125rem] xsm:size-[0.75rem] object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
          <BrandButton2 className='space-x-[0.625rem] cursor-default xsm:mb-4 xsm:space-x-[0.4375rem]'>
            <Image
              src='/detail-hotel/sofa.svg'
              alt=''
              width={0}
              height={0}
              className='w-[1.15988rem] h-[1.25rem] xsm:w-[0.69594rem] xsm:h-[0.75rem] object-cover'
            />
            <span>3 Rooms Available!</span>
          </BrandButton2>
        </div>

        {/* PC */}
        {!isLoading && !isMobile && (
          <div className='grid grid-cols-4 gap-3'>
            <div className='col-span-2 row-span-2'>
              <Image
                src='/detail-hotel/image-1.png'
                alt=''
                width={2000}
                height={1334}
                className='h-[30.0625rem] w-auto object-cover'
              />
            </div>
            <div>
              <Image
                src='/detail-hotel/image-2.png'
                alt=''
                width={1600}
                height={1064}
                className='h-[14.65625rem] w-[21.3125rem] object-cover'
              />
            </div>
            <div>
              <Image
                src='/detail-hotel/image-3.png'
                alt=''
                width={1600}
                height={1172}
                className='h-[14.65625rem] w-[21.3125rem] object-cover'
              />
            </div>
            <div>
              <Image
                src='/detail-hotel/image-4.png'
                alt=''
                width={1600}
                height={1068}
                className='h-[14.65625rem] w-[21.3125rem] object-cover'
              />
            </div>
            <div className='relative'>
              <Image
                src='/detail-hotel/image-5.png'
                alt=''
                width={1600}
                height={1068}
                className='h-[14.65625rem] w-[21.3125rem] object-cover'
              />
              <button
                type='button'
                onClick={() => setOpenGallery(true)}
                className='absolute right-[0.75rem] bottom-[0.71875rem] bg-white cursor-pointer rounded-[62.5rem] flex items-center justify-center p-[0.3125rem_1rem] space-x-2 font-phu-du text-[0.75rem] font-medium tracking-[-0.015rem] text-black'
              >
                <Image
                  src='/detail-hotel/gallery.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='size-[0.875rem] object-cover'
                />
                <span>Show Gallery</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
