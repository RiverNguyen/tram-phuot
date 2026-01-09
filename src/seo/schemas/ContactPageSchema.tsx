import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * ContactPageSchema
 * -----------------
 * Mục đích:
 * - Khai báo trang liên hệ
 * - Hỗ trợ ContactPage schema cho SEO
 *
 * Vị trí render:
 * - app/lien-he/page.tsx
 */
export default function ContactPageSchema({ lang, name }: { lang: string; name: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SEO_CONFIG.siteUrl}/lien-he`,
    name,
    inLanguage: lang,
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
