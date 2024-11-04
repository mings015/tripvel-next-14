import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import LogoTrip from "../ui/logoTripvel";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 ">
        <header className="flex h-20 w-full shrink-0 items-center ">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="neutral" size="icon" className="lg:hidden">
                <Menu color="black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" prefetch={false}>
                    <LogoTrip className="h-24 w-24" />
                  </Link>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <div className="grid gap-2 py-6">
                <Link
                  href="/"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/about-us"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  FAQs
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <LogoTrip className="h-24 w-24" />
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/about-us"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  About
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  FAQs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex gap-2">
            <Link href="/login">
              <Button>
                Sign in
                <span className="text-black mx-2 text-xl"> | </span> Sign Up
              </Button>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
