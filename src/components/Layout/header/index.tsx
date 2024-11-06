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
import LogoTrip from "@/components/ui/logoTripvel";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import UseLogout from "@/hooks/useLogout";
import { useToast } from "@/hooks/use-toast";
import DialogEditProfile from "./components/DialogEditProfile";

export default function Header() {
  const { user, loading, error } = useUser();

  const { isLoading, handleLogout } = UseLogout();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

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
                  href="/contact-us"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  Contact Us
                </Link>
                <Link
                  href="faqs"
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
                  href="/contact-us"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="faqs"
                  className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black dark:hover:border-white dark:focus:border-white outline-none"
                  prefetch={false}
                >
                  FAQs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex gap-2">
            {loading && <div></div>}
            {error && <div>Error: {error}</div>}

            {!user ? (
              <Link href="/login">
                <Button>
                  Sign in
                  <span className="text-black mx-2 text-xl"> | </span> Sign Up
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="faqs" className="pr-4">
                  <Icon icon="mdi:cart-outline" fontSize={28} />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex justify-center items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePictureUrl} alt="#" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className="font-semibold">{user.name}</h1>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Transaksi</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogEditProfile
                  isOpen={isDialogOpen}
                  onOpenChange={setDialogOpen}
                />
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin keluar dari akun Anda?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isLoading}>
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        disabled={isLoading}
                        className={
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        {isLoading ? "Logging out..." : "Logout"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}
