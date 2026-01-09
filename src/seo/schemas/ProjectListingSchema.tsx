import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * ProjectListingSchema
 * --------------------
 * Mục đích:
 * - Khai báo trang danh sách dự án
 * - Sử dụng CollectionPage để liệt kê các dự án
 *
 * Vị trí render:
 * - app/[locale]/(main)/du-an/page.tsx
 */
export default function ProjectListingSchema({
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
