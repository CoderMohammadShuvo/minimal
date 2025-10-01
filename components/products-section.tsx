"use client"
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    price: number;
    featured: boolean;
    isPopular: boolean;
    category?: {
        slug: string;
        name?: string;
    };
    rating?: number;
    material?: string;
    color?: string;
    decoration?: string;
    images: string[];
    createdAt: string;
}

const filtersData = [
    {
        title: "Review",
        key: "rating",
        options: [
            { label: "1 Star", value: 1 },
            { label: "2 Stars", value: 2 },
            { label: "3 Stars", value: 3 },
            { label: "4 Stars", value: 4 },
            { label: "5 Stars", value: 5 }
        ],
    },
    {
        title: "Category",
        key: "category",
        options: [
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
            { label: "Books", value: "books" },
            { label: "Home", value: "home" },
            { label: "Beauty", value: "beauty" },
        ],
    },
    {
        title: "Price",
        key: "price",
        options: [
            { label: "$0-$50", value: "0-50" },
            { label: "$50-$100", value: "50-100" },
            { label: "$100-$200", value: "100-200" },
            { label: "$200+", value: "200+" },
        ],
    },
    {
        title: "Material",
        key: "material",
        options: [
            { label: "Cotton", value: "cotton" },
            { label: "Leather", value: "leather" },
            { label: "Plastic", value: "plastic" },
            { label: "Metal", value: "metal" },
            { label: "Wood", value: "wood" },
        ],
    },
    {
        title: "Color",
        key: "color",
        options: [
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
            { label: "Black", value: "black" },
            { label: "White", value: "white" },
        ],
    },
    {
        title: "Decoration",
        key: "decoration",
        options: [
            { label: "Minimal", value: "minimal" },
            { label: "Modern", value: "modern" },
            { label: "Classic", value: "classic" },
            { label: "Vintage", value: "vintage" },
            { label: "Luxury", value: "luxury" },
        ],
    },
];

interface FilterState {
    rating: number[];
    category: string[];
    price: string[];
    material: string[];
    color: string[];
    decoration: string[];
}

interface PaginationState {
    top: number;
    feature: number;
    new: number;
}

