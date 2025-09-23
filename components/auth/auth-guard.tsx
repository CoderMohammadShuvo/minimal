"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCredentials } from "@/lib/features/auth/authSlice"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          dispatch(setCredentials({ user: data.user, token: "from-cookie" }))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }

    if (!isAuthenticated) {
      checkAuth()
    }
  }, [dispatch, isAuthenticated])

  return <>{children}</>
}
