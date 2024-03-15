'use server'

import { db } from '_/lib/db'
import { revalidatePath } from 'next/cache'

export async function checkTodo(id: number) {
  try {
    const todo = await db.todo.findUnique({
      where: {
        id,
      },
    })

    if (!todo) throw new Error('todo not found')

    await db.todo.update({
      data: {
        isDone: !todo.isDone,
      },
      where: {
        id,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}
