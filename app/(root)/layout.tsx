import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import TopBar from '@/components/shared/TopBar'
import BottomBar from '@/components/shared/BottomBar'
import LeftBar from '@/components/shared/LeftBar'
import RightBar from '@/components/shared/RightBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'I Circle Threads',
  description: "Coffee lovers' community"
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <TopBar />
          <main className='flex flex-row flex-between'>
            <LeftBar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            <RightBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
