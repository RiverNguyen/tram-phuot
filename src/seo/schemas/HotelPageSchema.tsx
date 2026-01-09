import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * HotelPageSchema
 * ---------------
 * Mục đích:
 * - Khai báo khách sạn dưới dạng LodgingBusiness schema
 * - Phục vụ SEO cho trang chi tiết khách sạn
 * - Hỗ trợ hiển thị rich snippets trong kết quả tìm kiếm
 *
 * Vị trí render:
 * - app/[locale]/(main)/(en)/hotels/[slug]/page.tsx
 * - app/[locale]/(main)/(vi)/danh-sach-khach-san/[slug]/page.tsx
 */
export default function HotelPageSchema({
  title,
  url,
  image,
  address,
  description,
  rating,
  price,
  lang,
}: {
  title: string
  url: string
  image?: string | string[]
  address?: string
  description?: string
  rating?: string | number
  price?: string
  lang: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${url}#lodgingbusiness`,
    name: title,
    url,
    image: image ? (Array.isArray(image) ? image : [image]) : undefined,
    description,
    inLanguage: lang,
    address: address
      ? {
          '@type': 'PostalAddress',
          addressLocality: address,
        }
      : undefined,
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: typeof rating === 'string' ? parseFloat(rating) : rating,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
    priceRange: price ? price : undefined,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.siteUrl}#website`,
    },
    owner: {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
  }

  // Loại bỏ các thuộc tính undefined
  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) {
      delete schema[key]
    }
  })

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
