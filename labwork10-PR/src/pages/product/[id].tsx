import { Product } from '@/types';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';


export const getServerSideProps = (async ({ req, res, params }) => {
    const { id } = params as { id: string };
    typeof window !== "undefined" ? console.log("[Client] 'window' exists in getServerSideProps") // used alert before, but it blocks main thread
        : console.log("[Server] Can't reach 'window' in getServerSideProps");

    try {
        //const resAPI = await fetch(`https://dummyjson.com/products/${id}`);
        // also old variant - now my Internal API will control External

        // issues with solution below (19):
        //  1) hardcoded link - should "build" from headers values; 
        //  2) made request from server to same server - extra work
        const resAPI = await fetch(`http://localhost:3000/api/product/${id}`);

        if (resAPI.status === 404) {
            console.log(`Product with ID ${id} was not found.`);
            // res.statusCode = 404; - notFound did this already
            return { notFound: true };
        }

        const { title, description, price } = await resAPI.json();
        const product: Product = { id: +id, title, description, price }

        return { props: { product } };
    } catch (error) { return { notFound: true } }
}) satisfies GetServerSideProps<{ product: Product }>


export default function ProductInfoPage({ product: { title, description, price } }
    : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [stock, setStock] = useState<number | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        typeof window !== "undefined" ? console.log("[Client] 'window' exists in useEffects")
            : console.log("[Server] Can't reach 'window' in useEffects");

        const fetchLiveStock = async () => {
            try {
                // const res = await fetch('https://www.random.org/integers/?num=1&format=plain&min=0&max=15&col=1&base=10');
                // - old version, I'll rewrite to own endpoint with own simple logic
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

    typeof window !== "undefined" ? console.log("[Client] 'window' exists in ProductInfoPage body")
        : console.log("[Server] Can't reach 'window' in ProductInfoPage body");

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
            {typeof window !== "undefined" ? (console.log("[Client] 'window' exists in ProductInfoPage return"), null)
                : (console.log("[Server] Can't reach 'window' in ProductInfoPage return"), null)}

            <ToastContainer position="bottom-right" autoClose={3000} />
        </main>
    );
}