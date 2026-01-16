import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Blogs from '@/modules/blogs'
import metadataValues from '@/utils/metadataValues'
import BlogListingSchema from '@/seo/schemas/BlogListingSchema'
import { SEO_CONFIG } from '@/seo/seo.config'
import blogsService from '@/services/blog'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }]
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.blogs.rank_math[locale as keyof typeof endpoints.blogs.rank_math],
  )
  return metadataValues(res)
}

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Lấy metadata và blogs cho schema
  const [metadata, blogs] = await Promise.all([
    getMetaDataRankMath(
      endpoints.blogs.rank_math[locale as keyof typeof endpoints.blogs.rank_math],
    ),
    blogsService.getBlogs({ locale, limit: 20 }),
  ])

  // Xây dựng URL cho trang danh sách
  const listingUrl = locale === 'en' ? '/blogs' : '/vi/danh-sach-tin-tuc'
  const fullListingUrl = `${SEO_CONFIG.siteUrl}${listingUrl}`

  // Chuẩn bị items cho schema
  const blogItems = blogs?.data?.map((blog) => ({
    name: blog.title,
    url: locale === 'en' ? `/blogs/${blog.slug}` : `/vi/danh-sach-tin-tuc/${blog.slug}`,
    description: blog.acf?.short_description,
    image: blog.thumbnail?.url
      ? blog.thumbnail.url.startsWith('http')
        ? blog.thumbnail.url
        : `${SEO_CONFIG.siteUrl}${blog.thumbnail.url}`
      : undefined,
    datePublished: blog.date || blog.published,
  })) || []

  return (
    <>
      <BlogListingSchema
        lang={locale}
        name={metadata?.title || 'Danh sách tin tức'}
        description={metadata?.description || ''}
        url={fullListingUrl}
        items={blogItems}
      />
      <Blogs locale={locale} />
    </>
  )
}
