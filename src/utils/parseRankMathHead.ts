import ENV from '@/configs/env'

export function parseRankMathHead(headHtml = '', domain: string) {
  const SOURCE_DOMAIN = ENV.CMS || ''

  function replaceDomain(url: string) {
    if (!url || typeof url !== 'string') return url
    if (url.startsWith(SOURCE_DOMAIN)) {
      const isImage = /\.(jpe?g|png|webp|gif|svg|avif)(\?|$)/i.test(url)
      return isImage ? url : url.replace(SOURCE_DOMAIN, domain)
    }
    return url
  }

  function getMetaContent(attr: string, value: string) {
    const regex = new RegExp(
      `<meta\\s+[^>]*${attr}\\s*=\\s*["']${value}["'][^>]*content\\s*=\\s*["']([^"']+)["'][^>]*\\/?>`,
      'i',
    )
    const match = headHtml.match(regex)
    return match ? replaceDomain(match[1]) : ''
  }

  function getLinkHref(rel: string) {
    const regex = new RegExp(
      `<link\\s+[^>]*rel\\s*=\\s*["']${rel}["'][^>]*href\\s*=\\s*["']([^"']+)["'][^>]*\\/?>`,
      'i',
    )
    const match = headHtml.match(regex)
    return match ? replaceDomain(match[1]) : ''
  }

  function getTitle() {
    const match = headHtml.match(/<title>(.*?)<\/title>/i)
    return match ? match[1].trim() : ''
  }

  const ogType = getMetaContent('property', 'og:type')
  const safeOgType = ogType === 'product' || ogType === 'book' ? 'website' : ogType || 'website'

  const schema = (() => {
    const m = headHtml.match(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
    )
    try {
      const json = m ? JSON.parse(m[1]) : null

      const str = JSON.stringify(json, (key, value) => {
        if (typeof value === 'string' && value.startsWith(SOURCE_DOMAIN)) {
          const isImage = /\.(jpe?g|png|webp|gif|svg|avif)(\?|$)/i.test(value)
          return isImage ? value : value.replace(SOURCE_DOMAIN, domain)
        }
        return value
      })

      return JSON.parse(str)
    } catch {
      return null
    }
  })()

  return {
    title: getTitle(),
    description: getMetaContent('name', 'description'),
    canonical: getLinkHref('canonical'),
    openGraph: {
      title: getMetaContent('property', 'og:title'),
      description: getMetaContent('property', 'og:description'),
      url: getMetaContent('property', 'og:url'),
      siteName: getMetaContent('property', 'og:site_name'),
      locale: getMetaContent('property', 'og:locale'),
      type: safeOgType,
      updatedTime: getMetaContent('property', 'og:updated_time'),
      image: {
        url: getMetaContent('property', 'og:image'),
        width: getMetaContent('property', 'og:image:width'),
        height: getMetaContent('property', 'og:image:height'),
        alt: getMetaContent('property', 'og:image:alt'),
      },
      // Bạn có thể trả thêm product info nếu muốn custom openGraph ngoài metadata Next.js
      rawType: ogType, // để sử dụng cho Facebook, Zalo...
    },
    article: {
      publishedTime: getMetaContent('property', 'article:published_time'),
      modifiedTime: getMetaContent('property', 'article:modified_time'),
    },
    twitter: {
      card: getMetaContent('name', 'twitter:card'),
      title: getMetaContent('name', 'twitter:title'),
      description: getMetaContent('name', 'twitter:description'),
      image: getMetaContent('name', 'twitter:image'),
      label1: getMetaContent('name', 'twitter:label1'),
      data1: getMetaContent('name', 'twitter:data1'),
      label2: getMetaContent('name', 'twitter:label2'),
      data2: getMetaContent('name', 'twitter:data2'),
    },
    robots: getMetaContent('name', 'robots'),
    schema,
  }
}
