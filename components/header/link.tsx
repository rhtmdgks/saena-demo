'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import ShinyText from '@/components/ui/shiny-text'

// NavbarLink component
export const NavbarLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname() || '/'
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(pathname === href)
  }, [pathname, href])

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium py-1 px-3 transition-colors duration-200 text-white w-[90px] flex items-center justify-center
        ${active ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
    >
      {active ? (
        <ShinyText text={children as string} speed={3} className="text-white" />
      ) : (
        children
      )}
    </Link>
  )
}

// NavbarLinkBackground component
export const NavbarLinkBackground = ({ links }: { links: string[] }) => {
  const pathname = usePathname() || '/'
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(links.indexOf(pathname))
  }, [pathname, links])

  return (
    <div
      className={clsx(
        'absolute transition-all duration-200 ease-in-out h-7 rounded-full bg-white/20'
      )}
      style={{
        width: `90px`,
        left: `calc((${activeIndex} * 90px) + 4px)`,
      }}
    />
  )
}
