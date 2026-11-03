"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addTask } from "@/actions/task"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Sua tarefa precisa ter pelo menos 5 caracteres"),
  description: z
    .string()
    .max(500, "A descrição pode ter no máximo 500 caracteres")
    .optional(),
})

export function ButtonAddTask() {
  const [open, setOpen] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await addTask(data.title, data.description)
      toast.success("Tarefa adicionada!")
      setOpen(false)
      form.reset()
    } catch {
      toast.error("Não foi possível adicionar a tarefa.")
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Adicionar</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova tarefa</DialogTitle>
            <DialogDescription>
              Informe o título. A descrição é opcional.
            </DialogDescription>
          </DialogHeader>

          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Sua tarefa
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite sua tarefa..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Descrição (opcional)
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-demo-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Detalhes da tarefa..."
                      rows={4}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <DialogFooter>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Limpar
              </Button>
              <Button type="submit" form="form-rhf-demo">
                Salvar
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}