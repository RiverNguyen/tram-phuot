import DetailBlog from '@/modules/detail-blog'
import blogService from '@/services/blog'

export default async function page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const blog = await blogService.getDetail(slug)

  const typeNews = blog?.taxonomies['type-news'].map((tax) => tax.slug).join(',')
  const { data: relatedBlogs } = await blogService.getRelated({ locale, typeNews, limit: 3 })

  return (
    <DetailBlog
      blog={blog}
      relatedBlogs={relatedBlogs}
    />
  )
}
