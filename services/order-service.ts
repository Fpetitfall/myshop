import { db } from "@/lib/db";
import { clearCart } from "./cart-service";

export async function createOrder(data: {
  userId: string;
  items: { productVariantId: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}) {
  const order = await db.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      shippingAddress: data.shippingAddress,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      phone: data.phone,
      items: {
        create: data.items.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // Decrease stock for each item
  for (const item of data.items) {
    await db.productVariant.update({
      where: { id: item.productVariantId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  await clearCart();

  return order;
}

export async function updatePaymentStatus(orderId: string, status: "COMPLETED" | "FAILED", transactionId?: string) {
  return await db.payment.update({
    where: { orderId },
    data: { 
      status,
      transactionId
    },
  });
}
