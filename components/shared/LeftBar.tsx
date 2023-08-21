'use client'
import { sidebarLinks } from '@/constants/index'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

export default function LeftBar () {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex flex-1 w-full flex-col gap-6 px-6'>
        {
          // sidebarLinks is always not a empty array
          sidebarLinks.map(link => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route
            return (
              <Link
                className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
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
                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
              </Link>
            )
          })
        }
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton
            signOutCallback={() => {
              router.push('sign-in')
            }}
          >
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width='24'
                height='24'
              />
              <p className='text-light-1 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}
