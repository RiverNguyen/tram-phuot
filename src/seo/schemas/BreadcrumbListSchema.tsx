import {SEO_CONFIG} from '@/seo/seo.config'

/**
 * BreadcrumbListSchema
 * --------------------
 * Mục đích:
 * - Khai báo breadcrumb navigation cho SEO
 * - Hỗ trợ hiển thị breadcrumb trong kết quả tìm kiếm Google
 *
 * Vị trí render:
 * - Các trang có breadcrumb (tùy chọn, có thể dùng ở mọi trang)
 *
 * @param items - Mảng các breadcrumb item: [{name: string, url: string}]
 */
export default function BreadcrumbListSchema({
  items,
  lang,
}: {
  items: Array<{name: string; url: string}>
  lang: string
}) {
  const breadcrumbItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http')
      ? item.url
      : `${SEO_CONFIG.siteUrl}${item.url}`,
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: lang,
    itemListElement: breadcrumbItems,
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
