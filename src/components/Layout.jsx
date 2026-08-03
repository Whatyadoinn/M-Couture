import { useLocation, Outlet } from "react-router-dom";
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
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <InstagramFloatingButton />
      <WhatsAppButton />
    </div>
  );
}
