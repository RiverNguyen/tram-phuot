import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='relative h-[85.8125rem] w-full overflow-hidden'>
      <Image
        src='/footer/footer_bg.webp'
        alt='Footer Background'
        width={4096}
        height={1952}
        className='absolute -top-[3.5rem] h-[70rem] w-full left-0 object-cover -scale-x-[1]'
      />
      {/* Overlay */}
      <div className='absolute inset-0 top-[2.8rem] bg-black/28 h-[83.01219rem] w-full z-1'></div>
      <Image
        src='/footer/vector_left.svg'
        alt='Footer Vector Left'
        width={0}
        height={0}
        className='absolute left-0 top-[8.51rem] h-[35.47775rem] w-auto object-cover z-2'
      />
      <Image
        src='/footer/vector_right.svg'
        alt='Footer Vector Right'
        width={0}
        height={0}
        className='absolute right-0 top-0 h-[35.47775rem] w-auto object-cover z-2'
      />

      {/* Content */}
      <div className='absolute top-[10.12rem] left-0 right-0 w-full mx-auto max-w-[89.5rem] z-3'>
        <h3 className='font-motherland text-[3.3125rem] leading-normal text-stroke-[3.61px] text-stroke-[#FDF6EC]  text-[#F56E0A] rotate-[-5.037deg]'>
          Vietnam on the go!!
        </h3>
        <h2>Let's explore endless Vietnam</h2>
      </div>
    </footer>
  )
}
