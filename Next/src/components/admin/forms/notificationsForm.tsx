"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Bell, Info, AlertTriangle, Mail, Send, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { fetchWrapper } from "@/utils/fetch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

const formSchema = z.object({
    message: z.string().min(5, {
        message: "Message must be at least 5 characters.",
    }),
    notificationType: z.enum(["bell", "email"], {
        required_error: "Please select a notification type.",
    }),
})

export function CreateNotificationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
            notificationType: "bell"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true)
            const result = await fetchWrapper("/api/notifications", "POST", values)

            if (result) {
                toast({
                    title: "Notifications sent",
                    description: `Notifications have been sent to ${result.count} users.`,
                })
                form.reset()
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An error occurred while sending notifications.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "An error occurred while sending notifications.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    New Notification
                </CardTitle>
                <CardDescription>Create and send mass notifications to all platform users.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="notificationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notification Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="bell">
                                                    <div className="flex items-center gap-2">
                                                        <Bell className="h-4 w-4 text-primary" />
                                                        <span>Platform Notification</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="email">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-primary" />
                                                        <span>Email</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>Select the notification method.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your notification message..."
                                            className="min-h-[150px] resize-y"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        This notification will be sent to all users.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="bg-muted/50 p-4 rounded-lg border border-border">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <Info className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Preview</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {form.watch("notificationType") === "bell" ? (
                                            <>Users will see this notification in their notification panel.</>
                                        ) : (
                                            <>Users will receive this message via email.</>
                                        )}
                                    </p>

                                    {form.watch("message") && (
                                        <div className="mt-3 p-3 bg-background rounded border">
                                            <p className="text-sm">{form.watch("message")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                This action cannot be undone
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="gap-2">
                                <Send className="h-4 w-4" />
                                {isSubmitting ? "Sending..." : "Send Notifications"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

