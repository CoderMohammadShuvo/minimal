"use client";

import { useState } from "react";
import Image from "next/image";
import DotIcon from "./icons/dot-icon";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductDetails = () => {
    const images = [
        "/2.svg",
        "/4.svg",
        "/5.svg",
    ];

    const filtersData = [
        {
            title: "Product details",
            options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
        },
        {
            title: "Specifications",
            options: ["Electronics", "Clothing", "Books", "Home", "Beauty"],
        },
        {
            title: "Questions about this product",
            options: ["$0-$50", "$50-$100", "$100-$200", "$200+"],
        },

    ];

    const [activeImage, setActiveImage] = useState(images[0]);

    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };


    return (
        <section className="container mx-auto py-16 px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                {/* Left: Active Image */}
                <div className="w-full lg:w-[80%]">
                    <div className="h-[500px] lg:h-[600px]">
                        <Image
                            src={activeImage}
                            alt="Active product image"
                            width={1000}
                            height={600}
                            className="rounded-lg w-full h-full object-cover border"
                        />
                    </div>
                </div>

                {/* Right: Thumbnail Images */}
                <div className="flex lg:flex-col gap-4 w-full lg:w-[20%]">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative border rounded-lg overflow-hidden focus:outline-none flex-1 ${activeImage === img ? "ring-2 ring-black" : ""
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 lg:mt-20">
                <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
                    <h1 className="text-[24px] sm:text-[32px] font-sans">100+</h1>
                    <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
                        <span className="text-[20px] sm:text-[26px]">H</span>appy Customer
                    </p>
                </div>
                <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
                    <h1 className="text-[24px] sm:text-[32px] font-sans">80+</h1>
                    <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
                        <span className="text-[20px] sm:text-[26px]">T</span>otal Products
                    </p>
                </div>
                <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
                    <h1 className="text-[24px] sm:text-[32px] font-sans">4.9</h1>
                    <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
                        <span className="text-[20px] sm:text-[26px]">C</span>lient Rating
                    </p>
                </div>
                <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
                    <h1 className="text-[24px] sm:text-[32px] font-sans">5+</h1>
                    <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
                        <span className="text-[20px] sm:text-[26px]">S</span>elling Count
                    </p>
                </div>
            </div>


            {/* Delivery Options Section */}
            <div className="py-10 px-6 md:px-14 border rounded-2xl border-[#dedede] mt-10 flex flex-col md:flex-row gap-6 md:gap-0">
                <div className="border-b md:border-b-0 md:border-r border-[#dedede] pb-4 md:pb-0 md:pr-10 flex flex-col pl-4">
                    <span className="flex gap-2 md:gap-4 items-center font-playfair text-[12px]"><DotIcon /> Delivery Options</span>
                    <h1 className="font-sans mt-2 md:mt-6 text-[14px] md:text-[16px]">Dhaka,Dhaka - South,Dhanmondi 15</h1>
                </div>

                <div className="border-b md:border-b-0 md:border-r border-[#dedede] pb-4 md:pb-0 md:pr-10 flex flex-col pl-4">
                    <span className="flex gap-2 md:gap-4 items-center font-playfair text-[12px]"><DotIcon /> Standard Delivery</span>
                    <h1 className="font-sans mt-2 md:mt-6 text-[14px] md:text-[16px]">Dhaka,Dhaka - South,Dhanmondi 15</h1>
                </div>

                <div className="border-b md:border-b-0 md:border-r border-[#dedede] pb-4 md:pb-0 md:pr-10  flex flex-col pl-4">
                    <span className="flex gap-2 md:gap-4 items-center font-playfair text-[12px]"><DotIcon /> Cash on Delivery Available</span>
                    <h1 className="font-sans mt-2 md:mt-6 text-[14px] md:text-[16px]">Dhaka,Dhaka - South,Dhanmondi 15</h1>
                </div>

                <div className="pr-0 md:pr-4 flex flex-col pl-4">
                    <span className="flex gap-2 md:gap-4 items-center font-playfair text-[12px]"><DotIcon /> Return & Warranty</span>
                    <h1 className="font-sans mt-2 md:mt-6 text-[14px] md:text-[16px]">7 Day Return</h1>
                </div>
            </div>

            {/* Product Description Section */}
            <div className="container mx-auto mt-10 flex flex-col md:flex-row gap-6 px-4 md:px-0">
                <h1 className="w-full md:w-2/5 font-playfair text-[24px] sm:text-[28px] md:text-[32px]">
                    Aladin Lamp / Prodip Showpiece Magic Lamp/ Classic Metal Carved Aladdin Lamp Light Wishing Tea Oil Pot and jewelry box
                </h1>
                <span className="w-full md:w-3/5 font-sans text-[16px] sm:text-[18px] md:text-[20px] text-gray-400">
                    Living for the mind implies access to good, thought-provoking books and time to read them, opportunity for travel, for intellectual activities, for observation and analysis, for appreciating works of art, music and beauty. The human mind requires freedom to think creatively and manifest his dreams into reality.
                </span>
            </div>



            <aside className="w-full mt-10">
                {filtersData.map((filter, idx) => (
                    <div key={idx} className="mb-4 bg-[#fbfbff] py-4 px-8 ">
                        <button
                            className="w-full flex justify-between items-center py-2 font-sans text-[20px] font-playfair text-gray-700"
                            onClick={() => toggleAccordion(idx)}
                        >
                            {filter.title}
                            <span>{openAccordion === idx ? <ChevronUp /> : <ChevronDown />}</span>
                        </button>
                        <div className="bg-[#f5f5f5]">
                            {openAccordion === idx && (
                            <ul className="pl-4 pb-2">
                                {filter.options.map((opt, i) => (
                                    <li key={i} className="py-1 text-gray-600">
                                        
                                            Lorem ipsum dolor, sit amet consectetur adipisicing.
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                    </div>
                ))}
            </aside>


            

        </section>
    );
};

export default ProductDetails;
