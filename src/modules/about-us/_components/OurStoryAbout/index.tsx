import { BrandButton } from '@/components/shared'
import { IContentAbout } from '@/interface/about.interface'
import Image from 'next/image'
import Link from 'next/link'

export default function OurStoryAbout({ content }: { content: IContentAbout }) {
  console.log('content', content?.story_content)
  return (
    <section className='relative sm:mt-[3.44rem] xsm:py-[4rem] sm:pb-[9rem]'>
      <Image
        src={'/about-us/d-leaf-our-story.webp'}
        alt=''
        width={413}
        height={465}
        className='absolute xsm:left-[-0.9rem] xsm:top-[1.62rem] xsm:w-[6.3125rem] left-[-8.2rem] top-[-0.9rem] w-[25.8125rem] h-auto object-cover'
      />
      <Image
        src={'/about-us/d-wandering.webp'}
        alt=''
        width={413}
        height={465}
        className='absolute xsm:w-[5.46819rem] xsm:top-[2.625rem] xsm:right-[-1.5rem] right-[12.56rem] top-[1.77rem] w-[13.5rem] h-auto object-cover'
      />
      <div className='absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Image
          src={'/about-us/d-flower-ourstory.webp'}
          alt=''
          width={794}
          height={608}
          className='w-[49.68275rem] h-auto object-cover'
        />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='relative flex flex-col items-center gap-[2.1875rem] shrink-0 pt-[2.0625rem] w-[87.5rem] mx-auto xsm:gap-[2rem] xsm:w-full mt-[1.6975rem]'>
          <div className='absolute xsm:w-[14.62044rem] xsm:h-[4.66169rem] xsm:top-0 w-[33.55044rem] h-[11.21394rem] left-1/2 -translate-x-1/2 top-[1.75rem] flex flex-col'>
            <p className='xsm:ml-0 xsm:text-[1.25rem] ml-[-2.2rem] flex-1 flex items-center rotate-[-5.803deg] font-motherland text-[3rem] font-normal leading-none bg-[linear-gradient(230deg,#03328C_5.76%,#29C486_100.15%)] bg-clip-text text-transparent'>
              {content?.title.line_1}
            </p>

            <p className='xsm:ml-0 xsm:text-[1.25rem] xsm:pl-[4.2125rem] flex-1 flex items-center mt-[-1.75rem] rotate-[-0.501deg] pl-[6.375rem] font-motherland text-[3rem] font-normal leading-none bg-[linear-gradient(230deg,#03328C_5.76%,#29C486_100.15%)] bg-clip-text text-transparent'>
              {content?.title.line_2}
            </p>
          </div>

          <div className='xsm:pt-4 xsm:pb-0 flex justify-center items-center max-w-[47.875rem] p-[8.5625rem_1.78125rem_2.3125rem_1.84375rem]'>
            <p className='w-[44.25rem] xsm:w-[19.6875rem] font-phu-du xsm:text-[1.25rem] xsm:indent-0 mt-4 text-[2.125rem] font-medium leading-[2.3375rem] xsm:leading-[1.375rem] tracking-normal text-center not-italic'>
              {content?.story_content
                ?.split('. ')
                .filter(Boolean)
                .map((sentence, index, arr) => (
                  <span
                    key={index}
                    className={index % 2 === 0 ? 'text-[#2E2E2E]' : 'text-[#2E2E2E]/60'}
                  >
                    {sentence.trim()}
                    {index < arr.length - 1 && '. '}
                  </span>
                ))}
            </p>
          </div>
          <div className='flex flex-col items-center self-stretch'>
            <div className='flex w-[68.4375rem] flex-col items-center'>
              <div className='xsm:px-[1.5rem] inline-flex items-center gap-[1.25rem] justify-center self-stretch'>
                <Link
                  href={content?.button_links.link_google_review?.url || ''}
                  target={'_blank'}
                  className='xsm:w-[10rem]'
                >
                  <BrandButton
                    variant='transparent'
                    classNameButtonContainer='xsm:w-full'
                  >
                    <div className='flex items-center justify-center gap-[0.625rem]'>
                      <span className='whitespace-nowrap xsm:text-[0.625rem] xsm:leading-[0.75rem] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] bg-clip-text text-transparent'>
                        {content?.button_links.link_google_review?.title || 'Google Review'}
                      </span>
                      <Image
                        src={'/about-us/gg-review.webp'}
                        alt={content?.button_links.link_google_review?.title || ''}
                        width={24}
                        height={25}
                        className='w-[1.37388rem] h-auto xsm:w-[0.875rem]'
                      />
                    </div>
                  </BrandButton>
                </Link>
                <Link
                  href={content?.button_links.link_tripadvisor?.url || '/'}
                  target={'_blank'}
                  className='xsm:w-[10rem]'
                >
                  <BrandButton
                    variant='transparent'
                    classNameButtonContainer='xsm:w-full'
                  >
                    <div className='flex items-center justify-center gap-[0.625rem] xsm:gap-[0.375rem]'>
                      <span className='whitespace-nowrap xsm:text-[0.625rem] xsm:leading-[0.75rem] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] bg-clip-text text-transparent'>
                        {content?.button_links.link_tripadvisor?.title || 'Tripadvisor'}
                      </span>
                      <Image
                        src={'/about-us/tripad.webp'}
                        alt={content?.button_links.link_tripadvisor?.title || ''}
                        width={24}
                        height={25}
                        className='w-[1.37388rem] h-auto xsm:w-[0.875rem]'
                      />
                    </div>
                  </BrandButton>
                </Link>
              </div>
              <div className='relative w-full xsm:w-fit xsm:pt-[2rem]'>
                <div className='relative w-[69.8125rem] h-[13.9375rem] xsm:w-[21.4375rem] xsm:h-[4.375rem] overflow-visible'>
                  {/* MASK LAYER */}
                  <div
                    className='absolute inset-0 bg-center bg-no-repeat'
                    style={{
                      WebkitMaskImage: "url('/about-us/text-brand-white.svg')",
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      WebkitMaskSize: '100% 100%',
                      maskImage: "url('/about-us/text-brand-white.svg')",
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskSize: '100% 100%',
                    }}
                  >
                    <Image
                      src='/about-us/d-text-brand.webp'
                      alt=''
                      fill
                      priority
                      className='object-cover object-bottom'
                    />
                  </div>

                  {/* SVG TEXT OVERLAY */}
                  <Image
                    src='/about-us/tram-phuot-text.svg'
                    alt=''
                    fill
                    className='pointer-events-none object-contain'
                  />
                </div>

                <Image
                  src={'/about-us/d-rowing.webp'}
                  alt=''
                  width={272}
                  height={270}
                  className='xsm:w-[5.32513rem] xsm:h-[4.30706rem] xsm:left-1/2 xsm:-translate-x-1/2 xsm:bottom-[-0.97rem] absolute bottom-[-3.1275rem] left-[31.6rem] h-[13.75rem] w-auto object-cover'
                />
              </div>
            </div>
            <div
              className='relative w-full h-[25rem] flex flex-nowrap justify-between items-center gap-4 overflow-x-auto xsm:gap-[0.75rem] xsm:items-start xsm:mt-[2rem] xsm:h-auto'
              style={{
                scrollbarWidth: 'none',
              }}
            >
              <Image
                src='/about-us/d-ellipse.webp'
                alt=''
                width={1335}
                height={377}
                className='xsm:hidden absolute -top-[9.7rem] mx-[2rem] h-[23.5625rem] w-auto'
              />

              {Array.isArray(content.who_we_are) &&
                content.who_we_are.map((item, index) => (
                  <div
                    key={index}
                    className={`xsm:w-[18.8125rem] xsm:first:ml-4 xsm:last:mr-4 xsm:px-[0.375rem] xsm:pt-[1.5rem] flex-shrink-0 w-[24.0625rem] flex flex-col items-start gap-[0.625rem] pt-[2.5rem] px-[0.625rem] pb-[0.625rem] rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(189,222,187,0.91)_14.98%,#F7E9DD_85.05%)] bg-repeat [background-blend-mode:color-burn,normal] ${
                      index % 2 === 1 ? 'mt-[3.3125rem] xsm:mt-0' : ''
                    }
          ${index === 0 ? 'xsm:ml-4' : ''}
    ${index === 2 ? 'xsm:mr-4' : ''}
          `}
                  >
                    <div className='xsm:p-[0.875rem] xsm:rounded-[0.5rem] bg-white flex flex-col items-start rounded-[0.75rem] p-4 self-stretch gap-[0.625rem]'>
                      <div className='flex flex-col items-start gap-3'>
                        <h2 className='xsm:text-[2rem] xsm:leading-[1] font-phu-du text-[3rem] font-medium leading-[1.2] bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-transparent'>
                          {item.title}
                        </h2>
                        <p className='xsm:text-[1rem] xsm:leading-1 text-[1.125rem] text-[#2E2E2E] leading-[1.1] font-phu-du'>
                          {item.subtitle}
                        </p>
                      </div>
                      <span className='xsm:text-[0.875rem] text-base leading-[1.5] font-montserrat font-[400] text-[#2E2E2EBF]'>
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
