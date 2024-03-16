import Todos from '_/components/todo'
import { db } from '_/lib/db'

// export const dynamic = 'force-dynamic'

export default async function Home() {
  const todos = await db.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return (
    <div className='max-w-3xl mx-auto pt-20 px-4'>
      <Todos data={todos || []} type='add' />
    </div>
  )
}
