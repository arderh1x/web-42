import { NextResponse } from "next/server";
import { Product } from "@/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    const externalUrl = q
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q as string)}`
        : `https://dummyjson.com/products`;

    try {
        const extRes = await fetch(externalUrl);
        if (!extRes.ok) {
            return NextResponse.json(
                { message: "External API error." },
                { status: extRes.status });
        }
        const extProductsData = await extRes.json();

        const intProducts: Product[] = extProductsData.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description
        }));
        return NextResponse.json(intProducts);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Some internal server error." },
            { status: 500 });
    }
}