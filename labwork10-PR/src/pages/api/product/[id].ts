// import { productsDB } from '@/data/productsDB'; - for some moment I used local array for DB role
import { ErrorAPIMessage, Product } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function oneProductHandler(
    req: NextApiRequest,
    res: NextApiResponse<Product | ErrorAPIMessage>) {
    const { id } = req.query;
    try {
        const extRes = await fetch(`https://dummyjson.com/products/${id}`);
        if (!extRes.ok) return res.status(404).json({ message: "Product not found in external API." });
        const extProductData = await extRes.json();

        const intProduct: Product = {
            id: extProductData.id,
            title: extProductData.title,
            price: extProductData.price,
            description: extProductData.description,
        }
        res.status(200).json(intProduct);
    } catch (error) {
        res.status(500).json({ message: `Some internal server error.` });
        console.error(error);
    }
}