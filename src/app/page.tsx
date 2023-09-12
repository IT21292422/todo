import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos(){
  return prisma.todo.findMany()
}

// Update complete status by using id
async function toggleTodo(id: string, complete: boolean){
  "use server"
  await prisma.todo.update({where: {id}, data:{complete}})
}

export default async function Home() {

  const todos = await getTodos()

  return (
    <>
    {/* So inorder to align Todos and New to far end we use flex */}
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>

      {/* This is similar to <a> anchor tag, so we create route by creating new folders, so this will redirect to page.tsx in new folder*/}

      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">New</Link>

    </header>
    <ul className="pl-4">
      {todos.map(todo =>(
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
    </>
  )
}