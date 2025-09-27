  "use client"

  import { useState } from "react"
  import Link from "next/link"
  import { useTranslations } from "next-intl"
  import { Search, Menu, X } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { LanguageSwitcher } from "./language-switcher"
  import { CartButton } from "./cart/cart-button"
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


    return (
      <header className="sticky top-0 z-50 w-full border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Left: Shop Button */}
            <div
              className="flex gap-2 items-center cursor-pointer md:cursor-default"
              onClick={() => {
                if (window.innerWidth < 1024) setIsMenuOpen(!isMenuOpen)
              }}
            >
              <MenuIcon />
              <p>SHOP</p>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Login Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:block"
              >
                Login
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              {/* your mobile menu items */}
            </div>
          )}
        </div>

        {/* Login Popup */}
        {
          isRegisterOpen ? <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
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
                  setIsRegisterOpen(false) // close register
                  setIsLoginOpen(true)     // go back to login
                }}
              />
            </DialogContent>
          </Dialog>
            : <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogContent className="sm:max-w-[400px] bg-white">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Access your account to continue.
                  </DialogDescription>
                </DialogHeader>
                <LoginForm
                  onSuccess={() => setIsLoginOpen(false)} // ✅ closes popup after successful login
                  onSwitchToRegister={() => {
                    setIsLoginOpen(false) // close login modal
                    setIsRegisterOpen(false) // (if you implement a register modal later)
                  }}
                />

                

              </DialogContent>
            </Dialog>
        }
      </header>


    )
  }
