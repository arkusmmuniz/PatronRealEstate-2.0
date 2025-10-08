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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PatronLogo } from "./patron-logo";
import { useState } from "react";

const navigationGroups = [
  {
    name: "Buy & Sell",
    items: [
      { name: "Buyers", href: "/buying", icon: Home },
      { name: "Sellers", href: "/selling", icon: Building2 },
      { name: "My Home Value", href: "/home-value", icon: Calculator },
    ],
  },
  {
    name: "Rent & Manage",
    items: [
      { name: "Rent/Property Mgmt", href: "/property-management", icon: Building2 },
    ],
  },
  {
    name: "Explore",
    items: [
      { name: "Collections", href: "/collections", icon: Search },
      { name: "Local Communities", href: "/communities", icon: MapPin },
      { name: "Blog", href: "/blog", icon: FileText },
      { name: "FabFriday", href: "/videos", icon: Video },
      { name: "Testimonials", href: "/testimonials", icon: MessageCircle },
    ],
  },
  {
    name: "Company",
    items: [
      { name: "About", href: "/about", icon: Info },
      { name: "Contact", href: "/contact", icon: MessageCircle },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <PatronLogo size="large" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationGroups.map((group) => (
              <DropdownMenu key={group.name}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm">
                    {group.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 w-full ${
                          isActive(item.href) ? "bg-lime-50 text-lime-700" : ""
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <PatronLogo size="large" showLink={false} />
                </div>

                {/* Mobile Navigation Groups */}
                <nav className="space-y-4 mb-8">
                  {navigationGroups.map((group) => (
                    <Collapsible
                      key={group.name}
                      open={openGroups.includes(group.name)}
                      onOpenChange={() => toggleGroup(group.name)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        {group.name}
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openGroups.includes(group.name) ? "rotate-90" : ""
                          }`} 
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 ml-4 mt-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
                              isActive(item.href)
                                ? "bg-lime-50 text-lime-700 border-l-2 border-lime-500"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
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