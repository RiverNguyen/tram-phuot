import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IBlogDetail } from '@/interface/blog.interface'
import { IBlogRes, IBlogTaxonomyRes } from '@/interface/blogs.interface'

const blogsService = {
  getBlogs: async ({
    locale,
    kind = '',
    typeNews = '',
    sort = 'newest-first',
    paged = '1',
    limit = 6,
  }: {
    locale: string
    kind?: string
    typeNews?: string
    sort?: string
    paged?: string
    limit?: number
  }): Promise<IBlogRes> => {
    const query = new URLSearchParams()
    query.set('lang', locale)
    query.set('acf', 'true')
    query.set('tax', 'category,kind,type-news')
    query.set('limit', String(limit))

    if (kind) query.set('kind', kind)
    if (typeNews) query.set('type-news', typeNews)
    if (paged && Number(paged) > 1) query.set('paged', paged)

    // Handle sort
    if (sort === 'newest-first') {
      query.set('order', 'DESC')
      query.set('orderby', 'date')
    } else if (sort === 'alphabetical-az') {
      query.set('order', 'ASC')
      query.set('orderby', 'title')
    } else if (sort === 'alphabetical-za') {
      query.set('order', 'DESC')
      query.set('orderby', 'title')
    }

    return await fetchData({
      api: `${ENDPOINTS.blogs.list}?${query.toString()}`,
    })
  },
  getTaxonomies: async (locale: string): Promise<IBlogTaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.blogs.taxonomies}?lang=${locale}`,
    })
  },
  getBlogsPage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.blogs[locale as 'en' | 'vi'],
    })
  },
  getBlogsFeaturedNews: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.blogs.featuredNews,
    })
  },
  getDetail: async (slug: string): Promise<IBlogDetail> => {
    return await fetchData({
      api: ENDPOINTS.blogs.getDetail(slug),
    })
  },
  getRelated: async ({
    locale,
    typeNews = '',
    limit = 8,
  }: {
    locale: string
    typeNews?: string
    limit?: number
  }) => {
    return await fetchData({
      api: `${ENDPOINTS.blogs.list}?lang=${locale}&tax=type-news&type-news=${typeNews}&limit=${limit}&order=DESC&orderby=date&acf=true`,
    })
  },
}

export default blogsService
