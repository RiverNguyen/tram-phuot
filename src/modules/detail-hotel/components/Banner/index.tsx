'use client'

import { PopupGallery } from '@/components/shared'
import BrandButton2 from '@/components/shared/BrandButton2'
import useIsMobile from '@/hooks/use-is-mobile'
import { IHotelDetail } from '@/interface/hotel.interface'
import Image from 'next/image'
import { useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import './style.css'

export default function Banner({ detailHotel }: { detailHotel: IHotelDetail }) {
  const [openGallery, setOpenGallery] = useState(false)
  const { isMobile, isLoading } = useIsMobile()

  return (
    <>
      <PopupGallery
        open={openGallery}
        setOpen={setOpenGallery}
        items={detailHotel?.acf?.banner?.gallery?.map((data, i) => ({
          id: i,
          url: data,
          alt: `Banner ${i + 1}`,
        }))}
      />
      <section
        id='banner'
        className='xsm:max-w-full relative mx-auto max-w-[87.5rem]'
      >
        {/* Mobile */}
        {!isLoading && isMobile && (
          <div className='relative'>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              loop
              autoplay
              modules={[Pagination, Autoplay]}
            >
              {Array.isArray(detailHotel?.acf?.banner?.gallery) &&
                detailHotel?.acf?.banner?.gallery?.map((data, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={data}
                      alt={`Banner ${i + 1}`}
                      width={1600}
                      height={1334}
                      className='h-[18.125rem] w-full object-cover'
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <button
              type='button'
              onClick={() => setOpenGallery(true)}
              className='font-phu-du absolute right-[0.75rem] bottom-[0.75rem] z-10 flex cursor-pointer items-center justify-center space-x-[0.1875rem] rounded-[62.5rem] bg-white p-[0.0625rem_0.5rem] text-[0.625rem] font-medium tracking-[-0.0125rem] text-black'
            >
              <Image
                src='/detail-hotel/gallery.svg'
                alt=''
                width={12}
                height={12}
                className='size-[0.625rem] object-cover'
              />
              <span>Show Gallery</span>
            </button>
          </div>
        )}

        <div className='xsm:flex-col xsm:justify-start xsm:items-start xsm:pt-7 xsm:px-4 flex items-end justify-between pb-[2rem]'>
          <div className='xsm:order-2'>
            <h1 className='font-phu-du xsm:mb-4 xsm:text-[1.25rem] xsm:leading-[1.375rem] mb-6 text-[2.125rem] leading-[2.3375rem] font-medium text-black'>
              {detailHotel?.title}
            </h1>
            <div className='xsm:flex-col xsm:space-x-0 xsm:space-y-2.5 xsm:items-start flex items-center space-x-3.5'>
              <div className='font-montserrat xsm:text-[0.75rem] xsm:leading-[1.05rem] flex items-center space-x-1.5 text-[1rem] leading-[1.2rem] text-[rgba(46,46,46,0.75)]'>
                <Image
                  src='/detail-hotel/location.svg'
                  alt=''
                  width={20}
                  height={20}
                  className='xsm:size-[0.875rem] size-[1.25rem] object-cover'
                />
                <span>{detailHotel?.acf?.banner?.address}</span>
              </div>
              <Image
                src='/detail-hotel/circle.svg'
                alt=''
                width={8}
                height={8}
                className='xsm:hidden size-[0.25rem] shrink-0 object-cover'
              />
              <div className='font-montserrat xsm:text-[0.75rem] xsm:leading-[1.05rem] flex items-center space-x-1.5 text-[1rem] leading-[1.2rem] text-[rgba(46,46,46,0.75)]'>
                <Image
                  src={detailHotel?.acf?.banner?.review?.image}
                  alt={detailHotel?.acf?.banner?.review?.text}
                  width={20}
                  height={20}
                  className='xsm:size-[0.75rem] size-[1.25rem] object-cover'
                />
                <span className='mr-[0.5rem]'>{detailHotel?.acf?.banner?.review?.text}</span>
                <div className='flex items-center space-x-1'>
                  {Array.from(
                    { length: detailHotel?.acf?.banner?.review?.rating as unknown as number },
                    (_, index) => (
                      <Image
                        key={index}
                        src={detailHotel?.acf?.banner?.review?.icon}
                        alt=''
                        width={16}
                        height={16}
                        className='xsm:size-[0.75rem] size-[1.125rem] object-cover'
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <BrandButton2 className='xsm:mb-4 xsm:space-x-[0.4375rem] cursor-default space-x-[0.625rem]'>
            <Image
              src='/detail-hotel/sofa.svg'
              alt=''
              width={16}
              height={16}
              className='xsm:w-[0.69594rem] xsm:h-[0.75rem] h-[1.25rem] w-[1.15988rem] object-cover'
            />
            <span>{detailHotel?.acf?.room_and_dorm?.select?.length} Rooms Available!</span>
          </BrandButton2>
        </div>

        {/* PC */}
        {!isLoading && !isMobile && (
          <div className='grid grid-cols-4 gap-3'>
            {Array.isArray(detailHotel?.acf?.banner?.gallery) &&
              detailHotel.acf.banner.gallery.length > 0 && (
                <>
                  {/* Ảnh lớn đầu tiên */}
                  {detailHotel.acf.banner.gallery[0] && (
                    <div className='col-span-2 row-span-2'>
                      <Image
                        src={detailHotel.acf.banner.gallery[0]}
                        alt={`Banner 1`}
                        width={1600}
                        height={480}
                        className='h-[30.0625rem] w-auto object-cover'
                      />
                    </div>
                  )}
                  {/* 3 ảnh nhỏ tiếp theo */}
                  {detailHotel.acf.banner.gallery[1] && (
                    <div>
                      <Image
                        src={detailHotel.acf.banner.gallery[1]}
                        alt={`Banner 2`}
                        width={1600}
                        height={1064}
                        className='h-[14.65625rem] w-[21.3125rem] object-cover'
                      />
                    </div>
                  )}
                  {detailHotel.acf.banner.gallery[2] && (
                    <div>
                      <Image
                        src={detailHotel.acf.banner.gallery[2]}
                        alt={`Banner 3`}
                        width={1600}
                        height={1172}
                        className='h-[14.65625rem] w-[21.3125rem] object-cover'
                      />
                    </div>
                  )}
                  {detailHotel.acf.banner.gallery[3] && (
                    <div>
                      <Image
                        src={detailHotel.acf.banner.gallery[3]}
                        alt={`Banner 4`}
                        width={1600}
                        height={1068}
                        className='h-[14.65625rem] w-[21.3125rem] object-cover'
                      />
                    </div>
                  )}
                  {/* Ảnh cuối cùng với button overlay */}
                  {detailHotel.acf.banner.gallery[4] && (
                    <div className='relative'>
                      <Image
                        src={detailHotel.acf.banner.gallery[4]}
                        alt={`Banner 5`}
                        width={1600}
                        height={1068}
                        className='h-[14.65625rem] w-[21.3125rem] object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => setOpenGallery(true)}
                        className='font-phu-du absolute right-[0.75rem] bottom-[0.71875rem] flex cursor-pointer items-center justify-center space-x-2 rounded-[62.5rem] bg-white p-[0.3125rem_1rem] text-[0.75rem] font-medium tracking-[-0.015rem] text-black'
                      >
                        <Image
                          src='/detail-hotel/gallery.svg'
                          alt=''
                          width={16}
                          height={16}
                          className='size-[0.875rem] object-cover'
                        />
                        <span>Show Gallery</span>
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
        )}
      </section>
    </>
  )
}
