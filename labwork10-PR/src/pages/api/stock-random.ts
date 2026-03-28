// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  stock: number;
};

export default function stockHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const liveStock = Math.floor(Math.random() * 16);
  res.status(200).json({ stock: liveStock });
}