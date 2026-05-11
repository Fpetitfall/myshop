"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant, Category } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product & {
    category: Category;
    variants: ProductVariant[];
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.variants[0]?.images[0] || "/placeholder-shoe.jpg";
  const price = product.basePrice.toString();
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden border-none shadow-none bg-zinc-50 transition-all hover:bg-zinc-100">
        <CardContent className="p-0 aspect-square relative">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.variants.every(v => v.stock === 0) && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Out of Stock
            </Badge>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            {product.category.name}
          </p>
          <h3 className="font-bold text-base">{product.name}</h3>
          <div className="flex justify-between w-full items-center">
            <p className="font-medium">${price}</p>
            <p className="text-xs text-muted-foreground">{colors.length} Colors</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
