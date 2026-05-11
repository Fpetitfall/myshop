import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function getOrCreateCart() {
  const session = await auth();
  if (!session?.user) return null;

  let cart = await db.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          productVariant: {
            include: {
              product: true
            }
          }
        }
      }
    }
  });

  if (!cart) {
    cart = await db.cart.create({
      data: { userId: session.user.id },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
  }

  return cart;
}

export async function addToCart(productVariantId: string, quantity: number = 1) {
  const cart = await getOrCreateCart();
  if (!cart) throw new Error("Unauthorized");

  const existingItem = cart.items.find(item => item.productVariantId === productVariantId);

  if (existingItem) {
    return await db.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  }

  return await db.cartItem.create({
    data: {
      cartId: cart.id,
      productVariantId,
      quantity
    }
  });
}

export async function removeFromCart(cartItemId: string) {
  return await db.cartItem.delete({
    where: { id: cartItemId }
  });
}

export async function updateQuantity(cartItemId: string, quantity: number) {
  if (quantity <= 0) return removeFromCart(cartItemId);

  return await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity }
  });
}

export async function clearCart() {
  const cart = await getOrCreateCart();
  if (!cart) return;

  return await db.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
}
