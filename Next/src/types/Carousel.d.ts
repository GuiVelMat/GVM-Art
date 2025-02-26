import { status } from '.prisma/client';  // Para el tipo 'status'

export interface CarouselItem extends Omit<Carousel, 'updatedAt', 'createdAt'> {
    id: number;
    title: string;
    slug: string;
    image?: string | null;
    href: string;
    description: string;
    status: status;
    slide_number: number;
}


export interface CarouselResponse {
    carousels: Carousel[];
}