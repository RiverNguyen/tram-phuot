'use client'
import Image from 'next/image'
import FormContact from './_components/FormContact'
import { Link, usePathname } from '@/i18n/navigation'
import FooterMenu from './_components/FooterMenu'
import useIsMobile from '@/hooks/use-is-mobile'
import VectorDecoration from './_components/VectorDecoration'
import { IFooter } from '@/interface/site-setting.interface'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import LanguageSwitcher from './_components/LanguageSwitcher'

export default function Footer({ data }: { data: IFooter }) {
  const { isLoading, isMobile } = useIsMobile()
  const translateFooter = useTranslations('Footer')
  const pathname = usePathname()

  const isThankyouPage = pathname === '/thank-you' || pathname === '/cam-on'
  const isBlogDetail = pathname.includes('/blogs') && pathname.split('/').length >= 3

  if (isThankyouPage) return null

  return (
    <footer
      className={cn(
        'xsm:h-auto relative z-[11] h-[85.8125rem] overflow-hidden bg-[#FDF4ED] bg-[url("/uu-dai/bg.webp")] bg-cover bg-center',
        !isLoading && isMobile && isThankyouPage && 'bg-transparent',
        isBlogDetail && 'xsm:mb-[2.75rem]',
      )}
    >
      {/* Background + mask */}
      <div className="xsm:mask-[url('/footer/d-footer_mask_mobile.webp')] xsm:mask-size-[23.4375rem_32rem] absolute inset-0 mask-alpha mask-no-repeat sm:mask-[url('/footer/d-footer_mask.webp')] sm:mask-size-[100.07813rem_92.876rem]">
        <Image
          src={data?.form_footer?.background?.mobile?.url || ''}
          alt={data?.form_footer?.background?.mobile?.alt}
          width={data?.form_footer?.background?.mobile?.width}
          height={data?.form_footer?.background?.mobile?.height}
          className='absolute -top-[0.63rem] right-0 left-0 h-[32rem] w-full object-cover sm:hidden'
        />

        <Image
          src={data?.form_footer?.background?.desktop?.url || ''}
          alt={data?.form_footer?.background?.desktop?.alt}
          width={data?.form_footer?.background?.desktop?.width}
          height={data?.form_footer?.background?.desktop?.height}
          className='xsm:hidden absolute -top-[3.5rem] left-0 h-[92.36544rem] w-[100.12506rem] object-contain'
        />
        {/* Overlay */}
        <div className='xsm:h-[29.875rem] absolute top-0 right-0 left-0 z-1 h-[83.01219rem] w-full bg-black/28'></div>

        {!isLoading && <VectorDecoration isMobile={isMobile} />}
      </div>

      {/* Background Overlay Mobile */}
      <div className='absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(1,86,63,0.00)_20.65%,rgba(1,68,57,0.25)_22.46%,rgba(2,33,45,0.79)_25.59%,#021429_28.65%,#021028_33.86%,#020E27_38.69%)] sm:hidden'></div>

      {/* Top Content */}
      <div className='xsm:max-w-full xsm:pt-[3.25rem] xsm:relative absolute z-3 mx-auto w-full max-w-[89.5rem] sm:top-[12.92rem] sm:right-0 sm:left-0'>
        <div className='xsm:flex-col xsm:justify-start flex justify-between'>
          {/* Left */}
          <div>
            <div className='font-montserrat z-1 mx-auto flex h-[1.73825rem] w-[6.52431rem] -rotate-[7.522deg] items-center justify-center rounded-[50%] bg-[#F6CD40] text-center text-[0.47669rem] leading-[0.47669rem] font-bold whitespace-pre text-[#07364D] uppercase sm:hidden'>
              {data?.form_footer?.form_text_decor_2}
            </div>
            <h3 className='font-motherland xsm:text-[1.40006rem] xsm:rotate-[-3.452deg] xsm:text-center xsm:ml-0 xsm:mt-1.5 relative z-1 ml-[0.75rem] rotate-[-5.037deg] text-[3.3125rem] leading-normal font-normal text-[#F56E0A] whitespace-pre'>
              <div
                dangerouslySetInnerHTML={{ __html: data?.form_footer?.form_text_decor }}
                className='text-stroke absolute inset-0'
              ></div>
              <div
                dangerouslySetInnerHTML={{ __html: data?.form_footer?.form_text_decor }}
                className='relative z-1'
              ></div>
            </h3>
            <div className='xsm:mt-2 xsm:mb-0 relative -mt-4 mb-[1.81rem]'>
              <h2 className='font-phu-du xsm:max-w-[18.55388rem] xsm:mx-auto xsm:text-4xl xsm:text-center xsm:leading-10 xsm:-rotate-[2.664deg] relative max-w-[34.05738rem] text-[4.125rem] leading-[4.125rem] font-bold text-white uppercase whitespace-pre'>
                {data?.form_footer?.form_title}
              </h2>
              <div className='font-montserrat xsm:hidden absolute top-[1.75rem] -right-[0.45rem] z-1 flex h-[3.19075rem] w-[11.976rem] -rotate-[7.522deg] items-center justify-center rounded-[50%] bg-[#F6CD40] text-center text-[0.875rem] leading-[0.875rem] font-bold whitespace-pre text-[#07364D] uppercase'>
                {data?.form_footer?.form_text_decor_2}
              </div>
            </div>
            {!isLoading && !isMobile && (
              <FormContact buttonSubmitText={data?.form_footer?.button_submit} />
            )}
          </div>

          {/* Right */}
          <div className='xsm:m-0 xsm:pt-[0.75rem] shrink-0 w-[52.40981rem] xsm:w-[23.4375rem] relative -mt-[0.7rem] -mr-[1.75rem]'>
            <Image
              src={data?.form_footer?.image?.mobile?.url || ''}
              alt={data?.form_footer?.image?.mobile?.alt}
              width={data?.form_footer?.image?.mobile?.width}
              height={data?.form_footer?.image?.mobile?.height}
              className='h-[16.4375rem] w-[23.4375rem] object-cover sm:hidden'
            />
            <Image
              src={data?.form_footer?.image?.desktop?.url || ''}
              alt={data?.form_footer?.image?.desktop?.alt}
              width={data?.form_footer?.image?.desktop?.width}
              height={data?.form_footer?.image?.desktop?.height}
              className='xsm:hidden h-[39.20763rem] w-[52.40981rem] object-cover'
            />
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className='pointer-events-none xsm:h-auto xsm:relative absolute z-4 h-[42.125rem] overflow-hidden sm:right-0 sm:bottom-0 sm:left-0'>
        <div className='xsm:hidden pointer-events-none absolute top-0 right-0 left-0 h-[42.4375rem] w-full bg-[linear-gradient(180deg,rgba(1,86,63,0.00)_0%,rgba(1,68,57,0.25)_10.05%,rgba(2,33,45,0.79)_27.39%,#021429_44.32%,#021028_73.23%,#020E27_100%)] select-none'></div>

        <div className='xsm:hidden pointer-events-none absolute right-0 -bottom-[1.15rem] left-0 z-1 h-[43.25rem] bg-[linear-gradient(180deg,rgba(217,217,217,0.00)_0%,#A2A2A2_28.34%,#737373_100%)] mask-[url("/footer/d-footer_bottom_deco.webp")] mask-alpha mask-cover mask-no-repeat'></div>

        <div className='pointer-events-auto xsm:relative absolute z-2 mx-auto max-w-[87.805rem] sm:right-0 sm:bottom-0 sm:left-0'>
          {!isLoading && isMobile && (
            <FormContact
              containerClassName='py-[0.75rem] xsm:px-4'
              buttonSubmitText={data?.form_footer?.button_submit}
            />
          )}
          <div className='relative overflow-hidden'>
            <div className='absolute top-0 right-0 left-0 h-[29.39425rem] w-full bg-[linear-gradient(180deg,rgba(217,217,217,0.00)_0%,#A2A2A2_28.34%,#737373_100%)] mask-[url("/footer/d-footer_bottom_deco.webp")] mask-alpha mask-size-[67.96363rem_29.39425rem] mask-center mask-no-repeat sm:hidden'></div>
            <div className='xsm:px-4 relative'>
              <Link
                href='/'
                className='xsm:w-fit xsm:h-auto xsm:py-[0.1875rem] xsm:mb-[1.38rem] xsm:mt-[2rem] mb-[2.23rem] flex h-[5.625rem] w-[19.875rem] items-center justify-center'
              >
                <Image
                  src={data?.footer_content?.logo?.url || ''}
                  alt={data?.footer_content?.logo?.alt}
                  width={data?.footer_content?.logo?.width}
                  height={data?.footer_content?.logo?.height}
                  className='xsm:w-[14.47369rem] xsm:h-[3.85906rem] h-[5.11313rem] w-[19.17756rem] object-cover'
                />
              </Link>
              <div className='xsm:flex-col xsm:py-[1.25rem] flex justify-between border-t border-b border-dashed border-t-white/20 border-b-white/20 py-[2.44825rem]'>
                <div className='xsm:w-full xsm:grid-cols-1 xsm:gap-y-[1.25rem] xsm:pb-[1.25rem] grid w-[37.11438rem] shrink-0 grid-cols-3'>
                  <FooterMenu
                    title='Menu'
                    menus={data?.footer_content?.menu}
                  />
                  <FooterMenu
                    title={`${translateFooter('stationStop')}:`}
                    menus={data?.footer_content?.station_stop}
                    containerClassName='xsm:w-[13.375rem]'
                  />
                  <FooterMenu
                    title={`${translateFooter('toursAndExperiences')}:`}
                    menus={data?.footer_content?.tours}
                  />
                </div>

                <div className='xsm:w-full xsm:grid-cols-1 xsm:border-t xsm:border-dashed xsm:border-t-white/20 xsm:pt-[1.25rem] xsm:gap-y-[1.25rem] grid h-fit w-[37.11438rem] shrink-0 grid-cols-3'>
                  <FooterMenu
                    title={`${translateFooter('representativeOffice')}:`}
                    containerClassName='col-span-3 xsm:col-span-1 border-b border-dashed border-b-white/20 pb-[1.86rem] xsm:pb-[1.25rem]'
                    content={
                      <Link
                        href={data?.footer_content?.address?.google_map_link}
                        target={'_blank'}
                        className='font-montserrat inline-block text-[0.875rem] leading-[1.3125rem] font-medium -tracking-[0.03125rem] whitespace-pre text-white/80 transition duration-300 sm:hover:text-white'
                      >
                        {data?.footer_content?.address?.detail}
                      </Link>
                    }
                  />
                  <FooterMenu
                    title='Hotline:'
                    containerClassName='sm:pt-[1.92rem]'
                    content={
                      <Link
                        href={`tel:${data?.footer_content?.hotline.replaceAll(' ', '')}`}
                        className='font-montserrat text-[0.875rem] leading-[1.3125rem] font-medium -tracking-[0.03125rem] text-white/80 transition duration-300 sm:hover:text-white'
                      >
                        {data?.footer_content?.hotline}
                      </Link>
                    }
                  />
                  <FooterMenu
                    title='Email:'
                    containerClassName='sm:pt-[1.92rem]'
                    content={
                      <Link
                        href={`mailto:${data?.footer_content?.email}`}
                        className='font-montserrat text-[0.875rem] leading-[1.3125rem] font-medium -tracking-[0.03125rem] text-white/80 transition duration-300 sm:hover:text-white'
                      >
                        {data?.footer_content?.email}
                      </Link>
                    }
                  />
                  <FooterMenu
                    title={`${translateFooter('socialMedia')}:`}
                    containerClassName='sm:pt-[1.92rem]'
                    content={
                      <div className='flex items-center space-x-2'>
                        {data?.footer_content?.social_media.map((social, i) => (
                          <Link
                            key={i}
                            href={social?.link?.url}
                            target={social?.link?.target}
                          >
                            <Image
                              src={social?.image?.url}
                              alt={social?.image?.alt}
                              width={social?.image?.width}
                              height={social?.image?.height}
                              className='xsm:size-[1.75rem] size-[1.4375rem] object-cover'
                            />
                          </Link>
                        ))}
                      </div>
                    }
                  />
                </div>
              </div>
              <div className='xsm:pt-[1.25rem] xsm:pb-[2rem] flex items-center justify-between pt-[1.86575rem] pb-[3.24675rem]'>
                <p className='font-phu-du xsm:text-[0.75rem] xsm:text-white/80 xsm:tracking-[0.0625rem] xsm:leading-[1.125rem] xsm:opacity-60 text-[0.875rem] leading-[1.3125rem] font-medium text-white/51'>
                  {translateFooter('copyright')}
                </p>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {!isLoading && !isMobile && (
          <Image
            src='/footer/d-footer_bottom_deco_2.webp'
            alt='Footer Bottom Deco 2'
            width={431}
            height={406}
            className='pointer-events-none absolute -top-[3rem] -right-[9.5rem] z-3 h-[25.32525rem] w-[26.90806rem] -rotate-[25.156deg] object-cover select-none'
          />
        )}
      </div>
    </footer>
  )
}
