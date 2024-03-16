'use server'
import type { Todo } from '@prisma/client'
import { db } from '_/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateTodo(payload: Todo) {
  try {
    await db.todo.update({
      data: {
        title: payload.title,
        description: payload.description,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      },
      where: {
        id: payload.id,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }

  redirect('/')
}
