"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/service/tools/session";
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { Theme } from "@/app/layout";

interface MainLayoutProps {
  currentTheme: Theme;
  onThemeToggleClick: () => void;
}

interface MenuItem {
  title: string;
  href: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  currentTheme,
  onThemeToggleClick,
}) => {
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ];
  const router = useRouter();
  const activePathname = usePathname();

  function getLink(item: MenuItem) {
    return (
      <Link
        href={item.href}
        color={activePathname === item.href ? "primary" : "foreground"}
      >
        {item.title}
      </Link>
    );
  }
  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle className={"sm:hidden"} />
        <NavbarItem>
          <p className={"font-bold text-xl text-inherit"}>BuAdmin</p>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={activePathname === item.href}>
            {getLink(item)}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify={"end"} className={""}>
        <NavbarItem>
          <div className={"flex flex-row gap-1.5"}>
            <Button
              color={"primary"}
              variant={"flat"}
              onPress={onThemeToggleClick}
              isIconOnly={true}
            >
              {currentTheme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              onPress={async () => {
                await clearSession();
                router.refresh();
              }}
              isIconOnly={true}
              color={"danger"}
              variant={"flat"}
              type={"submit"}
            >
              <LogOutIcon />
            </Button>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index} isActive={activePathname === item.href}>
            {getLink(item)}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default MainLayout;
