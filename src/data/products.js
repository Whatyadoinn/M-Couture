// Product catalogue aligned to the 6 M'Couture collections.
// Images are placeholder Unsplash URLs — replace via Admin Dashboard
// once real Drive images are shared.

export const products = [
  // ── Hand Embroidery ───────────────────────────────────────────────
  {
    id: "he-001",
    title: "Ivory Zardozi Anarkali",
    description: "A regal ivory anarkali adorned with intricate hand-embroidered zardozi work. Over 400 hours of craftsmanship by master artisans in our Panipat atelier.",
    price: 85000,
    comparePrice: null,
    collection: "hand-embroidery",
    category: "Anarkalis",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-HE-001",
  },
  {
    id: "he-002",
    title: "Crimson Phulkari Suit",
    description: "A stunning crimson suit featuring traditional Punjabi phulkari embroidery across the dupatta and yoke, handcrafted with vibrant silk threads.",
    price: 52000,
    comparePrice: 60000,
    collection: "hand-embroidery",
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-HE-002",
  },
  {
    id: "he-003",
    title: "Sage Green Chikankari Kurta",
    description: "Delicate Lucknowi chikankari embroidery on soft sage green muslin. A timeless piece perfect for intimate gatherings and festive evenings.",
    price: 28000,
    comparePrice: 33000,
    collection: "hand-embroidery",
    category: "Kurtas",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-HE-003",
  },

  // ── Indo Western ──────────────────────────────────────────────────
  {
    id: "iw-001",
    title: "Blush Cape Lehenga",
    description: "A modern take on couture — a draped cape top paired with a flared embroidered lehenga. The perfect blend of East and West for the contemporary bride.",
    price: 68000,
    comparePrice: null,
    collection: "indo-western",
    category: "Cape Sets",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-IW-001",
  },
  {
    id: "iw-002",
    title: "Midnight Dhoti Gown",
    description: "A statement midnight blue dhoti gown featuring an embellished bodice and a fluid draped skirt. Contemporary couture meets Indian sensibility.",
    price: 45000,
    comparePrice: 52000,
    collection: "indo-western",
    category: "Gowns",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-IW-002",
  },
  {
    id: "iw-003",
    title: "Champagne Pant Suit Set",
    description: "A luxurious champagne trouser suit with embroidered lapels and a kurta-inspired hem. From boardrooms to cocktail parties.",
    price: 32000,
    comparePrice: null,
    collection: "indo-western",
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-IW-003",
  },

  // ── Kids ──────────────────────────────────────────────────────────
  {
    id: "kd-001",
    title: "Peach Mini Lehenga",
    description: "An adorable peach lehenga choli for little girls, with delicate gota work and a matching dupatta. Perfect for festivals and family celebrations.",
    price: 12500,
    comparePrice: 15000,
    collection: "kids",
    category: "Lehengas",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-KD-001",
  },
  {
    id: "kd-002",
    title: "Royal Blue Sherwani Set",
    description: "A charming royal blue sherwani with matching pyjama for young boys, adorned with subtle gold embroidery. A miniature masterpiece.",
    price: 9800,
    comparePrice: 12000,
    collection: "kids",
    category: "Sherwani",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-KD-002",
  },

  // ── Pre Wedding ───────────────────────────────────────────────────
  {
    id: "pw-001",
    title: "Rose Gold Cocktail Gown",
    description: "A stunning rose gold cocktail gown with sequin detailing and a dramatic trail — perfect for engagement parties and Mehendi nights.",
    price: 35000,
    comparePrice: 42000,
    collection: "pre-wedding",
    category: "Cocktail Gowns",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-PW-001",
  },
  {
    id: "pw-002",
    title: "Lavender Sharara Set",
    description: "A dreamy lavender sharara set with mirror embellishments and a sheer organza dupatta — effortlessly romantic for a Sangeet ceremony.",
    price: 42000,
    comparePrice: null,
    collection: "pre-wedding",
    category: "Sharara Sets",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-PW-002",
  },

  // ── Traditional ───────────────────────────────────────────────────
  {
    id: "tr-001",
    title: "Royal Red Bridal Lehenga",
    description: "A show-stopping deep red lehenga with hand-embroidered zardozi work, paired with a matching blouse and heavy dupatta. A bridal treasure.",
    price: 245000,
    comparePrice: null,
    collection: "traditional",
    category: "Bridal Lehengas",
    sizes: ["Custom"],
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-TR-001",
  },
  {
    id: "tr-002",
    title: "Gold Tissue Saree",
    description: "A luxurious gold tissue saree with hand-embroidered borders — the ultimate traditional statement piece for festivals and weddings.",
    price: 38000,
    comparePrice: 45000,
    collection: "traditional",
    category: "Sarees",
    sizes: ["Free Size"],
    images: ["https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-TR-002",
  },
  {
    id: "tr-003",
    title: "Emerald Sharara Set",
    description: "A regal emerald sharara set with intricate gold gota patti work — a trousseau essential for Mehndi and Sangeet ceremonies.",
    price: 42000,
    comparePrice: 48000,
    collection: "traditional",
    category: "Sharara Sets",
    sizes: ["S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-TR-003",
  },

  // ── Western ───────────────────────────────────────────────────────
  {
    id: "wt-001",
    title: "Ivory Linen Co-ord Set",
    description: "A sleek ivory linen co-ordinate set with tailored trousers and a relaxed blazer. Minimalist luxury for the modern woman.",
    price: 18500,
    comparePrice: 22000,
    collection: "western",
    category: "Co-ord Sets",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"],
    featured: true,
    inStock: true,
    sku: "MC-WT-001",
  },
  {
    id: "wt-002",
    title: "Black Bodycon Gown",
    description: "A figure-hugging black crepe gown with a deep V-neckline and subtle crystal embellishments. The ultimate cocktail statement.",
    price: 24000,
    comparePrice: null,
    collection: "western",
    category: "Gowns",
    sizes: ["XS", "S", "M", "L"],
    images: ["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1200&auto=format&fit=crop"],
    featured: false,
    inStock: true,
    sku: "MC-WT-002",
  },
];

// Collection metadata aligned to the 6 Drive folders
export const collectionsMeta = {
  "hand-embroidery": {
    title: "Hand Embroidery",
    description: "Masterfully handcrafted pieces featuring zardozi, phulkari, chikankari and more — each stitch a labour of love.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
  },
  "indo-western": {
    title: "Indo Western",
    description: "A beautiful confluence of modern silhouettes and traditional Indian craft — for the woman who lives between two worlds.",
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1200&auto=format&fit=crop",
  },
  kids: {
    title: "Kids",
    description: "Miniature masterpieces of couture, designed so your little ones can celebrate in style.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
  },
  "pre-wedding": {
    title: "Pre Wedding",
    description: "Romantic, editorial looks for Mehendi, Sangeet, engagement soirées and everything in between.",
    image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1200&auto=format&fit=crop",
  },
  traditional: {
    title: "Traditional",
    description: "Heirloom-quality lehengas, sarees and suits that honour the richness of Indian textile heritage.",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
  },
  western: {
    title: "Western",
    description: "Clean lines, luxurious fabrics and effortless silhouettes — contemporary couture for the global woman.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
};

export function getProductsByCollection(collectionSlug) {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
