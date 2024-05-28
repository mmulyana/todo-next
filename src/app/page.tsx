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
      <h1 className='text-xl text-slate-800' data-testid='title'>
        Todo Next
      </h1>
      <Todos data={todos || []} type='add' />
    </div>
  )
}
