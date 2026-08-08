import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { navLinks } from "../data/siteData";
import { useScrolled } from "../hooks/useScrolled";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CurrencySelector from "./CurrencySelector";

// Pages with light (ivory/white) backgrounds that need dark navbar text from the top
const LIGHT_BG_PATHS = [
  "/privacy-policy",
  "/terms-conditions",
  "/account",
  "/auth",
  "/cart",
  "/checkout",
  "/order-confirmation",
  "/admin",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(40);
  const { itemCount, setCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  // Use dark text if the page has a light background OR if the user has scrolled
  const isLightPage = LIGHT_BG_PATHS.some((p) => location.pathname.startsWith(p));
  const useDarkText = scrolled || isLightPage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          useDarkText
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(200,169,106,0.25)] py-3"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          
          <div className="flex items-center gap-4 lg:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`p-1 transition-colors ${
                useDarkText ? "text-charcoal" : "text-white"
              }`}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <Link to="/" className="group flex items-baseline gap-2 lg:flex-none flex-1 justify-center lg:justify-start" onClick={() => setOpen(false)}>
            <span
              className={`font-display text-2xl tracking-wide transition-colors ${
                useDarkText ? "text-charcoal" : "text-white"
              }`}
            >
              M&apos;Couture
            </span>
            <span
              className={`hidden sm:inline font-body text-[10px] tracking-luxe uppercase transition-colors ${
                useDarkText ? "text-gold-dark" : "text-gold-light"
              }`}
            >
              Minky Narang
            </span>
          </Link>

          <ul className="hidden lg:flex items-center justify-center gap-9 flex-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative font-body text-[13px] tracking-widest uppercase transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                    } ${
                      useDarkText
                        ? "text-charcoal hover:text-gold-dark"
                        : "text-white hover:text-gold-light"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className={`hidden md:block ${useDarkText ? "text-charcoal" : "text-white"}`}>
              <CurrencySelector />
            </div>
            <Link 
              to={user ? "/account" : "/auth"}
              className={`p-2 transition-colors ${useDarkText ? "text-charcoal hover:text-gold-dark" : "text-white hover:text-gold-light"}`}
              aria-label="Account"
            >
              <User size={22} strokeWidth={1.5} />
            </Link>
            
            <button 
              onClick={() => setCartOpen(true)}
              className={`relative p-2 transition-colors ${useDarkText ? "text-charcoal hover:text-gold-dark" : "text-white hover:text-gold-light"}`}
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-dark text-[9px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-charcoal/98 backdrop-blur-sm lg:hidden pt-24 pb-8 overflow-y-auto"
          >
            <motion.ul
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                closed: {},
              }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-ivory hover:text-gold transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
