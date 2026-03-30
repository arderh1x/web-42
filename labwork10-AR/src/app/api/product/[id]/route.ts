import { Product } from "@/types";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const extRes = await fetch(`https://dummyjson.com/products/${id}`);
        if (!extRes.ok) {
            return NextResponse.json(
                { message: "Product not found in external API." },
                { status: 404 });
        }
        const extProductData = await extRes.json();

        const intProduct: Product = {
            id: extProductData.id,
            title: extProductData.title,
            price: extProductData.price,
            description: extProductData.description,
        }
        return NextResponse.json(intProduct);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Some internal server error." },
            { status: 500 });
    }
}