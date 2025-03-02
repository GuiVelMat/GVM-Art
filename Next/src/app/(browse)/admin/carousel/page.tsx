import getCarousel from "@/actions/getCarousel";
import { CarouselForm } from "@/components/admin/forms/createSlideForm";
import { CarouselAdmin } from "@/components/admin/carousel/orderCarousel";
import React from "react";

const AdminCarousel = async () => {
    const slides = await getCarousel();

    return (
        <div className="container mx-auto py-8 px-10">
            <div className="grid grid-cols-5 gap-10">
                <div className="col-span-3">
                    <h1 className="mb-4">Home carousel order selector</h1>
                    <CarouselAdmin initialSlides={slides.carousels} />
                </div>
                <div className="col-span-2">
                    <h1 className="text-end mb-4">Create new slide</h1>
                    <CarouselForm />
                </div>
            </div>
        </div>
    );
}

export default AdminCarousel;