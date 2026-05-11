"use server";

import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { getOrCreateCart } from "@/services/cart-service";
import { db } from "@/lib/db";
import { checkoutSchema } from "@/lib/zod-schemas";

export async function createCheckoutSession(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const cart = await getOrCreateCart();
  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  const validatedFields = checkoutSchema.safeParse({
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    phone: formData.get("phone"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.issues[0].message);
  }

  const { address, city, postalCode, country, phone, paymentMethod } = validatedFields.data;

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productVariant.product.name,
        description: `${item.productVariant.color} - Size ${item.productVariant.size}`,
        images: item.productVariant.images,
      },
      unit_amount: Math.round(Number(item.productVariant.price || item.productVariant.product.basePrice) * 100),
    },
    quantity: item.quantity,
  }));

  if (paymentMethod === "STRIPE") {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        userId: session.user.id,
        address: address,
        city,
        postalCode,
        country,
        phone,
      },
    });

    return { url: stripeSession.url };
  }

  if (paymentMethod === "PAYPAL") {
    // PayPal integration logic would go here
    return { error: "PayPal integration coming soon" };
  }

  if (paymentMethod === "WAVE" || paymentMethod === "ORANGE_MONEY") {
    // Here we would call a local payment provider API (like TouchPay or similar)
    return { error: "Local mobile money integration coming soon" };
  }

  return { error: "Invalid payment method" };
}
