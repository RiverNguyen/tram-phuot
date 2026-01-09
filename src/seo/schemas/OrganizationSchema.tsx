import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * OrganizationSchema
 * ------------------
 * Mục đích:
 * - Khai báo thực thể thương hiệu Trạm Phượt
 * - Là schema gốc cho toàn bộ website
 * - Được tham chiếu bởi WebSite, Article, JobPosting, Project...
 *
 * Vị trí render:
 * - app/layout.tsx (render 1 lần duy nhất)
 */
export default function OrganizationSchema({ lang }: { lang: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    inLanguage: lang,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    },
    sameAs: SEO_CONFIG.sameAs,
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
