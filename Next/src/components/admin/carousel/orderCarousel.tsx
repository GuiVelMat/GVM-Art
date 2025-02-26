"use client"

import React, { useEffect } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent, } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableCard } from "./sortableCard"
import { setSlides, reorderSlides, removeSlide } from "@/store/slices/carouselSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { Carousel } from "@prisma/client"
import { selectCarousel } from "@/store/slices/carouselSlice"
import { fetchWrapper } from "@/utils/fetch"

interface CarouselAdminProps {
    initialSlides: Carousel[]
}

export function CarouselAdmin({ initialSlides }: CarouselAdminProps) {
    const dispatch = useAppDispatch()
    const { slides } = useAppSelector(selectCarousel)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    useEffect(() => {
        console.log(slides);
        dispatch(setSlides(initialSlides))
    }, [dispatch, initialSlides])

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = slides.findIndex((slide) => slide.id === active.id)
            const newIndex = slides.findIndex((slide) => slide.id === over.id)

            const newSlides = arrayMove(slides, oldIndex, newIndex).map((slide, index) => ({
                ...slide,
                slide_number: index + 1,
            }))

            dispatch(reorderSlides(newSlides))


            // Actualizar en la base de datos
            try {
                await fetchWrapper("/api/carousel", 'PUT', newSlides.map((slide) => ({
                    id: slide.id,
                    slide_number: slide.slide_number,
                })))
            } catch (err) {
                console.error("Error updating slides order:", err)
            }
        }
    }

    const handleDelete = async (id: number) => {
        try {
            dispatch(removeSlide(id))
            await fetchWrapper(`/api/carousel`, 'DELETE', { id: id });
        } catch (err) {
            console.error("Error updating slides order:", err)
        }
    }

    return (
        // <h1>hola</h1>
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={slides} strategy={verticalListSortingStrategy}>
                    <div className="grid gap-4">
                        {slides.map((slide) => (
                            <SortableCard key={slide.id} slide={slide} onDelete={() => handleDelete(slide.id)} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

