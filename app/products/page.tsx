import { getProducts, getCategories } from "@/services/product-service";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    query?: string;
    size?: string;
    color?: string;
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Shoes ({products.length})</h1>
          <p className="text-muted-foreground">Find the perfect pair for your style.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search shoes..." 
            className="pl-10"
            // Integration with URL params would be added with a client component wrapper
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile dropdown or Desktop Sidebar */}
        <aside className="w-full lg:w-64 space-y-6">
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs tracking-widest">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <label className="text-sm hover:underline cursor-pointer">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs tracking-widest">Sizes</h3>
            <div className="grid grid-cols-4 gap-2">
              {["38", "39", "40", "41", "42", "43", "44", "45"].map((size) => (
                <button 
                  key={size}
                  className="border rounded-md py-2 text-xs hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
