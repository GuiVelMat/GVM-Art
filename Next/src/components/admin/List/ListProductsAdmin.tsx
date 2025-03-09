// 'use client'

import { fetchProducts, selectProducts } from "@/store/slices/productSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import React from "react";
import { CardProductAdmin } from "../Cards/CardProductAdmin";
import { useFetchGalleryImages } from "@/hooks/useGalleryImages";
import getProducts from "@/actions/getProducts";

export const ListProductsAdmin = async ({ searchParams }: {
    searchParams?: {
        Category?: string[]
        Collection?: string[]
        Series?: string[]
        Name?: string
        Page?: number
    }
}) => {
    const { Category, Collection, Series, Name, Page } = await searchParams;
    const filters = {
        categorySlugs: Category ? Category.split(',') : '', // Dividimos por comas
        collectionSlugs: Collection ? Collection.split(',') : '',
        seriesSlugs: Series ? Series.split(',') : '',
        searchQuery: Name || '',
        page: Page || 0,
    };

    const products = await getProducts(filters);

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.products.map(product => (
                <CardProductAdmin key={product.id} {...product} />
            ))}
        </div>
    );
}