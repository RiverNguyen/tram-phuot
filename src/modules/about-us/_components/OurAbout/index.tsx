'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { IAboutUs, IAboutUsContent } from '@/interface/about.interface'
import Article from './_components/Article'
import { useInView } from 'motion/react'
import Article2 from './_components/Article2'

export default function OurAbout({ about }: { about: IAboutUs }) {
  const t = useTranslations('HomePage.ourTours')
  const { locale } = useParams<{ locale: string }>()
  const sectionRef = useRef(null)

  const content2: IAboutUsContent = {
    title: 'The Heart Behind Wanderlust Station',
    description:
      '<p>After many years of adventure and reflection, we realized that the greatest aspect of every journey lies not just in the destination, but in the moments of meeting and sharing with kindred spirits. Thus, Wanderlust Station was officially born as an inspiring stop for dreams that are ablaze.</p>',
  }

  const content3: IAboutUsContent = {
    title: 'The Meaning Behind the Name: The Adventure Station',
    description:
      '<p><strong>"Station" (Trạm):</strong> A sanctuary to recharge after a long journey—a safe, familiar space in the heart of unfamiliar lands.</p><p><strong>"Wanderlust" (Phượt):</strong> The embodiment of an intense passion for discovery and the freedom to escape daily life, immersing yourself in nature and local culture.</p>',
  }



  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className='xsm:min-h-[103.6rem] xsm:py-[4rem] relative z-5 min-h-[110.125rem] w-full sm:mt-[-7.075rem]'
    >
      <Image
        src='/about-us/d-bg-white.svg'
        alt=''
        width={1627}
        height={1648}
        className='xsm:hidden absolute inset-0 h-full w-full object-cover'
      />
      <Image
        src='/about-us/d-dragon.webp'
        alt=''
        width={512}
        height={257}
        className='xsm:hidden absolute left-[-7.2rem] bottom-[48.625rem] h-[16rem] w-[32rem] object-cover'
      />
      <Image
        src='/about-us/d-layer-logo.webp'
        alt=''
        width={512}
        height={257}
        className='xsm:hidden absolute left-[21rem] bottom-[10rem] h-[19.5625rem] w-[20.8125rem] object-cover'
      />
      <div className='xsm:ml-[1.5rem] xsm:pb-[22rem] xsm:pt-0 relative h-full w-full pb-[12rem] ml-[6.25rem] pt-[12rem] z-[5]'>
        <Article
          about={about.content_1}
          isInView={isInView}
        />
        <div className='xsm:flex-col xsm:gap-[2.25rem] xsm:pt-[24rem] pt-[18rem] flex justify-start gap-[19rem] w-full '>
          <Article2
            about={about.content_2}
            isInView={isInView}
            className='w-[29.26269rem] xsm:w-[21.4rem]'
          />

          <Article2
            about={about.content_3}
            isInView={isInView}
            className='xsm:w-[21.4rem] sm:mt-[7.12rem]'
          />
        </div>
      </div>
      <div className='absolute right-0 top-[22rem] xsm:top-[27.1875rem] xsm:left-[-10.55rem] xsm:w-[36.35006rem]'>
        {/* image dynamic 1 */}
        <div className='xsm:top-[-2rem] xsm:left-[17.37rem] xsm:w-[9.53106rem] xsm:h-[6.30244rem] xsm:p-[0.14356rem] xsm:rotate-[-5.691deg] xsm:shadow-[-35.89px_72.068px_22.396px_0_rgba(0,0,0,0),-22.97px_45.94px_20.673px_0_rgba(0,0,0,0.01),-12.921px_25.841px_17.514px_0_rgba(0,0,0,0.05),-5.742px_11.485px_12.921px_0_rgba(0,0,0,0.09),-1.436px_2.871px_7.178px_0_rgba(0,0,0,0.1)] image-dynamic-1 z-2 absolute top-[-8.84rem] left-[35rem] w-[26.43281rem] h-[17.47875rem] rotate-[-5.681deg] p-[0.42931rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src={about?.decor_images.framed_image_1?.url || ''}
            alt='Image dynamic 1'
            width={1301}
            height={916}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 2 */}
        <div className='xsm:top-[2.8rem] xsm:left-[19.1rem] xsm:w-[4.38581rem] xsm:h-[6.29475rem] xsm:p-[0.14356rem] xsm:rotate-[19.529deg] xsm:z-4 xsm:shadow-[-58.984px_118.439px_36.806px_0_rgba(0,0,0,0.00),-37.75px_75.499px_33.975px_0_rgba(0,0,0,0.01),-21.234px_42.468px_28.784px_0_rgba(0,0,0,0.05),-9.437px_18.875px_21.234px_0_rgba(0,0,0,0.09),-2.359px_4.719px_11.797px_0_rgba(0,0,0,0.10)] image-dynamic-2 z-2 absolute top-[5.3125rem] left-[38.12rem] w-[12.68819rem] h-[21.23656rem] rotate-[19.529deg] p-[0.35rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src={about?.decor_images.framed_image_2?.url || ''}
            alt='Image dynamic 2'
            width={832}
            height={592}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 3 */}
        <div className='xsm:top-[12.17rem] xsm:left-[23.51rem] xsm:w-[6.00375rem] xsm:h-[5.02525rem] xsm:p-[0.14356rem] xsm:rotate-[-2.529deg] xsm:z-3 xsm:shadow-[-55.13px_110.701px_34.401px_0_rgba(0,0,0,0.00),-35.283px_70.567px_31.755px_0_rgba(0,0,0,0.01),-19.847px_39.694px_26.904px_0_rgba(0,0,0,0.05),-8.821px_17.642px_19.847px_0_rgba(0,0,0,0.09),-2.205px_4.41px_11.026px_0_rgba(0,0,0,0.10)] image-dynamic-3 z-2 absolute top-[32rem] right-[15.75rem] w-[12.02744rem] h-[10.16169rem] rotate-[-2.529deg] p-[0.35rem] overflow-hidden bg-white shadow-[-100.311px_201.425px_62.594px_0_rgba(0,0,0,0),-64.199px_128.399px_57.779px_0_rgba(0,0,0,0.01),-36.112px_72.224px_48.952px_0_rgba(0,0,0,0.05),-16.05px_32.1px_36.112px_0_rgba(0,0,0,0.09),-4.012px_8.025px_20.062px_0_rgba(0,0,0,0.1)]'>
          <Image
            src={about?.decor_images.framed_image_3?.url || ''}
            alt='Image dynamic 3'
            width={831}
            height={985}
            className='w-full h-full object-cover'
          />
        </div>
        <Image
          src={about?.decor_images?.inked_image?.url || ''}
          alt=''
          width={1280}
          height={924}
          className='object-contain w-auto relative top-[-4rem] xsm:top-0 xsm:left-[3rem] left-[10rem] h-[57.74781rem] sm:mt-[2rem] xsm:h-[20.625rem] xsm:w-full'
        />
      </div>

      <div className='xsm:h-[17.875rem] xsm:bg-[linear-gradient(88deg,#8BD100_-32.96%,#2156B1_75.86%)] z-4 h-[10rem] w-full bg-[linear-gradient(90deg,#8BD100_35%,#2156B1_85.02%)] absolute bottom-0 left-0'>
        <Image
          src='/about-us/vnpt-hanoi.webp'
          alt=''
          width={593}
          height={688}
          className='xsm:h-[8.831rem] xsm:left-[-2.4rem] absolute bottom-0 left-[-6.4rem] h-[23.23944rem] w-auto'
        />
        <Image
          src='/about-us/d-bridge.webp'
          alt=''
          width={593}
          height={688}
          className='xsm:h-[9.5495rem] xsm:left-[-12rem] absolute bottom-0 left-[-30.2rem] h-[25.13025rem] w-auto'
        />
        <Image
          src='/about-us/d-freedom.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:w-[6.11381rem] xsm:bottom-[-2.75rem] xsm:left-0 absolute bottom-[-3rem] left-0 z-3 h-auto w-[9.44444rem]'
        />
        <Image
          src='/about-us/d-multicolor.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:w-[4.7555rem] xsm:top-[10.92rem] xsm:left-[6.17rem] absolute top-[-5.4rem] left-[19.5rem] z-3 h-auto w-[8.16981rem]'
        />
        <Image
          src='/about-us/d-flower-mb.svg'
          alt=''
          width={0}
          height={0}
          className='sm:hidden absolute w-[3.36906rem] left-[6.3125rem] bottom-[-1.04rem]'
        />
        <Image
          src='/about-us/d-explorer-mb.svg'
          alt=''
          width={0}
          height={0}
          className='sm:hidden absolute w-[4.71013rem] left-[10.2125rem] z-10 bottom-[-2rem]'
        />
        <Image
          src='/about-us/d-multicolor.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:w-[4.7555rem] xsm:top-[10.92rem] xsm:left-[6.17rem] absolute top-[-5.4rem] left-[19.5rem] z-3 h-auto w-[8.16981rem]'
        />
        <Image
          src='/about-us/d-flower.webp'
          alt=''
          width={222}
          height={146}
          className='xsm:hidden absolute -bottom-[1.5rem] left-[38.2rem] z-3 h-[9.125rem] w-auto'
        />
        <Image
          src='/about-us/d-user.webp'
          alt=''
          width={363}
          height={472}
          className='xsm:h-[10.19363rem] xsm:left-[8.76rem] absolute bottom-0 left-[23.06rem] z-2 h-[20.125rem] w-auto'
        />
        <Image
          src='/about-us/d-basket.webp'
          alt=''
          width={478}
          height={280}
          className='xsm:h-[5.35844rem] xsm:w-[4.4555rem] xsm:left-[18rem] xsm:bottom-[-1.36rem] xsm:z-10 absolute bottom-[-1.65rem] left-[31.0675rem] z-1 h-[10.11594rem] w-[8.41138rem]'
        />
        <Image
          src='/home/our-tours/d-gradient-1.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute bottom-[6.71rem] left-[43rem] h-[4.79713rem] w-[5.85219rem]'
        />
        <Image
          src='/about-us/d-gradient-orange.svg'
          alt=''
          width={0}
          height={0}
          className='sm:hidden absolute bottom-[2.4rem] right-[1.85rem] h-[2.216rem] w-[2.69088rem]'
        />
        <Image
          src='/about-us/d-bg-tiles.webp'
          alt=''
          width={80}
          height={80}
          className='xsm:top-[-1.95rem] xsm:rotate-[90deg] xsm:left-0 xsm:w-[4rem] xsm:h-[4rem] absolute -top-[2.45rem] left-[52.5rem] h-[4.98338rem] w-[5.85219rem]'
        />
        <Image
          src='/about-us/d-temple.webp'
          alt=''
          width={328}
          height={314}
          className='xsm:h-[7.59769rem] xsm:w-[6.61569rem] xsm:left-[13.3125rem] xsm:bottom-[-0.475rem] absolute bottom-0 left-[32.6rem] h-[15rem] w-[13.06125rem] object-contain'
        />
        <Image
          src='/about-us/d-text.webp'
          alt=''
          width={481}
          height={130}
          className='xsm:hidden absolute bottom-[1.59rem] left-[53.81rem] h-[6.375rem] w-[22.5625rem]'
        />
        <Image
          src='/about-us/d-text-mobile.webp'
          alt=''
          width={481}
          height={130}
          className='sm:hidden xsm:h-[5.25rem] xsm:w-[15.1875rem] xsm:bottom-[9.01rem] xsm:left-1/2 xsm:-translate-x-1/2 absolute'
        />
        <Image
          src='/about-us/d-connect.webp'
          alt='connect'
          width={121}
          height={101}
          className='xsm:right-[0.925rem] xsm:top-[-4.72rem] xsm:w-[8.18169rem] xsm:h-auto top-[-3rem] absolute right-[17.1rem] z-1 w-[7.54256rem] h-[6.36581rem]'
        />
        <Image
          src='/about-us/d-cake.webp'
          alt=''
          width={146}
          height={98}
          className='xsm:right-[0.925rem] xsm:top-[-0.525rem] xsm:h-[2.91244rem] absolute right-[17.1rem] -bottom-[1.36rem] z-1 h-[6.10181rem] w-auto'
        />
        <Image
          src='/about-us/d-farmer.webp'
          alt=''
          width={358}
          height={368}
          className='xsm:hidden absolute right-[3rem] bottom-0 z-3 h-[11.63663rem] w-auto'
        />
        <Image
          src='/about-us/d-cave.webp'
          alt=''
          width={238}
          height={214}
          className='xsm:hidden absolute -top-[calc(4.0385rem+0.32rem)] right-[0.28rem] z-1 h-[7.85rem] w-[13.375rem]'
        />
      </div>
      {/*<Article
        about={about.content_1}
        isInView={isInView}
      />

      <Article2
        about={about.content_2}
        isInView={isInView}
        className='left-[6.25rem] bottom-[36.25rem] w-[29.26269rem] xsm:w-[21.4rem] xsm:top-[48.8125rem] xsm:left-[1.5rem]'
      />

      <Article2
        about={about.content_3}
        isInView={isInView}
        className='right-[18.125rem] bottom-[22.25rem] w-[26.95019rem] xsm:w-[21.4rem] xsm:top-[66rem] xsm:left-[1.5rem]'
      />*/}
    </section>
  )
}
