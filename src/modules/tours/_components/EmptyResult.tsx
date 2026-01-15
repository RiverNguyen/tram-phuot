import Image from 'next/image'

export default function EmptyResult() {
  return (
    <div className='flex flex-col py-[4.5rem] items-center mx-auto'>
      <Image
        src={'/others/d-empty.svg'}
        alt=''
        width={0}
        height={0}
        className='size-[19.4375rem] object-cover xsm:size-[8rem]'
      />
      <h3 className='text-[rgba(46,46,46,0.75)] font-montserrat text-[1.5rem] font-bold leading-[1.95rem] tracking-[-0.05419rem] xsm:text-[0.875rem]'>
        KHÔNG TÌM THẤY KẾT QUẢ
      </h3>
    </div>
  )
}
