import type { NextRequest } from "next/server"
import { verifyToken as verifyJWT } from "@/lib/auth"

export async function verifyToken(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return null
  }

  const payload = verifyJWT(token)
  if (!payload) {
    return null
  }

  return {
    id: payload.userId,
    email: payload.email,
    role: payload.role,
  }
}

export function getAuthUser(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return null
  }

  const payload = verifyJWT(token)
  return payload
}

export function requireAuth(request: NextRequest) {
  const user = getAuthUser(request)

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

export function requireAdmin(request: NextRequest) {
  const user = requireAuth(request)

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    throw new Error("Admin access required")
  }

  return user
}
