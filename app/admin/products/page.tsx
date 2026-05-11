import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "1",
    name: "Nike Air Max 90",
    category: "Sneakers",
    price: "$120.00",
    stock: 45,
    status: "Active",
  },
  {
    id: "2",
    name: "Adidas Ultraboost",
    category: "Running",
    price: "$180.00",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Jordan 1 Retro",
    category: "Basketball",
    price: "$170.00",
    stock: 0,
    status: "Out of Stock",
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={
                    product.status === "Active" ? "default" : 
                    product.status === "Low Stock" ? "secondary" : "destructive"
                  }>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
