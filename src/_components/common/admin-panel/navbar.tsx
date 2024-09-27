import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Input } from "../ui/input";
import { Bell, Settings } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center flex-1 space-x-4 lg:space-x-0 bg-green">
          <SheetMenu />
          {/* <h1 className="font-bold">{title}Hi</h1> */}
          <Input placeholder="Search" className="w-full" />
        </div>
        <div className="flex flex-1 gap-2 items-center space-x-2 justify-end">
          {/* <UserNav /> */}
          <Settings color="#667085" />
          <Bell color="#667085" />
        </div>
      </div>
    </header>
  );
}
