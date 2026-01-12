import {SEO_CONFIG} from '@/seo/seo.config'

/**
 * WebSiteSchema
 * -------------
 * Mục đích:
 * - Khai báo website chính thức của Trạm Phượt
 * - Liên kết website với Organization
 * - (Optional) hỗ trợ Sitelinks Search Box
 *
 * Vị trí render:
 * - app/layout.tsx (render 1 lần)
 */
export default function WebSiteSchema({
  lang,
  name,
}: {
  lang: string
  name: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}#website`,
    url: SEO_CONFIG.siteUrl,
    name,
    inLanguage: lang,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}
