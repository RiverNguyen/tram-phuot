'use client'

import { useTranslations } from 'next-intl'

interface ApplyButtonProps {
  onClick: () => void
}

export const ApplyButton = ({ onClick }: ApplyButtonProps) => {
  const t = useTranslations('HomePage.banner')

  return (
    <div className='border-t border-[0.5px] border-[#EDEDED] p-4 flex-center'>
      <button
        className='h-[2.5rem] p-[0.625rem_1.875rem] rounded-[0.625rem] flex-center w-full text-[#F9EAD5] text-[0.75rem] font-semibold leading-[1.2] uppercase'
        style={{
          background: 'linear-gradient(50deg, #03328C -18.36%, #00804D 82.62%)',
        }}
        onClick={onClick}
      >
        {t('apply')}
      </button>
    </div>
  )
}








