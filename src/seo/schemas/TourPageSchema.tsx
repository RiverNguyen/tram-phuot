import { SEO_CONFIG } from '@/seo/seo.config'

/**
 * TourPageSchema
 * --------------
 * Mục đích:
 * - Khai báo tour/du lịch dưới dạng Product schema
 * - Phục vụ SEO cho trang chi tiết tour
 * - Hỗ trợ hiển thị rich snippets trong kết quả tìm kiếm
 *
 * Vị trí render:
 * - app/[locale]/(main)/(en)/tours/[slug]/page.tsx
 * - app/[locale]/(main)/(vi)/danh-sach-tour/[slug]/page.tsx
 */
export default function TourPageSchema({
  title,
  url,
  image,
  price,
  description,
  published,
  duration,
  location,
  lang,
}: {
  title: string
  url: string
  image?: string
  price?: string
  description?: string
  published?: string
  duration?: string
  location?: string
  lang: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: title,
    url,
    image: image ? (Array.isArray(image) ? image : [image]) : undefined,
    description,
    inLanguage: lang,
    datePublished: published,
    brand: {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    offers: price
      ? {
          '@type': 'Offer',
          price: price,
          priceCurrency: 'VND',
          availability: 'https://schema.org/InStock',
          url,
        }
      : undefined,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.siteUrl}#website`,
    },
  }

  // Thêm thông tin về địa điểm nếu có
  if (location) {
    schema.areaServed = {
      '@type': 'Place',
      name: location,
    }
  }

  // Thêm thông tin về thời lượng tour nếu có
  if (duration) {
    schema.additionalProperty = [
      {
        '@type': 'PropertyValue',
        name: 'Duration',
        value: duration,
      },
    ]
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
