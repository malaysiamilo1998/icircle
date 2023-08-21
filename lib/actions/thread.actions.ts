'use server'

import { connectToDB } from '../mongoose'
import User from '@/lib/models/user.model'
import Thread from '@/lib/models/thread.model'
interface Params {
  author: string
  communityId: string | null
  text: string
  path: string
}

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    await connectToDB()
    const recordsSkipAmount = (pageNumber - 1) * pageSize
    const retrieveThreadQuery = Thread.find({
      parentId: { $in: [null, undefined] }
    })
      .sort({ createdAt: 'desc' })
      .skip(recordsSkipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: User })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: '_id name parentId image'
        }
      })

    const totalTopThreadCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] }
    })
    const manyThreads = await retrieveThreadQuery.exec()

    const hasNextPage =
      totalTopThreadCount > recordsSkipAmount + manyThreads.length

    return { manyThreads, hasNextPage }
  } catch (e: any) {
    throw new Error(
      `Error occurs while fetching top level threads ${e.message}`
    )
  }
}
export const createThread = async ({
  author,
  communityId,
  path,
  text
}: Params) => {
  try {
    await connectToDB()
  } catch (error: any) {
    throw new Error(
      `Error occurs while connecting to mongodb  ${error.message}`
    )
  }
  try {
    const createdThread = await Thread.create({ text, author, community: null })
    try {
      await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
      })
    } catch (e: any) {
      throw new Error(`Error occurs while updating user ${e.message}`)
    }
  } catch (error: any) {
    throw new Error(`Error occurs while creating thread ${error.message}`)
  }
}
