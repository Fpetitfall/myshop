export const dynamic = "force-dynamic";

import { getOrCreateCart } from "@/services/cart-service";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { 
  removeFromCartAction, 
  updateQuantityAction 
} from "@/actions/cart-actions";

export default async function CartPage() {
  const cart = await getOrCreateCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-zinc-100 p-6 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-zinc-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your bag is empty.</h1>
        <p className="text-muted-foreground mb-8">Once you add something to your bag - it will appear here.</p>
        <Link 
          href="/products" 
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 py-6 text-lg")}
        >
          Browse Shoes
        </Link>
      </div>
    );
  }

  const subtotal = cart.items.reduce((acc, item) => {
    const price = Number(item.productVariant.price || item.productVariant.product.basePrice);
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.items.map((item) => {
            const price = Number(item.productVariant.price || item.productVariant.product.basePrice);
            return (
              <div key={item.id} className="flex gap-6 border-b pb-8">
                <div className="h-32 w-32 relative rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                  <Image 
                    src={item.productVariant.images[0] || "/placeholder-shoe.jpg"} 
                    alt={item.productVariant.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{item.productVariant.product.name}</h3>
                      <p className="font-bold">${price * item.quantity}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.productVariant.color} | Size {item.productVariant.size}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-full px-2">
                      <form action={async () => { await updateQuantityAction(item.id, item.quantity - 1) }}>
                        <button className="p-2 hover:text-black transition">
                          <Minus className="h-4 w-4" />
                        </button>
                      </form>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <form action={async () => { await updateQuantityAction(item.id, item.quantity + 1) }}>
                        <button className="p-2 hover:text-black transition">
                          <Plus className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                    <form action={async () => { await removeFromCartAction(item.id) }}>
                      <button className="text-muted-foreground hover:text-red-500 transition">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 p-8 rounded-2xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping & Handling</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium">--</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-8 py-7 text-lg rounded-full">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
