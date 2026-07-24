import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CustomCouture from "./pages/CustomCouture";
import Bridal from "./pages/Bridal";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProductPage from "./pages/ProductPage";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataProvider>
    <AuthProvider>
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
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </DataProvider>
  );
}
