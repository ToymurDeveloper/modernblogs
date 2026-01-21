"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  User,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronRight,
  BookOpen,
  ListTree,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    { href: "/admin/categories", icon: ListTree, label: "Categories" },
    { href: "/admin/blogs", icon: BookOpen, label: "Blogs" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/admin/orders", icon: Users, label: "Users" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ease-in-out shadow-2xl z-40 ${
          isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-0" // Changed from translate-x-full to -translate-x-0
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Toggle Button */}
          <div
            className={`py-6 border-b border-gray-700/50 ${
              isSidebarOpen ? "px-6" : "px-5"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo/Title */}
              {isSidebarOpen && (
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold whitespace-nowrap">
                      Admin Panel
                    </h2>
                    <p className="text-xs text-gray-400">
                      Welcome, {user?.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="cursor-pointer p-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 transition-all hover:scale-105 shadow-md"
                aria-label={
                  isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"
                }
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 p-4 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 py-3.5 mb-1 px-2 rounded-xl transition-all group whitespace-nowrap ${
                    isSidebarOpen
                      ? "hover:translate-x-1"
                      : "hover:translate-x-0.5"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-500 text-blue-400 shadow-inner"
                      : isSidebarOpen
                      ? "hover:bg-gray-700/50"
                      : ""
                  }`}
                >
                  <div
                    className={`p-1 rounded-lg shadow-sm ${
                      isActive
                        ? "bg-gradient-to-br from-blue-500 to-blue-600"
                        : "bg-gray-700/50 group-hover:bg-blue-500/20"
                    } transition-colors`}
                  >
                    <Icon
                      size={20}
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-blue-400"
                      } transition-colors`}
                    />
                  </div>
                  {isSidebarOpen && (
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-300 group-hover:text-white"
                      } transition-colors`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer with User Profile */}
          <div className="p-4 border-t border-gray-700/50">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between px-3 py-3 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center shadow-md">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut
                    onClick={logout}
                    size={18}
                    className="text-gray-400 hover:text-red-400"
                  />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10  bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <User size={20} />
                </div>
                <button
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut
                    onClick={logout}
                    size={18}
                    className="text-gray-400 hover:text-red-400"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area - FIXED MARGIN */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Header - Clean, no menu button */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
          <div className="flex items-center px-6 py-4">
            {/* Header Title with current page */}
            <div className="flex items-center gap-3 flex-1">
              {/* <h1 className="text-xl font-semibold text-gray-800">
                Admin
              </h1> */}
              <div className="hidden md:flex items-center gap-2">
                {/* <span className="text-gray-400">|</span> */}
              </div>
            </div>

            {/* Right side content */}
            <div className="flex items-center gap-3">
              {/* Status indicator */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>

              {/* Notification/Quick Stats */}
              <div className="hidden md:flex items-center gap-4 px-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">88</p>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">24</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
              </div>

              {/* Profile button */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="cursor-pointer border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br bg-orange-400  flex items-center justify-center">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user?.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm profile-text-padd">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      href="admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition duration-150"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="mb-1" size={18} />
                        <span>Profile</span>
                      </div>
                    </Link>

                    <hr className="my-2 border-gray-100" />

                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <nav className="p-3 flex items-center gap-2 text-sm">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <span>Admin</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="font-semibold text-gray-600">
            {menuItems.find((item) => item.href === pathname)?.label ||
              "Dashboard"}
          </span>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay - Only on mobile (< md) */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-300 z-30 md:hidden ${
          isSidebarOpen && isMobile
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default AdminLayout;
