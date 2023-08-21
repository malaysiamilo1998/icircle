import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs'
async function Page () {
  const user = await currentUser()
  const userInfo = {}
  const userData = {
    id: user?.id,
    username: userInfo?.username || user?.username,
    objectId: userInfo?._id,
    name: userInfo?.name || user?.firstName || '',
    image: userInfo?.image || user?.imageUrl,
    bio: userInfo?.bio || user?.bio || ''
  }
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>onboarding </h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete you profile to use Threads
      </p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='continue' />
      </section>
    </main>
  )
}

export default Page
