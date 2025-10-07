"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  MapPin,
  Building2,
  Search,
  Info,
  FileText,
  MessageCircle,
  Home,
  Calculator,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PatronLogo } from "./patron-logo";

const navigation = [
  { name: "Sellers", href: "/selling", icon: Building2 },
  { name: "Buyers", href: "/buying", icon: Home },
  { name: "My Home Value", href: "/home-value", icon: Calculator },
  { name: "Rent/Property Mgmt", href: "/property-management", icon: Building2 },
  { name: "Local Communities", href: "/communities", icon: MapPin },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "FabFriday", href: "/videos", icon: Video },
  { name: "Testimonials", href: "/testimonials", icon: MessageCircle },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: MessageCircle },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-patron-darkGray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <PatronLogo size="large" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 ml-auto mr-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg cursor-pointer text-sm ${
                  isActive(item.href)
                    ? "text-white bg-lime-500 border-b-2 border-lime-600"
                    : "text-gray-700 hover:text-white hover:bg-lime-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 h-full max-h-screen">
              <SheetTitle className="sr-only">
                Mobile Navigation Menu
              </SheetTitle>
              <div className="py-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Mobile Logo */}
                <div className="mb-8">
                  <PatronLogo size="large" showLink={false} />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide px-1">
                    Navigation
                  </h4>
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`font-medium transition-colors duration-200 p-3 rounded-lg cursor-pointer ${
                          isActive(item.href)
                            ? "text-white bg-lime-500 border-l-4 border-lime-600"
                            : "text-gray-700 hover:text-white hover:bg-lime-500"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="space-y-3 pb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide px-1">
                    Quick Actions
                  </h4>
                  <Button
                    className="w-full cursor-pointer bg-lime-500 hover:bg-lime-600 text-white"
                    asChild
                  >
                    <Link href="/search">Search Properties</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-white"
                    asChild
                  >
                    <Link href="/about">About Us</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
