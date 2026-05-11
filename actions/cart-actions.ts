"use server";

import { 
  addToCart, 
  removeFromCart, 
  updateQuantity 
} from "@/services/cart-service";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productVariantId: string, quantity: number = 1) {
  try {
    await addToCart(productVariantId, quantity);
    revalidatePath("/cart");
    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (error) {
    return { error: "Please login to add to cart" };
  }
}

export async function removeFromCartAction(cartItemId: string) {
  try {
    await removeFromCart(cartItemId);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    return { error: "Failed to remove item" };
  }
}

export async function updateQuantityAction(cartItemId: string, quantity: number) {
  try {
    await updateQuantity(cartItemId, quantity);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update quantity" };
  }
}
