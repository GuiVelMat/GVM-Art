"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Trash2 } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Carousel } from "@prisma/client"

interface SortableCardProps {
    slide: Carousel
    onDelete: () => void
}

export function SortableCard({ slide, onDelete }: SortableCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: slide.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Card ref={setNodeRef} style={style} className="relative">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <button
                        className="cursor-grab active:cursor-grabbing p-2 hover:bg-secondary rounded"
                        {...attributes}
                        {...listeners}
                    >
                        <GripVertical className="w-5 h-5" />
                    </button>

                    <div className="relative w-24 h-24">
                        <Image
                            src={`/assets/carousel/${slide.image}`}
                            alt={slide.title || "Carousel slide"}
                            fill
                            className="object-cover rounded"
                        />
                    </div>

                    <div className="flex-1">
                        <p className="font-medium">Slide {slide.slide_number}</p>
                        {slide.title && <p className="text-sm text-muted-foreground">{slide.title}</p>}
                    </div>

                    <Button variant="destructive" size="icon" onClick={onDelete} className="ml-auto">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

