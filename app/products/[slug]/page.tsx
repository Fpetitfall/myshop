import { getProductBySlug } from "@/services/product-service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ShieldCheck, Truck } from "lucide-react";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      images: product.variants[0]?.images || [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const mainImage = product.variants[0]?.images[0] || "/placeholder-shoe.jpg";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.variants[0]?.images.map((img, i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden bg-zinc-100 cursor-pointer border-2 border-transparent hover:border-black transition">
                <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-8">
          <div>
            <Badge variant="outline" className="mb-4 uppercase tracking-widest text-[10px]">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-medium mt-2">${product.basePrice.toString()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold uppercase text-xs tracking-widest">Select Color</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className="px-4 py-2 border rounded-full text-sm font-medium hover:border-black transition"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-bold uppercase text-xs tracking-widest">Select Size</h3>
              <button className="text-xs underline text-muted-foreground">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="py-3 border rounded-md text-sm font-bold hover:border-black transition flex items-center justify-center"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full py-7 text-lg rounded-full">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full py-7 text-lg rounded-full">
              <Heart className="mr-2 h-5 w-5" /> Favorite
            </Button>
          </div>

          <div className="pt-8 border-t space-y-4">
            <div className="flex items-start gap-4">
              <Truck className="h-5 w-5 mt-1" />
              <div>
                <p className="font-bold text-sm">Free Delivery & Returns</p>
                <p className="text-xs text-muted-foreground">On all orders over $150. Easy 30-day returns.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-5 w-5 mt-1" />
              <div>
                <p className="font-bold text-sm">Authenticity Guaranteed</p>
                <p className="text-xs text-muted-foreground">Every pair is verified by our experts.</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="font-bold mb-3">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
