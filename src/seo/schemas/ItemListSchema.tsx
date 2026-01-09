import {SEO_CONFIG} from '@/seo/seo.config'

/**
 * ItemListSchema
 * --------------
 * Mục đích:
 * - Khai báo danh sách items (blog posts, projects, services...)
 * - Hỗ trợ hiển thị rich snippets cho danh sách
 *
 * Vị trí render:
 * - Trang danh sách (blog listing, project listing...)
 *
 * @param name - Tên danh sách
 * @param description - Mô tả danh sách
 * @param items - Mảng các items: [{name: string, url: string, description?: string, image?: string}]
 * @param url - URL trang danh sách (optional)
 */
export default function ItemListSchema({
  name,
  description,
  items,
  url,
  lang,
}: {
  name: string
  description?: string
  items: Array<{
    name: string
    url: string
    description?: string
    image?: string
  }>
  url?: string
  lang: string
}) {
  const listItems = items.map((item, index) => {
    const listItem: {
      '@type': string
      position: number
      name: string
      url: string
      description?: string
      image?: string
    } = {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http')
        ? item.url
        : `${SEO_CONFIG.siteUrl}${item.url}`,
    }

    if (item.description) {
      listItem.description = item.description
    }

    if (item.image) {
      listItem.image = item.image.startsWith('http')
        ? item.image
        : `${SEO_CONFIG.siteUrl}${item.image}`
    }

    return listItem
  })

  const schema: {
    '@context': string
    '@type': string
    name: string
    description?: string
    numberOfItems: number
    itemListElement: Array<{[key: string]: unknown}>
    url?: string
    inLanguage?: string
  } = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: listItems,
    inLanguage: lang,
  }

  if (description) {
    schema.description = description
  }

  if (url) {
    schema.url = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`
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
