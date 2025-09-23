import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/middleware/auth"

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameBn: z.string().min(1, "Bangla name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
})

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAdmin(request)

    const body = await request.json()
    const data = createCategorySchema.parse(body)

    // Check if slug already exists
    const existingSlug = await prisma.category.findUnique({
      where: { slug: data.slug },
    })

    if (existingSlug) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data,
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }

    console.error("Category creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
