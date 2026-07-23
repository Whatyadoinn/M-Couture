import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { products as defaultProducts, collectionsMeta as defaultCollectionsMeta } from "../data/products";

const DataContext = createContext(null);

// Default exhibitions data
const defaultExhibitions = [
  {
    id: "expo-1",
    title: "Bridal Asia Couture Week",
    date: "October 12-14, 2026",
    location: "Taj Palace, New Delhi",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "expo-2",
    title: "The Wedding Symphony",
    date: "August 5-7, 2026",
    location: "Jio World Convention Centre, Mumbai",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "expo-3",
    title: "M'Couture Exclusive Showcase",
    date: "April 20-22, 2026",
    location: "Atelier Panipat, Haryana",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
  },
];

// Default hero data
const defaultHeroData = {
  subtitle: "Est. Panipat \u2014 House of Minky Narang",
  title: "M\u2019Couture",
  tagline: "Luxury Women\u2019s Couture",
  image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
  ctaPrimary: { label: "Explore Collection", link: "/collections" },
  ctaSecondary: { label: "Book Consultation", link: "/contact" },
};

// Default bestsellers data
const defaultBestsellersData = {
  subtitle: "Signature Silhouettes",
  title: "Bestsellers",
};

// Default bestseller items for the carousel
const defaultBestsellerItems = [
  {
    id: "bs-1",
    title: "Ivory Silk Kurta Set",
    subtitle: "ready-to-wear",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    link: "/product/rtw-001"
  },
  {
    id: "bs-2",
    title: "Royal Red Bridal Lehenga",
    subtitle: "bridal-couture",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
    link: "/product/brd-001"
  },
  {
    id: "bs-3",
    title: "Powder Blue Lehenga",
    subtitle: "trousseau",
    image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop",
    link: "/product/trs-002"
  },
  {
    id: "bs-4",
    title: "Rose Gold Cocktail Gown",
    subtitle: "pre-wedding",
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop",
    link: "/product/pw-001"
  },
  {
    id: "bs-5",
    title: "Gold Tissue Saree",
    subtitle: "festive",
    image: "https://images.unsplash.com/photo-1610189844942-6c8c9d7c1a3b?q=80&w=1200&auto=format&fit=crop",
    link: "/product/fst-001"
  }
];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key}`, e);
  }
}

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState({});
  const [orders, setOrders] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [heroData, setHeroData] = useState(defaultHeroData);
  const [bestsellersData, setBestsellersData] = useState(defaultBestsellersData);
  const [bestsellerItems, setBestsellerItems] = useState(defaultBestsellerItems);
  const [loaded, setLoaded] = useState(false);

  // Load everything on mount
  useEffect(() => {
    fetch("https://m-couture.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
    setCollections(loadJSON("mc_collections", defaultCollectionsMeta));
    setOrders(loadJSON("mock_orders", []));
    setExhibitions(loadJSON("mc_exhibitions", defaultExhibitions));
    setHeroData(loadJSON("mc_hero", defaultHeroData));
    setBestsellersData(loadJSON("mc_bestsellers", defaultBestsellersData));
    setBestsellerItems(loadJSON("mc_bestseller_items", defaultBestsellerItems));
    setLoaded(true);
  }, []);

  // Auto-persist on changes
  useEffect(() => { if (loaded) saveJSON("mc_collections", collections); }, [collections, loaded]);
  useEffect(() => { if (loaded) saveJSON("mock_orders", orders); }, [orders, loaded]);
  useEffect(() => { if (loaded) saveJSON("mc_exhibitions", exhibitions); }, [exhibitions, loaded]);
  useEffect(() => { if (loaded) saveJSON("mc_hero", heroData); }, [heroData, loaded]);
  useEffect(() => { if (loaded) saveJSON("mc_bestsellers", bestsellersData); }, [bestsellersData, loaded]);
  useEffect(() => { if (loaded) saveJSON("mc_bestseller_items", bestsellerItems); }, [bestsellerItems, loaded]);

  // ── Product CRUD ──
const addProduct = useCallback((product) => {
  fetch("https://m-couture.onrender.com/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((newProduct) => {
      setProducts((prev) => [newProduct, ...prev]);
    })
    .catch((err) => console.error("Failed to add product:", err));
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFeatured = useCallback((id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  }, []);

  // ── Collection CRUD ──
  const updateCollection = useCallback((slug, updates) => {
    setCollections((prev) => ({ ...prev, [slug]: { ...prev[slug], ...updates } }));
  }, []);

  const addCollection = useCallback((slug, data) => {
    setCollections((prev) => ({ ...prev, [slug]: data }));
  }, []);

  const deleteCollection = useCallback((slug) => {
    setCollections((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }, []);

  // ── Order CRUD ──
  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  }, []);

  const deleteOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  }, []);

  // ── Exhibition CRUD ──
  const addExhibition = useCallback((expo) => {
    const id = "expo-" + Date.now();
    setExhibitions((prev) => [...prev, { ...expo, id }]);
    return id;
  }, []);

  const updateExhibition = useCallback((id, updates) => {
    setExhibitions((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteExhibition = useCallback((id) => {
    setExhibitions((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ── Bestseller Items CRUD ──
  const addBestsellerItem = useCallback((item) => {
    const id = "bs-" + Date.now();
    setBestsellerItems((prev) => [...prev, { ...item, id }]);
    return id;
  }, []);

  const updateBestsellerItem = useCallback((id, updates) => {
    setBestsellerItems((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteBestsellerItem = useCallback((id) => {
    setBestsellerItems((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ── Hero & Settings ──
  const updateHero = useCallback((updates) => {
    setHeroData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateBestsellersData = useCallback((updates) => {
    setBestsellersData((prev) => ({ ...prev, ...updates }));
  }, []);

  // ── Derived helpers ──
  const getProductsByCollection = useCallback(
    (slug) => products.filter((p) => p.collection === slug),
    [products]
  );

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id) || null,
    [products]
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  // Reset all data back to defaults
  const resetAllData = useCallback(() => {
    setProducts(defaultProducts);
    setCollections(defaultCollectionsMeta);
    setOrders([]);
    setExhibitions(defaultExhibitions);
    setHeroData(defaultHeroData);
    setBestsellersData(defaultBestsellersData);
    setBestsellerItems(defaultBestsellerItems);
  }, []);

  const value = {
    // State
    products, collections, orders, exhibitions, heroData, bestsellersData, bestsellerItems, loaded,
    // Product
    addProduct, updateProduct, deleteProduct, toggleFeatured,
    // Collection
    updateCollection, addCollection, deleteCollection,
    // Order
    addOrder, updateOrderStatus, deleteOrder,
    // Exhibition
    addExhibition, updateExhibition, deleteExhibition,
    // Bestseller Items
    addBestsellerItem, updateBestsellerItem, deleteBestsellerItem,
    // Site Content Settings
    updateHero, updateBestsellersData,
    // Helpers
    getProductsByCollection, getProductById, getFeaturedProducts,
    // Utilities
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
