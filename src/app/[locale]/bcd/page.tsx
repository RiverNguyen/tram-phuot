import React from 'react'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default function page() {
  return <div>page</div>
}
