"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ query }: { query: string }) {
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState(query);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputQuery(e.target.value);
    useEffect(() => { setInputQuery(query) }, [query]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(inputQuery)}`);
    };

    return (
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
    );
}