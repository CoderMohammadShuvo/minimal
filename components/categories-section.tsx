"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dummyProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (i + 1) * 10,
  image: "/Mask.png",
}));

export default function ShopByCategory() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerRow = 4;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - itemsPerRow < 0 ? 0 : prev - itemsPerRow));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerRow >= dummyProducts.length ? prev : prev + itemsPerRow
    );
  };

  const visibleProducts = dummyProducts.slice(startIndex, startIndex + itemsPerRow);


  return (

    <div className="bg-[#f8f8f8] w-full h-full">
      <section className="container mx-auto h-full  py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left">
            <h2 className=" text-[64px] text-center font-playfair">Shop by Category</h2>
            <p className="text-gray-600  font-sans text-[16px]">
              Discover our wide range of categories with trending products.
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 rounded-full bg-[#f8f8f8] border border-white hover:bg-gray-300">
              Men
            </button>
            <button className="px-4 py-2 rounded-full bg-[#f8f8f8] border border-white hover:bg-gray-300">
              Women
            </button>
            <button className="px-4 py-2 rounded-full bg-[#f8f8f8] border border-white hover:bg-gray-300">
              Kids
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav buttons */}
          <div className="absolute -top-12 right-0 flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 bg-[#f8f8f8f] rounded-full hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-[#f8f8f8f] rounded-full hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className=" rounded-lg  flex flex-col items-start"
              >
                <img
                  src={product.image}
                  alt={product.name}

                  className="rounded-md w-full"
                />
                <h1 className="text-[24px] font-playfair mt-4">{product?.name}</h1>
                <h2 className="text-[24px] font-sans font-semibold text-[#7f7f7f]">
                  ${product?.price}
                </h2>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>

  );
}
