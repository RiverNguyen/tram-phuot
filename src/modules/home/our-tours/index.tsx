import Image from 'next/image'

const OurTours = () => {
  return (
    <section className='w-full h-[70rem] relative mt-[-15.8rem] z-[3] xsm:mt-[-5rem]'>
      <Image
        fill
        src='/home/our-tours/bg-pc.svg'
        alt='our-tours'
        className='w-full h-full object-cover xsm:hidden'
      />
      <Image
        fill
        src='/home/our-tours/bg-mb.webp'
        alt='our-tours'
        className='w-full h-full object-cover sm:hidden'
      />
      <Image
        src={'/home/our-tours/decor.webp'}
        alt='decor'
        className='w-full h-full object-cover absolute top-0 left-0 xsm:hidden'
        width={1980}
        height={1120}
      />
    </section>
  )
}

export default OurTours
