import { Link, useLocation } from "@tanstack/react-router";
import { Mail, Menu, Phone, Search, ShoppingCart } from "lucide-react";
import { useAuth, useProfile } from "#/store/authStore.ts";
import { useCartCount, useCartStore } from "#/store/cartStore.ts";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/home/about" },
  { name: "Training Programs", path: "/home/programs" },
  { name: "Accreditations", path: "/home/accreditations" },
  { name: "Contact", path: "/home/contact" },
] as const;

// lucide-react no longer ships brand marks, so use inline SVG paths.
const socials = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
] as const;

function CartButton({ className }: { className?: string }) {
  const cartCount = useCartCount();
  const openCart = useCartStore((s) => s.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      className={`relative ${className ?? ""}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-error-content">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default function HomeNav() {
  const [user] = useAuth();
  const [profile] = useProfile();
  const isLoggedIn = !!user?.accessToken;
  const dashboardPath =
    profile?.role === "admin" ? "/admin" : ("/user" as const);

  // Transparent + overlaid on the landing page hero; solid accent elsewhere.
  const pathname = useLocation({ select: (l) => l.pathname });
  const isHome = pathname === "/home" || pathname === "/home/";

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        hasScrolled ? "bg-accent" : "bg-transparent"
      }`}
    >
      {/* Top contact strip */}
      <div className="bg-white">
        <div className="hidden bg-accent text-white  md:block">
          <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm md:px-10">
            <div className="flex items-center divide-x divide-neutral/20 ">
              <a
                href="tel:+19054522470"
                className="flex items-center gap-2 pr-4 font-medium hover:opacity-70 "
              >
                <Phone className="h-4 w-4 " />
                +1 905-452-2470
              </a>
              <a
                href="mailto:info@guardmasterinstitute.ca"
                className="flex items-center gap-2 pl-4 font-medium hover:opacity-70"
              >
                <Mail className="h-4 w-4" />
                info@guardmasterinstitute.ca
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={isLoggedIn ? dashboardPath : "/home/auth/login"}
                className="font-medium hover:opacity-70"
              >
                {isLoggedIn ? "Dashboard" : "Student Login"}
              </Link>
              <span className="text-neutral">|</span>
              <Link to="/home/contact" className="font-medium hover:opacity-70">
                Contact Us
              </Link>

              <div className="ml-1 flex items-center gap-1.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>

              <CartButton className="ml-1 text-white hover:opacity-70" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="navbar container mx-auto gap-4 px-4 py-5 md:px-10">
        <div className="navbar-start">
          <Link to="/" className="shrink-0 cursor-pointer">
            <img
              src="/logo.png"
              alt="Guardmaster Institute"
              className="h-10 w-auto shrink-0 object-contain md:h-18"
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text font-medium text-white/60 transition-colors hover:bg-transparent hover:text-neutral"
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          <label className="hidden h-11 w-64 items-center gap-2 rounded-full bg-white/10 px-5 text-white/50 ring backdrop-blur-sm md:flex">
            <Search className="h-4 w-4 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-neutral placeholder:text-neutral/40 focus:outline-none"
            />
          </label>

          <CartButton className="text-white hover:text-neutral md:hidden" />

          <Link
            to={isLoggedIn ? dashboardPath : "/home/auth/signup"}
            className="btn btn-primary hidden rounded-md px-6 font-semibold text-primary-content shadow-md lg:inline-flex"
          >
            {isLoggedIn ? "Dashboard" : "Enroll Now"}
          </Link>

          <label
            htmlFor="home-drawer"
            aria-label="open sidebar"
            className="btn btn-ghost text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>
        </div>
      </div>
    </div>
  );
}
