'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { createThread } from '@/lib/actions/thread.actions'

import { threadSchema } from '@/lib/validations/thread'
import { UserValidation } from '@/lib/validations/user'

const PostThread = ({ UserId }: { UserId: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = async (values: z.infer<typeof threadSchema>) => {
    await createThread({
      author: UserId,
      communityId: null,
      text: values.thread,
      path: pathname
    })

    router.push('/')
  }

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: { thread: '', accoundId: UserId }
  })
  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-col w-full gap-3'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Content
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                  <Textarea {...field} rows={15} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        ></FormField>
        <Button type='submit' className='bg-primary-500'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default PostThread
