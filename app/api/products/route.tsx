import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from '../../../prisma/client'

interface Props {
    params: {
        name: string,
        price: number,
    }
}

export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany({})
    return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const productExists = await prisma.product.findUnique({
        where: {name: body.name}
    })
    
    if(productExists) {
        return NextResponse.json({error: 'Product already exists'}, {status: 400})
    }

    const product = await prisma.product.create({data: body})

    return NextResponse.json(product, {status: 201})
}