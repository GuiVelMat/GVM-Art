import getCarousel from "@/actions/getCarousel";
import { CarouselAdmin } from "@/components/admin/carousel/orderCarousel";
import React from "react";

const AdminCarousel = async () => {
    const slides = await getCarousel();

    return (
        <div className="container mx-auto py-8">
            <CarouselAdmin initialSlides={slides.carousels} />
        </div>
    );
}

export default AdminCarousel;