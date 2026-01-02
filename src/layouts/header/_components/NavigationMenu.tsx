import { IHeader } from '@/interface/site-setting.interface'
import NavigationItem from '@/layouts/header/_components/NavigationItem'
import LanguageSwitcher from '@/layouts/header/_components/LanguageSwitcher'

interface NavigationMenuProps {
  items: IHeader['navigations']
  side: 'left' | 'right'
  hoveredIndex: number | null
  hoveredSide: 'left' | 'right' | null
  onItemHover: (index: number, side: 'left' | 'right') => void
  onItemLeave: () => void
}

const NavigationMenu = ({
  items,
  side,
  hoveredIndex,
  hoveredSide,
  onItemHover,
  onItemLeave,
}: NavigationMenuProps) => {
  return (
    <div className='flex items-center h-full'>
      {items?.map((item, index) => (
        <NavigationItem
          key={index}
          item={item}
          index={index}
          hoveredIndex={hoveredIndex}
          hoveredSide={hoveredSide}
          side={side}
          onMouseEnter={() => onItemHover(index, side)}
          onMouseLeave={onItemLeave}
        />
      ))}
      {side === 'right' && (
        <div className='flex items-center'>
          <LanguageSwitcher />
        </div>
      )}
    </div>
  )
}

export default NavigationMenu
