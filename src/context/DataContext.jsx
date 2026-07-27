import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { collectionsMeta as defaultCollectionsMeta } from "../data/products";

const DataContext = createContext(null);

// ── Static defaults for site content ──────────────────────────────────
const defaultExhibitions = [];

const defaultHeroData = {
  subtitle: "Est. Panipat — House of Minky Narang",
  title: "M'Couture",
  tagline: "Luxury Women's Couture",
  image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
  ctaPrimary: { label: "Explore Collection", link: "/collections" },
  ctaSecondary: { label: "Book Consultation", link: "/contact" },
};

const defaultBestsellersData = {
  subtitle: "Signature Silhouettes",
  title: "Bestsellers",
};

const defaultBestsellerItems = [
  { id: "bs-1", title: "Ivory Silk Kurta Set", subtitle: "ready-to-wear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop", link: "/product/rtw-001" },
  { id: "bs-2", title: "Royal Red Bridal Lehenga", subtitle: "bridal-couture", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop", link: "/product/brd-001" },
  { id: "bs-3", title: "Powder Blue Lehenga", subtitle: "trousseau", image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop", link: "/product/trs-002" },
  { id: "bs-4", title: "Rose Gold Cocktail Gown", subtitle: "pre-wedding", image: "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop", link: "/product/pw-001" },
  { id: "bs-5", title: "Gold Tissue Saree", subtitle: "festive", image: "https://images.unsplash.com/photo-1610189844942-6c8c9d7c1a3b?q=80&w=1200&auto=format&fit=crop", link: "/product/fst-001" },
];

// ── Helper: read a singleton doc or return default ────────────────────
function useSingletonDoc(docPath, defaultValue) {
  const [state, setState] = useState(defaultValue);
  useEffect(() => {
    const ref = doc(db, docPath);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setState({ ...defaultValue, ...snap.data() });
    });
    return unsub;
  }, [docPath]); // eslint-disable-line
  return [state, setState];
}

// ── Provider ──────────────────────────────────────────────────────────
export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [collections, setCollections] = useState(defaultCollectionsMeta);
  const [heroData, setHeroData] = useSingletonDoc("siteContent/hero", defaultHeroData);
  const [bestsellersData, setBestsellersData] = useSingletonDoc("siteContent/bestsellers", defaultBestsellersData);
  const [bestsellerItems, setBestsellerItems] = useSingletonDoc("siteContent/bestsellerItems", { items: defaultBestsellerItems });
  const [loaded, setLoaded] = useState(false);

  // ── Real-time listeners ────────────────────────────────────────────
  useEffect(() => {
    // Products — ordered newest first
    const qProducts = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubProducts = onSnapshot(qProducts, (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // Orders — ordered newest first
    const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // Exhibitions
    const unsubExpos = onSnapshot(collection(db, "exhibitions"), (snap) => {
      setExhibitions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // Collections meta
    const unsubCollections = onSnapshot(collection(db, "collections"), (snap) => {
      if (!snap.empty) {
        const meta = {};
        snap.docs.forEach((d) => { meta[d.id] = d.data(); });
        setCollections(meta);
      }
    });

    setLoaded(true);

    return () => {
      unsubProducts();
      unsubOrders();
      unsubExpos();
      unsubCollections();
    };
  }, []);

  // ── Product CRUD ──────────────────────────────────────────────────
  const addProduct = useCallback(async (product) => {
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  }, []);

  const updateProduct = useCallback(async (id, updates) => {
    await updateDoc(doc(db, "products", id), updates);
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await deleteDoc(doc(db, "products", id));
  }, []);

  const toggleFeatured = useCallback(async (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      await updateDoc(doc(db, "products", id), { featured: !product.featured });
    }
  }, [products]);

  // ── Collection CRUD ───────────────────────────────────────────────
  const updateCollection = useCallback(async (slug, updates) => {
    await setDoc(doc(db, "collections", slug), updates, { merge: true });
  }, []);

  const addCollection = useCallback(async (slug, data) => {
    await setDoc(doc(db, "collections", slug), data);
  }, []);

  const deleteCollection = useCallback(async (slug) => {
    await deleteDoc(doc(db, "collections", slug));
  }, []);

  // ── Order CRUD ────────────────────────────────────────────────────
  const addOrder = useCallback(async (order) => {
    const ref = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    await updateDoc(doc(db, "orders", orderId), { status });
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
  }, []);

  // ── Exhibition CRUD ───────────────────────────────────────────────
  const addExhibition = useCallback(async (expo) => {
    const ref = await addDoc(collection(db, "exhibitions"), expo);
    return ref.id;
  }, []);

  const updateExhibition = useCallback(async (id, updates) => {
    await updateDoc(doc(db, "exhibitions", id), updates);
  }, []);

  const deleteExhibition = useCallback(async (id) => {
    await deleteDoc(doc(db, "exhibitions", id));
  }, []);

  // ── Bestseller Items CRUD ─────────────────────────────────────────
  const addBestsellerItem = useCallback(async (item) => {
    const current = bestsellerItems.items || [];
    const newItem = { ...item, id: "bs-" + Date.now() };
    await setDoc(doc(db, "siteContent", "bestsellerItems"), { items: [...current, newItem] });
    return newItem.id;
  }, [bestsellerItems]);

  const updateBestsellerItem = useCallback(async (id, updates) => {
    const current = bestsellerItems.items || [];
    const updated = current.map((i) => (i.id === id ? { ...i, ...updates } : i));
    await setDoc(doc(db, "siteContent", "bestsellerItems"), { items: updated });
  }, [bestsellerItems]);

  const deleteBestsellerItem = useCallback(async (id) => {
    const current = bestsellerItems.items || [];
    await setDoc(doc(db, "siteContent", "bestsellerItems"), { items: current.filter((i) => i.id !== id) });
  }, [bestsellerItems]);

  // ── Hero & Settings ───────────────────────────────────────────────
  const updateHero = useCallback(async (updates) => {
    await setDoc(doc(db, "siteContent", "hero"), updates, { merge: true });
  }, []);

  const updateBestsellersData = useCallback(async (updates) => {
    await setDoc(doc(db, "siteContent", "bestsellers"), updates, { merge: true });
  }, []);

  // ── Derived helpers ───────────────────────────────────────────────
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

  const resetAllData = useCallback(() => {
    console.warn("resetAllData is disabled in Firestore mode.");
  }, []);

  const value = {
    products, collections, orders, exhibitions,
    heroData, bestsellersData,
    bestsellerItems: bestsellerItems.items || defaultBestsellerItems,
    loaded,
    addProduct, updateProduct, deleteProduct, toggleFeatured,
    updateCollection, addCollection, deleteCollection,
    addOrder, updateOrderStatus, deleteOrder,
    addExhibition, updateExhibition, deleteExhibition,
    addBestsellerItem, updateBestsellerItem, deleteBestsellerItem,
    updateHero, updateBestsellersData,
    getProductsByCollection, getProductById, getFeaturedProducts,
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
