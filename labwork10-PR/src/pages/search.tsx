import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Product } from '@/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type SearchProps = {
    products: Product[];
    query: string;
}

export const getServerSideProps = (async (context) => {
    const q = context.query.q as string || "";
    try {
        const res = await fetch(`http://localhost:3000/api/products?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error(`API response was not ok: ${res.status}`);

        const products: Product[] = await res.json();
        return { props: { products, query: q } }; // variant without packaging into single object 

    } catch (error) {
        console.error(error);
        return { props: { products: [], query: q } };
    }
}) satisfies GetServerSideProps<SearchProps>;


export default function SearchPage({ products, query }
    : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState(query);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputQuery(e.target.value);
    useEffect(() => { setInputQuery(query) }, [query]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(inputQuery)}`);
    };

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

            <form onSubmit={onSubmit} style={{ marginBottom: 24 }}>
                <label htmlFor="query-input">Enter search query:</label>
                <div>
                    <input type="text" id="query-input" placeholder="Type keywords..."
                        value={inputQuery} onChange={onInputChange}
                        style={{ padding: "4px 8px", width: "250px" }} />

                    <button type="submit" style={{ marginLeft: 8, padding: '4px 12px', cursor: 'pointer' }}>
                        SEARCH
                    </button>
                </div>
            </form>

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