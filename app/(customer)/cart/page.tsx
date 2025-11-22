'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Iconex } from '@/components/icons/iconex'
import { NavBar } from '@/components/marketplace/nav-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { getCart, removeFromCart, updateCartQuantity, type CartItem } from '@/lib/storage';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    setCartItems(getCart());

    const handleCartUpdate = () => {
      setCartItems(getCart());
    };
    
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5; // Flat fee for now
  const total = subtotal + deliveryFee;

  const updateQuantity = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
    setCartItems(getCart());
  };

  const removeItem = (productId: string) => {
    removeFromCart(productId);
    setCartItems(getCart());
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <h1 className="text-2xl font-bold">Cart Items</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Iconex as={ShoppingBag} className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 text-center">
                Add some items to get started shopping
              </p>
              <Button onClick={() => router.push('/')}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm text-muted-foreground">{cartItems.length} Items in Cart</p>
              
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg?height=100&width=100"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-2 mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.vendorName}</p>
                        <p className="text-lg font-bold text-foreground">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Iconex as={Trash2} className="h-4 w-4 text-destructive" />
                        </Button>
                        <div className="flex items-center gap-2 border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Iconex as={Minus} className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Iconex as={Plus} className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Cart Summary</h2>
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium">${deliveryFee}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Discount Code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Continue to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
