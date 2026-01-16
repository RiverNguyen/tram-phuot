import { IBlog } from '@/interface/blogs.interface'
import FeturedNewsPC from './FeturedNewsPC'
import FeturedNewsMobile from './FeturedNewsMobile'

export default function FeturedNews({
  featuredNewsData,
  title,
  locale,
}: {
  featuredNewsData: IBlog[] | null | undefined
  title: string
  locale: string
}) {
  // Don't render if no data
  if (!featuredNewsData || !Array.isArray(featuredNewsData) || featuredNewsData.length === 0) {
    return null
  }

  const baseHref = locale === 'en' ? '/blogs' : '/vi/danh-sach-tin-tuc'
  return (
    <div className='xsm:gap-0 flex w-full flex-col gap-[2rem]'>
      <h2 className='xsm:px-[1rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du text-[3rem] leading-[3rem] font-medium text-[#2E2E2E] uppercase'>
        {title}
      </h2>

      <div className='xsm:hidden'>
        <FeturedNewsPC
          featuredNewsData={featuredNewsData}
          baseHref={baseHref}
        />
      </div>
      <div className='hidden xsm:flex xsm:gap-[1.25rem] xsm:px-[1rem] xsm:pb-[2.5rem] xsm:pt-[1.25rem] overflow-x-auto hidden_scroll'>
        {featuredNewsData?.map((blog: IBlog) => (
          <FeturedNewsMobile
            blog={blog}
            baseHref={baseHref}
            key={blog?.id}
          />
        ))}
      </div>
    </div>
  )
}
