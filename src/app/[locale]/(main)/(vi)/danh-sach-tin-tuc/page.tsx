import Blogs from '@/modules/blogs'
export default async function BlogsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    category?: string
    kind?: string
    ['type-news']?: string
    sort?: string
    paged?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  return (
    <Blogs
      locale={locale}
      searchParams={sp}
    />
  )
}
