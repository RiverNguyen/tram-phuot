'use client'
import ICArrowRight from '@/components/icons/ICArrowRight'
import ICMaximize from '@/components/icons/ICMaximize'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { X } from 'lucide-react'
import Image from 'next/image'
import { IPin } from './Map'
import { useState } from 'react'
import ICMinimize from '@/components/icons/ICMinimize'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function MapItemTooltip(pin: IPin) {
  const [isMaximize, setIsMaximize] = useState(false)
  const t = useTranslations('HomePage.ourTours')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type='button'
          className='absolute transform -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-125 transition duration-300 ease-out z-10'
          style={{
            left: `${pin.x}%`, // hoặc dùng px nếu thích
            top: `${pin.y}%`,
          }}
        >
          {/* Map pin SVG của bạn - scale xuống còn ~80-90% cho đẹp */}
          <svg
            width='30'
            height='36'
            viewBox='0 0 30 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-[1.48594rem] h-auto'
          >
            <mask
              id='path-1-inside-1_26_3234'
              fill='white'
            >
              <path d='M14.7168 0C22.8316 0 29.4334 5.80704 29.4336 12.9443C29.4332 21.8017 16.2646 34.8045 15.7031 35.3545C15.1774 35.8695 14.2571 35.8704 13.7305 35.3545C13.1683 34.8038 0.000384711 21.8014 0 12.9443C0 5.80705 6.60191 2.22919e-05 14.7168 0Z' />
            </mask>
            <path
              d='M14.7168 0C22.8316 0 29.4334 5.80704 29.4336 12.9443C29.4332 21.8017 16.2646 34.8045 15.7031 35.3545C15.1774 35.8695 14.2571 35.8704 13.7305 35.3545C13.1683 34.8038 0.000384711 21.8014 0 12.9443C0 5.80705 6.60191 2.22919e-05 14.7168 0Z'
              fill='#FFC542'
            />
            <path
              d='M14.7168 0V-2.10241H14.7168L14.7168 0ZM29.4336 12.9443L31.536 12.9444V12.9443L29.4336 12.9443ZM15.7031 35.3545L14.232 33.8526L14.2319 33.8527L15.7031 35.3545ZM13.7305 35.3545L15.2017 33.8526L15.2016 33.8526L13.7305 35.3545ZM0 12.9443H-2.10241V12.9444L0 12.9443ZM14.7168 0V2.10241C21.9321 2.10241 27.3311 7.21351 27.3312 12.9444L29.4336 12.9443L31.536 12.9443C31.5358 4.40057 23.7312 -2.10241 14.7168 -2.10241V0ZM29.4336 12.9443L27.3312 12.9442C27.3311 14.6831 26.6696 16.8118 25.4886 19.1609C24.3237 21.4781 22.7414 23.838 21.1046 25.993C17.8318 30.3016 14.4817 33.6079 14.232 33.8526L15.7031 35.3545L17.1743 36.8564C17.4861 36.551 21.001 33.081 24.453 28.5363C26.1785 26.2647 27.9236 23.6787 29.2454 21.0496C30.5511 18.4524 31.5359 15.6342 31.536 12.9444L29.4336 12.9443ZM15.7031 35.3545L14.2319 33.8527C14.4086 33.6795 14.5975 33.6387 14.7165 33.6387C14.8358 33.6387 15.025 33.6795 15.2017 33.8526L13.7305 35.3545L12.2592 36.8564C13.6042 38.1739 15.8321 38.1713 17.1744 36.8563L15.7031 35.3545ZM13.7305 35.3545L15.2016 33.8526C14.9515 33.6076 11.6014 30.3012 8.32875 25.9926C6.69194 23.8377 5.10979 21.4779 3.94487 19.1607C2.76392 16.8117 2.10248 14.683 2.10241 12.9442L0 12.9443L-2.10241 12.9444C-2.10229 15.6342 -1.1176 18.4522 0.1881 21.0494C1.50983 23.6785 3.25486 26.2643 4.98035 28.536C8.43227 33.0805 11.9472 36.5507 12.2593 36.8564L13.7305 35.3545ZM0 12.9443H2.10241C2.10241 7.21355 7.50144 2.10243 14.7168 2.10241L14.7168 0L14.7168 -2.10241C5.70237 -2.10238 -2.10241 4.40055 -2.10241 12.9443H0Z'
              fill='white'
              mask='url(#path-1-inside-1_26_3234)'
            />
            <g clipPath='url(#clip0_26_3234)'>
              <path
                d='M13.1421 8.40625C13.7791 8.49467 14.5763 9.22448 14.5763 9.87569V14.7415L11.6877 14.6293C10.528 14.5647 9.44329 14.5815 9.088 13.2623L8.40918 8.40625H13.1421Z'
                fill='white'
              />
              <path
                d='M15.0088 14.7368C15.3496 13.3375 15.5215 11.8442 15.8855 10.4548C16.1108 9.59587 16.6437 9.08079 17.5825 9.00781L21.0199 9.66043C21.0546 9.69552 20.9188 10.0211 20.8928 10.0899C20.4855 11.1439 20.0754 12.2162 19.6349 13.2561C19.4384 13.7221 19.3113 14.1094 18.8723 14.4224C18.7264 14.5263 18.3003 14.734 18.1328 14.734H15.0102L15.0088 14.7368Z'
                fill='white'
              />
              <path
                d='M8.99902 19.9742L9.7255 16.5778C9.89737 15.9308 10.4895 15.3947 11.1842 15.3231C12.0653 15.2319 13.0401 15.2347 13.9284 15.2038C14.1291 15.1968 14.3602 15.1322 14.5769 15.1659C14.5249 15.6389 14.5003 16.1175 14.4556 16.5933C14.3978 17.2066 14.3675 18.1202 14.2302 18.7013C14.1118 19.1995 13.4749 19.9742 12.9087 19.9742H8.99902Z'
                fill='white'
              />
              <path
                d='M18.8588 18.9362H16.7574C16.6779 18.9362 16.3833 18.8183 16.2923 18.7776C15.677 18.5025 15.4084 18.0562 15.29 17.4233C15.1542 16.692 15.134 15.8949 15.0098 15.158C15.056 15.158 15.1022 15.1552 15.1484 15.1566C15.6611 15.1665 16.7371 15.203 17.1719 15.4051C17.5777 15.5931 17.8767 15.9594 18.0356 16.3594C18.3605 17.172 18.5439 18.1124 18.8588 18.9376V18.9362Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_26_3234'>
                <rect
                  width='12.6144'
                  height='11.5632'
                  fill='white'
                  transform='translate(8.40918 8.40625)'
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'relative p-4 w-[22.25rem] rounded-[0.5rem]! transition-all',
          isMaximize ? 'h-auto pb-[3.8125rem] overflow-visible' : 'h-[14.5625rem] overflow-hidden',
        )}
      >
        <PopoverClose asChild>
          <button
            type='button'
            className='absolute flex items-center justify-center cursor-pointer right-2.5 top-2.5 bg-[rgba(17,17,100,0.10)] size-[1.875rem] rounded-full'
          >
            <X className='size-4 text-[rgba(17,17,100,0.60)]' />
          </button>
        </PopoverClose>
        <div className='flex items-center pb-[0.75rem] border-b border-b-black/6 space-x-3.5'>
          <Image
            src={pin?.location?.acf?.image || ''}
            alt=''
            width={144}
            height={144}
            className='size-[4.75rem] rounded-[0.5rem]'
          />
          <div>
            <h2 className='font-phu-du text-[1rem] font-bold leading-[1.1rem] text-[#07364D]'>
              {pin?.location?.name}
            </h2>
            <p className='font-montserrat text-[0.875rem] leading-[1.02rem] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)]'>
              {t('localTours')}:
              <span className='leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-[#FF7B4A]'>
                {' '}
                {pin?.location?.stats?.tours} tours
              </span>
            </p>
            <p className='font-montserrat text-[0.875rem] leading-[1.02rem] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)]'>
              {t('stayPoints')}:
              <span className='leading-[1.4rem] font-semibold tracking-[-0.00875rem] text-[#FF7B4A]'>
                {' '}
                {pin?.location?.stats?.hotels}
              </span>
            </p>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: pin?.location?.acf?.desc || '' }}
          className='pt-[0.875rem] font-montserrat text-[0.875rem] leading-[1.02rem] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)]'
        ></div>
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 w-full h-[4.625rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.86)_32.08%,#FFF_69.34%)] z-1 rounded-b-[0.5rem]',
            isMaximize && 'hidden',
          )}
        ></div>
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 w-full flex items-end justify-between z-2 h-[3.0625rem] rounded-b-[0.5rem]',
            isMaximize && 'bg-white',
          )}
        >
          <button
            type='button'
            className='px-4 py-3.5 inline-flex items-center justify-center space-x-1.5 font-montserrat text-[0.875rem] font-semibold tracking-[-0.00875rem] bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] bg-clip-text text-transparent cursor-pointer'
          >
            <span>{t('exploreTheTour')}</span>
            <ICArrowRight className='size-4' />
          </button>
          <button
            type='button'
            onClick={() => setIsMaximize((prev) => !prev)}
            className='p-3.5 cursor-pointer'
          >
            {isMaximize ? (
              <ICMinimize className='size-[0.85456rem]' />
            ) : (
              <ICMaximize className='size-[0.85456rem]' />
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
