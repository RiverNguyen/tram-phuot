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
  items,
}: {
  lang: string
  name: string
  description: string
  url: string
  items?: Array<{
    name: string
    url: string
    description?: string
    image?: string
    datePublished?: string
  }>
}) {
  // Đảm bảo URL có đầy đủ domain nếu chưa có
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`

  // Xây dựng ItemList nếu có items
  const itemListElement = items
    ? items.map((item, index) => {
        const itemUrl = item.url.startsWith('http') ? item.url : `${SEO_CONFIG.siteUrl}${item.url}`
        const itemImage = item.image
          ? item.image.startsWith('http')
            ? item.image
            : `${SEO_CONFIG.siteUrl}${item.image}`
          : undefined

        const listItem: {
          '@type': string
          position: number
          name: string
          url: string
          description?: string
          image?: string
          datePublished?: string
        } = {
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: itemUrl,
        }

        if (item.description) {
          listItem.description = item.description
        }

        if (itemImage) {
          listItem.image = itemImage
        }

        if (item.datePublished) {
          listItem.datePublished = item.datePublished
        }

        return listItem
      })
    : []

  const schema: {
    '@context': string
    '@type': string
    '@id': string
    url: string
    name: string
    description: string
    inLanguage: string
    isPartOf: { '@id': string }
    about: { '@id': string }
    mainEntity: {
      '@type': string
      '@id': string
      numberOfItems?: number
      itemListElement?: Array<{[key: string]: unknown}>
    }
  } = {
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

  // Thêm ItemList chi tiết nếu có items
  if (items && items.length > 0) {
    schema.mainEntity.numberOfItems = items.length
    schema.mainEntity.itemListElement = itemListElement
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
