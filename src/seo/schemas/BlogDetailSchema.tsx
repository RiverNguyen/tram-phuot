import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * BlogDetailSchema
 * ----------------
 * Mục đích:
 * - Khai báo bài viết blog
 * - Phục vụ SEO Article / BlogPosting
 *
 * Vị trí render:
 * - app/blogs/[slug]/page.tsx
 */
export default function BlogDetailSchema({
  title,
  url,
  image,
  published,
  lang,
}: {
  title: string
  url: string
  image?: string
  published: string
  lang: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    url,
    image,
    datePublished: published,
    inLanguage: lang,
    author: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    publisher: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
