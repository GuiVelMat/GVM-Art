'use client'

import { fetchProducts, selectProducts } from "@/store/slices/productSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import React, { useEffect } from "react";
import { CardProductAdmin } from "../Cards/CardProductAdmin";

export const ListProductsAdmin = () => {
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <CardProductAdmin key={product.id} {...product} />
            ))}
        </div>
    );
}