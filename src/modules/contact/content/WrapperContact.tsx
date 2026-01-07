import Image from 'next/image'
import FormContact from './FormContact'
import InfoContact from './InfoContact'

export default function WrapperContact() {
  return (
    <div className='relative mx-auto h-full w-full max-w-[87.5rem] py-[5rem] grid grid-cols-2 gap-[3rem]'>
      {/* <Image
        src='/contact/contact.webp'
        alt='contact bg'
        width={1600}
        height={796}
        priority
        className='absolute bottom-0 left-0 h-auto w-full object-cover'
      /> */}

      <FormContact />
      <InfoContact />
    </div>
  )
}
