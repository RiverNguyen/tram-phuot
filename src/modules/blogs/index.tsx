import Banner from './banner'
import FeturedNews from './fetured-news'
import NewsList from './news-list'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

export default async function Blogs({ locale }: { locale: string }) {
  const blogs = await fetchData({
    api: ENDPOINTS.blogs[locale as 'en' | 'vi'],
  })

  return (
    <main className='relative h-full w-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-center'>
      <Banner locale={locale} data={blogs?.acf} />
      <div className='xsm:gap-[2.25rem] xsm:py-[2.5rem] xsm:px-[1rem] relative mx-auto flex h-full w-full max-w-[87.5rem] flex-col gap-[4.5rem] py-[5rem]'>
        <FeturedNews />
        <NewsList />
      </div>
    </main>
  )
}
