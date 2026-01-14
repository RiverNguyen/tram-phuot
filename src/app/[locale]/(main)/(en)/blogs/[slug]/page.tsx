import ENDPOINTS from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import DetailBlog from '@/modules/detail-blog'
import blogService from '@/services/blog'
import metadataValues from '@/utils/metadataValues'
import { Metadata } from 'next'

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

  return (
    <DetailBlog
      blog={blog}
      relatedBlogs={relatedBlogs}
    />
  )
}
