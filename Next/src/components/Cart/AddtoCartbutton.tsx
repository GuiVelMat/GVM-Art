'use client'
import React from "react"
import { handleAddToCart } from "./AddToCart"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductPriceItem } from "@/types/ProductPrice";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import { ProductItem } from "@/types/Product";
import { useToast } from "@/hooks/use-toast";

interface AddtoCartButtonProps {
    product: ProductItem;
    defaultPrice: ProductPriceItem;

}

export const AddtoCartButton = ({ product, defaultPrice }: AddtoCartButtonProps) => {
    const selectedPrice = useSelector((state: RootState) => state.price.selectedprice);
    const priceToUse = selectedPrice ? selectedPrice : defaultPrice;
    const { data: session } = useSession();
    const { toast } = useToast();
    const dispatch = useDispatch();

    console.log('Selected price:', priceToUse);
    console.log('Product ID:', product.id);

    const GetToCart = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (!session) {
            redirect('/Login');
        }
        else {
            console.log('Session found, calling handleAddToCart...');
            handleAddToCart(event, product, priceToUse, session, dispatch)
            toast({
                title: 'Item added to cart',
            });
        }
    }


    return (
        <>
            <button
                onClick={(event) => GetToCart(event)}
                className="mt-4 px-6 py-2 bg-gold text-black text-lg font-semibold rounded-lg hover:bg-dark-gold transition"
            >
                add to Cart
            </button>

        </>
    )
}

