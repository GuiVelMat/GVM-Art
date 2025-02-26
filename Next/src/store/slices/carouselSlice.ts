import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Carousel } from "@prisma/client"

interface CarouselState {
    slides: Carousel[]
}

const initialState: CarouselState = {
    slides: [],
}

export const carouselSlice = createSlice({
    name: "carousel",
    initialState,
    reducers: {
        setSlides: (state, action: PayloadAction<Carousel[]>) => {
            state.slides = action.payload
        },
        reorderSlides: (state, action: PayloadAction<Carousel[]>) => {
            state.slides = action.payload
        },
        addSlide: (state, action: PayloadAction<Carousel>) => {
            state.slides.push(action.payload)
        },
        removeSlide: (state, action: PayloadAction<number>) => {
            state.slides = state.slides.filter((slide) => slide.id !== action.payload)
        },
    },
})

export const { setSlides, reorderSlides, addSlide, removeSlide } = carouselSlice.actions;
export const selectCarousel = (state: RootState) => state.carousel;

export default carouselSlice.reducer



