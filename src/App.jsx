import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";

// ── Lazy-loaded routes (each gets its own JS chunk) ──────────────────
const Home                = lazy(() => import("./pages/Home"));
const Collections         = lazy(() => import("./pages/Collections"));
const CollectionDetailPage = lazy(() => import("./pages/CollectionDetailPage"));
const ProductPage         = lazy(() => import("./pages/ProductPage"));
const CustomCouture       = lazy(() => import("./pages/CustomCouture"));
const Bridal              = lazy(() => import("./pages/Bridal"));
const GalleryPage         = lazy(() => import("./pages/GalleryPage"));
const AboutPage           = lazy(() => import("./pages/AboutPage"));
const ContactPage         = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy       = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions     = lazy(() => import("./pages/TermsConditions"));
const AuthPage            = lazy(() => import("./pages/AuthPage"));
const AccountPage         = lazy(() => import("./pages/AccountPage"));
const AdminDashboard      = lazy(() => import("./pages/AdminDashboard"));
const CartPage            = lazy(() => import("./pages/CartPage"));
const CheckoutPage        = lazy(() => import("./pages/CheckoutPage"));
const OrderConfirmation   = lazy(() => import("./pages/OrderConfirmation"));
const NotFound            = lazy(() => import("./pages/NotFound"));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 500ms is enough for the brand animation — don't make users wait longer
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataProvider>
    <AuthProvider>
      <CurrencyProvider>
      <CartProvider>
        <LoadingScreen visible={loading} />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2B2B2B',
              color: '#fff',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '13px',
              borderRadius: '0',
            },
            success: {
              iconTheme: { primary: '#C8A96A', secondary: '#2B2B2B' },
            },
          }}
        />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:slug" element={<CollectionDetailPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/custom-couture" element={<CustomCouture />} />
                <Route path="/bridal" element={<Bridal />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                <Route path="/auth" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />
                
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/order-confirmation/:id" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
    </DataProvider>
  );
}
