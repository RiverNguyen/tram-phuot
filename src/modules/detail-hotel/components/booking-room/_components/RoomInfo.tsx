'use client'

import { IRoom } from '@/interface/hotel.interface'

type RoomInfoProps = {
  room: IRoom
}

const RoomInfo = ({ room }: RoomInfoProps) => {
  return (
    <>
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
      <h4 className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1] w-[21.8125rem] line-clamp-2 mt-[0.625rem] xsm:w-full xsm:line-clamp-2 xsm:mt-4 xsm:text-[1rem] xsn:leading-[1.0]'>
        {room?.title}
      </h4>
      <div className='my-[1.125rem] xsm:mt-4 space-y-5 xsm:space-y-2'>
        <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
          Area <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.area}</strong>
        </p>
        <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
          Room type{' '}
          <strong className='text-[#2e2e2e] ml-1'>
            {room?.taxonomies?.['room-and-dorm-type']?.map((type) => type.name).join(', ')}
          </strong>
        </p>
        <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
          Number of beds{' '}
          <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.number_of_beds}</strong>
        </p>
      </div>
    </>
  )
}

export default RoomInfo
