import { ErrorAPIMessage, Product } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function productsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Product[] | ErrorAPIMessage>) {
    const { q } = req.query;

    const externalUrl = q
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q as string)}`
        : `https://dummyjson.com/products`;

    try {
        const extRes = await fetch(externalUrl);
        if (!extRes.ok) return res.status(extRes.status).json({ message: "External API error." });
        const extProductsData = await extRes.json();

        const intProducts: Product[] = extProductsData.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description
        }));
        res.status(200).json(intProducts);
    } catch (error) {
        res.status(500).json({ message: `Some internal server error.` });
        console.error(error);
    }
}