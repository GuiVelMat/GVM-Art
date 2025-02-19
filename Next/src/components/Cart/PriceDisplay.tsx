"use client";  // Esto indica que este componente es cliente

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductPrice } from "@prisma/client";
import React from "react";

interface ClientPriceDisplayProps {
  defaultPrice: ProductPrice
}

const PriceDisplay = ({ defaultPrice }: ClientPriceDisplayProps) => {
  // Obtén el precio seleccionado desde Redux

  const selectedPrice = useSelector((state: RootState) => state.price.selectedprice);

  return (
    <p className="text-3xl font-semibold mb-2 mt-3">{selectedPrice ? selectedPrice.price.toFixed(2) : defaultPrice.price.toFixed(2)}€</p>
  );
};

export default PriceDisplay;
