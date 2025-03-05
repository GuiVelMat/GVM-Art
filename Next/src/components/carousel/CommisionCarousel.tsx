"use client"

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
        <div className="relative w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {artworks.map((artwork) => (
                        <CarouselItem key={artwork.id}>
                            <div className="relative w-full h-full">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={artwork.src || "/placeholder.svg"}
                                        alt={artwork.alt}
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 border-none" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 border-none" />
            </Carousel>
        </div>
    )
}

