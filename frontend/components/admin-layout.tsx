"use client";

import React, { useState } from "react";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
      <AdminSidebar 
        isMinimized={isSidebarMinimized} 
        setIsMinimized={setIsSidebarMinimized}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />
      <div className="flex flex-col flex-1 w-full min-w-0">
        <AdminHeader 
          setIsMobileOpen={setIsMobileSidebarOpen} 
          isSidebarMinimized={isSidebarMinimized}
          setIsSidebarMinimized={setIsSidebarMinimized}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-neutral-950/40">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
