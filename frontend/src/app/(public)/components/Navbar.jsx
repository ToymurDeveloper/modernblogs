"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// const navItems = [
//   { name: "Home", id: "home" },
//   { name: "Explore", id: "explore" },
//   { name: "Services", id: "services" },
//   { name: "About", id: "about" },
//   { name: "Contact", id: "contact" },
// ];

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/blogs" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

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
    setMobileMenuOpen(false);
    await logout();
  };

  // const handleNavClick = (e, id) => {
  //   e.preventDefault();

  //   // If on homepage, scroll to section
  //   if (pathname === "/") {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   } else {
  //     // If on another page, go to homepage with hash
  //     router.push(`/#${id}`);
  //   }
  // };

  const handleNavClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="md:hidden flex">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/" className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WanderLog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-gray-700 hover:text-indigo-600 transition duration-150"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            {user ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="cursor-pointer border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all shadow-md hover:shadow-lg"
                  >
                    <div className="w-7 h-7 rounded-full bg-linear-to-br bg-orange-400  flex items-center justify-center">
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

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      <Link
                        href="/profile"
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
              </>
            ) : (
              <>
                <div className="sm:flex items-center space-x-4 hidden">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 bg-orange-500 text-white rounded-sm hover:bg-indigo-600 transition duration-150"
                  >
                    Login
                  </Link>
                </div>
                <div className="flex items-center sm:hidden">
                  <Link
                    href="/login"
                    className="p-1.5 bg-orange-500 text-white rounded-full hover:bg-indigo-600 transition duration-150"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
