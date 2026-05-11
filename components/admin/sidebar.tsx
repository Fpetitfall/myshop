"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Products",
    icon: ShoppingBag,
    href: "/admin/products",
    color: "text-violet-500",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "text-pink-700",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-orange-700",
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            Admin Panel
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-white/10">
        <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition">
          <LogOut className="h-5 w-5 mr-3 text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
};
