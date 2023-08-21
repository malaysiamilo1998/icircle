'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'

export default function BottomBar () {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {
          // sidebarLinks is always not a empty array
          sidebarLinks.map(link => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route
            return (
              <Link
                className={`bottombar_link ${isActive && 'bg-primary-500'}`}
                href={link.route}
                key={link.label}
              >
                <Image
                  src={link.imgURL}
                  width='24'
                  height='24'
                  alt={link.label}
                ></Image>
                {/* max-lg:hidden == hidden lg:block */}
                <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}
