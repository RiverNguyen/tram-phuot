export default function ICCircleDouble(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      {...props}
    >
      <circle
        cx='9'
        cy='9'
        r='6'
        fill='#479064'
      />
      <circle
        cx='9'
        cy='9'
        r='8.25'
        stroke='#479064'
        strokeWidth='1.5'
      />
    </svg>
  )
}