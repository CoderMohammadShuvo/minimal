"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logoutUser } from "@/lib/features/auth/authSlice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

import { User, Settings, ShoppingBag, LogOut, Shield, ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { AuthModal } from "./auth-modal"
import { useTranslations } from "next-intl"
import Image from "next/image"
import RightArrorwIcon from "../icons/RightArrorwIcon"

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

export function UserMenu() {
  const t = useTranslations("nav")
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { items: cartItems } = useAppSelector((state) => state.cart)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([])

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setLocalCartItems(parsedCart)
          
          // // Sync with Redux if needed
          // if (parsedCart.length > 0) {
          //   dispatch(cart(parsedCart))
          // }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }

    loadCartFromLocalStorage()

    // Listen for storage events (in case cart is updated from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCartFromLocalStorage()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [dispatch])

  // Also listen for custom cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setLocalCartItems(JSON.parse(savedCart))
      }
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const handleLogout = async () => {
    await dispatch(logoutUser())
  }

  // Update quantity in localStorage and Redux
  const updateQuantity = (productId: number, newQuantity: number) => {
    try {
      const updatedCart = localCartItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0

      setLocalCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      // dispatch(setCartItems(updatedCart))
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    try {
      const updatedCart = localCartItems.filter(item => item.product.id !== productId)
      setLocalCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      // dispatch(setCartItems(updatedCart))
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    return localCartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  // Get total items count
  const getTotalItems = () => {
    return localCartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
          <User className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">{t("account")}</span>
        </Button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* 🛒 Cart button */}
      <Button variant="ghost" size="sm" onClick={() => setShowCartDrawer(true)} className="relative">
        <ShoppingCart className="h-5 w-5" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </Button>

      {/* 👤 User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 bg-white">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Cart Drawer */}
      <Sheet open={showCartDrawer} onOpenChange={setShowCartDrawer}>
        <SheetContent side="right" className="w-full sm:w-[400px] bg-white flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Cart ({getTotalItems()} items)</SheetTitle>
            <SheetDescription>Items you've added to your shopping cart</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4 space-y-4 px-4">
            {localCartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Your cart is empty</p>
                <Button 
                  onClick={() => setShowCartDrawer(false)}
                  className="mt-4"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              localCartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 border rounded-lg bg-gray-50"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.images?.[0] || "/placeholder-image.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                      sizes="64px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-600">${item.product.price}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {localCartItems.length > 0 && (
            <SheetFooter className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-white  border pointer">
                Proceed to Checkout
                <RightArrorwIcon/>
              </Button>
              
              <SheetClose asChild>
                <Button variant="outline" className="w-full bg-black text-white cursor-pointer">
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}