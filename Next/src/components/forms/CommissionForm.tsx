"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React from "react"
import { commisionSchema } from "@/validation/schema"
import { fetchWrapper } from "@/utils/fetch"
import { useToast } from "@/hooks/use-toast"

export const CommissionForm = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof commisionSchema>>({
        resolver: zodResolver(commisionSchema),
        defaultValues: {
            name: "",
            email: "",
            description: "",
        },
    })

    async function onSubmit(formData: z.infer<typeof commisionSchema>) {
        await fetchWrapper('/api/comissions', 'POST', formData).then((data) => {
            if (!data) {
                toast({
                    title: 'Error sending email',
                });
                return
            } else {
                toast({
                    title: 'Email sent',
                    description: 'Your commission request has been received',
                });
            }
        })

        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Your Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Your Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="johndoe@example.com" {...field} />
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
                            <FormLabel className="text-white">Commission Details</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Please provide details about your commission request..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Submit Commission Request
                </Button>
            </form>
        </Form>
    )
}

