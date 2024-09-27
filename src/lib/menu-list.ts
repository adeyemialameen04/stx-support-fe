import {
  Users,
  LayoutGrid,
  LucideIcon,
  Calendar,
  Ticket,
  ShoppingCart,
  Package,
  Newspaper,
  Image,
  BarChart,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/analytics",
          label: "Analytics",
          active: pathname === "/analytics",
          icon: BarChart,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/events",
          label: "Events",
          active: pathname.includes("/events"),
          icon: Calendar,
          submenus: [
            {
              href: "/events",
              label: "All Events",
              active: pathname === "/events",
            },
            {
              href: "/events/new",
              label: "New Event",
              active: pathname === "/events/new",
            },
          ],
        },
        {
          href: "/tickets",
          label: "Tickets",
          active: pathname.includes("/tickets"),
          icon: Ticket,
          submenus: [],
        },
        {
          href: "/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: Package,
          submenus: [
            {
              href: "/products",
              label: "All Products",
              active: pathname === "/products",
            },
            {
              href: "/products/new",
              label: "New Product",
              active: pathname === "/products/new",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Content",
      menus: [
        {
          href: "/news",
          label: "News",
          active: pathname.includes("/news"),
          icon: Newspaper,
          submenus: [
            {
              href: "/news",
              label: "All News",
              active: pathname === "/news",
            },
            {
              href: "/news/new",
              label: "New Article",
              active: pathname === "/news/new",
            },
          ],
        },
        {
          href: "/gallery",
          label: "Gallery",
          active: pathname.includes("/gallery"),
          icon: Image,
          submenus: [
            {
              href: "/gallery",
              label: "All Media",
              active: pathname === "/gallery",
            },
            {
              href: "/gallery/new",
              label: "New Gallery",
              active: pathname === "/gallery/new",
            },
          ],
        },
        {
          href: "/live",
          label: "Live",
          active: pathname.includes("/live"),
          icon: Image,
          submenus: [
            {
              href: "/live",
              label: "All Live Information",
              active: pathname === "/live",
            },
            {
              href: "/live/new",
              label: "New Live Information",
              active: pathname === "/live/new",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Organization",
      menus: [
        {
          href: "/teams",
          label: "Teams",
          active: pathname.includes("/teams"),
          icon: Users,
          submenus: [
            {
              href: "/teams",
              label: "All Teams",
              active: pathname === "/teams",
            },
            {
              href: "/teams/new",
              label: "New Team",
              active: pathname === "/teams/new",
            },
          ],
        },
      ],
    },
  ];
}
