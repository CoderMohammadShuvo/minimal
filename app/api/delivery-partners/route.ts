import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/middleware/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deliveryPartners = await prisma.deliveryPartner.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json(deliveryPartners)
  } catch (error) {
    console.error("Error fetching delivery partners:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, nameEn, nameBn, contactInfo, serviceAreas, isActive } = body

    const deliveryPartner = await prisma.deliveryPartner.create({
      data: {
        name,
        nameEn,
        nameBn,
        contactInfo,
        serviceAreas,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(deliveryPartner, { status: 201 })
  } catch (error) {
    console.error("Error creating delivery partner:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