const ProductPageSection = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        rating: [],
        category: [],
        price: [],
        material: [],
        color: [],
        decoration: [],
    });
    const [pagination, setPagination] = useState<PaginationState>({
        top: 1,
        feature: 1,
        new: 1
    });

    const ITEMS_PER_PAGE = 3;

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/products");
            if (response.ok) {
                const data = await response.json();
                setAllProducts(data.products || []);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle filter changes
    const handleFilterChange = (filterKey: keyof FilterState, value: string | number) => {
        setFilters(prev => {
            const currentArray = prev[filterKey] as (string | number)[];
            const isSelected = currentArray.includes(value);

            if (isSelected) {
                return {
                    ...prev,
                    [filterKey]: currentArray.filter(item => item !== value)
                };
            } else {
                return {
                    ...prev,
                    [filterKey]: [...currentArray, value]
                };
            }
        });
        // Reset pagination when filters change
        setPagination({ top: 1, feature: 1, new: 1 });
    };

    // Filter products based on selected filters
    const filterProducts = (products: Product[]) => {
        return products.filter(product => {
            // Rating filter
            if (filters.rating.length > 0 && product.rating && !filters.rating.includes(product.rating)) {
                return false;
            }

            // Category filter
            if (filters.category.length > 0 && product.category?.slug && !filters.category.includes(product.category.slug)) {
                return false;
            }

            // Price filter
            if (filters.price.length > 0) {
                const priceInRange = filters.price.some(priceRange => {
                    const productPrice = product.price;
                    switch (priceRange) {
                        case "0-50":
                            return productPrice >= 0 && productPrice <= 50;
                        case "50-100":
                            return productPrice > 50 && productPrice <= 100;
                        case "100-200":
                            return productPrice > 100 && productPrice <= 200;
                        case "200+":
                            return productPrice > 200;
                        default:
                            return true;
                    }
                });
                if (!priceInRange) return false;
            }

            // Material filter
            if (filters.material.length > 0 && product.material && !filters.material.includes(product.material.toLowerCase())) {
                return false;
            }

            // Color filter
            if (filters.color.length > 0 && product.color && !filters.color.includes(product.color.toLowerCase())) {
                return false;
            }

            // Decoration filter
            if (filters.decoration.length > 0 && product.decoration && !filters.decoration.includes(product.decoration.toLowerCase())) {
                return false;
            }

            return true;
        });
    };

    const getRandomProducts = (products: any[], count = 6) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Featured products: filter by featured === true
    const featuredProducts = allProducts.filter(product => product.category?.slug === "feature-product");

    // New products: latest uploaded (sort by createdAt descending)
    const newProducts = [...allProducts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Combine into categorized object
    const categorizedProducts = {
        top: getRandomProducts(allProducts, 9), // Increased for pagination
        feature: featuredProducts,
        new: newProducts,
    };

    // Apply filters to categorized products
    const filteredCategorizedProducts = {
        top: filterProducts(categorizedProducts.top),
        feature: filterProducts(categorizedProducts.feature),
        new: filterProducts(categorizedProducts.new),
    };

    // Pagination functions
    const getPaginatedProducts = (products: Product[], section: keyof PaginationState) => {
        const startIndex = (pagination[section] - 1) * ITEMS_PER_PAGE;
        return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    const getTotalPages = (products: Product[]) => {
        return Math.ceil(products.length / ITEMS_PER_PAGE);
    };

    const handlePageChange = (section: keyof PaginationState, page: number) => {
        setPagination(prev => ({
            ...prev,
            [section]: page
        }));
    };

    // Check if any filter is active
    const isAnyFilterActive = Object.values(filters).some(filterArray => filterArray.length > 0);

    // Clear all filters
    const clearAllFilters = () => {
        setFilters({
            rating: [],
            category: [],
            price: [],
            material: [],
            color: [],
            decoration: [],
        });
        setPagination({ top: 1, feature: 1, new: 1 });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen mb-10 container mx-auto mt-14">
            {/* Left Filter Section */}
            <aside className="w-full lg:w-64 p-4 bg-white border border-gray-200 mb-6 lg:mb-0 lg:mr-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {isAnyFilterActive && (
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {filtersData.map((filter, idx) => (
                    <div key={idx} className="mb-3 border-b border-gray-200">
                        <button
                            className="w-full flex justify-between items-center py-2 font-sans text-gray-700 hover:text-gray-900"
                            onClick={() => toggleAccordion(idx)}
                        >
                            {filter.title}
                            <span>{openAccordion === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                        </button>
                        {openAccordion === idx && (
                            <ul className="pl-4 pb-2">
                                {filter.options.map((opt, i) => (
                                    <li key={i} className="py-1 text-gray-600">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={(filters[filter.key as keyof FilterState] as (string | number)[]).includes(opt.value)}
                                                onChange={() => handleFilterChange(filter.key as keyof FilterState, opt.value)}
                                                className="rounded border-gray-300"
                                            />
                                            {opt.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </aside>

            {/* Right Products Section */}
            <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                {/* Top Products */}
                <section className="mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-[64px] text-left font-playfair">
                        Top Product
                    </h1>
                    <p className="text-left font-sans text-[14px] sm:text-[16px] mt-4 sm:mt-6">
                        Minimalist design meets handmade craftsmanship to elevate your space effortlessly.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {getPaginatedProducts(filteredCategorizedProducts.top, 'top').length > 0 ? (
                            getPaginatedProducts(filteredCategorizedProducts.top, 'top').map((product) => (
                                <div key={product.id} className="flex flex-col">
                                    <Card className="relative flex-1">
                                        {product?.isPopular && (
                                            <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md z-10">
                                                Popular
                                            </span>
                                        )}
                                        <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-md">
                                            <Image
                                                src={product?.images?.[0] || "/placeholder-image.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </Card>
                                    <div className="mt-4 flex-1">
                                        <h1 className="text-lg sm:text-xl lg:text-[24px] font-playfair line-clamp-2">
                                            {product?.name}
                                        </h1>
                                        <h2 className="text-base sm:text-lg lg:text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                            ${product?.price}
                                        </h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No top products found matching your filters.
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination for Top Products */}
                    {getTotalPages(filteredCategorizedProducts.top) > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <button
                                onClick={() => handlePageChange('top', pagination.top - 1)}
                                disabled={pagination.top === 1}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">
                                Page {pagination.top} of {getTotalPages(filteredCategorizedProducts.top)}
                            </span>
                            <button
                                onClick={() => handlePageChange('top', pagination.top + 1)}
                                disabled={pagination.top === getTotalPages(filteredCategorizedProducts.top)}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>

                {/* Feature Products */}
                <section className="mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-[64px] text-left font-playfair">
                        Feature Product
                    </h1>
                    <p className="text-left font-sans text-[14px] sm:text-[16px] mt-4 sm:mt-6">
                        Minimalist design meets handmade craftsmanship to elevate your space effortlessly.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {getPaginatedProducts(filteredCategorizedProducts.feature, 'feature').length > 0 ? (
                            getPaginatedProducts(filteredCategorizedProducts.feature, 'feature').map((product) => (
                                <div key={product.id} className="flex flex-col">
                                    <Card className="relative flex-1">
                                        {product?.isPopular && (
                                            <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md z-10">
                                                Popular
                                            </span>
                                        )}
                                        <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-md">
                                            <Image
                                                src={product?.images?.[0] || "/placeholder-image.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </Card>
                                    <div className="mt-4 flex-1">
                                        <h1 className="text-lg sm:text-xl lg:text-[24px] font-playfair line-clamp-2">
                                            {product?.name}
                                        </h1>
                                        <h2 className="text-base sm:text-lg lg:text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                            ${product?.price}
                                        </h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No feature products found matching your filters.
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination for Feature Products */}
                    {getTotalPages(filteredCategorizedProducts.feature) > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <button
                                onClick={() => handlePageChange('feature', pagination.feature - 1)}
                                disabled={pagination.feature === 1}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">
                                Page {pagination.feature} of {getTotalPages(filteredCategorizedProducts.feature)}
                            </span>
                            <button
                                onClick={() => handlePageChange('feature', pagination.feature + 1)}
                                disabled={pagination.feature === getTotalPages(filteredCategorizedProducts.feature)}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>

                {/* New Products */}
                <section className="mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-[64px] text-left font-playfair">
                        New Products
                    </h1>
                    <p className="text-left font-sans text-[14px] sm:text-[16px] mt-4 sm:mt-6">
                        Minimalist design meets handmade craftsmanship to elevate your space effortlessly.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {getPaginatedProducts(filteredCategorizedProducts.new, 'new').length > 0 ? (
                            getPaginatedProducts(filteredCategorizedProducts.new, 'new').map((product) => (
                                <div key={product.id} className="flex flex-col">
                                    <Card className="relative flex-1">
                                        {product?.isPopular && (
                                            <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md z-10">
                                                Popular
                                            </span>
                                        )}
                                        <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-md">
                                            <Image
                                                src={product?.images?.[0] || "/placeholder-image.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </Card>
                                    <div className="mt-4 flex-1">
                                        <h1 className="text-lg sm:text-xl lg:text-[24px] font-playfair line-clamp-2">
                                            {product?.name}
                                        </h1>
                                        <h2 className="text-base sm:text-lg lg:text-[24px] font-sans font-semibold text-[#7f7f7f]">
                                            ${product?.price}
                                        </h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No new products found matching your filters.
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination for New Products */}
                    {getTotalPages(filteredCategorizedProducts.new) > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <button
                                onClick={() => handlePageChange('new', pagination.new - 1)}
                                disabled={pagination.new === 1}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">
                                Page {pagination.new} of {getTotalPages(filteredCategorizedProducts.new)}
                            </span>
                            <button
                                onClick={() => handlePageChange('new', pagination.new + 1)}
                                disabled={pagination.new === getTotalPages(filteredCategorizedProducts.new)}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ProductPageSection;