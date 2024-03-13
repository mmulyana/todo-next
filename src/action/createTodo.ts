'use server'
import type { Todo } from '@prisma/client'
import { db } from '_/lib/db'
import { revalidatePath } from 'next/cache'

export async function createTodo(payload: Todo) {
  try {
    await db.todo.create({
      data: {
        title: payload.title,
        description: payload.description,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}
