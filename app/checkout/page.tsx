export const dynamic = "force-dynamic";

import { getOrCreateCart } from "@/services/cart-service";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCheckoutSession } from "@/actions/payment-actions";
import { CreditCard, Wallet } from "lucide-react";

export default async function CheckoutPage() {
  const cart = await getOrCreateCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart.items.reduce((acc, item) => {
    const price = Number(item.productVariant.price || item.productVariant.product.basePrice);
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Checkout</h1>

      <form action={async (formData: FormData) => { await createCheckoutSession(formData) }} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Information */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input name="address" placeholder="Street Address" required />
              <div className="grid grid-cols-2 gap-4">
                <Input name="city" placeholder="City" required />
                <Input name="postalCode" placeholder="Postal Code" required />
              </div>
              <Input name="country" placeholder="Country" required />
              <Input name="phone" placeholder="Phone Number" required type="tel" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="relative border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-50 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black transition">
                <input type="radio" name="paymentMethod" value="STRIPE" defaultChecked className="peer sr-only" />
                <CreditCard className="h-6 w-6" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Stripe / Card</span>
                  <span className="text-xs text-muted-foreground">Visa, Mastercard</span>
                </div>
              </label>
              
              <label className="relative border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-50 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black transition opacity-50 grayscale cursor-not-allowed">
                <input type="radio" name="paymentMethod" value="PAYPAL" disabled className="peer sr-only" />
                <Wallet className="h-6 w-6" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">PayPal</span>
                  <span className="text-xs text-muted-foreground">Coming Soon</span>
                </div>
              </label>

              <label className="relative border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-50 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black transition">
                <input type="radio" name="paymentMethod" value="WAVE" className="peer sr-only" />
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">W</div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Wave</span>
                  <span className="text-xs text-muted-foreground">Mobile Money</span>
                </div>
              </label>

              <label className="relative border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-50 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black transition">
                <input type="radio" name="paymentMethod" value="ORANGE_MONEY" className="peer sr-only" />
                <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">OM</div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Orange Money</span>
                  <span className="text-xs text-muted-foreground">Mobile Money</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.quantity}x {item.productVariant.product.name}</span>
                  <span className="font-medium">${(Number(item.productVariant.price || item.productVariant.product.basePrice) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button type="submit" className="w-full mt-8 py-7 text-lg rounded-full">
              Place Order
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">
              By placing your order, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
