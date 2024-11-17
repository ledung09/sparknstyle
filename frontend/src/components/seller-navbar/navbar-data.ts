import {
  LayoutDashboard,
  Megaphone,
  Package,
  ShoppingCart,
} from "lucide-react";

export const SellerNavbarData = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/seller/",
  },
  {
    id: 2,
    label: "Orders",
    icon: ShoppingCart,
    href: "/seller/orders/toprepare",
  },
  {
    id: 3,
    label: "Products",
    icon: Package,
    href: "/seller/products",
  },
];
