"use client"
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const filtersData = [
    {
        title: "Review",
        options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    },
    {
        title: "Category",
        options: ["Electronics", "Clothing", "Books", "Home", "Beauty"],
    },
    {
        title: "Price",
        options: ["$0-$50", "$50-$100", "$100-$200", "$200+"],
    },
    {
        title: "Material",
        options: ["Cotton", "Leather", "Plastic", "Metal", "Wood"],
    },
    {
        title: "Color",
        options: ["Red", "Blue", "Green", "Black", "White"],
    },
    {
        title: "Decoration",
        options: ["Minimal", "Modern", "Classic", "Vintage", "Luxury"],
    },
];

const productsData = {
    top: [
        {
            id: 1, name: "Top Product 1", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 2, name: "Top Product 2", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 3, name: "Top Product 3", price: 333, featured: true,
            isPopular: false
        },
       
    ],
    feature: [
        {
            id: 4, name: "Feature Product 1", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 5, name: "Feature Product 2", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 6, name: "Feature Product 3", price: 333, featured: true,
            isPopular: false
        },
    ],
    new: [
        {
            id: 7, name: "New Product 1", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 8, name: "New Product 2", price: 333, featured: true,
            isPopular: false
        },
        {
            id: 9, name: "New Product 3", price: 333, featured: true,
            isPopular: false
        },
    ],
};



const ProductPageSection = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className="flex min-h-screen mb-10 container mx-auto mt-14 " >
            {/* Left Filter Section */}
            <aside className="w-64 p-4 bg-white border border-gray-200 ">
                {filtersData.map((filter, idx) => (
                    <div key={idx} className="mb-3 border-b border-gray-200">
                        <button
                            className="w-full flex justify-between items-center py-2 font-sans text-gray-700"
                            onClick={() => toggleAccordion(idx)}
                        >
                            {filter.title}
                            <span>{openAccordion === idx ? <ChevronUp /> : <ChevronDown />}</span>
                        </button>
                        {openAccordion === idx && (
                            <ul className="pl-4 pb-2">
                                {filter.options.map((opt, i) => (
                                    <li key={i} className="py-1 text-gray-600">
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" />
                                            {opt}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </aside>

            {/* Right Products Section */}
            <main className="flex-1 p-6 overflow-y-auto ml-6">
                {/* Top Products */}
                <section className="mb-8 mt-[-50px] ">
                    <h1 className="text-[64px] text-left font-playfair">Top Product</h1>
                    <p className="text-left font-sans text-[16px] mt-6">Minimalist design meets handmade craftsmanship to elevate your space effortlessly.</p>
                    <div className="grid grid-cols-3 gap-4 mt-10">
                        {productsData.top.map((product) => (
                            <div key={product.id}>
                                <Card className="relative">
                                    {/* Badge */}
                                    {product?.isPopular && (
                                        <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md">
                                            Popular
                                        </span>
                                    )}

                                    <Image
                                        aria-hidden
                                        src="/2.svg"
                                        alt="Globe icon"
                                        width={646}
                                        height={271}
                                        className="rounded-md"
                                    />
                                </Card>

                                <h1 className="text-[24px] font-playfair mt-4">{product?.name}</h1>
                                <h2 className="text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                    ${product?.price}
                                </h2>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Feature Products */}
               <section className="mb-16 mt-16">
                    <h1 className="text-[64px] text-left font-playfair">Feature Product</h1>
                    <p className="text-left font-sans text-[16px] mt-6">Minimalist design meets handmade craftsmanship to elevate your space effortlessly.</p>
                    <div className="grid grid-cols-3 gap-4 mt-10">
                        {productsData.top.map((product) => (
                            <div key={product.id}>
                                <Card className="relative">
                                    {/* Badge */}
                                    {product?.isPopular && (
                                        <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md">
                                            Popular
                                        </span>
                                    )}

                                    <Image
                                        aria-hidden
                                        src="/2.svg"
                                        alt="Globe icon"
                                        width={646}
                                        height={271}
                                        className="rounded-md"
                                    />
                                </Card>

                                <h1 className="text-[24px] font-playfair mt-4">{product?.name}</h1>
                                <h2 className="text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                    ${product?.price}
                                </h2>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Products */}
                <section className="mb-8 ">
                    <h1 className="text-[64px] text-left font-playfair">Home Decor</h1>
                    <p className="text-left font-sans text-[16px] mt-6">Minimalist design meets handmade craftsmanship to elevate your space effortlessly.</p>
                    <div className="grid grid-cols-3 gap-4 mt-10">
                        {productsData.top.map((product) => (
                            <div key={product.id}>
                                <Card className="relative">
                                    {/* Badge */}
                                    {product?.isPopular && (
                                        <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md">
                                            Popular
                                        </span>
                                    )}

                                    <Image
                                        aria-hidden
                                        src="/2.svg"
                                        alt="Globe icon"
                                        width={646}
                                        height={271}
                                        className="rounded-md"
                                    />
                                </Card>

                                <h1 className="text-[24px] font-playfair mt-4">{product?.name}</h1>
                                <h2 className="text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                    ${product?.price}
                                </h2>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductPageSection;
