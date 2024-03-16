import Todos from '_/components/todo'
import { db } from '_/lib/db'

type Props = {
  params: {
    id: string
  }
}
export default async function Page({ params }: Props) {
  const todos = await db.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  const todo = await db.todo.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  return (
    <div className='max-w-3xl mx-auto pt-20 px-4'>
      <Todos data={todos} todo={todo} type='edit' />
    </div>
  )
}
