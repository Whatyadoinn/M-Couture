/**
 * Adds 18 Hand Embroidery products from real Google Drive images.
 * Removes the 3 placeholder hand-embroidery products first.
 *
 * Run: node scripts/addHandEmbroidery.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE43pcjpK1Iy31CJOKX0hTcm_BYdeAZDg",
  authDomain: "mcouture-916c2.firebaseapp.com",
  projectId: "mcouture-916c2",
  storageBucket: "mcouture-916c2.firebasestorage.app",
  messagingSenderId: "163878171128",
  appId: "1:163878171128:web:b7aeb711b2d73f97ea",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Convert Drive share link → direct embeddable image URL
const driveImg = (id) => `https://lh3.googleusercontent.com/d/${id}`;

// 18 unique file IDs from the shared links (duplicates removed)
const IMAGE_IDS = [
  "12eXYnOUicq6m3E2t5ZITHcaVX3AX-vFP",
  "1wiymDcWM91e0lvgS7kjOVaofY5G8E5MY",
  "1TXVKfgKlVPNPv1a83HHYasjZU_NR02dK",
  "19b0E-JUXim9dWZMzGDBNmwqbeKi3u4ZZ",
  "1ZWzLyYJc_sUslSMCK5h0sTvCz0jd_fQq",
  "1KS2scHoEdI43Qp0rpI2Q34P6EmPgCgcz",
  "1Wg18IxORFrglQ0pancShwNBSm2aOYrfk",
  "1qYJdFg71CqsWTQlcv-Is3Eh3T3RXkJFA",
  "1ft4JPxpsulK4pOAFpER9VKM-ZyGGl837",
  "1zJjOGgZbevePbpDLTM0Py2rCRw4yh6-3",
  "1kcP4-xxDjIkD84-NaHmyIclPGJWlsY4j",
  "1y77z8PQzZLaLg2ekTQktcC8BMLXFHB7N",
  "1zF-gI3-8P7ZRzrfATbw_38Y4_ciEgX06",
  "119e7LZG5xTp54zjYoN_zA79m4wHZZBYi",
  "1b32WuA-2EEXMx-gkBQ2UzkYE_cm-W_vm",
  "1E8bzu_lRTuXlNK7NxVvdStXX2zjqKtkI",
  "1-R7bs_GjGHyA5iM2sJunyjFlcQapM0ZD",
  "1NiC5Bc3N01q2_w9kuLJLcNTOW3aj1rZN",
];

// 18 Hand Embroidery products — one image per product
const PRODUCTS = [
  {
    title: "Ivory Zardozi Anarkali",
    description: "A regal ivory anarkali adorned with hand-embroidered zardozi work in 24k gold threads. Crafted by master artisans, this piece embodies generations of couture heritage.",
    price: 85000,
    comparePrice: null,
    category: "Anarkalis",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    sku: "MC-HE-001",
  },
  {
    title: "Crimson Phulkari Suit",
    description: "A stunning crimson suit featuring traditional Punjabi phulkari embroidery across the dupatta and yoke, handcrafted with vibrant silk threads.",
    price: 52000,
    comparePrice: 60000,
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    sku: "MC-HE-002",
  },
  {
    title: "Sage Green Chikankari Kurta",
    description: "Delicate Lucknowi chikankari embroidery on soft sage green muslin. A timeless piece perfect for intimate gatherings and festive evenings.",
    price: 28000,
    comparePrice: 33000,
    category: "Kurtas",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
    sku: "MC-HE-003",
  },
  {
    title: "Royal Blue Aari Work Lehenga",
    description: "A breathtaking royal blue lehenga featuring intricate aari embroidery with floral motifs. Each stitch placed by hand for over 300 hours.",
    price: 120000,
    comparePrice: null,
    category: "Lehengas",
    sizes: ["Custom", "S", "M", "L"],
    featured: true,
    sku: "MC-HE-004",
  },
  {
    title: "Pastel Pink Mukaish Saree",
    description: "A gossamer pastel pink georgette saree adorned with mukaish — tiny metal inserts stitched by hand into the fabric, creating a subtle starlit shimmer.",
    price: 45000,
    comparePrice: 52000,
    category: "Sarees",
    sizes: ["Free Size"],
    featured: false,
    sku: "MC-HE-005",
  },
  {
    title: "Emerald Kashmiri Embroidered Suit",
    description: "A gorgeous emerald suit with hand-embroidered Kashmiri sozni work depicting the iconic chinar leaf. A wearable piece of cultural artistry.",
    price: 68000,
    comparePrice: null,
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-006",
  },
  {
    title: "Champagne Gota Patti Sharara",
    description: "A champagne sharara set encrusted with gota patti — hand-applied gold and silver ribbonwork — giving every movement a luminous, festive glow.",
    price: 58000,
    comparePrice: 65000,
    category: "Sharara Sets",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    sku: "MC-HE-007",
  },
  {
    title: "Deep Red Mirror Work Anarkali",
    description: "A stunning deep red anarkali featuring hand-sewn shisha mirror work across the bodice and hem. Light dances off every mirror, making an entrance unforgettable.",
    price: 72000,
    comparePrice: null,
    category: "Anarkalis",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-008",
  },
  {
    title: "Off-White Kantha Embroidered Kurta",
    description: "Running stitch kantha embroidery in vibrant thread colours on pure off-white cotton — a Bengali craft tradition reimagined for the modern wardrobe.",
    price: 22000,
    comparePrice: 26000,
    category: "Kurtas",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
    sku: "MC-HE-009",
  },
  {
    title: "Teal Resham Thread Work Lehenga",
    description: "A vivid teal lehenga with dense resham thread embroidery in geometric patterns. A celebration of colour and craft that demands to be noticed.",
    price: 95000,
    comparePrice: null,
    category: "Lehengas",
    sizes: ["Custom", "S", "M", "L"],
    featured: true,
    sku: "MC-HE-010",
  },
  {
    title: "Lavender Sequin Embroidered Gown",
    description: "A floor-length lavender gown with scattered hand-stitched sequin embroidery, creating a constellation effect across the entire silhouette.",
    price: 55000,
    comparePrice: 62000,
    category: "Gowns",
    sizes: ["XS", "S", "M", "L"],
    featured: false,
    sku: "MC-HE-011",
  },
  {
    title: "Dusty Rose Cutwork Suit",
    description: "A refined dusty rose suit with delicate cutwork broderie anglaise panels on the sleeves and dupatta. Elegant, airy, and effortlessly sophisticated.",
    price: 38000,
    comparePrice: null,
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-012",
  },
  {
    title: "Gold Dabka Wire Work Kurta",
    description: "A statement gold kurta embellished with dabka — thick wire embroidery — creating bold, sculptural motifs across the yoke and cuffs.",
    price: 42000,
    comparePrice: 48000,
    category: "Kurtas",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-013",
  },
  {
    title: "Maroon Nakshi Kantha Saree",
    description: "A richly maroon silk saree featuring nakshi kantha — intricate narrative embroidery telling tales of nature and mythology in colourful threads.",
    price: 78000,
    comparePrice: null,
    category: "Sarees",
    sizes: ["Free Size"],
    featured: true,
    sku: "MC-HE-014",
  },
  {
    title: "Coral Badla Work Dupatta Set",
    description: "A vibrant coral kurta set paired with a heavy badla work dupatta — silver and gold wire woven by hand into an intricate all-over pattern.",
    price: 48000,
    comparePrice: 56000,
    category: "Dupatta Sets",
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-015",
  },
  {
    title: "Navy Blue Tilla Work Shawl Suit",
    description: "A prestigious navy blue suit with traditional Kashmiri tilla embroidery — fine gold and silver threads creating elaborate floral patterns by hand.",
    price: 88000,
    comparePrice: null,
    category: "Suits",
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-016",
  },
  {
    title: "Peach Brocade & Hand Embroidery Lehenga",
    description: "A luxurious peach lehenga combining woven brocade fabric with additional hand-embroidered zardozi accents — a marriage of loom and needle artistry.",
    price: 108000,
    comparePrice: null,
    category: "Lehengas",
    sizes: ["Custom", "S", "M", "L"],
    featured: true,
    sku: "MC-HE-017",
  },
  {
    title: "Olive Green Appliqué Work Anarkali",
    description: "A striking olive green anarkali with hand-cut fabric appliqué and detailed stem-stitch borders. Each panel is a miniature work of textile art.",
    price: 62000,
    comparePrice: 72000,
    category: "Anarkalis",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    sku: "MC-HE-018",
  },
];

async function run() {
  // 1. Delete existing hand-embroidery placeholder products
  console.log("\n🗑  Removing existing hand-embroidery placeholder products...");
  const q = query(
    collection(db, "products"),
    where("collection", "==", "hand-embroidery")
  );
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  // 2. Add 18 new products with real Drive images
  console.log("\n🌱  Adding 18 Hand Embroidery products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const imageId = IMAGE_IDS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "hand-embroidery",
      images: [driveImg(imageId)],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/18] ${product.title}`);
    console.log(`         Image: ${driveImg(imageId)}`);
    console.log(`         Doc:   ${ref.id}`);
  }

  console.log("\n✅  Done! 18 Hand Embroidery products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
