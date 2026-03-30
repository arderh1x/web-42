import { NextResponse } from "next/server";

export async function GET() {
    const liveStock = Math.floor(Math.random() * 16);
    return NextResponse.json({ stock: liveStock });
}