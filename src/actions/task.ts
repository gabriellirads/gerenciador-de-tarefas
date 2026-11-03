"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getUserId() {
  const { userId } = await auth()

  if (!userId) {
    return redirect("/login")
  }

  return userId
}

export async function addTask(title: string, description?: string) {
  const userId = await getUserId()

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      userId,
    },
  })
  revalidatePath("/dashboard")
}

export async function toggleTask(id: string) {
  const userId = await getUserId()

  // findFirst com userId garante que a tarefa pertence ao usuário logado
  const task = await prisma.task.findFirst({
    where: { id, userId },
  })

  if (!task) {
    throw new Error("Tarefa não encontrada")
  }

  await prisma.task.update({
    where: { id },
    data: { done: !task.done },
  })
  revalidatePath("/dashboard")
}

export async function deleteTask(id: string) {
  const userId = await getUserId()

  // deleteMany com userId impede excluir tarefa de outra pessoa
  const result = await prisma.task.deleteMany({
    where: { id, userId },
  })

  if (result.count === 0) {
    throw new Error("Tarefa não encontrada")
  }
  revalidatePath("/dashboard")
}