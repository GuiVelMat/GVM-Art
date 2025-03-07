"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { fetchWrapper } from "@/utils/fetch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Flag, MoreVertical } from "lucide-react"
import type React from "react"

interface ReportButtonProps {
    productId: number | null
    orderLineId: number | null
}

export const ReportButton = ({ productId = null, orderLineId = null }: ReportButtonProps) => {
    // State for modal and form
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [reportType, setReportType] = useState("")
    const [reportDescription, setReportDescription] = useState("")

    // const currentUser = await getCurrentUser();
    const currentUser = true
    const { toast } = useToast()

    const createReport = async () => {
        try {
            // Updated to include the form data
            await fetchWrapper("/api/incidents", "POST", {
                productId,
                orderLineId,
                type: reportType,
                description: reportDescription,
            })

            toast({
                title: "Report sent",
                description: "Your report has been sent successfully",
            })

            // Reset form and close modal
            setReportType("")
            setReportDescription("")
            setIsReportModalOpen(false)
        } catch (error) {
            console.error(error)
            toast({
                title: "An error occurred",
                description: "There was an error sending your report",
                variant: "destructive",
            })
        }
    }

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault()
        createReport()
    }

    return (
        <>
            <div className={`flex items-center gap-2 ${productId ? "ml-5 mb-3" : "ml-2"}`}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-zinc-700">
                            <MoreVertical className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white text-black shadow-lg rounded-lg p-5">
                        {currentUser ? (
                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsReportModalOpen(true)}
                            >
                                <Flag className="h-4 w-4" />
                                <span>Report a problem</span>
                            </DropdownMenuItem>
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-not-allowed opacity-50" disabled>
                                            <Flag className="h-4 w-4" />
                                            <span>Report a problem</span>
                                        </DropdownMenuItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>You must be logged in to report problems</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Report Problem Modal */}
            <Dialog
                open={isReportModalOpen}
                onOpenChange={(open) => {
                    setIsReportModalOpen(open)
                    // Reset form when closing to ensure clean state
                    if (!open) {
                        setReportType("")
                        setReportDescription("")
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmitReport}>
                        <DialogHeader>
                            <DialogTitle>Report a Problem {productId ? "in this product" : "in your order"}</DialogTitle>
                            <DialogDescription>
                                Please provide details about the issue you are experiencing with this product.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="report-type">Problem Type</Label>
                                <Select value={reportType} onValueChange={setReportType} required>
                                    <SelectTrigger id="report-type">
                                        <SelectValue placeholder="Select the type of problem" />
                                    </SelectTrigger>
                                    <SelectContent className="cursor-pointer">
                                        <SelectItem value="defective" className="hover:bg-zinc-100 cursor-pointer">Product is defective</SelectItem>
                                        <SelectItem value="not-as-described" className="hover:bg-zinc-100 cursor-pointer">Product not as described</SelectItem>
                                        <SelectItem value="counterfeit" className="hover:bg-zinc-100 cursor-pointer">Suspected counterfeit</SelectItem>
                                        <SelectItem value="missing-parts" className="hover:bg-zinc-100 cursor-pointer">Missing parts or accessories</SelectItem>
                                        <SelectItem value="damaged" className="hover:bg-zinc-100 cursor-pointer">Damaged during shipping</SelectItem>
                                        <SelectItem value="other" className="hover:bg-zinc-100 cursor-pointer">Other issue</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="report-description">Description</Label>
                                <Textarea
                                    id="report-description"
                                    placeholder="Please describe the problem in detail..."
                                    value={reportDescription}
                                    onChange={(e) => setReportDescription(e.target.value)}
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setIsReportModalOpen(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Submit Report</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

