import Banner from './banner'
import FeturedNews from './fetured-news'
import WrapperBlogList from './news-list/WrapperBlogList'
import blogsService from '@/services/blog'

export default async function Blogs({
  locale,
  searchParams,
}: {
  locale: string
  searchParams: {
    kind?: string
    ['type-news']?: string
    sort?: string
    paged?: string
  }
}) {
  const [blogs, taxonomies, blogsPage, featuredNews] = await Promise.all([
    blogsService.getBlogs({ locale, ...searchParams }),
    blogsService.getTaxonomies(locale),
    blogsService.getBlogsPage(locale),
    blogsService.getBlogsFeaturedNews(locale),
  ])

  const hasFilters =
    !!searchParams?.['type-news'] ||
    !!searchParams?.kind ||
    !!searchParams?.sort ||
    (searchParams?.paged ? Number(searchParams.paged) > 1 : false)

  const blogsData = hasFilters
    ? await blogsService.getBlogs({
        locale,
        kind: searchParams?.kind,
        typeNews: searchParams?.['type-news'],
        sort: searchParams?.sort || 'newest-first',
        paged: searchParams?.paged,
      })
    : blogs

  return (
    <main className='relative h-full w-full bg-[#FDF4ED]'>
      <Banner
        locale={locale}
        data={blogsPage?.acf}
      />
      <div className='xsm:gap-0 xsm:py-[2.5rem] relative mx-auto flex h-full w-full max-w-[87.5rem] flex-col gap-[4.5rem] py-[5rem] bg-[url("/uu-dai/bg.webp")] bg-cover bg-top'>
        <FeturedNews
          featuredNewsData={featuredNews}
          title={blogsPage?.acf?.title_1}
          locale={locale}
        />
        <WrapperBlogList
          blogsData={blogsData?.data}
          taxonomies={taxonomies?.data}
          title={blogsPage?.acf?.title_2}
          totalPages={blogsData?.totalPages}
        />
      </div>
    </main>
  )
}
