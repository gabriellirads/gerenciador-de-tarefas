"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"


import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { addTask } from "@/actions/task"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Sua tarefa precisa ter pelo menos 5 caracteres")
 
})




    export function ButtonAddTask() {
     const [open, setOpen] = React.useState(false)

     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        title: "",
    },
     })

  function onSubmit(data: z.infer<typeof formSchema>) {
  addTask(data.title)
  setOpen(false)
  form.reset()
  }


    return (
        <>
        <Button onClick={()=> setOpen(true)}>Adicionar</Button>
        <Dialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open)
            }}>
            
            <DialogContent>
                <DialogTitle></DialogTitle>
            
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
                
                </FieldGroup>
                </form>
                <DialogFooter>
                    <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                </Button>
                <Button type="submit" form="form-rhf-demo">
                    Submit
                </Button>
                </Field>
                </DialogFooter>
            
            </DialogContent>
        </Dialog>
        </>
    )
}

