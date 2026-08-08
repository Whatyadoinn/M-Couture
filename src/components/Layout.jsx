import { useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import WhatsAppButton from "./WhatsAppButton";
import InstagramFloatingButton from "./InstagramFloatingButton";
import ScrollProgress from "./ScrollProgress";
import CartDrawer from "./CartDrawer";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Layout() {
  const location = useLocation();
  useScrollToTop();

  return (
    <div className="min-h-screen bg-ivory">
      <ScrollProgress />
      <Navbar />
      <CartDrawer />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <InstagramFloatingButton />
      <WhatsAppButton />
    </div>
  );
}
