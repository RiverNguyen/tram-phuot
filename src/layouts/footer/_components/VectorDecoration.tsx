import Image from 'next/image'

export default function VectorDecoration({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <Image
        src='/footer/d-vector_mobile.webp'
        alt='Footer Vector Mobile'
        width={396}
        height={660}
        className='absolute top-0 right-0 w-auto h-[15.23188rem] object-cover pointer-events-none select-none z-2'
      />
    )
  }

  return (
    <>
      <Image
        src='/footer/d-vector_left.svg'
        alt='Footer Vector Left'
        width={0}
        height={0}
        className='absolute left-0 top-[11.31rem] h-[35.47775rem] w-auto object-cover pointer-events-none select-none z-2'
      />
      <Image
        src='/footer/d-vector_right.svg'
        alt='Footer Vector Right'
        width={0}
        height={0}
        className='absolute right-0 top-0 h-[35.47775rem] w-auto pointer-events-none select-none object-cover z-2'
      />
    </>
  )
}
