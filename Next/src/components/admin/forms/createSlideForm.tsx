"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDispatch } from "react-redux"
import { addSlide } from "@/store/slices/carouselSlice"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string(),
    href: z.string(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    slide_number: z.number().min(0),
})

export function CarouselForm() {
    const dispatch = useDispatch()
    const [uploading, setUploading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            href: "",
            status: "ACTIVE",
            slide_number: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setUploading(true)

            const formData = new FormData()

            // Añadir todos los campos del form
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value.toString())
            })

            // Añadir el slug
            formData.append("slug", values.title.toLowerCase().replace(/\s+/g, "-"))

            // Añadir la imagen si existe
            const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]')
            const file = fileInput?.files?.[0]
            if (file) {
                formData.append("image", file, file.name)
            }

            const response = await fetch("/api/carousel", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to create carousel slide")
            }

            const newSlide = await response.json()
            dispatch(addSlide(newSlide))

            // Reset form
            form.reset()
            if (fileInput) {
                fileInput.value = ""
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-zinc-400 p-10 rounded-2xl" encType="multipart/form-data">
                <FormItem>
                    <FormLabel className="font-bold">Image <span className="text-zinc-700">(must be 2200px x 900px)</span></FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" />
                    </FormControl>
                    <FormDescription className="font-bold text-zinc-700">(Click to select an image)</FormDescription>
                </FormItem>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter slide title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter slide description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="href"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormLabel className="font-bold">href</FormLabel>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="h-4 w-4 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">
                                                This is where you write slide redirection when clicked.
                                                It works with the last part of the URL, for example:
                                                <br /> <br />
                                                <span className="font-bold">/Shop?category=Fanart</span> if you want to redirect to the shop page with the fanart category.
                                                <br />
                                                <span className="font-bold">/Details/slug-product</span> if you want to redirect to the details page of a product.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <FormControl>
                                <Input placeholder="/Shop?category=something OR /Details/slug-product" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slide_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Slide Number</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={uploading}>
                        <Plus />{uploading ? "Creating..." : "Add new Slide"}
                    </Button>
                </div>

            </form>
        </Form >
    )
}

