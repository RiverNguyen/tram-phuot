interface BannerTitleProps {
  title: string
}

export const BannerTitle = ({ title }: BannerTitleProps) => {
  return (
    <div className='bottom-[3.53rem] left-[6.28rem] absolute z-[3] xsm:left-[0.9375rem] xsm:right-4 xsm:bottom-[17.375rem]'>
      <div className='banner-pagination flex mb-[2rem] space-x-[0.375rem] xsm:mb-3' />
      <h2
        className='text-white font-phu-du text-[3rem] leading-[1.03] tracking-[0.03rem] whitespace-pre-line xsm:text-[1.875rem] xsm:leading-[1.03] xsm:tracking-[0.01875rem] xsm:whitespace-normal'
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  )
}
