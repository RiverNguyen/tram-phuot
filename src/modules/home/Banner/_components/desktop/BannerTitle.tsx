interface BannerTitleProps {
  title: string
}

export const BannerTitle = ({ title }: BannerTitleProps) => {
  return (
    <div className='bottom-[3.53rem] left-[6.28rem] absolute z-[3]'>
      <div className='banner-pagination flex mb-[2rem] space-x-[0.375rem]' />
      <h2
        className='text-white font-phu-du text-[3rem] leading-[1.03] tracking-[0.03rem] whitespace-pre-line'
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  )
}

