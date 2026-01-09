import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function SkeletonTour({ className }: { className?: string }) {
  return (
    <div className='relative'>
      <Skeleton
        className={cn(
          'xsm:h-[31.03531rem] xsm:rounded-[0.56044rem] group relative h-[22.6875rem] w-full overflow-hidden rounded-[0.5rem]',
          className,
        )}
      />
    </div>
  )
}
