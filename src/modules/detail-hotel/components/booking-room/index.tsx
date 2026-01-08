'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { PopupGallery } from '@/components/shared'
import { IRoom } from '@/interface/hotel.interface'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SelectedRoomSummary = {
  id: number | string
  index: number
  title: string
  quantity: number
  pricePerNight: number
  totalPrice: number
}

type BookingRoomProps = {
  rooms: IRoom[]
  onChangeSelection?: (summary: SelectedRoomSummary[]) => void
  clearRoomIndex?: number | null
}

const BookingRoom = ({ rooms, onChangeSelection, clearRoomIndex }: BookingRoomProps) => {
  const [quantities, setQuantities] = useState<number[]>(() => rooms?.map(() => 0) ?? [])
  const [currentSlides, setCurrentSlides] = useState<number[]>(() => rooms?.map(() => 0) ?? [])
  const [openGalleryIndex, setOpenGalleryIndex] = useState<number | null>(null)

  useEffect(() => {
    setQuantities(rooms?.map(() => 0) ?? [])
    setCurrentSlides(rooms?.map(() => 0) ?? [])
  }, [rooms])

  useEffect(() => {
    if (clearRoomIndex !== null && clearRoomIndex !== undefined) {
      setQuantities((prev) => {
        const next = [...prev]
        if (next[clearRoomIndex] !== undefined) {
          next[clearRoomIndex] = 0
        }
        return next
      })
    }
  }, [clearRoomIndex])

  // Update parent component when quantities change
  useEffect(() => {
    if (onChangeSelection) {
      const summaries: SelectedRoomSummary[] = rooms.reduce((acc, room, idx) => {
        const quantity = quantities[idx] ?? 0
        if (!quantity) return acc

        const pricePerNight = Number(room?.acf?.price_reduced ?? room?.acf?.price ?? 0)

        acc.push({
          id: (room as any)?.id ?? (room as any)?.slug ?? idx,
          index: idx,
          title: room?.title ?? 'Room',
          quantity,
          pricePerNight,
          totalPrice: pricePerNight * quantity,
        })

        return acc
      }, [] as SelectedRoomSummary[])

      onChangeSelection(summaries)
    }
  }, [quantities, rooms, onChangeSelection])

  const handleChangeQuantity = (roomIndex: number, delta: number) => {
    setQuantities((prev) => {
      const next = prev.map((quantity, index) =>
        index === roomIndex ? Math.max(0, quantity + delta) : quantity,
      )
      return next
    })
  }

  const handleSlideChange = (roomIndex: number, activeIndex: number) => {
    setCurrentSlides((prev) => {
      const next = [...prev]
      next[roomIndex] = activeIndex
      return next
    })
  }

  const currentRoom = openGalleryIndex !== null ? rooms[openGalleryIndex] : null

  return (
    <>
      {currentRoom && (
        <PopupGallery
          open={openGalleryIndex !== null}
          setOpen={(open) => setOpenGalleryIndex(open ? openGalleryIndex : null)}
          items={
            currentRoom?.acf?.gallery?.map((url, i) => ({
              id: i,
              url,
              alt: `${currentRoom?.title} - Image ${i + 1}`,
            })) ?? []
          }
          initialIndex={openGalleryIndex !== null ? currentSlides[openGalleryIndex] : 0}
        />
      )}
      <section className='p-8 pr-0 rounded-[0.5rem] bg-white mt-8'>
        <div className='flex items-center space-x-[0.625rem] mb-6'>
          <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
            BOOKING ROOM & DORM
          </h3>
          <p className='text-[#2E2E2E]/60 text-[0.875rem] leading-[1.5]'>
            (* Prices may increase on weekends or holidays)
          </p>
        </div>
        <ScrollArea className='h-[50.75rem] pr-4 mr-4'>
          <div className='space-y-4'>
            {rooms?.map((room, index) => (
              <div
                key={index}
                className='rounded-[0.5rem] bg-[#f8f8f8] w-full flex overflow-hidden'
              >
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  className='w-[19.25rem]! group ml-0! mr-6! relative [&_.swiper-pagination-bullet]:size-[0.375rem] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-40 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet]:mx-[0.1875rem] [&_.swiper-pagination]:absolute! [&_.swiper-pagination]:left-[0.75rem]! [&_.swiper-pagination]:bottom-[0.75rem]! [&_.swiper-pagination]:w-fit! [&_.swiper-pagination]:opacity-0 hover:[&_.swiper-pagination]:opacity-100 transition-opacity duration-300'
                  grabCursor={true}
                  speed={800}
                  modules={[Pagination, Navigation]}
                  navigation={{
                    prevEl: `.swiper-button-prev-${index}`,
                    nextEl: `.swiper-button-next-${index}`,
                  }}
                  onSlideChange={(swiper) => handleSlideChange(index, swiper.activeIndex)}
                >
                  <div className='h-[1.625rem] p-[0.375rem] bg-[#2e2e2e]/40 backdrop-blur-[4px] rounded-[0.25rem] absolute top-[0.625rem] left-[0.625rem] z-[1] flex-center'>
                    <ImageIcon className='size-[0.875rem] text-white' />
                    <p className='text-white text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem] ml-1'>
                      {String(currentSlides[index] + 1).padStart(2, '0')}/
                      {String(room?.acf?.gallery?.length ?? 0).padStart(2, '0')}
                    </p>
                  </div>
                  {room?.acf?.gallery?.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className='overflow-hidden'
                    >
                      <Image
                        src={image}
                        alt={room?.title}
                        width={310}
                        height={230}
                        className='h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300'
                      />
                    </SwiperSlide>
                  ))}
                  <div className='navigation flex-between absolute-y-center w-full px-[0.375rem] z-[1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button
                      className={`swiper-button-prev-${index} flex-center size-[1.75rem] cursor-pointer pointer-events-auto`}
                    >
                      <ArrowIcon className='size-[1.75rem]' />
                    </button>
                    <button
                      className={`swiper-button-next-${index} flex-center size-[1.75rem] cursor-pointer pointer-events-auto`}
                    >
                      <ArrowIcon className='size-[1.75rem] rotate-180' />
                    </button>
                  </div>
                  <ExtendIcon
                    className='size-[1.125rem] absolute right-[0.75rem] bottom-[0.75rem] z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'
                    onClick={() => setOpenGalleryIndex(index)}
                  />
                  <div className='absolute w-full h-full top-0 left-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_39.83%,rgba(0,0,0,0.30)_91.4%)] z-[1] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
                </Swiper>

                <div className='pt-3 pb-[1.125rem]'>
                  <div className='flex space-x-1 items-center rounded-[0.25rem] bg-[#2BAB7D] h-[1.25rem] px-2 w-fit'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      fill='none'
                      className='size-3'
                    >
                      <path
                        d='M6.00141 7.08375C4.93641 7.08375 4.06641 6.21875 4.06641 5.14875C4.06641 4.07875 4.93641 3.21875 6.00141 3.21875C7.06641 3.21875 7.93641 4.08375 7.93641 5.15375C7.93641 6.22375 7.06641 7.08375 6.00141 7.08375ZM6.00141 3.96875C5.35141 3.96875 4.81641 4.49875 4.81641 5.15375C4.81641 5.80875 5.34641 6.33875 6.00141 6.33875C6.65641 6.33875 7.18641 5.80875 7.18641 5.15375C7.18641 4.49875 6.65141 3.96875 6.00141 3.96875Z'
                        fill='white'
                      />
                      <path
                        d='M6.00082 11.38C5.26082 11.38 4.51582 11.1 3.93582 10.545C2.46082 9.125 0.830821 6.86 1.44582 4.165C2.00082 1.72 4.13582 0.625 6.00082 0.625C6.00082 0.625 6.00082 0.625 6.00582 0.625C7.87082 0.625 10.0058 1.72 10.5608 4.17C11.1708 6.865 9.54082 9.125 8.06582 10.545C7.48582 11.1 6.74082 11.38 6.00082 11.38ZM6.00082 1.375C4.54582 1.375 2.67582 2.15 2.18082 4.33C1.64082 6.685 3.12082 8.715 4.46082 10C5.32582 10.835 6.68082 10.835 7.54582 10C8.88082 8.715 10.3608 6.685 9.83082 4.33C9.33082 2.15 7.45582 1.375 6.00082 1.375Z'
                        fill='white'
                      />
                    </svg>
                    <p className='text-white text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                      {room?.taxonomies?.['locations']?.[0]?.name}
                    </p>
                  </div>
                  <h4 className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1] w-[21.8125rem] line-clamp-2 mt-[0.625rem]'>
                    {room?.title}
                  </h4>
                  <div className='my-[1.125rem] space-y-5'>
                    <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                      Area <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.area}</strong>
                    </p>
                    <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                      Room type{' '}
                      <strong className='text-[#2e2e2e] ml-1'>
                        {room?.taxonomies?.['room-and-dorm-type']
                          ?.map((type) => type.name)
                          .join(', ')}
                      </strong>
                    </p>
                    <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                      Number of beds{' '}
                      <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.number_of_beds}</strong>
                    </p>
                  </div>
                  <Separator className='w-[31.875rem] bg-[#EDEDED] mb-[1.125rem]' />
                  <div className='flex items-center justify-between'>
                    <div>
                      {room?.acf?.price_reduced ? (
                        <div className='flex space-x-[0.375rem]'>
                          <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1]'>
                            {room?.acf?.price_reduced} USD
                          </p>
                          <p className='text-[#2e2e2e]/40 line-through font-phu-du text-[1.125rem] font-medium leading-[1.1] relative'>
                            {room?.acf?.price} USD
                            <p className='text-[#2e2e2e]/40 font-montserrat text-[0.75rem] font-medium leading-[1.6] absolute -top-1 -right-10'>
                              /night
                            </p>
                          </p>
                        </div>
                      ) : (
                        <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1]'>
                          {room?.acf?.price} USD
                        </p>
                      )}
                    </div>
                    <div className='flex items-center space-x-[0.625rem]'>
                      <button
                        type='button'
                        onClick={() => handleChangeQuantity(index, -1)}
                        className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={quantities[index] === 0}
                        aria-label='Decrease room quantity'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='12'
                          height='2'
                          viewBox='0 0 12 2'
                          fill='none'
                          className='w-[0.58rem] h-auto'
                        >
                          <path
                            d='M1 1H10.3333'
                            stroke='#2E2E2E'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                      <p className='text-[#2e2e2e] text-[0.75rem] font-semibold leading-[1.6] tracking-[-0.0075rem]'>
                        {quantities[index]} Room
                      </p>
                      <button
                        type='button'
                        onClick={() => handleChangeQuantity(index, 1)}
                        className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                        aria-label='Increase room quantity'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          className='size-4'
                        >
                          <path
                            d='M4 8H12'
                            stroke='#2E2E2E'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M8 12V4'
                            stroke='#2E2E2E'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  )
}

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    {...props}
  >
    <path
      d='M10.7098 13.2708H3.26067C2.37401 13.2708 1.56317 12.8217 1.09651 12.0633C0.629841 11.305 0.589007 10.3833 0.985674 9.58417L1.98901 7.57166C2.31567 6.91833 2.84067 6.51 3.42984 6.44583C4.01901 6.38166 4.61984 6.67333 5.07484 7.23916L5.20317 7.4025C5.45984 7.7175 5.75734 7.88666 6.04901 7.8575C6.34067 7.83416 6.60901 7.62416 6.80734 7.26833L7.90984 5.27916C8.36484 4.45666 8.97151 4.03083 9.63067 4.06C10.284 4.095 10.844 4.585 11.2173 5.44833L13.0432 9.7125C13.3815 10.5 13.2998 11.3983 12.8273 12.1158C12.3607 12.845 11.5673 13.2708 10.7098 13.2708ZM3.59317 7.32083C3.56984 7.32083 3.54651 7.32083 3.52317 7.32666C3.23151 7.35583 2.96317 7.58916 2.77067 7.96833L1.76734 9.98083C1.50484 10.5 1.53401 11.1125 1.83734 11.6083C2.14067 12.1042 2.67734 12.4017 3.26067 12.4017H10.704C11.2757 12.4017 11.7832 12.1275 12.0982 11.6492C12.4132 11.1708 12.4657 10.5992 12.2382 10.0742L10.4123 5.81C10.1907 5.285 9.88151 4.96416 9.58401 4.9525C9.30984 4.935 8.95401 5.22666 8.67401 5.7225L7.57151 7.71166C7.23317 8.31833 6.70234 8.6975 6.12484 8.75C5.54734 8.79666 4.95817 8.51666 4.52067 7.96833L4.39234 7.805C4.14734 7.48416 3.86734 7.32083 3.59317 7.32083Z'
      fill='white'
    />
    <path
      d='M4.06641 5.10547C2.86474 5.10547 1.87891 4.12547 1.87891 2.91797C1.87891 1.71047 2.85891 0.730469 4.06641 0.730469C5.27391 0.730469 6.25391 1.71047 6.25391 2.91797C6.25391 4.12547 5.27391 5.10547 4.06641 5.10547ZM4.06641 1.60547C3.34307 1.60547 2.75391 2.19464 2.75391 2.91797C2.75391 3.6413 3.34307 4.23047 4.06641 4.23047C4.78974 4.23047 5.37891 3.6413 5.37891 2.91797C5.37891 2.19464 4.78974 1.60547 4.06641 1.60547Z'
      fill='white'
    />
  </svg>
)

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='28'
    height='28'
    viewBox='0 0 28 28'
    fill='none'
    {...props}
  >
    <path
      d='M11.1647 6.92188L4.08301 14.0035L11.1647 21.0852'
      stroke='white'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M23.9162 14H4.28125'
      stroke='white'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ExtendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    {...props}
  >
    <path
      d='M4.14859 0C4.27349 0 4.39327 0.0496157 4.48159 0.137932C4.5699 0.226249 4.61952 0.346031 4.61952 0.47093C4.61952 0.595828 4.5699 0.715611 4.48159 0.803928C4.39327 0.892244 4.27349 0.94186 4.14859 0.94186H1.60808L5.1997 4.53348C5.28545 4.62234 5.33286 4.74132 5.33173 4.8648C5.3306 4.98828 5.28101 5.10637 5.19366 5.19364C5.1063 5.28092 4.98816 5.33039 4.86469 5.3314C4.74121 5.33242 4.62227 5.28489 4.5335 5.19907L0.941871 1.60744V4.14858C0.941871 4.27348 0.892256 4.39326 0.803939 4.48158C0.715623 4.56989 0.59584 4.61951 0.470941 4.61951C0.346043 4.61951 0.22626 4.56989 0.137943 4.48158C0.0496268 4.39326 1.15037e-05 4.27348 1.15037e-05 4.14858V0.47093C1.15037e-05 0.346031 0.0496268 0.226249 0.137943 0.137932C0.22626 0.0496157 0.346043 0 0.470941 0H4.14859ZM9.35142 13.5C9.22652 13.5 9.10674 13.4504 9.01842 13.3621C8.93011 13.2737 8.88049 13.154 8.88049 13.0291C8.88049 12.9042 8.93011 12.7844 9.01842 12.6961C9.10674 12.6077 9.22652 12.5581 9.35142 12.5581H11.8919L8.30031 8.9665C8.25535 8.92304 8.2195 8.87106 8.19484 8.81359C8.17019 8.75613 8.15723 8.69432 8.15672 8.63179C8.1562 8.56927 8.16815 8.50726 8.19185 8.44939C8.21556 8.39153 8.25055 8.33897 8.29479 8.29477C8.33903 8.25058 8.39162 8.21563 8.44951 8.19198C8.5074 8.16833 8.56941 8.15644 8.63194 8.15702C8.69447 8.15759 8.75626 8.17061 8.8137 8.19532C8.87115 8.22002 8.92309 8.25592 8.96652 8.30092L12.5581 11.8925V9.35141C12.5581 9.28957 12.5703 9.22833 12.594 9.17119C12.6177 9.11406 12.6523 9.06214 12.6961 9.01841C12.7398 8.97468 12.7917 8.93999 12.8489 8.91633C12.906 8.89266 12.9672 8.88048 13.0291 8.88048C13.0909 8.88048 13.1522 8.89266 13.2093 8.91633C13.2664 8.93999 13.3183 8.97468 13.3621 9.01841C13.4058 9.06214 13.4405 9.11406 13.4642 9.17119C13.4878 9.22833 13.5 9.28957 13.5 9.35141V13.0291C13.5 13.289 13.289 13.5 13.0291 13.5H9.35142Z'
      fill='white'
    />
  </svg>
)

export default BookingRoom
