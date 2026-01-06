import { ICHotel, ICTour } from '@/components/icons'
import { cn } from '@/lib/utils'

interface TabButtonsProps {
  kindTerms: { name: string; slug: string }[]
  activeTab: string
  onTabChange: (slug: string) => void
}

const TabButtons = ({ kindTerms, activeTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className='xsm:mx-auto inline-flex items-center justify-end gap-[0.5625rem]'>
      {kindTerms.map((taxonomy, index: number) => {
        const isActive = activeTab === taxonomy.slug
        const IconComponent = index === 0 ? ICHotel : ICTour

        return (
          <button
            key={taxonomy.slug}
            type='button'
            onClick={() => onTabChange(taxonomy.slug)}
            className={`flex h-[2.45925rem] sm:px-[1.875rem] justify-center items-center gap-[0.5625rem] rounded-[0.625rem] cursor-pointer transition-all ${
              isActive
                ? 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)]'
                : 'xsm:bg-[#FCF4ED] xsm:backdrop-blur-[2px] outline outline-[#00804D]'
            } ${index === 0 ? 'xsm:w-[10rem]' : 'xsm:w-[10.4375rem]'}`}
          >
            <IconComponent
              className={cn(
                index === 0 ? 'xsm:w-[1rem] w-[0.94525rem] h-auto shrink-0' : 'size-[1.05769rem]',
                isActive ? 'text-[#F9EAD5]' : 'text-[#1F4D37]',
              )}
            />
            <span
              className={`xsm:text-[0.75rem] xsm:leading-[0.9rem] whitespace-nowrap font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase ${
                isActive
                  ? 'text-[#F9EAD5]'
                  : 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)] bg-clip-text text-transparent'
              }`}
            >
              {taxonomy.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default TabButtons
