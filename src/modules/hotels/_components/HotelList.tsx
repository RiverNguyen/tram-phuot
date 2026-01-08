import Image from 'next/image'
import ICLocation from '@/components/icons/ICLocation'
import ICChevronright from '@/components/icons/ICChevronright'
import Link from 'next/link'
import { IHotel } from '@/interface/hotel.interface'
import { useParams } from 'next/navigation'
import ICStar from '@/components/icons/ICStar'

export default function HotelList({ data }: { data: IHotel[] }) {
  const { locale } = useParams()

  return (
    <div className='xsm:grid-cols-1 grid w-full grid-cols-4 gap-x-[1.125rem] gap-y-[1.5rem] gap-y-[2rem]'>
      {Array.isArray(data) &&
        data.map((hotel) => {
          const href =
            locale === 'en' ? `/hotels/${hotel.slug}` : `/danh-sach-khach-san/${hotel.slug}`
          return (
            <Link
              href={href}
              key={hotel?.id}
              className='xsm:h-[31.03531rem] xsm:rounded-[0.56044rem] group relative h-[22.6875rem] w-full overflow-hidden rounded-[0.5rem] bg-[#FFFCE3]'
            >
              {/* background */}
              <Image
                src={hotel?.thumbnail.url}
                alt='hotel card'
                fill
                className='object-cover transition-all duration-500 ease-[cubic-bezier(0.65,0.01,0.28,0.98)] lg:group-hover:scale-107'
              />
              {/* Hotel Amenities */}
              {Array.isArray(hotel?.taxonomies['hotel-amenities']) && (
                <div className='xsm:px-[0.84069rem] xsm:py-[0.70056rem] absolute top-0 left-0 inline-flex w-full px-[0.75rem] py-[0.625rem]'>
                  <div className='xsm:h-[1.75144rem] xsm:px-[0.99013rem] xsm:rounded-tl-[0.84069rem] xsm:rounded-br-[0.84069rem] flex h-[1.5625rem] items-center justify-center rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] px-[0.88331rem]'>
                    <span className='xsm:text-[0.875rem] xsm:leading-[1.75rem] xsm:tracking-[-0.0175rem] font-phu-du line-clamp-1 text-[0.75rem] leading-[1.5rem] font-medium tracking-[-0.015rem] text-white'>
                      {hotel?.taxonomies['hotel-amenities'][0].name}
                    </span>
                  </div>
                </div>
              )}
              {/* content */}
              <div className='xsm:min-h-[13.36253rem] xsm:pt-[3.50288rem] xsm:px-[0.84069rem] xsm:pb-[1.33106rem] xsm:items-center absolute bottom-0 left-0 flex min-h-[12.375rem] w-full items-end justify-between bg-[linear-gradient(180deg,rgba(6,42,25,0.00)_0%,rgba(6,42,25,0.58)_24.91%,#062A19_100%)] px-[0.75rem] pt-[3.125rem] pb-[1.1875rem]'>
                <div className='xsm:gap-[0.91075rem] flex h-full w-full flex-col items-start gap-[0.8125rem]'>
                  {/* content top */}
                  <div className='xsm:gap-[0.84069rem] flex flex-col justify-center gap-[0.75rem] self-stretch'>
                    {/* hotel amenities */}
                    <div className='xsm:gap-[0.42031rem] flex w-full flex-wrap items-center gap-[0.375rem]'>
                      {Array.isArray(hotel?.taxonomies['hotel-amenities']) &&
                        hotel?.taxonomies['hotel-amenities'].map((amenity, i) => (
                          <div
                            key={i}
                            className='xsm:h-[1.2rem] flex h-[1.375rem] items-center justify-center rounded-[6.25rem] bg-[rgba(255,255,255,0.08)] p-[0.3125rem_0.375rem_0.3125rem_0.4375rem]'
                          >
                            <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.75rem] leading-[1.2rem] font-medium tracking-[-0.0075rem] text-white opacity-[0.8]'>
                              {amenity?.name}
                            </span>
                          </div>
                        ))}
                    </div>
                    {/* title */}
                    <h3 className='xsm:text-[1.25rem] xsm:leading-[1.25rem] xsm:tracking-normal font-phu-du line-clamp-2 text-[1rem] leading-[1.3rem] font-medium text-white uppercase'>
                      {hotel?.title}
                    </h3>
                  </div>

                  {/* star */}
                  {hotel?.acf?.banner?.review?.rating && (
                    <div className='flex items-center gap-[0.25rem]'>
                      {Array.from({
                        length: Math.round(Number(hotel.acf.banner.review.rating)),
                      }).map((_, index) => (
                        <ICStar
                          key={index}
                          className='xsm:size-[0.84069rem] size-[0.75rem]'
                        />
                      ))}
                    </div>
                  )}

                  {/* content bottom */}
                  <div className='xsm:justify-between xsm:items-end flex h-full w-full items-center gap-[0.625rem]'>
                    <div className='xsm:gap-[0.5rem] xsm:shrink-0 flex flex-1 flex-col items-start gap-[0.9375rem]'>
                      {/* line */}
                      <div className='xsm:h-[0.07006rem] h-[0.0625rem] w-full bg-[rgba(255,255,255,0.1)]' />
                      <div className='flex w-full items-start justify-between'>
                        <div className='xsm:gap-[0.28025rem] flex items-center gap-[0.25rem]'>
                          <ICLocation className='xsm:size-[0.84069rem] size-[0.75rem]' />
                          <span className='xsm:text-[1rem] xsm:leading-[1.6rem] xsm:tracking-[-0.01rem] font-montserrat text-[0.875rem] leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-white opacity-[0.48]'>
                            {Array.isArray(hotel?.taxonomies?.locations)
                              ? hotel?.taxonomies?.locations[0]?.name
                              : ''}
                          </span>
                        </div>
                        <p className='xsm:leading-[1.625rem] font-phu-du leading-[1.3rem] font-medium uppercase'>
                          <span className='xsm:text-[1.25rem] xsm:leading-[1.625rem] text-[1rem] text-[#FFC542]'>
                            {hotel?.acf?.price_person} USD
                          </span>
                          <span className='xsm:hidden text-[1rem] text-[#FFC542]'>/</span>
                          <span className='xsm:hidden text-[0.75rem] text-[rgba(255,255,255,0.80)]'>
                            person
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='xsm:size-[2.73588rem] xsm:py-[0.91188rem] xsm:shrink-0 xsm:rounded-[0.684rem] flex size-[2.25rem] items-center justify-center rounded-[0.5625rem] bg-[#F56E0A] py-[0.75rem]'>
                      <ICChevronright className='xsm:w-[0.684rem] xsm:h-[0.91194rem] h-[0.75rem] w-[0.5625rem]' />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}
