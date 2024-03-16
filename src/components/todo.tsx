'use client'

import { CheckIcon } from '@heroicons/react/16/solid'
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Todo } from '@prisma/client'
import { checkTodo } from '_/action/checkTodo'
import { createTodo } from '_/action/createTodo'
import { deleteTodo } from '_/action/deleteTodo'
import { updateTodo } from '_/action/updateTodo'
import { useRouter } from 'next/navigation'
import { useOptimistic } from 'react'

type Props = {
  data: Todo[]
  todo?: Todo | null
  type: 'add' | 'edit'
}
export default function Todos({ data, todo, type }: Props) {
  const [optimisticTodos, addNewTodo] = useOptimistic(
    data,
    (state: Todo[], newData: Todo) => [
      { ...newData, id: state.length + 1 },
      ...state,
    ]
  )
  const router = useRouter()

  const action = async (formdata: FormData) => {
    let title = formdata.get('title')
    if (typeof title !== 'string') title = ''

    let payload: Todo = {
      id: Math.random(),
      title,
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
    }

    if (type == 'add') {
      addNewTodo(payload)
      await createTodo(payload)
      return
    }
    if (!todo) return
    payload.id = todo.id
    await updateTodo(payload)
  }

  return (
    <>
      <div>
        <form action={action}>
          <input
            name='title'
            placeholder='title'
            className='bg-gray-100 rounded px-2 py-1.5 border border-gray-200'
            defaultValue={todo?.title || ''}
            autoFocus
          />
          <button
            className='bg-blue-700 px-6 h-full rounded py-1.5 text-white ml-4'
            type='submit'
          >
            Save
          </button>
        </form>
      </div>
      <div className='mt-10 space-y-3'>
        {optimisticTodos?.map((todo) => (
          <div
            key={todo.id}
            className='px-2 py-1.5 rounded border border-gray-200 text-sm flex justify-between items-center'
          >
            <div className='flex gap-2 items-center'>
              <button
                onClick={async () => {
                  await checkTodo(todo.id)
                }}
                className={[
                  'h-6 w-6 rounded-full flex items-center justify-center border',
                  todo.isDone
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : 'bg-transparent border-gray-200 text-white hover:bg-teal-400 hover:text-white hover:border-teal-400',
                ].join(' ')}
              >
                <CheckIcon className='w-5 h-5' />
              </button>
              <p className='font-medium'>{todo.title}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <button
                className='w-7 h-7 rounded hover:bg-blue-50 flex items-center justify-center'
                onClick={() => router.push('/' + todo.id)}
              >
                <PencilIcon className='h-5 w-5 text-blue-500' />
              </button>
              <button
                className='w-7 h-7 rounded hover:bg-red-50 flex items-center justify-center'
                onClick={async () => await deleteTodo(todo.id)}
              >
                <XMarkIcon className='h-5 w-5 text-red-500' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
