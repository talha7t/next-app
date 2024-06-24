import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({})
  // the NextRequest object is not required so we can remove it but then next.js will cache the result of this response to prevent it we keep the request object
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if(userExists) {
    return NextResponse.json({error: 'User already exists'}, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    }
  });
  return NextResponse.json(user, { status: 201 });
}
