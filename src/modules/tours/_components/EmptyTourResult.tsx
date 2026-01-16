import ICCompass from '@/components/icons/ICCompass'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { useTranslations } from 'next-intl'

export default function EmptyTourResult({ onReset }: { onReset?: () => void }) {
  const t = useTranslations('ListTourPage')

  return (
    <div className='xsm:px-[1.25rem] xsm:py-[1.75rem] relative mx-auto w-full max-w-[36rem] overflow-hidden'>
      <div className='relative flex flex-col items-center justify-center text-center'>
        <div className='mb-[1.25rem] rounded-[1.25rem] bg-white p-[0.5rem]'>
          <div className='flex size-[4.25rem] items-center justify-center rounded-[1rem] bg-[linear-gradient(230deg,rgba(3,50,140,0.10)_5.76%,rgba(0,128,77,0.10)_100.15%)] text-[#03328C]'>
            <ICCompass className='size-[1.75rem]' />
          </div>
        </div>

        <p className='font-phu-du bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[1.75rem] leading-[1.75rem] font-medium tracking-[-0.02rem] text-transparent uppercase'>
          {t('noResult')}
        </p>
        <p className='font-montserrat mt-[0.75rem] max-w-[26rem] text-[1rem] leading-[1.55rem] text-[rgba(6,42,25,0.60)]'>
          {t('noResultDesc')}
        </p>

        {onReset && (
          <button
            type='button'
            onClick={onReset}
            className='group font-montserrat mt-[1.5rem] inline-flex h-[3rem] items-center justify-center gap-2 rounded-[0.9rem] border border-[#FF2019]/35 bg-white px-[1.25rem] text-[0.875rem] leading-[1.4rem] font-bold tracking-[0.06rem] text-[#FF2019] uppercase transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#FF2019] hover:text-white cursor-pointer'
          >
            <ICTrashcan className='size-[1.125rem] transition-colors group-hover:text-white' />
            <span>{t('reset')}</span>
          </button>
        )}
      </div>
    </div>
  )
}
