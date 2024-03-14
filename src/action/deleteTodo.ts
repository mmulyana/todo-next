'use server'

import { db } from '_/lib/db'
import { revalidateTag } from 'next/cache'

export async function deleteTodo(id: number) {
  try {
    await db.todo.delete({
      where: {
        id,
      },
    })

    revalidateTag('/')
  } catch (error) {
    console.log(error)
  }
}
