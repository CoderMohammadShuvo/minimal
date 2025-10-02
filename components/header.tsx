"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { UserMenu } from "./auth/user-menu"
import MenuIcon from "./icons/menu-icon"
import Logo from "./icons/logo"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { LoginForm } from "./auth/login-form"
import { RegisterForm } from "./auth/register-form"

export function Header() {
  const t = useTranslations("nav")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  // Drawer navigation links
  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Shop Button & Menu */}
          <div className="flex items-center gap-6">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
              <p>SHOP</p>
            </div>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <UserMenu/>
          </div>
        </div>
      </div>

      {/* Top-to-Bottom Drawer for all devices */}
      <div className={`
        fixed inset-0 z-40 transform transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Drawer Content - Slides from top */}
        <div className={`
          fixed top-0 left-0 right-0 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary py-3 px-4 rounded-lg hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Login Popup */}
      {isRegisterOpen ? (
        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
              <DialogDescription>
                Create your account to get started
              </DialogDescription>
            </DialogHeader>
            <RegisterForm
              onSuccess={() => setIsRegisterOpen(false)}
              onSwitchToLogin={() => {
                setIsRegisterOpen(false)
                setIsLoginOpen(true)
              }}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="sm:max-w-[400px] bg-white">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
                Access your account to continue.
              </DialogDescription>
            </DialogHeader>
            <LoginForm
              onSuccess={() => setIsLoginOpen(false)}
              onSwitchToRegister={() => {
                setIsLoginOpen(false)
                setIsRegisterOpen(true)
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </header>
  )
}