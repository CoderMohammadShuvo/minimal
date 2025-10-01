"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShopByCategory() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const itemsPerRow = 8;
  const [startIndex, setStartIndex] = useState(0);

  // Fetch products from API
  const fetchProducts = async (selectedCategory: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?page=1&limit=20&category=${selectedCategory}&sortBy=createdAt&sortOrder=desc`
      );
      const data = await res.json();
      setProducts(data.products || []);
      setStartIndex(0); // reset carousel to start
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  // Carousel navigation
  const handlePrev = () => {
    setStartIndex((prev) => (prev - itemsPerRow < 0 ? 0 : prev - itemsPerRow));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerRow >= products.length ? prev : prev + itemsPerRow
    );
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerRow);



  console.log("product from category section", products);

  return (
    <div className="bg-[#f8f8f8] w-full h-full">
      <section className="container mx-auto h-full py-8 md:py-12 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl lg:text-[64px] font-playfair leading-tight">
              Shop by Category
            </h2>
            <p className=" text-gray-600 font-sans text-sm md:text-base lg:text-[16px] mt-10">
              Discover our wide range of categories with trending products.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {["men", "women", "kids"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full ${category === cat
                    ? "bg-black text-white"
                    : "bg-[#f8f8f8] border border-white hover:bg-gray-300"
                  } text-sm md:text-base`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav buttons */}
          <div className="absolute -top-10 right-0 flex gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="p-2 bg-[#f8f8f8] rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + itemsPerRow >= products.length}
              className="p-2 bg-[#f8f8f8] rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <Link href={`/products/${product?.id}`}>

                  <div
                  key={product.id}
                  className="rounded-lg flex flex-col items-center md:items-start text-center md:text-left"
                >
                  {product.images.length > 0 ? (

                    <img
                      aria-hidden
                      src={product?.images[0]}
                      alt="Globe icon"
                     
                      className="rounded-md w-full h-[350px] object-fit"
                    />
                  ) : (
                    <div className="w-full h-56 flex items-center justify-center rounded-md bg-gray-100 text-gray-400">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <h1 className="text-lg md:text-xl lg:text-[24px] font-playfair mt-3 md:mt-4">
                    {product.name}
                  </h1>
                  <h2 className="text-base md:text-lg lg:text-[24px] font-sans font-semibold text-[#7f7f7f]">
                    ${product.price}
                  </h2>
                </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
