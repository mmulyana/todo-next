'use client'

import type { Todo } from '@prisma/client'
import { createTodo } from '_/action/createTodo'
import { useOptimistic } from 'react'

type Props = {
  data: Todo[]
}
export default function Todos({ data }: Props) {
  const [optimisticTodos, addNewTodo] = useOptimistic(
    data,
    (state: Todo[], newData: Todo) => [
      { ...newData, id: state.length + 1 },
      ...state,
    ]
  )

  const action = async (formdata: FormData) => {
    let title = formdata.get('title')
    if (typeof title !== 'string') title = ''

    const payload: Todo = {
      id: Math.random(),
      title,
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
    }

    addNewTodo(payload)
    await createTodo(payload)
  }

  return (
    <>
      <div>
        <form action={action}>
          <input
            name='title'
            placeholder='title'
            className='bg-gray-100 rounded px-2 py-1.5 border border-gray-200'
          />
          <button
            className='bg-blue-700 px-6 h-full rounded py-1.5 text-white ml-4'
            type='submit'
          >
            Save
          </button>
        </form>
      </div>
      <div className='mt-10'>
        {optimisticTodos?.map((todo) => (
          <div
            key={todo.id}
            className='px-2 py-1.5 rounded border border-gray-200 text-sm'
          >
            <p className='font-medium'>{todo.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}
