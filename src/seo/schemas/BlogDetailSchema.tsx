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
  description,
  lang,
}: {
  title: string
  url: string
  image?: string | { url: string; alt?: string }
  published: string
  description?: string
  lang: string
}) {
  // Xử lý image - có thể là string hoặc object
  let imageUrl: string | undefined
  if (typeof image === 'string') {
    imageUrl = image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`
  } else if (image?.url) {
    imageUrl = image.url.startsWith('http') ? image.url : `${SEO_CONFIG.siteUrl}${image.url}`
  }

  // Đảm bảo URL có đầy đủ domain
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`

  const schema: {
    '@context': string
    '@type': string
    headline: string
    url: string
    image?: string | string[]
    datePublished: string
    inLanguage: string
    author: { '@id': string }
    publisher: { '@id': string }
    description?: string
  } = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    url: fullUrl,
    datePublished: published,
    inLanguage: lang,
    author: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    publisher: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
  }

  if (imageUrl) {
    schema.image = imageUrl
  }

  if (description) {
    schema.description = description
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
