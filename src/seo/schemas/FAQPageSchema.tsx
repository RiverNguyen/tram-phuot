import {SEO_CONFIG} from '@/seo/seo.config'

/**
 * FAQPageSchema
 * -------------
 * Mục đích:
 * - Khai báo trang FAQ (Câu hỏi thường gặp)
 * - Hỗ trợ hiển thị FAQ trong kết quả tìm kiếm Google
 *
 * Vị trí render:
 * - Trang FAQ hoặc trang có section FAQ
 *
 * @param faqs - Mảng các câu hỏi và câu trả lời: [{question: string, answer: string}]
 * @param url - URL trang FAQ (optional)
 */
export default function FAQPageSchema({
  faqs,
  url,
  lang,
}: {
  faqs: Array<{question: string; answer: string}>
  url?: string
  lang: string
}) {
  const mainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }))

  const schema: {
    '@context': string
    '@type': string
    mainEntity: Array<{
      '@type': string
      name: string
      acceptedAnswer: {[key: string]: string}
    }>
    url?: string
    inLanguage?: string
  } = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
    inLanguage: lang,
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
