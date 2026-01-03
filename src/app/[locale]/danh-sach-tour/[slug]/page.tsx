import DetailsTour from '@/modules/details-tour'
import SectionBanner from '@/modules/details-tour/components/SectionBanner'
import tourService from '@/services/tour'
import { DetailsTourApiResponseType } from '@/types/details-tour.type'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export default async function page({ params }: PageProps) {
  const { slug, locale } = await params
  let detailTour: DetailsTourApiResponseType

  try {
    detailTour = await tourService.getDetailTour(slug, locale, 'tour')
  } catch (error: any) {
    if (error?.status === 404) {
      notFound()
    }
    throw error
  }

  return <DetailsTour detailsTourData={detailTour} />
}
