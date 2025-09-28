"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};


export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [productId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeAddress: "",
    shippingAddress: "",
    paymentMethod: "Cash on Delivery",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const payload = {
    items: [{ productId, quantity: 1 }], // single product checkout
    shippingAddress: formData?.shippingAddress, // placeholder, adapt later
    paymentMethod: formData.paymentMethod,
    notes: `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.phone}, ${formData.shippingAddress}`,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const payload = {
      items: [{ productId: product.id, quantity: 1 }],
      shippingAddress: "temp-address-id",
      paymentMethod: formData.paymentMethod,
      notes: `${formData.firstName} ${formData.lastName}, ${formData.email}, ${formData.phone}, ${formData.shippingAddress}`,
    };

    try {

      console.log("payload", payload);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderId(data.id);
        setOrderPlaced(true);
      } else {
        console.error("Order failed:", data);
        alert("Order failed. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };


  if (orderPlaced) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h1 className="text-3xl font-playfair">🎉 Order Successful!</h1>
        <p className="mt-4 text-lg font-sans">Your order ID: <strong>{orderId}</strong></p>
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className="container mx-auto py-16 px-6 flex flex-col lg:flex-row gap-10">
        {/* Left: Customer Info Form */}
        <div className="w-full lg:w-[70%] bg-white p-8 rounded-2xl shadow">
          <h2 className="text-[48px] font-sans mb-2">Customer Information</h2>
          <p className="mb-6 text-gray-500">In here we would love for you to type everything we say we need from you because this is a form.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#fafafc] h-full p-4">
                <label htmlFor="firstName" className="text-[12px] mb-2">Firstname</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className=" rounded-lg p-3 w-full"
                  required
                />
              </div>
              <div className="bg-[#fafafc] h-full p-4">
                <label htmlFor="lastName" className="text-[12px] mb-2">LastName</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your First Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className=" rounded-lg p-3 w-full"
                  required
                />
              </div>

              <div className="bg-[#fafafc] h-full p-4">
                <label htmlFor="email" className="text-[12px] mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your First Name"
                  value={formData.email}
                  onChange={handleChange}
                  className=" rounded-lg p-3 w-full"
                  required
                />
              </div>

              <div className="bg-[#fafafc] h-full p-4">
                <label htmlFor="phone" className="text-[12px] mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your First Name"
                  value={formData.phone}
                  onChange={handleChange}
                  className=" rounded-lg p-3 w-full"
                  required
                />
              </div>

            </div>


            <div className="bg-[#fafafc] h-full p-4">
              <label htmlFor="homeAddress" className="text-[12px] mb-2">Home Address</label>
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                value={formData.homeAddress}
                onChange={handleChange}
                className=" rounded-lg p-3 w-full"
                required
              />
            </div>


            <div className="bg-[#fafafc] h-full p-4">
              <label htmlFor="shippingAddress" className="text-[12px] mb-2">Delivery Address</label>
              <input
                type="text"
                name="shippingAddress"
                placeholder="Delivery Address"
                value={formData.shippingAddress}
                onChange={handleChange}
                className=" rounded-lg p-3 w-full"
              />
            </div>


            <div className="bg-[#fafafc] h-full p-4">
              <label htmlFor="shippingAddress" className="text-[12px] mb-2">Payment Type</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              >
                <option>Cash on Delivery</option>
              </select>
            </div>






            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[30%] bg-[#f8f8f8] p-8 rounded-2xl">
          <h2 className="text-xl font-playfair mb-4">Order Summary</h2>
          <p className="flex justify-between text-gray-600">
            <span>Subtotal:</span> <span className="font-bold"> {product?.price}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Delivery Charge:</span> <span className="font-bold"> 120</span>
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <p className="flex justify-between text-lg font-bold mt-4">
            <span>Total:</span> <span>{product?.price}</span>
          </p>
        </div>
      </section>
      <Footer />

    </>
  );
}
