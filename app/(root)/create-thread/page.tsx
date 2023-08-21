import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import PostThread from '@/components/forms/PostThread'

async function Page () {
  const user = await currentUser()
  if (!user) return <>Guest</>
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className='head-text'>Create thread</h1>
      <PostThread UserId={userInfo?._id} />
    </>
  )
}

export default Page
