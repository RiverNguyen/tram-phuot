'use client'

type RoomPriceProps = {
  price?: string
  priceReduced?: string
}

const RoomPrice = ({ price, priceReduced }: RoomPriceProps) => {
  return (
    <div>
      {priceReduced ? (
        <div className='flex space-x-[0.375rem] xsm:flex-col'>
          <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1] relative'>
            {priceReduced} USD
            <span className='text-[#2e2e2e] font-montserrat text-[0.75rem] font-semibold leading-[1.6] absolute -top-1 -right-10 sm:hidden'>
              /night
            </span>
          </p>
          <p className='text-[#2e2e2e]/40 line-through font-phu-du text-[1.125rem] font-medium leading-[1.1] relative sm:mt-[0.375rem]'>
            {price} USD
            <span className='text-[#2e2e2e]/40 font-montserrat text-[0.75rem] font-medium leading-[1.6] absolute -top-1 -right-10 xsm:hidden'>
              /night
            </span>
          </p>
        </div>
      ) : (
        <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1] relative'>
          {price} USD
          <span className='text-[#2e2e2e] font-montserrat text-[0.75rem] font-semibold leading-[1.6] absolute -top-1 -right-10 sm:hidden'>
            /night
          </span>
        </p>
      )}
    </div>
  )
}

export default RoomPrice
