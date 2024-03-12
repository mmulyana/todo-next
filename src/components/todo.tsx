import type { Todo } from '@prisma/client'

type Props = {
  data: Todo[] | null
}
export default function Todos({ data }: Props) {
  return (
    <>
      <div>
        <form>
          <input name='title' placeholder='title' />
          <button type='submit'>Save</button>
        </form>
      </div>
      <div className='mt-10'>
        {data?.map((todo) => (
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
