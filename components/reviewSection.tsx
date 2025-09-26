"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  title: "Product Manager",
  image: "/avatar.svg",
}));

export default function ReviewSection() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerRow = 4;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - itemsPerRow < 0 ? 0 : prev - itemsPerRow));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerRow >= reviews.length ? prev : prev + itemsPerRow
    );
  };

  const visibleProducts = reviews.slice(
    startIndex,
    startIndex + itemsPerRow
  );

  return (
    <section className="w-full py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-center  items-center mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-center text-[36px] sm:text-[48px] lg:text-[64px] font-playfair ">Enjoy our customer <br /> feedback</h2>
          <p className="text-gray-600 mt-2 text-center">
            This is valuable for us
          </p>
        </div>


      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Scrollable row */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[300px] h-[275px] border rounded-lg p-4 flex-shrink-0 flex flex-col items-start"
            >
              <p>{review?.id}</p>
              <p className="max-w-[250px] text-[16px] text-sans mt-8">"We’ve worked with bigger agencies. None of them matched the energy and clarity this team brings."</p>
              <div className="flex mt-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full mt-4"
                />
                <div className="ml-2">
                  <h3 className="mt-4 text-lg font-semibold text-sans">{review.name}</h3>
                  <p className="text-gray-600 text-sans">{review.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
