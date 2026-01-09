import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IBlogDetail } from '@/interface/blog.interface'

const blogService = {
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

export default blogService
