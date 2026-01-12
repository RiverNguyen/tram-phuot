import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * BlogListingSchema
 * -----------------
 * Mục đích:
 * - Khai báo trang danh sách blog
 * - Sử dụng CollectionPage để liệt kê các bài viết
 *
 * Vị trí render:
 * - app/[locale]/(main)/(en)/blogs/page.tsx
 * - app/[locale]/(main)/(vi)/danh-sach-tin-tuc/page.tsx
 */
export default function BlogListingSchema({
  lang,
  name,
  description,
  url,
}: {
  lang: string
  name: string
  description: string
  url: string
}) {
  // Đảm bảo URL có đầy đủ domain nếu chưa có
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${fullUrl}#list`,
    },
  }
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
