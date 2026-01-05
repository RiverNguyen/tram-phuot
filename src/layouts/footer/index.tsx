'use client'
import Image from 'next/image'
import FormContact from './_components/FormContact'
import { Link, usePathname } from '@/i18n/navigation'
import FooterMenu from './_components/FooterMenu'
import { ChevronDown } from 'lucide-react'
import useIsMobile from '@/hooks/use-is-mobile'
import VectorDecoration from './_components/VectorDecoration'
import { IFooter } from '@/interface/site-setting.interface'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export default function Footer({ data }: { data: IFooter }) {
  const { isLoading, isMobile } = useIsMobile()
  const translateFooter = useTranslations('Footer')
  const pathname = usePathname()

  const isThankyouPage = pathname === '/thank-you' || pathname === '/cam-on'

  return (
    <footer
      className={cn(
        'relative bg-[#FDF4ED] h-[85.8125rem] xsm:h-auto overflow-hidden z-1',
        !isLoading && isMobile && isThankyouPage && 'bg-transparent',
      )}
    >
      {/* Background + mask */}
      <div
        className="
          absolute inset-0
          sm:mask-[url('/footer/footer_mask.webp')]
          sm:mask-size-[100.07813rem_92.876rem]
          xsm:mask-[url('/footer/footer_mask_mobile.webp')]
          xsm:mask-size-[23.4375rem_32rem]
          mask-no-repeat mask-alpha
        "
      >
        {!isLoading &&
          (isMobile ? (
            <Image
              src={data?.form_footer?.background?.mobile?.url || ''}
              alt={data?.form_footer?.background?.mobile?.alt}
              width={data?.form_footer?.background?.mobile?.width}
              height={data?.form_footer?.background?.mobile?.height}
              className='absolute -top-[0.63rem] left-0 right-0 h-[32rem] w-full object-cover'
            />
          ) : (
            <Image
              src={data?.form_footer?.background?.desktop?.url || ''}
              alt={data?.form_footer?.background?.desktop?.alt}
              width={data?.form_footer?.background?.desktop?.width}
              height={data?.form_footer?.background?.desktop?.height}
              className='absolute -top-[6.3rem] left-0 h-[92.36544rem] w-[100.12506rem] object-contain'
            />
          ))}
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bg-black/28 h-[83.01219rem] xsm:h-[29.875rem] w-full z-1'></div>

        {!isLoading && <VectorDecoration isMobile={isMobile} />}
      </div>

      {/* Background Overlay Mobile */}
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(1,86,63,0.00)_20.65%,rgba(1,68,57,0.25)_22.46%,rgba(2,33,45,0.79)_25.59%,#021429_28.65%,#021028_33.86%,#020E27_38.69%)] sm:hidden z-1'></div>

      {/* Top Content */}
      <div className='absolute sm:top-[12.92rem] sm:left-0 sm:right-0 w-full mx-auto max-w-[89.5rem] xsm:max-w-full xsm:pt-[3.25rem] xsm:relative z-3'>
        <div className='flex justify-between xsm:flex-col xsm:justify-start'>
          {/* Left */}
          <div>
            <div className='mx-auto -rotate-[7.522deg] z-1 flex items-center justify-center w-[6.52431rem] h-[1.73825rem] bg-[#F6CD40] rounded-[50%] font-montserrat text-[0.47669rem] font-bold leading-[0.47669rem] uppercase text-center text-[#07364D] whitespace-pre sm:hidden'>
              {data?.form_footer?.form_text_decor_2}
            </div>
            <h3 className='relative ml-[0.75rem] rotate-[-5.037deg] font-motherland text-[3.3125rem] font-normal leading-normal text-[#F56E0A] z-1 xsm:text-[1.40006rem] xsm:rotate-[-3.452deg] xsm:text-center xsm:ml-0 xsm:mt-1.5'>
              <span className='absolute inset-0 text-stroke'>
                {data?.form_footer?.form_text_decor}
              </span>
              <span className='relative z-1'>{data?.form_footer?.form_text_decor}</span>
            </h3>
            <div className='relative -mt-4 mb-[1.81rem] xsm:mt-2 xsm:mb-0'>
              <h2 className='relative font-phu-du text-[4.125rem] font-bold leading-[4.125rem] text-white uppercase max-w-[34.05738rem] xsm:max-w-[18.55388rem] xsm:mx-auto xsm:text-4xl xsm:text-center xsm:leading-10 xsm:-rotate-[2.664deg]'>
                {data?.form_footer?.form_title}
              </h2>
              <div className='absolute top-[1.75rem] -right-[0.45rem] -rotate-[7.522deg] z-1 flex items-center justify-center w-[11.976rem] h-[3.19075rem] bg-[#F6CD40] rounded-[50%] font-montserrat text-[0.875rem] font-bold leading-[0.875rem] uppercase text-center text-[#07364D] whitespace-pre xsm:hidden'>
                {data?.form_footer?.form_text_decor_2}
              </div>
            </div>
            {!isLoading && !isMobile && (
              <FormContact buttonSubmitText={data?.form_footer?.button_submit} />
            )}
          </div>

          {/* Right */}
          <div className='relative -mr-[1.75rem] -mt-[0.7rem] xsm:m-0 xsm:pt-[0.75rem]'>
            {!isLoading &&
              (isMobile ? (
                <Image
                  src={data?.form_footer?.image?.mobile?.url || ''}
                  alt={data?.form_footer?.image?.mobile?.alt}
                  width={data?.form_footer?.image?.mobile?.width}
                  height={data?.form_footer?.image?.mobile?.height}
                  className='w-[23.4375rem] h-[16.4375rem] object-cover'
                />
              ) : (
                <Image
                  src={data?.form_footer?.image?.desktop?.url || ''}
                  alt={data?.form_footer?.image?.desktop?.alt}
                  width={data?.form_footer?.image?.desktop?.width}
                  height={data?.form_footer?.image?.desktop?.height}
                  className='w-[52.40981rem] h-[39.20763rem] object-cover'
                />
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className='absolute sm:bottom-0 sm:left-0 sm:right-0 h-[42.125rem] overflow-hidden xsm:h-auto xsm:relative z-4'>
        <div className='absolute top-0 left-0 right-0 h-[42.4375rem] w-full bg-[linear-gradient(180deg,rgba(1,86,63,0.00)_0%,rgba(1,68,57,0.25)_10.05%,rgba(2,33,45,0.79)_27.39%,#021429_44.32%,#021028_73.23%,#020E27_100%)] pointer-events-none select-none xsm:hidden'></div>

        <div className='absolute -bottom-[1.15rem] left-0 right-0 h-[43.25rem] bg-[linear-gradient(180deg,rgba(217,217,217,0.00)_0%,#A2A2A2_28.34%,#737373_100%)] mask-[url("/footer/footer_bottom_deco.webp")] mask-no-repeat mask-cover mask-alpha xsm:hidden z-1'></div>

        <div className='absolute sm:bottom-0 sm:left-0 sm:right-0 max-w-[87.805rem] mx-auto xsm:relative z-2'>
          {!isLoading && isMobile && (
            <FormContact
              containerClassName='py-[0.75rem] xsm:px-4'
              buttonSubmitText={data?.form_footer?.button_submit}
            />
          )}
          <div className='relative overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 h-[29.39425rem] w-full bg-[linear-gradient(180deg,rgba(217,217,217,0.00)_0%,#A2A2A2_28.34%,#737373_100%)] mask-[url("/footer/footer_bottom_deco.webp")] mask-no-repeat mask-size-[67.96363rem_29.39425rem] mask-alpha mask-center sm:hidden'></div>
            <div className='relative xsm:px-4'>
              <Link
                href='/'
                className='w-[19.875rem] h-[5.625rem] flex items-center justify-center mb-[2.23rem] xsm:w-fit xsm:h-auto xsm:py-[0.1875rem] xsm:mb-[1.38rem] xsm:mt-[2rem]'
              >
                <Image
                  src={data?.footer_content?.logo?.url || ''}
                  alt={data?.footer_content?.logo?.alt}
                  width={data?.footer_content?.logo?.width}
                  height={data?.footer_content?.logo?.height}
                  className='w-[19.17756rem] h-[5.11313rem] xsm:w-[14.47369rem] xsm:h-[3.85906rem] object-cover'
                />
              </Link>
              <div className='flex justify-between border-t border-dashed border-t-white/20 border-b border-b-white/20 py-[2.44825rem] xsm:flex-col xsm:py-[1.25rem]'>
                <div className='shrink-0 grid grid-cols-3 w-[37.11438rem] xsm:w-full xsm:grid-cols-1 xsm:gap-y-[1.25rem] xsm:pb-[1.25rem]'>
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

                <div className='shrink-0 grid grid-cols-3 w-[37.11438rem] h-fit xsm:w-full xsm:grid-cols-1 xsm:border-t xsm:border-dashed xsm:border-t-white/20 xsm:pt-[1.25rem] xsm:gap-y-[1.25rem]'>
                  <FooterMenu
                    title={`${translateFooter('representativeOffice')}:`}
                    containerClassName='col-span-3 xsm:col-span-1 border-b border-dashed border-b-white/20 pb-[1.86rem] xsm:pb-[1.25rem]'
                    content={
                      <Link
                        href={data?.footer_content?.address?.google_map_link}
                        target={'_blank'}
                        className='inline-block font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] -tracking-[0.03125rem] text-white/80 sm:hover:text-white transition duration-300 whitespace-pre'
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
                        className='font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] -tracking-[0.03125rem] text-white/80 sm:hover:text-white transition duration-300'
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
                        className='font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] -tracking-[0.03125rem] text-white/80 sm:hover:text-white transition duration-300'
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
                              className='size-[1.4375rem] xsm:size-[1.75rem] object-cover'
                            />
                          </Link>
                        ))}
                      </div>
                    }
                  />
                </div>
              </div>
              <div className='flex items-center justify-between pt-[1.86575rem] pb-[3.24675rem] xsm:pt-[1.25rem] xsm:pb-[2rem]'>
                <p className='font-phu-du text-[0.875rem] font-medium leading-[1.3125rem] text-white/51 xsm:text-[0.75rem] xsm:text-white/80 xsm:tracking-[0.0625rem] xsm:leading-[1.125rem] xsm:opacity-60'>
                  {translateFooter('copyright')}
                </p>
                <button
                  type='button'
                  className='flex items-center font-montserrat cursor-pointer text-[0.75rem] leading-[1.125rem] uppercase tracking-[0.0625rem] text-white/51 space-x-2 xsm:text-white/80 xsm:leading-[1.05rem]'
                >
                  <span>VIE</span>
                  <div className='flex items-center space-x-[0.42rem]'>
                    <Image
                      src='/footer/vn.webp'
                      alt=''
                      width={558}
                      height={558}
                      className='size-[1.325rem] xsm:size-[1.125rem] object-cover'
                    />
                    <ChevronDown className='size-[1.1655rem] xsm:size-[1rem]' />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {!isLoading && !isMobile && (
          <Image
            src='/footer/footer_bottom_deco_2.webp'
            alt='Footer Bottom Deco 2'
            width={431}
            height={406}
            className='absolute -top-[3rem] -right-[9.5rem] -rotate-[25.156deg] h-[25.32525rem] w-[26.90806rem] object-cover pointer-events-none select-none z-3'
          />
        )}
      </div>
    </footer>
  )
}
