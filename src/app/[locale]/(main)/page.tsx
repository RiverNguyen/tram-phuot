import FilterPopover from '@/components/shared/Select'
import BannerHomePage from '@/modules/home/Banner'
import homeService from '@/services/home'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

const data = [
  {
    label: 'Ha noi',
    value: 'hanoi',
  },
  {
    label: 'Ninh Binh',
    value: 'ninh-binh',
  },
  {
    label: 'Hue',
    value: 'hue',
  },
]

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dataHome = await homeService.getHome(locale)
  return (
    <>
      <BannerHomePage data={dataHome?.acf} />
      <div className='h-screen bg-[#FDF4ED]'>
        <div className='flex pt-4 items-center max-w-[87.5rem] mx-auto space-x-[0.75rem]'>
          <FilterPopover
            options={data}
            label='Location'
            className='flex-1'
          />
          <FilterPopover
            options={data}
            label='Location'
            className='flex-1'
          />
          <FilterPopover
            options={data}
            label='Location'
            className='flex-1'
          />
        </div>
      </div>
    </>
  )
}
