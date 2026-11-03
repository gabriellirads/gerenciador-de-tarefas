import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { prisma } from "@/lib/prisma"
import { ButtonAddTask } from "./_components /button-add-task"
import { TaskActions } from "./_components /task-actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect("/login")
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">MINHAS TAREFAS</h1>
        <ButtonAddTask />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell
                className={task.done ? "line-through text-muted-foreground" : ""}
              >
                <div className="font-medium">{task.title}</div>
                {task.description && (
                  <div className="text-sm text-muted-foreground">
                    {task.description}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <TaskActions id={task.id} done={task.done} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}