import DetailsTour from '@/modules/details-tour'
import tourService from '@/services/tour'
import wordpressService from '@/services/wordpress'
import { DetailsTourApiResponseType } from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export default async function page({ params }: PageProps) {
  const { slug, locale } = await params
  const [detailTour, siteSettings]: [DetailsTourApiResponseType, SiteSettingsResType] =
    await Promise.all([
      tourService.getDetailTour(slug, locale, 'tour'),
      wordpressService.getSiteSettings(locale, 'social'),
    ])

  return (
    <DetailsTour
      detailsTourData={detailTour}
      siteSettings={siteSettings}
    />
  )
}
