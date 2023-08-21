import { fetchPosts } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs'
import ThreadCard from '@/components/cards/ThreadCard'

export default async function Home () {
  const paginatedThreads = await fetchPosts(1, 30)
  const user = await currentUser()

  return (
    <>
      <h1 className='head-text text-left'>Moments</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {paginatedThreads.manyThreads.length === 0 ? (
          <p className='no-result'>Empty Momomets</p>
        ) : (
          <>
            {paginatedThreads.manyThreads.map(moment => (
              <ThreadCard
                id={moment._id}
                key={moment._id}
                currentUserId={user?.id || ''}
                parentId={moment.parentId}
                content={moment.text}
                author={moment.author}
                community={moment.community}
                createdAt={moment.createdAt}
                comment={moment.comment}
              ></ThreadCard>
            ))}
          </>
        )}
      </section>
    </>
  )
}
