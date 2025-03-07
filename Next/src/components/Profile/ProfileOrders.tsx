'use client'

import type { UserProfileResponse } from "@/types/UserProfile"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { Download } from "lucide-react"
import React from "react"
import { useImageDownload } from "@/hooks/useImageDownload"
import { ReportButton } from "../shared/buttons/reportButton"

interface ProfileOrdersProps {
    profile: UserProfileResponse
}

export const ProfileOrders = ({ profile }: ProfileOrdersProps) => {
    const downloadImage = useImageDownload()

    return (
        <div className="max-w-3xl space-y-4 flex flex-col mx-auto">
            <h1 className="text-2xl font-bold">Orders for {profile.username}</h1>

            <Accordion type="multiple" className="w-full bg-zinc-600 rounded-lg">
                {profile.orders.map((order) => (
                    <AccordionItem key={order.id} value={order.id.toString()}>
                        <AccordionTrigger className="flex justify-between px-4 bg-stone-700">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center">
                                    <span className="mr-5">{order.total}€</span>
                                    <span className="text-sm text-zinc-300">{order.createdAt.toISOString().split("T")[0]}</span>
                                </div>
                                <span className="font-mono text-md mr-5">#{order.id}</span>
                            </div>
                        </AccordionTrigger>
                        {order.orderLines.map((line) => (
                            <AccordionContent key={line.id} className="px-4 pt-4">
                                <div className="rounded-lg border p-4 bg-zinc-500">
                                    <div className="grid grid-cols-2 gap-4 items-center">
                                        <Image
                                            src={`/assets/products/${line.productprice.product.ImagesProduct[0].src}`}
                                            alt={line.productprice.product.ImagesProduct[0].alt}
                                            width={400}
                                            height={400}
                                        />
                                        <div className="flex flex-col items-end">
                                            <div className="text-end">
                                                <div>
                                                    <span className="text-2xl italic">{line.productprice.product.name}</span>
                                                </div>
                                                <div>
                                                    <span className="text-lg italic">{line.productprice.type.name}</span>
                                                </div>
                                                <div>
                                                    <span className="text-3xl">{line.price.toFixed(2)}€</span>
                                                </div>
                                            </div>
                                            <div className="flex items-end">
                                                {line.productprice.type.name !== "Print" && (
                                                    <div className="mt-2">
                                                        <button
                                                            className="flex items-center justify-center p-2 bg-primary/40 text-primary-foreground rounded-xl hover:bg-primary/20 transition-colors"
                                                            onClick={() =>
                                                                downloadImage(
                                                                    `/assets/products/${line.productprice.product.ImagesProduct[0].src}`,
                                                                    line.productprice.product.name,
                                                                )
                                                            }
                                                            aria-label="Download image"
                                                        >
                                                            <Download size={24} />
                                                        </button>
                                                    </div>
                                                )}
                                                <ReportButton productId={null} orderLineId={line.id} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

