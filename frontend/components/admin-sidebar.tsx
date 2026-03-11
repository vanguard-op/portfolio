"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiFileText, 
  FiBriefcase, 
  FiStar,
  FiZap,
  FiSettings, 
  FiChevronLeft,
  FiChevronRight,
  FiX
} from "react-icons/fi";

interface AdminSidebarProps {
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Articles", href: "/admin/articles", icon: FiFileText },
  { name: "Projects", href: "/admin/projects", icon: FiBriefcase },
  { name: "Services", href: "/admin/services", icon: FiZap },
  { name: "Reviews", href: "/admin/reviews", icon: FiStar },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminSidebar({ 
  isMinimized, 
  setIsMinimized, 
  isMobileOpen, 
  setIsMobileOpen 
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-neutral-900 border-r border-neutral-800 transition-all duration-300 md:relative overflow-hidden
          ${isMinimized ? "md:w-20" : "md:w-64"}
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-800">
          {!isMinimized || isMobileOpen ? (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent truncate flex-1 text-center md:text-left">
              Admin Panel
            </span>
          ) : (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent w-full text-center">
              AP
            </span>
          )}
          
          <button 
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto overflow-x-hidden">
          {navLinks.map((link) => {
            const isActive = link.href === "/admin"
              ? pathname === "/admin"
              : pathname === link.href || pathname?.startsWith(link.href + "/");
            const Icon = link.icon;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-blue-500/10 text-blue-400" 
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                  }
                  ${isMinimized && !isMobileOpen ? "justify-center" : "justify-start"}
                `}
                title={isMinimized && !isMobileOpen ? link.name : undefined}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon size={20} className={`shrink-0 ${isMinimized && !isMobileOpen ? "" : "mr-3"}`} />
                {(!isMinimized || isMobileOpen) && (
                  <span className="font-medium whitespace-nowrap">{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Minimize Button (Desktop only) */}
        <div className="hidden md:flex items-center p-4 border-t border-neutral-800">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex items-center justify-center w-full p-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            {isMinimized ? <FiChevronRight size={20} /> : (
              <>
                <FiChevronLeft size={20} className="mr-2" />
                <span className="text-sm font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
