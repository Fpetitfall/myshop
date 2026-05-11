import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#ORD-1234",
    customer: "John Doe",
    date: "2024-03-10",
    total: "$240.00",
    status: "Delivered",
  },
  {
    id: "#ORD-1235",
    customer: "Jane Smith",
    date: "2024-03-11",
    total: "$180.00",
    status: "Processing",
  },
  {
    id: "#ORD-1236",
    customer: "Bob Johnson",
    date: "2024-03-12",
    total: "$350.00",
    status: "Shipped",
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Orders</h2>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
