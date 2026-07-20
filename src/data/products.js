// Extended product catalogue with prices, sizes, and collections.
// Images use free Unsplash URLs. In the admin dashboard, these can be
// replaced with any URL (Cloudinary, ImgBB, or your own hosting).

export const products = [
  // ── Ready-to-Wear ─────────────────────────────────────────────────
  {
    id: "rtw-001",
    title: "Ivory Silk Kurta Set",
    description: "A flowing ivory silk kurta paired with palazzo pants and a delicate dupatta. Perfect for daytime celebrations and intimate gatherings.",
    price: 18500,
    comparePrice: 22000,
    collection: "ready-to-wear",
    category: "Kurta Sets",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-RTW-001",
  },
  {
    id: "rtw-002",
    title: "Blush Anarkali Gown",
    description: "An ethereal blush pink anarkali with mirror work detailing and a flowing silhouette that moves with grace.",
    price: 24500,
    comparePrice: null,
    collection: "ready-to-wear",
    category: "Anarkalis",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    inStock: true,
    sku: "MC-RTW-002",
  },
  {
    id: "rtw-003",
    title: "Champagne Palazzo Set",
    description: "Champagne-toned palazzo set in georgette with subtle gold thread work along the neckline and cuffs.",
    price: 15900,
    comparePrice: 19000,
    collection: "ready-to-wear",
    category: "Palazzo Sets",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    inStock: true,
    sku: "MC-RTW-003",
  },

  // ── Bridal Couture ────────────────────────────────────────────────
  {
    id: "brd-001",
    title: "Royal Red Bridal Lehenga",
    description: "A show-stopping deep red lehenga with hand-embroidered zardozi work, paired with a matching blouse and heavy dupatta. Over 800 hours of craftsmanship.",
    price: 245000,
    comparePrice: null,
    collection: "bridal-couture",
    category: "Bridal Lehengas",
    sizes: ["Custom"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-BRD-001",
  },
  {
    id: "brd-002",
    title: "Pastel Peach Bridal Set",
    description: "Contemporary bridal set in soft peach with crystal and pearl embellishments, perfect for the modern bride.",
    price: 185000,
    comparePrice: null,
    collection: "bridal-couture",
    category: "Bridal Lehengas",
    sizes: ["Custom"],
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-BRD-002",
  },

  // ── Trousseau ─────────────────────────────────────────────────────
  {
    id: "trs-001",
    title: "Emerald Sharara Set",
    description: "A regal emerald sharara set with intricate gold gota patti work — a trousseau essential for mehndi and sangeet.",
    price: 42000,
    comparePrice: 48000,
    collection: "trousseau",
    category: "Sharara Sets",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    inStock: true,
    sku: "MC-TRS-001",
  },
  {
    id: "trs-002",
    title: "Powder Blue Lehenga",
    description: "A dreamy powder blue lehenga with delicate threadwork, perfect for reception ceremonies.",
    price: 56000,
    comparePrice: null,
    collection: "trousseau",
    category: "Lehengas",
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-TRS-002",
  },

  // ── Pre-Wedding ───────────────────────────────────────────────────
  {
    id: "pw-001",
    title: "Rose Gold Cocktail Gown",
    description: "A stunning rose gold cocktail gown with sequin detailing and a dramatic trail — perfect for engagement parties.",
    price: 35000,
    comparePrice: 42000,
    collection: "pre-wedding",
    category: "Cocktail Gowns",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-PW-001",
  },

  // ── Maternity ─────────────────────────────────────────────────────
  {
    id: "mat-001",
    title: "Lavender Maternity Anarkali",
    description: "A comfortable yet elegant lavender anarkali designed with extra room and soft fabric for expecting mothers.",
    price: 16500,
    comparePrice: null,
    collection: "maternity",
    category: "Maternity Wear",
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    inStock: true,
    sku: "MC-MAT-001",
  },

  // ── Festive Wear ──────────────────────────────────────────────────
  {
    id: "fst-001",
    title: "Gold Tissue Saree",
    description: "A luxurious gold tissue saree with hand-embroidered borders — the ultimate festive statement piece.",
    price: 38000,
    comparePrice: 45000,
    collection: "festive",
    category: "Sarees",
    sizes: ["Free Size"],
    images: [
      "https://images.unsplash.com/photo-1610189844942-6c8c9d7c1a3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop",
    ],
    featured: true,
    inStock: true,
    sku: "MC-FST-001",
  },
  {
    id: "fst-002",
    title: "Midnight Blue Velvet Lehenga",
    description: "Rich midnight blue velvet lehenga with crystal embellishments, designed for grand festive celebrations.",
    price: 65000,
    comparePrice: null,
    collection: "festive",
    category: "Lehengas",
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    inStock: true,
    sku: "MC-FST-002",
  },
];

// Collection metadata (enhanced from original siteData)
export const collectionsMeta = {
  "ready-to-wear": {
    title: "Ready-to-Wear",
    description: "Effortless silhouettes tailored for the modern woman's everyday elegance.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  "bridal-couture": {
    title: "Bridal Couture",
    description: "Hand-embroidered bridal ensembles crafted for your most cherished day.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
  },
  trousseau: {
    title: "Trousseau Collection",
    description: "A curated wardrobe of heirloom pieces for every wedding ceremony.",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop",
  },
  "pre-wedding": {
    title: "Pre-Wedding Looks",
    description: "Romantic, editorial outfits designed for engagements and photo stories.",
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop",
  },
  maternity: {
    title: "Maternity Collection",
    description: "Graceful, comfortable couture that celebrates this beautiful chapter.",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop",
  },
  festive: {
    title: "Festive Wear",
    description: "Opulent fabrics and rich detailing for celebrations that call for splendour.",
    image: "https://images.unsplash.com/photo-1610189844942-6c8c9d7c1a3b?q=80&w=1200&auto=format&fit=crop",
  },
};

/**
 * Get all products for a given collection slug.
 */
export function getProductsByCollection(collectionSlug) {
  return products.filter((p) => p.collection === collectionSlug);
}

/**
 * Get a single product by id.
 */
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

/**
 * Get featured products.
 */
export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
