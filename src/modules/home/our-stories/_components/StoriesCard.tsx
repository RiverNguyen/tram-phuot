import { IOurStoriesData } from '@/interface/homepage.interface'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const StoriesCard = ({ story }: { story: IOurStoriesData }) => {
  const { locale } = useParams()
  const href = locale === 'en' ? `/blogs/${story.slug}` : `/danh-sach-tin-tuc/${story.slug}`

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link
      href={href}
      className='xsm:w-[15.6875rem] relative flex w-full max-w-[28.25rem] flex-col gap-[1.125rem] xsm:shrink-0'
    >
      <div className='xsm:left-[0.63rem] xsm:top-[0.56rem] xsm:h-[1.3125rem] xsm:px-[0.625rem] xsm:text-[0.625rem] xsm:leading-[1.25rem] xsm:tracking-[-0.0125rem] line-clamp-1 absolute top-[0.57rem] left-[0.63rem] flex h-[2rem] px-[0.88331rem] justify-center items-center rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-[#2BAB7D] text-white font-phu-du text-[0.71763rem] font-medium leading-[1.43525rem] tracking-[-0.01438rem] z-10'>
        {(story?.taxonomies as any)?.['type-news']?.[0]?.name || ''}
      </div>
      <div className='xsm:h-[10.47088rem] w-auto h-[18.875rem] rounded-[1.25rem] overflow-hidden group'>
        <Image
          src={story?.thumbnail?.url}
          alt='our stories'
          width={500}
          height={300}
          className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.65,0.01,0.28,0.98)]'
        />
      </div>

      <div className='xsm:w-full flex flex-col w-[27.08938rem]'>
        <h3 className='xsm:text-[1rem] xsm:leading-[1.3rem] xsm:tracking-normal line-clamp-2 text-[#1F4D37] font-phu-du text-[1.75rem] font-medium leading-[2.0625rem] tracking-[-0.03125rem] h-[4.3125rem] xsm:h-[2.5rem] mb-1'>
          {story?.title}
        </h3>
        <p className='line-clamp-1 text-[#FF7B4A] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
          {story?.published ? formatDate(story.published) : ''}
        </p>
      </div>
    </Link>
  )
}

export default StoriesCard
