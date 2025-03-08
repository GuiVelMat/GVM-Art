import getCarousel from "@/actions/getCarousel";
import { CarouselForm } from "@/components/admin/forms/createSlideForm";
import { CarouselAdmin } from "@/components/admin/carousel/orderCarousel";
import React from "react";

const AdminCarousel = async () => {
    const slides = await getCarousel();

    return (
        <div className="container mx-auto py-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Carousel</h1>
                <p className="text-muted-foreground mt-2">
                    Manage the carousel slides and create new ones.
                </p>
            </div>

            <div className="grid grid-cols-5 gap-10">
                <div className="col-span-3">
                    <CarouselAdmin initialSlides={slides.carousels} />
                </div>
                <div className="col-span-2">
                    <CarouselForm />
                </div>
            </div>
        </div>
    );
}

export default AdminCarousel;