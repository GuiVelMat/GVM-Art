"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedPrice } from "@/store/slices/priceSlice";
import { ProductPrice } from "@prisma/client";
import { Type } from "@prisma/client";
import React from "react";

interface PriceSelectorProps {
  prices: ProductPriceWithType[];
  defaultPrice: ProductPriceWithType;
}
interface ProductPriceWithType extends ProductPrice {
  type?: Omit<Type, "createdAt" | "updatedAt">; // Eliminamos timestamps
}


const PriceSelector = ({ prices, defaultPrice }: PriceSelectorProps) => {
  const dispatch = useDispatch();
  const selectedPrice = useSelector((state: RootState) => state.price.selectedprice);

  // Si no se ha seleccionado un precio en Redux, usamos el precio por defecto
  const displayPrice = selectedPrice !== null && selectedPrice !== undefined
    ? selectedPrice
    : defaultPrice;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = prices.find(price => price.id === parseFloat(e.target.value));

    if (selected) {
      const { createdAt, updatedAt, type, ...cleanedPrice } = selected;


      const cleanedType = type ? { ...type, createdAt: undefined, updatedAt: undefined } : null;

      const finalPrice = { ...cleanedPrice, type: cleanedType };

      dispatch(setSelectedPrice(finalPrice));
    }
  };

  return (
    <div>
      <label className="block text-lg mb-2">Select product type:</label>
      <select
        className="p-2 border border-gray-300 text-black rounded-md"
        value={Array.isArray(displayPrice) ? displayPrice[0]?.id : displayPrice.id}
        onChange={handleChange}
      >
        {prices.map((priceObj, index) => (
          <option key={index} value={priceObj.id}>
            {priceObj.type?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceSelector;


