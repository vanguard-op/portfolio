import React from "react";
import { FiMenu, FiBell, FiSearch, FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  setIsMobileOpen: (val: boolean) => void;
  isSidebarMinimized: boolean;
  setIsSidebarMinimized: (val: boolean) => void;
}

export default function AdminHeader({ 
  setIsMobileOpen, 
  isSidebarMinimized,
  setIsSidebarMinimized 
}: AdminHeaderProps) {
  const pathname = usePathname();
  
  // Format pathname to title case for the header
  const getPageTitle = () => {
    if (!pathname || pathname === "/" || pathname === "/dashboard") return "Dashboard";
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const mainPart = pathParts[0].replace("-admin", "");
      return mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
    }
    return "Admin";
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-neutral-950 border-b border-neutral-800/60 sticky top-0 z-30">
      <div className="flex items-center">
        <button 
          className="md:hidden p-2 -ml-2 mr-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          onClick={() => setIsMobileOpen(true)}
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-neutral-100">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative hidden md:block">
          <FiSearch className="absolute text-neutral-500 left-3 top-1/2 -translate-y-1/2" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-neutral-900 border border-neutral-800 text-sm rounded-full pl-9 pr-4 py-2 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-48 lg:w-64 transition-all placeholder:text-neutral-600"
          />
        </div>

        <button className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors relative">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-neutral-950"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium cursor-pointer ring-2 ring-neutral-800 hover:ring-neutral-700 transition-all">
          <FiUser size={16} />
        </div>
      </div>
    </header>
  );
}
