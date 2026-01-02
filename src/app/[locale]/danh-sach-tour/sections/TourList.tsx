import Image from 'next/image'
import ICLocation from '@/components/icon/ICLocation'
import ICChevronright from '@/components/icon/ICChevronright'
import Link from 'next/link'

export const TOURS = [
  {
    id: 1,
    title: 'Ninh Binh River Caves and Ancient Capital Discovery',
    location: 'Hanoi',
    price: 9683,
    currency: 'USD',
    per: 'Person',
    image: '/danh-sach-tour/card.webp',
    tag: 'Tour and chill',
    tags: ['SUP', 'Scuba diving', '+12'],
  },
  {
    id: 2,
    title: 'Ninh Binh River Caves and Ancient Capital Discovery',
    location: 'Hanoi',
    price: 9683,
    currency: 'USD',
    per: 'Person',
    image: '/danh-sach-tour/card.webp',
    tag: 'Tour and chill',
    tags: ['SUP', '+12'],
  },
  {
    id: 3,
    title: 'Ninh Binh River Caves and Ancient Capital Discovery',
    location: 'Hanoi',
    price: 9683,
    currency: 'USD',
    per: 'Person',
    image: '/danh-sach-tour/card.webp',
    tag: 'Tour and chill',
  },
  {
    id: 4,
    title: 'Ninh Binh River Caves and Ancient Capital Discovery',
    location: 'Hanoi',
    price: 9683,
    currency: 'USD',
    per: 'Person',
    image: '/danh-sach-tour/card.webp',
    tag: 'Tour and chill',
    tags: ['SUP', 'Scuba diving', '+12'],
  },
  {
    id: 5,
    title: 'Ninh Binh River Caves and Ancient Capital Discovery',
    location: 'Hanoi',
    price: 9683,
    currency: 'USD',
    per: 'Person',
    image: '/danh-sach-tour/card.webp',
    tag: 'Tour and chill',
    tags: ['SUP', 'Scuba diving', '+12'],
  },
]

export default function TourList() {
  return (
    <div className='xsm:gap-[1.5rem] flex flex-col items-start gap-[2.5rem] self-stretch'>
      {/* filter */}

      {/* tour list */}
      <div className='xsm:grid-cols-1 gap-y-[1.5rem] w-full grid grid-cols-4 gap-y-[2rem] gap-x-[1.125rem]'>
        {TOURS?.map((tour) => (
          <Link
            href={`/danh-sach-tour/${tour?.id}`}
            key={tour?.id}
            className='xsm:h-[31.03531rem] xsm:rounded-[0.56044rem] group relative w-full h-[22.6875rem] rounded-[0.5rem] bg-[#FFFCE3] overflow-hidden'
          >
            {/* background */}
            <Image
              src={tour?.image}
              alt='tour card'
              fill
              className='object-cover lg:group-hover:scale-107 transition-all duration-500 ease-[cubic-bezier(0.65,0.01,0.28,0.98)]'
            />
            {/* tag */}
            <div className='xsm:px-[0.84069rem] xsm:py-[0.70056rem] absolute top-0 left-0 inline-flex px-[0.75rem] py-[0.625rem]'>
              <div className='xsm:h-[1.75144rem] xsm:px-[0.99013rem] xsm:rounded-tl-[0.84069rem] xsm:rounded-br-[0.84069rem] xsm:text-[0.875rem] xsm:leading-[1.75rem] xsm:tracking-[-0.0175rem] flex h-[1.5625rem] px-[0.88331rem] justify-center items-center rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] text-white font-phudu text-[0.75rem] font-medium leading-[1.5rem] tracking-[-0.015rem]'>
                {tour?.tag}
              </div>
            </div>
            {/* content */}
            <div className='xsm:min-h-[13.36253rem] xsm:pt-[3.50288rem] xsm:px-[0.84069rem] xsm:pb-[1.33106rem] xsm:items-center absolute bottom-0 left-0 flex w-full min-h-[12.375rem] pt-[3.125rem] px-[0.75rem] pb-[1.1875rem] justify-between items-end bg-[linear-gradient(180deg,rgba(6,42,25,0.00)_0%,rgba(6,42,25,0.58)_24.91%,#062A19_100%)]'>
              <div className='xsm:gap-[0.91075rem] h-full flex flex-col items-start gap-[0.8125rem]'>
                {/* content top */}
                <div className='xsm:gap-[0.84069rem] flex flex-col justify-center items-center gap-[0.75rem] self-stretch'>
                  {/* tag list */}
                  <div className='xsm:gap-[0.42031rem] w-full flex items-center gap-[0.375rem] flex-wrap'>
                    {tour?.tags?.map((tag, index) => (
                      <div
                        key={index}
                        className='xsm:h-[1.2rem] flex items-center justify-center p-[0.3125rem_0.375rem_0.3125rem_0.4375rem] rounded-[6.25rem] bg-[rgba(255,255,255,0.08)]'
                      >
                        <span className='xsm:opacity-[0.8] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* title */}
                  <h3 className='xsm:text-[1.25rem] xsm:leading-[1.25rem] xsm:tracking-normal line-clamp-2 text-white font-phudu text-[1rem] font-medium leading-[1.3rem] uppercase'>
                    {tour?.title}
                  </h3>
                </div>

                {/* content bottom */}
                <div className='xsm:justify-between xsm:items-end w-full h-full flex items-center gap-[0.625rem]'>
                  <div className='xsm:w-[15.20244rem] xsm:gap-[1.05088rem] xsm:shrink-0 flex flex-col items-start gap-[0.9375rem]'>
                    {/* line */}
                    <div className='xsm:w-[15.20244rem] xsm:h-[0.07006rem] w-[16.9375rem] h-[0.0625rem] bg-[rgba(255,255,255,0.08)]' />
                    <div className='w-full flex justify-between items-start'>
                      <div className='xsm:gap-[0.28025rem] flex items-center gap-[0.25rem]'>
                        <ICLocation className='xsm:size-[0.84069rem] size-[0.75rem]' />
                        <span className='xsm:text-[1rem] xsm:leading-[1.6rem] xsm:tracking-[-0.01rem] text-white font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem] opacity-[0.48]'>
                          {tour?.location}
                        </span>
                      </div>
                      <p className='xsm:leading-[1.625rem] font-phudu font-medium leading-[1.3rem] uppercase'>
                        <span className='xsm:text-[1.25rem] xsm:leading-[1.625rem] text-[#FFC542] text-[1rem]'>
                          {tour?.price} {tour?.currency}
                        </span>
                        <span className='xsm:hidden text-[#FFC542] text-[1rem]'>/</span>
                        <span className='xsm:hidden text-[rgba(255,255,255,0.80)] text-[0.75rem] '>
                          {tour?.per}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='xsm:size-[2.73588rem] xsm:py-[0.91188rem] xsm:shrink-0 xsm:rounded-[0.684rem] flex size-[2.25rem] py-[0.75rem] items-center justify-center rounded-[0.5625rem] bg-[#F56E0A]'>
                    <ICChevronright className='xsm:w-[0.684rem] xsm:h-[0.91194rem] w-[0.5625rem] h-[0.75rem]' />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
