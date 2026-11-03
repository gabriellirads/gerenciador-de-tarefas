"use client"

import { useTransition } from "react"
import { CheckIcon, RotateCcwIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { deleteTask, toggleTask } from "@/actions/task"

export function TaskActions({
  id,
  done,
}: {
  id: string
  done: boolean
}) {
  const [pending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleTask(id)
        toast.success(done ? "Tarefa reaberta!" : "Tarefa concluída!")
      } catch {
        toast.error("Não foi possível atualizar a tarefa.")
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteTask(id)
        toast.success("Tarefa excluída!")
      } catch {
        toast.error("Não foi possível excluir a tarefa.")
      }
    })
  }

  return (
    <div className="flex gap-1 justify-end">
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        disabled={pending}
      >
        {done ? <RotateCcwIcon /> : <CheckIcon />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        disabled={pending}
      >
        <Trash2Icon />
      </Button>
    </div>
  )
}