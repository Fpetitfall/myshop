import { MetadataRoute } from "next";
import { getProducts } from "@/services/product-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Get all products for dynamic routes
  const products = await getProducts({});
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/cart",
    "/auth/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [...routes, ...productEntries];
}
