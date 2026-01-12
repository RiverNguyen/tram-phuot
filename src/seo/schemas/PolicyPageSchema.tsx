import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * PolicyPageSchema
 * ----------------
 * Mục đích:
 * - Khai báo trang chính sách
 * - Sử dụng WebPage schema cho trang chính sách
 *
 * Vị trí render:
 * - app/chinh-sach/page.tsx
 */
export default function PolicyPageSchema({
  lang,
  name,
  description,
}: {
  lang: string
  name: string
  description: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SEO_CONFIG.siteUrl}/chinh-sach#webpage`,
    url: `${SEO_CONFIG.siteUrl}/chinh-sach`,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
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
