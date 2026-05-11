"use client";

import { Product, ProductVariant, Category } from "@prisma/client";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: (Product & {
    category: Category;
    variants: ProductVariant[];
  })[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h3 className="text-xl font-bold">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
