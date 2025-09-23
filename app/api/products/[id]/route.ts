import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/middleware/auth"

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  nameEn: z.string().min(1).optional(),
  nameBn: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  descriptionEn: z.string().min(1).optional(),
  descriptionBn: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  salePrice: z.number().positive().optional(),
  sku: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
  images: z.array(z.string()).optional(),
  categoryId: z.string().min(1).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK"]).optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            nameBn: true,
            slug: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(request)

    const body = await request.json()
    const data = updateProductSchema.parse(body)

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!existingProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    // Check if SKU already exists (if updating SKU)
    if (data.sku && data.sku !== existingProduct.sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku: data.sku },
      })

      if (existingSku) {
        return NextResponse.json({ message: "SKU already exists" }, { status: 400 })
      }
    }

    // Check if slug already exists (if updating slug)
    if (data.slug && data.slug !== existingProduct.slug) {
      const existingSlug = await prisma.product.findUnique({
        where: { slug: data.slug },
      })

      if (existingSlug) {
        return NextResponse.json({ message: "Slug already exists" }, { status: 400 })
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            nameBn: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }

    console.error("Product update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(request)

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
