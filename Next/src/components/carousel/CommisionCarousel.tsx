"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import React from "react"

interface ArtCarouselProps {
    sheet: number;
}

const commisionSheet_1 = [
    { id: 1, src: "/assets/commisions/commision_1_en.jpg", alt: "Artwork 1" },
    { id: 2, src: "/assets/commisions/commision_1_es.jpg", alt: "Artwork 2" },
]

const commisionSheet_2 = [
    { id: 3, src: "/assets/commisions/commision_2_en.jpg", alt: "Artwork 3" },
    { id: 4, src: "/assets/commisions/commision_2_es.jpg", alt: "Artwork 4" },
]

export default function ArtCarousel({ sheet }: ArtCarouselProps) {
    const artworks = sheet === 1 ? commisionSheet_1 : commisionSheet_2

    return (
        <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
                {artworks.map((artwork) => (
                    <CarouselItem key={artwork.id}>
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <Image
                                    src={artwork.src || "/placeholder.svg"}
                                    alt={artwork.alt}
                                    width={600}
                                    height={500}
                                    className="rounded-lg object-cover"
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

