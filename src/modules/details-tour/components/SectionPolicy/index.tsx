import PolicyCard from '@/modules/details-tour/components/SectionPolicy/PolicyCard'
import { DetailsTourPolicyType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'
import '@/modules/details-tour/components/SectionPolicy/style.css'

interface SectionPolicyProps {
  policy: DetailsTourPolicyType
}

export default function SectionPolicy({ policy }: SectionPolicyProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  return (
    <section
      id='section-policy'
      className='xsm:px-4 relative w-full'
    >
      <div className='section-box xsm:shadow-none xsm:py-4 xsm:px-3 xsm:rounded-[0.75rem] space-y-4 rounded-[1.5rem] px-8 py-6 mt-[2rem] xsm:mt-0'>
        <h2 className='xsm:text-[1.25rem] font-phu-du section-title-h2 xsm:pb-[0.725rem] xsm:border-b xsm:border-solid xsm:border-[#EDEDED] xsm:w-full w-fit pr-2 pb-3 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
          {translateDetailsTourPage('sectionPolicyTitle')}
        </h2>

        <div className='xsm:grid-cols-1 xsm:gap-4 grid grid-cols-2 gap-3'>
          <PolicyCard
            title={translateDetailsTourPage('childrenPolicyTitle')}
            content={policy?.children_policy || ''}
            classNameCard='col-span-1'
          />
          <PolicyCard
            title={translateDetailsTourPage('cancellationPolicyTitle')}
            content={policy?.cancellation_policy || ''}
            classNameCard='col-span-1'
          />
          <PolicyCard
            title={translateDetailsTourPage('whatToBringPolicyTitle')}
            content={policy?.what_to_bring_policy || ''}
            classNameCard='col-span-full'
          />
        </div>
      </div>
    </section>
  )
}
