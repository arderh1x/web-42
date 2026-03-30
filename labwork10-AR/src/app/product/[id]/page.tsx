import { notFound } from "next/navigation";
import { Product } from "@/types";
import ProductInfo from "./ProductInfo";

async function getProduct(id: string): Promise<Product> {
    const resAPI = await fetch(`http://localhost:3000/api/product/${id}`, { cache: "no-store" });
    if (resAPI.status === 404) {
        console.log(`Product with ID ${id} was not found.`);
        notFound();
    }
    const { title, description, price } = await resAPI.json();

    const product: Product = { id: +id, title, description, price };
    return product;
}

export default async function ProductInfoPage({ params }: { params: Promise<{ id: string }> }) { // alternative to creating types as variables
    const { id } = await params;
    const product = await getProduct(id);

    return <ProductInfo product={product} />;
}

