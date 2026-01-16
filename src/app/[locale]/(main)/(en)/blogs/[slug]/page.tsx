import ENDPOINTS from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import DetailBlog from '@/modules/detail-blog'
import blogService from '@/services/blog'
import metadataValues from '@/utils/metadataValues'
import { Metadata } from 'next'
import BlogDetailSchema from '@/seo/schemas/BlogDetailSchema'
import { SEO_CONFIG } from '@/seo/seo.config'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.blogs.rank_math_detail[locale as keyof typeof ENDPOINTS.blogs.rank_math_detail](slug),
  )
  return metadataValues(res)
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const blog = await blogService.getDetail(slug)

  const typeNews = Array.isArray(blog?.taxonomies['type-news'])
    ? blog.taxonomies['type-news'].map((tax) => tax.slug).join(',')
    : ''
  const { data: relatedBlogs } = await blogService.getRelated({ locale, typeNews, limit: 4 })

  // Lấy metadata cho schema
  const metadata = await getMetaDataRankMath(
    ENDPOINTS.blogs.rank_math_detail[locale as keyof typeof ENDPOINTS.blogs.rank_math_detail](slug),
  )

  // Xây dựng URL cho blog
  const blogUrl = `${SEO_CONFIG.siteUrl}/blogs/${slug}`

  // Xử lý image
  const blogImage = blog?.thumbnail?.url
    ? blog.thumbnail.url.startsWith('http')
      ? blog.thumbnail.url
      : `${SEO_CONFIG.siteUrl}${blog.thumbnail.url}`
    : undefined

  return (
    <>
      <BlogDetailSchema
        title={blog?.title || ''}
        url={blogUrl}
        image={blogImage ? { url: blogImage, alt: blog?.thumbnail?.alt } : undefined}
        published={blog?.date || ''}
        description={metadata?.description || blog?.excerpt || blog?.acf?.short_description}
        lang={locale}
      />
      <DetailBlog
        blog={blog}
        relatedBlogs={relatedBlogs}
      />
    </>
  )
}
