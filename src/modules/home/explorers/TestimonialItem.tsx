import Image from 'next/image'
import ICCircleDouble from '@/components/icons/ICCircle'
import ICOwl from '@/components/icons/ICOwl'
import { IReview } from '@/interface/homepage.interface'
import Link from 'next/link'

interface TestimonialItemProps {
  review: IReview
}
export default function TestimonialItem({ review }: TestimonialItemProps) {
  return (
    <div className='xsm:w-[18.75rem] xsm:h-[13.9375rem] xsm:p-[1rem] xsm:shadow-[0_8px_24px_0_rgba(0,0,0,0.04)] shrink-0 relative flex w-[23.75rem] h-[15.875rem] p-[1.25rem] flex-col gap-[0.75rem] rounded-[1rem] bg-white shadow-[0_261px_73px_0_rgba(200,182,157,0.00),0_167px_67px_0_rgba(200,182,157,0.01),0_94px_56px_0_rgba(200,182,157,0.05),0_42px_42px_0_rgba(200,182,157,0.09),0_10px_23px_0_rgba(200,182,157,0.10)] mr-6 xsm:mr-3'>
      <div className='xsm:gap-[0.75rem] flex items-center gap-[0.875rem]'>
        <Image
          src={review?.acf?.avatar || ''}
          alt='Avatar'
          width={40}
          height={40}
          className='xsm:size-[2.5rem] size-[3rem] rounded-[6.25rem] object-cover shrink-0'
        />
        <div className='flex flex-col gap-[0.375rem] '>
          <h3 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal text-[#2E2E2E] font-phu-du text-[1.25rem] font-medium leading-[1.5rem] tracking-[0.025rem]'>
            {review?.title}
          </h3>
          <p className='xsm:text-[0.75rem] xsm:tracking-normal text-[#2E2E2E] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] opacity-[0.3]'>
            {review?.published}
          </p>
        </div>
      </div>
      <div className='flex gap-[0.25rem]'>
        {Array.from({ length: review?.acf?.rate as unknown as number }, (_, index) => (
          <ICCircleDouble
            key={index}
            className='xsm:size-[1rem] size-[1.125rem]'
          />
        ))}
      </div>
      <div className='flex flex-col gap-[0.5rem] self-stretch'>
        <h4 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal text-[#1F4D37] font-phu-du text-[1.125rem] font-bold leading-[1.2375rem]'>
          {review?.acf?.rate_type}
        </h4>
        <p className='xsm:text-[0.875rem] xsm:leading-[1.3125rem] self-stretch text-[rgba(46,46,46,0.75)] font-montserrat text-[1rem] leading-[1.5rem] line-clamp-4'>
          {review?.acf?.desc}
        </p>
      </div>
      {/* <div className='xsm:size-[2rem] xsm:p-[0.39988rem_0.40206rem_0.35013rem_0.4rem] xsm:top-[1.25rem] xsm:right-[3.625rem] flex size-[2.5rem] px-[0.5rem] pt-[0.5rem] pb-[0.4375rem] justify-center items-center absolute right-[5.375rem] top-[1.75rem] rounded-[32.05125rem] bg-[#F2F2F2]'>
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
      </div> */}
      <div className='flex items-center space-x-[0.625rem] absolute right-4 top-5'>
        {review?.acf?.soical_link?.map((link, index) => (
          <Link
            key={index}
            href={link?.link || ''}
            target='_blank'
            className='lg:hover:scale-110 transition-all duration-300'
          >
            <Image
              src={link?.image || ''}
              alt='Social Link'
              width={32}
              height={32}
              className='size-8 object-cover'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
