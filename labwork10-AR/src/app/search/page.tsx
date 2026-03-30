import { Product } from "@/types";
import Link from "next/link";
import SearchForm from "./SearchForm";

async function getProducts(query: string): Promise<Product[]> {
    try {
        const res = await fetch(`http://localhost:3000/api/products?q=${encodeURIComponent(query)}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`API response was not ok: ${res.status}`);

        const products: Product[] = await res.json();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const query = params.q || "";
    const products = await getProducts(query);

    return (
        <main style={{ padding: 16, position: "relative", minHeight: "100vh" }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <Link href="/system-status" style={{
                    padding: '8px 12px', cursor: 'pointer', border: '1px solid black',
                    color: "black", backgroundColor: "#cecece"
                }}>
                    Go to System Status
                </Link>
            </div>
            <h1 style={{ marginBottom: 16 }}>Search products</h1>

            <SearchForm query={query} />

            <div style={{ marginBottom: 20 }}>
                Results amount: <b>{products.length}</b>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {products.length > 0
                    ? (products.map(({ id, title, price }) => (
                        <div key={id} style={{ padding: 12, border: "1px solid #d6d6d6" }}>
                            <Link href={`/product/${id}`} style={{ color: "#c2560e" }}>
                                ➤ {title}
                            </Link>

                            <div style={{ fontSize: 16 }}> PRICE: <b>{price}$</b> </div>
                        </div>)))

                    : (<pre style={{ color: "red" }}>No products found - try a different search query.</pre>)}
            </div>
        </main>
    );
}