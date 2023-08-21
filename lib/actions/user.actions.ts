'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import { UserValidation } from '../validations/user'

interface Params {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}
export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path
}: Params) => {
  await connectToDB()
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLocaleLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true }
    )

    if (path == '/profile/edit') {
      revalidatePath(path)
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export const fetchUser = async (userId: string) => {
  try {
    await connectToDB()
    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: userid: ${userId} ${error.message}`)
  }
}
