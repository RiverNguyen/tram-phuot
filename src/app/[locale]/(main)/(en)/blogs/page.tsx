import Blogs from "@/modules/blogs";
export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <Blogs locale={locale} />
}
