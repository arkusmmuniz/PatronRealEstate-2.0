"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Home,
  Users,
  Building,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Video,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { auth } from "@/lib/auth";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "FabFriday", href: "/admin/fabfriday", icon: Video },
  { name: "Blog", href: "/admin/blog", icon: MessageSquare },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building,
    hidden: true,
  },
  { name: "Agents", href: "/admin/agents", icon: Users, hidden: true },
  { name: "Leads", href: "/admin/leads", icon: MessageSquare, hidden: true },
  { name: "Settings", href: "/admin/settings", icon: Settings, hidden: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    auth.logout();
  };

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
            <SidebarContent collapsed={false} onToggleCollapse={() => {}} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:block transition-all duration-300 ${
        sidebarCollapsed ? 'lg:w-28' : 'lg:w-72'
      }`}>
        <div className="h-full bg-white border-r border-gray-200 shadow-sm">
          <SidebarContent collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-28' : 'lg:ml-72'
      }`}>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );

  function SidebarContent({ collapsed, onToggleCollapse }: { collapsed?: boolean; onToggleCollapse?: () => void }) {
    return (
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={`flex items-center gap-3 border-b border-gray-200 ${
          collapsed ? 'px-3 py-8' : 'px-5 py-12'
        }`}>
          <Link href="/admin/settings" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="bg-lime-500 text-white">SA</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  Super <span className="text-lime-600">Admin</span>
                </p>
                <p className="text-xs text-gray-500">admin@patronrealestate.com</p>
              </div>
            )}
          </Link>
          
          <div className="flex items-center gap-1">
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 transition-transform"
                onClick={onToggleCollapse}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            )}
          <Button
            variant="ghost"
            size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
              <X className="h-5 w-5 text-gray-700" />
          </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-1">
            {navigationItems
              .filter((item) => !item.hidden)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-lime-500 to-lime-600 text-white border-l-2 border-lime-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      title={collapsed ? item.name : undefined}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        {/* Go To Section */}
        {!collapsed && (
          <div className="px-3 py-3 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors border border-transparent hover:border-gray-200">
                  <ExternalLink className="h-4 w-4" />
                  Go To
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" sideOffset={-1} className="w-56 shadow-lg border border-gray-200 border-l-0 bg-white">
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Public Sections</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="px-3 py-2.5">
                  <Link href="/videos" target="_blank" className="flex items-center cursor-pointer">
                    <Video className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-sm">FabFriday</span>
                    <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2.5">
                  <Link href="/blog" target="_blank" className="flex items-center cursor-pointer">
                    <FileText className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-sm">Blog</span>
                    <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2.5">
                  <Link href="/" target="_blank" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-sm">Homepage</span>
                    <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-200">
          <Button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            variant="ghost"
            className={`w-full flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? "Log Out" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Log Out"}
          </Button>
        </div>
      </div>
    );
  }
}
