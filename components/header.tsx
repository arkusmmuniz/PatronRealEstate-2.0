"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PatronLogo } from "./patron-logo";

const navigationItems = [
  { name: "Buyers", href: "/buying" },
  { name: "Sellers", href: "/selling" },
  { name: "My Home Value", href: "/home-value" },
  { name: "Rent/Property Mgmt", href: "/property-management" },
  // { name: "Collections", href: "/collections" }, // TEMPORALMENTE OCULTO
  { name: "Local Communities", href: "/communities" },
  { name: "Blog", href: "/blog" },
  { name: "FabFriday", href: "/videos" },
  { name: "Testimonials", href: "/testimonials" },
  // { name: "IDXBroker Integration", href: "/idxbroker-integration" }, // TEMPORALMENTE OCULTO
  { name: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <PatronLogo size="xl" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm ${
                  isActive(item.href) ? "text-lime-600 border-b-2 border-lime-500 pb-1" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button
              asChild
              className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>

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
                  <PatronLogo size="xl" showLink={false} />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block p-3 rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? "bg-lime-50 text-lime-700 border-l-4 border-lime-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold"
                  >
                    <Link href="/contact">Schedule a Consultation</Link>
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