import { cn } from '@/lib/utils'

interface PolicyCardProps {
  title?: string
  content?: string
  classNameCard?: string
  classNameTitle?: string
  classNameContent?: string
}

export default function PolicyCard({
  title,
  content,
  classNameCard,
  classNameTitle,
  classNameContent,
}: PolicyCardProps) {
  return (
    <article
      className={cn(
        'xsm:rounded-[0.75rem] xsm:p-4 xsm:space-y-2 relative space-y-3.5 rounded-[1rem] bg-[#F2F2F2] px-4 pt-5 pb-4',
        classNameCard,
      )}
    >
      <h3
        className={cn(
          'font-phu-du xsm:text-[1rem] xsm:leading-normal xsm:text-[#2E2E2E] text-[1.125rem] leading-[1.1] font-bold text-[#343434] uppercase',
          classNameTitle,
        )}
      >
        {title}
      </h3>
      <div
        className={cn(
          'font-montserrat policy-card__content xsm:text-body/75 xsm:text-[0.75rem] xsm:tracking-[-0.0075rem] xsm:leading-[1.6] text-[0.875rem] leading-normal text-[#5C5C5C]',
          classNameContent,
        )}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      ></div>
    </article>
  )
}
