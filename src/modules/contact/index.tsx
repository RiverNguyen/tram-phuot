import endpoints from '@/configs/endpoints'
import Banner from './banner'
import FormContact from './content/FormContact'
import InfoContact from './content/InfoContact'
import fetchData from '@/fetches/fetchData'
import { IContactPageACF } from '@/interface/contact.interface'
import Image from 'next/image'

const getContactPage = async (locale: string) => {
  return (await fetchData({
    api: endpoints.contact[locale as 'en' | 'vi'],
  })) as IContactPageACF
}

export default async function Contact({ locale }: { locale: string }) {
  const contactPage = await getContactPage(locale)

  return (
    <div className='z-[12] relative h-full w-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-center'>
      <Banner
        locale={locale}
        data={{ banner: contactPage?.acf?.banner }}
      />
      <div className='relative h-full w-full'>
        <Image
          src='/contact/contact.webp'
          alt='contact bg'
          width={3784}
          height={1891}
          priority
          className='xsm:hidden absolute top-[39.28rem] left-0 h-auto w-[77rem] object-cover pointer-events-none'
        />
        <div className='xsm:grid-cols-1 xsm:px-[1rem] xsm:pt-[2rem] xsm:pb-[4.375rem] xsm:gap-[2.375rem] relative mx-auto grid h-full w-full max-w-[87.5rem] grid-cols-2 gap-[3rem] py-[5rem]'>
          <FormContact title={contactPage?.acf?.contact_form?.title} />
          <InfoContact data={contactPage?.acf?.contact_information} />
        </div>
      </div>
    </div>
  )
}
