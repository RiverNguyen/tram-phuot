import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const taxonomyService = {
  getLocations: async (locale: string) => {
    return await fetchData({
      api: `${ENDPOINTS.taxonomy.locations}?taxonomy=locations&lang=${locale}&acf=true`,
    })
  },
}

export default taxonomyService
