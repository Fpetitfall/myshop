import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Checkout Schemas
export const checkoutSchema = z.object({
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  postalCode: z.string().min(3, "Invalid postal code"),
  country: z.string().min(2, "Invalid country"),
  phone: z.string().min(8, "Invalid phone number"),
  paymentMethod: z.enum(["STRIPE", "PAYPAL", "WAVE", "ORANGE_MONEY"]),
});

// Product Schemas (Admin)
export const productSchema = z.object({
  name: z.string().min(2, "Product name is too short"),
  slug: z.string().min(2, "Slug is too short"),
  description: z.string().min(10, "Description is too short"),
  basePrice: z.number().positive("Price must be positive"),
  categoryId: z.string().uuid("Invalid category ID"),
});

export const variantSchema = z.object({
  sku: z.string().min(3, "SKU is too short"),
  size: z.string(),
  color: z.string(),
  stock: z.number().int().nonnegative(),
  productId: z.string().uuid(),
});
