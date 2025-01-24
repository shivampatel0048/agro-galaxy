"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageSelection from "./LanguageSelection";
import { getToken, removeToken } from "@/utils/tokenUtils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cartSlice";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  // { label: "Drums", href: "/#" },
  // { label: "Pianos", href: "/#" },
];

const Navbar = () => {
  const token = getToken();
  const pathname = usePathname();
  const router = useRouter();
  const [scope, animate] = useAnimate();
  const dispatch = useAppDispatch();
  const { cart, status } = useAppSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(true);


  useEffect(() => {
    setIsMounted(false)
    if (!cart && status === 'idle') {
      dispatch(fetchCart());
    }
  }, [dispatch, cart, status])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    router.push("/sign-in");
    router.refresh();
  };

  useEffect(() => {
    if (isMenuOpen) {
      animate([
        [
          ".mobile-menu",
          { opacity: [0, 1], y: ["-100%", "0%"] },
          { duration: 0.3 },
        ],
        [
          "a",
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.3, delay: stagger(0.1) },
        ],
        [".auth-button", { opacity: [0, 1], y: [20, 0] }, { duration: 0.3 }],
      ]);
    }
  }, [isMenuOpen, animate]);

  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="customized_container">
          <div className="flex-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 relative z-50">
              <Link href={"/"}>
                <h1 className="text-xl font-bold">Agro Galaxy</h1>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            {/* <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 rounded-full bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div> */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-x-8">
              {navLinks.map((link) => {
                const normalizedPathname = pathname.replace(/\/$/, "");
                const normalizedHref = link.href.replace(/\/$/, "");
                const isActive = normalizedPathname === normalizedHref;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 group ${isActive ? "text-blue-500" : "text-gray-700"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 ease-out ${isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </Link>
                );
              })}
              <div className="flex items-center gap-x-8">
                <Link href="/cart">
                  <button className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-500 transition-colors duration-200" />
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {(cart?.items ?? []).length > 0 ? cart?.items.length : 0}
                    </span>
                  </button>
                </Link>

                <LanguageSelection />

                {token && !isMounted && <Button
                  variant="outline"
                  size="icon"
                  // className="auth-button w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleLogout}
                >
                  <LogOut />
                </Button>}

                {!token && !isMounted && <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Login
                  </Button>
                </Link>}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-x-4">
              <button
                onClick={toggleMenu}
                className="relative z-50 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 animate-fade-in" />
                ) : (
                  <Menu className="h-6 w-6 animate-fade-in" />
                )}
              </button>

              <LanguageSelection />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={scope}
          className={`mobile-menu md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm z-40 ${isMenuOpen
            ? "opacity-100 w-full min-h-screen"
            : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="h-full flex flex-col pt-20 px-4">
            {/* Mobile Navigation Links */}
            <div className="flex items-center flex-col gap-y-6 flex-grow pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`text-xl font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex justify-center w-full">
                {token && !isMounted && <Button
                  variant="default"
                  className="auth-button w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>}
                {!token && !isMounted &&
                  <Button
                    variant="default"
                    className="auth-button w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleNavClick}
                  >
                    Sign In
                  </Button>
                }
              </div>
            </div>

            {/* <div className="py-8 flex justify-center">
                            <Button
                                variant="default"
                                className="auth-button w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={handleNavClick}
                            >
                                Sign In
                            </Button>
                        </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
