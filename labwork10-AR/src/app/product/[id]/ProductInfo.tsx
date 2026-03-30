"use client";

import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type ProductInfoProps = {
    product: Product;
} // still use this variant too for clarity

export default function ProductInfo({ product: { title, description, price } }: ProductInfoProps) {
    const [stock, setStock] = useState<number | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const fetchLiveStock = async () => {
            try {
                const res = await fetch('/api/stock-random');
                const data = await res.json();

                if (res.ok && typeof data?.stock === "number") setStock(data.stock);
                else throw new Error("Invalid API response.");

            } catch (error) {
                console.error("Using fallback stock due to: ", error);
                setStock(Math.floor(Math.random() * 16));
            }
        };

        fetchLiveStock();
    }, []);

    const onAddClick = () => {
        if (stock === null) return;
        if (stock === 0) return toast.error("Out of stock!");

        console.log(`Adding to cart: ${title} for ${price}$`);
        toast.success(`Success! ${title} is now in your cart.`);
        setStock((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }

    return (
        <main style={{ padding: 16 }}>
            <h1 style={{ marginBottom: 16 }}>Product info page</h1>
            <div style={{ marginBottom: 20 }}>Title:<pre> {title}</pre></div>
            <div style={{ marginBottom: 20 }}>Description:<pre style={{ whiteSpace: "pre-wrap" }}> {description}</pre></div>
            <div style={{ marginBottom: 40 }}>Price:<pre> {price}$</pre></div>

            <div>
                <h3>Live Stock Counter</h3>
                <p>Units in stock: <b> {stock !== null ? stock : "Loading..."}</b></p>

                <button onClick={onAddClick} disabled={!isHydrated}
                    style={{
                        padding: "10px 20px",
                        cursor: isHydrated ? "pointer" : "not-allowed"
                    }}>

                    {isHydrated ? "Add to Cart" : "Loading..."}
                </button>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} />
        </main>
    );
}
