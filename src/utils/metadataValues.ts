import ENV from '@/configs/env'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function metadataValues(res: any) {
  const domain = ENV.DOMAIN
  if (!res) {
    return {
      metadataBase: new URL(domain || ''),
      title: 'Tram Phuot',
      description: 'Tram Phuot',
      alternates: {
        canonical: './',
      },
      author: 'Tram Phuot',
      robots: 'index, follow',
      schema: null,
    }
  }

  const result = res

  // Chuẩn hóa Open Graph Images
  const ogImages: any[] = []
  if (result?.openGraph?.image?.url) {
    ogImages.push({
      url: result.openGraph.image.url,
      width: result.openGraph.image.width ? Number(result.openGraph.image.width) : 1200,
      height: result.openGraph.image.height ? Number(result.openGraph.image.height) : 630,
      alt: result.openGraph.image.alt || result.title || 'Tram Phuot',
    })
  }

  // Chuẩn hóa Twitter Images
  let twitterImages: any[] = []
  if (result?.twitter?.image) {
    if (Array.isArray(result.twitter.image)) {
      twitterImages = result.twitter.image.map((url: string) => ({ url }))
    } else {
      twitterImages.push({ url: result.twitter.image })
    }
  }

  // Fallback ảnh mặc định nếu không có
  if (ogImages.length === 0) {
    ogImages.push({
      url: '/default.webp',
      width: 1200,
      height: 630,
      alt: 'Tram Phuot',
    })
  }
  if (twitterImages.length === 0) {
    twitterImages.push({
      url: '/default.webp',
    })
  }

  return {
    metadataBase: new URL(domain || ''),
    title: result?.title || 'Tram Phuot',
    description: result?.description || 'Tram Phuot',
    alternates: {
      canonical: './',
    },
    author: 'Tram Phuot',
    robots: 'index, follow',
    schema: result?.schema || null, // <-- Truyền xuống component để render JSON-LD
    openGraph: {
      title: result?.openGraph?.title || result?.title || 'Tram Phuot',
      description: result?.openGraph?.description || result?.description || 'Tram Phuot',
      url: './',
      siteName: result?.openGraph?.siteName || 'Tram Phuot',
      images: ogImages,
      locale: result?.openGraph?.locale,
      type: result?.openGraph?.type,
    },
    twitter: {
      card: result?.twitter?.card || 'summary_large_image',
      title: result?.twitter?.title || result?.title || 'Tram Phuot',
      description: result?.twitter?.description || result?.description || 'Tram Phuot',
      creator: 'Tram Phuot',
      images: twitterImages,
      label1: result?.twitter?.label1,
      data1: result?.twitter?.data1,
      label2: result?.twitter?.label2,
      data2: result?.twitter?.data2,
      misc: result?.twitter_misc,
    },
  }
}
