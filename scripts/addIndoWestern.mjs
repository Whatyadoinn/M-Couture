/**
 * Adds 29 Indo Western products from real Google Drive images.
 * Removes the 3 placeholder indo-western products first.
 *
 * Run: node scripts/addIndoWestern.mjs
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

const driveImg = (id) => `https://lh3.googleusercontent.com/d/${id}`;

// 29 unique file IDs (duplicates + folder link removed)
const IMAGE_IDS = [
  "1cFgVxnBhxHY-6tEl483dE851Rvls0d_d",
  "1CxpR2jI6ZNyA_WxaUKIgknq_hDFt_IG-",
  "13GTG88ruDgBql34U3Je0qFfU7zGNDr6j",
  "1DBrYQH-YSrCGst9FHnEV_LMGZKfleVEO",
  "1QZu7nlIfr7PdQap-B03Uij1Py9wsYbKE",
  "1spS_9N4VJMNhCSQdyXc9a5jAebyYAmEM",
  "116MRAMzst7bIFzk3gIuM9CMgk6xytn9u",
  "10Idb33DfEwl3GFJoEgLdiVetDalXzCqA",
  "1AKVYjLh7LhBCLczfchY6vHaEp2eBXggS",
  "1J8eHjTWwKmi2KDSQOEz6WBw9W6_NqwFn",
  "1-dg0eCVIXyzhC_fV32d1mUZjGS9vQyEE",
  "1V18Xu8_UbzCbGICYQfFvgJWr8-TttDYt",
  "1IuMcdeuNW4trmnvzc1_Q2-PO9zAeTk5J",
  "1nQDiZwgXoDtz1sfvb8xP1LT4Rj0rIGQb",
  "1YSjklLBVsCD1bRligcsfo5DdRNn3vnJo",
  "1nEIrbX7IOF9zL61-L3VRZPBD506RgOSU",
  "1BBfccKPpKV2TpHap_pp2G9gkOvnr_5Lt",
  "1b5GDvfUxKKJVrfM5AqKQJvP3errsy8NV",
  "19RHZK2aWtZ121NVwtZEd5XVaWqFp9bzD",
  "1fGYKFkDQkiI6q4QDm2HzbMhjS9GOERFA",
  "1pYgP6BGCRWqWsEKRQQ2n9jOZ_0kxCoIw",
  "1zv7HdIHu9kze1bbmITZC33-C4x3zxz81",
  "1pq7QweS0r9M2FSp3l7mBBYWDQNY7qoSg",
  "11Evfe3YOnafQnqFy_Mbx1sGLBDHdj4_B",
  "1IAAFCbT6zp-vZCD0sSEMvRa8RyskfBLB",
  "1c7hwNA1cLnokoAhZIjhyNKHpukcNYXAY",
  "1PuLfGCPVtBCBZ0jKb9V_JoHLzwUCdnw0",
  "1QBJ489AMQ_IZhXLOUYmNxBA4fhxyv8bx",
  "1P1UH7XQafrCmWxDxy43W92HU1gbyuaoW",
];

const PRODUCTS = [
  { title: "Blush Cape Lehenga", description: "A modern cape draped over a flared embroidered lehenga — the perfect East-meets-West silhouette for the contemporary bride.", price: 68000, comparePrice: null, category: "Cape Sets", sizes: ["XS", "S", "M", "L"], featured: true, sku: "MC-IW-001" },
  { title: "Ivory Dhoti Pant Set", description: "A sleek ivory kurta paired with fluid dhoti pants and a minimal embroidered neckline. Effortlessly modern with a traditional soul.", price: 28000, comparePrice: 34000, category: "Dhoti Sets", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-002" },
  { title: "Midnight Dhoti Gown", description: "A statement midnight blue dhoti gown featuring an embellished bodice and a fluid draped skirt. Contemporary couture meets Indian sensibility.", price: 45000, comparePrice: 52000, category: "Gowns", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-003" },
  { title: "Champagne Pant Suit Set", description: "A luxurious champagne trouser suit with embroidered lapels and a kurta-inspired hem. From boardrooms to cocktail parties.", price: 32000, comparePrice: null, category: "Suits", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-004" },
  { title: "Rose Gold Asymmetric Kurta", description: "A rose gold asymmetric high-low kurta with one-shoulder drape, paired with fitted cigarette pants. A fresh reimagining of Indian eveningwear.", price: 35000, comparePrice: 42000, category: "Kurta Sets", sizes: ["XS", "S", "M", "L"], featured: true, sku: "MC-IW-005" },
  { title: "Teal Embroidered Co-ord Set", description: "A teal co-ord set featuring a cropped embroidered jacket and wide-leg trousers with folk-inspired thread work accents.", price: 38000, comparePrice: null, category: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-006" },
  { title: "Dusty Mauve Wrap Dress", description: "A dusty mauve wrap dress in soft georgette with printed Indian floral motifs and a contemporary western silhouette.", price: 22000, comparePrice: 26000, category: "Dresses", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-007" },
  { title: "Sage Green Jacket Lehenga", description: "A sage green embroidered long jacket worn over a flared lehenga skirt — a show-stopping fusion for sangeet and receptions.", price: 72000, comparePrice: null, category: "Jacket Sets", sizes: ["S", "M", "L", "XL"], featured: true, sku: "MC-IW-008" },
  { title: "Cobalt Blue Blazer Set", description: "A structured cobalt blue blazer with embroidered lapels, paired with a wide-leg palazzo and bustier. Fashion-forward festive dressing.", price: 44000, comparePrice: 50000, category: "Blazer Sets", sizes: ["XS", "S", "M", "L"], featured: false, sku: "MC-IW-009" },
  { title: "Ivory Bandhgala Suit", description: "A refined ivory Nehru-collar bandhgala suit set for women — tailored to perfection with subtle bead work on the collar and cuffs.", price: 40000, comparePrice: null, category: "Suits", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-010" },
  { title: "Terracotta Printed Sharara", description: "Rich terracotta block-printed fabric cut into a sharara silhouette with a modern peplum top. Tradition reimagined.", price: 26000, comparePrice: 31000, category: "Sharara Sets", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-011" },
  { title: "Lavender Off-Shoulder Lehenga", description: "An off-shoulder blouse paired with a voluminous lavender lehenga skirt — a Western bridal influence meets Indian grandeur.", price: 58000, comparePrice: null, category: "Lehengas", sizes: ["Custom", "S", "M", "L"], featured: true, sku: "MC-IW-012" },
  { title: "Black Sequin Dhoti Gown", description: "A head-to-toe sequin-embellished black dhoti gown with an open back. Drama, glamour, and couture all in one.", price: 62000, comparePrice: 70000, category: "Gowns", sizes: ["XS", "S", "M", "L"], featured: false, sku: "MC-IW-013" },
  { title: "Nude Embellished Mini Kurta", description: "A thigh-length nude embellished kurta with mirror work and sequins, styled over flared palazzo pants. Party-ready fusion wear.", price: 29000, comparePrice: null, category: "Kurta Sets", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-014" },
  { title: "Forest Green Corset Lehenga", description: "A structured corset blouse in forest green velvet paired with a layered embroidered lehenga — a bold fusion bridal statement.", price: 85000, comparePrice: null, category: "Lehengas", sizes: ["Custom", "S", "M", "L"], featured: true, sku: "MC-IW-015" },
  { title: "Mustard Crop Jacket Set", description: "A mustard embroidered crop jacket over a printed skirt — the perfect Indian-western fusion for mehendi and festive afternoons.", price: 34000, comparePrice: 40000, category: "Jacket Sets", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-016" },
  { title: "Peach Ruffled Anarkali Gown", description: "An anarkali silhouette with contemporary ruffled tiers and a western neckline in soft peach georgette. Feminine and timeless.", price: 42000, comparePrice: null, category: "Gowns", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-017" },
  { title: "Maroon Trench Kurta Set", description: "A long trench-style kurta in deep maroon with subtle embroidery, paired with wide-leg pants and a printed inner.", price: 36000, comparePrice: 43000, category: "Kurta Sets", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-018" },
  { title: "Powder Blue Crop Top Lehenga", description: "A modern crop top in powder blue with intricate embroidery, paired with a matching full lehenga skirt. Chic bridal-adjacent.", price: 64000, comparePrice: null, category: "Lehengas", sizes: ["Custom", "S", "M", "L"], featured: false, sku: "MC-IW-019" },
  { title: "Crimson Tuxedo Jumpsuit", description: "A bold crimson tuxedo-style jumpsuit with an Indian-embroidered collar and cuffs — where western tailoring meets desi detail.", price: 48000, comparePrice: 55000, category: "Jumpsuits", sizes: ["XS", "S", "M", "L"], featured: false, sku: "MC-IW-020" },
  { title: "Champagne Printed Maxi Dress", description: "A floor-length champagne maxi dress in crepe with hand block-printed floral motifs inspired by traditional Indian textiles.", price: 24000, comparePrice: 29000, category: "Dresses", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-021" },
  { title: "Emerald Embroidered Palazzo Set", description: "An emerald wide-leg palazzo set with a kurta featuring heavy zari embroidery — a regal indo-western ensemble for grand events.", price: 55000, comparePrice: null, category: "Palazzo Sets", sizes: ["S", "M", "L", "XL"], featured: true, sku: "MC-IW-022" },
  { title: "Ink Blue Cape Dress", description: "An ink blue midi dress with a sheer embroidered cape overlay — effortlessly sophisticated for cocktail parties and dinners.", price: 38000, comparePrice: 45000, category: "Dresses", sizes: ["XS", "S", "M", "L"], featured: false, sku: "MC-IW-023" },
  { title: "Gold Tissue Peplum Set", description: "A gold tissue peplum top with wide-leg trousers, embellished with hand-sewn sequins along the hem. Festival-ready luxury.", price: 46000, comparePrice: null, category: "Co-ord Sets", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-024" },
  { title: "Lilac Embroidered Shirt Dress", description: "A lilac shirt-style dress with allover floral embroidery and a belted waist — casual couture that transitions from day to night.", price: 28000, comparePrice: 34000, category: "Dresses", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-025" },
  { title: "Deep Red Structured Gown", description: "A deep red structured gown with a sweetheart neckline, fitted bodice, and a flared embroidered skirt. Grand occasion dressing.", price: 78000, comparePrice: null, category: "Gowns", sizes: ["XS", "S", "M", "L"], featured: true, sku: "MC-IW-026" },
  { title: "Beige Printed Jumpsuit", description: "An easy-breezy beige printed jumpsuit with subtle Indian paisley motifs — relaxed yet refined for daytime celebrations.", price: 18000, comparePrice: 22000, category: "Jumpsuits", sizes: ["XS", "S", "M", "L", "XL"], featured: false, sku: "MC-IW-027" },
  { title: "Coral Pleated Saree Gown", description: "A pre-stitched coral saree gown with modern pleating and a contemporary blouse — the ultimate fusion of tradition and trend.", price: 52000, comparePrice: 60000, category: "Saree Gowns", sizes: ["S", "M", "L", "XL"], featured: false, sku: "MC-IW-028" },
  { title: "Plum Velvet Blazer Skirt Set", description: "A plum velvet blazer paired with a high-slit embroidered skirt — bold, editorial, and effortlessly chic for evening soirées.", price: 56000, comparePrice: null, category: "Blazer Sets", sizes: ["XS", "S", "M", "L"], featured: false, sku: "MC-IW-029" },
];

async function run() {
  console.log("\n🗑  Removing existing indo-western placeholder products...");
  const q = query(collection(db, "products"), where("collection", "==", "indo-western"));
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  console.log("\n🌱  Adding 29 Indo Western products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "indo-western",
      images: [driveImg(IMAGE_IDS[i])],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/29] ${product.title} (${ref.id})`);
  }

  console.log("\n✅  Done! 29 Indo Western products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
