import * as z from 'zod'
export const threadSchema = z.object({
  thread: z.string().nonempty().min(6, { message: 'Minimum 6 characters' }),
  accoundId: z.string().nonempty()
})

export const commentSchema = z.object({
  thread: z.string().nonempty().min(6, { message: 'Minimum 6 characters' }),
  accoundId: z
    .string()
    .nonempty()
    .min(3, { message: 'Thread must associated with a user' })
})
