// Dùng cho WP REST: featured_media, media endpoint, hoặc ACF image (return = array)
export type WPImage = {
  id: number
  alt: string
  title?: string
  caption?: string
  description?: string

  url: string
  width?: number
  height?: number

  sizes?: {
    thumbnail?: WPImageSize
    medium?: WPImageSize
    medium_large?: WPImageSize
    large?: WPImageSize
    full?: WPImageSize
    [key: string]: WPImageSize | undefined
  }
}

export type WPImageSize = {
  url: string
  width?: number
  height?: number
  mime_type?: string
}

export type WPTaxonomy = {
  id: number
  name: string
  slug: string
}

export type WPFile = {
  id: number

  url: string
  filename: string

  title?: string
  description?: string
  caption?: string
  alt?: string

  mime_type?: string
  file_type?: string
  filesize?: number

  width?: number
  height?: number
}

export type WPLink = {
  title?: string
  target?: string
  url: string
}
