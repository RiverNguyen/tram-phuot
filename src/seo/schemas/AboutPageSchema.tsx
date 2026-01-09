import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * AboutPageSchema
 * - Dùng riêng cho trang Giới thiệu
 * - Liên kết với Organization
 */
export default function AboutPageSchema({
  slug,
  name,
  lang,
}: {
  slug: string
  name: string
  lang: string
}) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${SEO_CONFIG.siteUrl}/${slug}#aboutpage`,

          // URL trang Giới thiệu
          url: `${SEO_CONFIG.siteUrl}/${slug}`,
          name: name,
          inLanguage: lang,

          // Trang này nói về Organization nào
          about: {
            '@type': 'Organization',
            '@id': `${SEO_CONFIG.siteUrl}#organization`,
          },

          // Thuộc website nào
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${SEO_CONFIG.siteUrl}#website`,
          },
        }),
      }}
    />
  )
}
