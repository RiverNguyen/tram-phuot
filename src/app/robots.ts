export default function robots() {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  }
}
