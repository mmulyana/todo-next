import Todos from '_/components/todo'
import { db } from '_/lib/db'

export default async function Home() {
  const todos = await db.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return (
    <div className='max-w-3xl mx-auto pt-20'>
      <Todos data={todos} />
    </div>
  )
}
