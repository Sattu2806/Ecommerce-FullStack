import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic behavior

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Extract parameters without '[]'
    const categories = searchParams.getAll("categories");
    const colors = searchParams.getAll("colors");
    const sizes = searchParams.getAll("size");

    const minPrice = parseInt(searchParams.get("price[min]") || "0");
    const maxPrice = parseInt(searchParams.get("price[max]") || "100000");

    // Build dynamic 'where' conditions
    const whereConditions: any = {
      price: { gte: minPrice, lte: maxPrice },
    };

    if (categories.length > 0) {
      whereConditions.style = { in: categories };
    }

    if (sizes.length > 0) {
      whereConditions.size = { in: sizes };
    }

    if (colors.length > 0) {
      whereConditions.color = { in: colors };
    }

    const products = await prisma.product.findMany({
      where: whereConditions,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error selecting product", error);
    return NextResponse.error();
  }
}
