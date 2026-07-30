/**
 * Adds 3 Pre Wedding products from real Google Drive images.
 * Removes placeholder pre-wedding products first.
 *
 * Run: node scripts/addPreWedding.mjs
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

const IMAGE_IDS = [
  "1_3xwe9ts_m-p40Awy0JkYqvXo9cHqMp1",
  "10h_o2WWanLL0es-tkr17DfhdzxL3bjHd",
  "1vVkdXgaZph9EA1UAky9mZterdbBfonej",
];

const PRODUCTS = [
  {
    title: "Ethereal Pre-Wedding Gown",
    description: "A flowing, romantic gown designed specifically for pre-wedding photoshoots. The lightweight fabric catches the wind beautifully.",
    price: 35000,
    comparePrice: 42000,
    category: "Gowns",
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    sku: "MC-PW-001",
  },
  {
    title: "Dramatic Trail Lehenga",
    description: "A pre-wedding lehenga featuring a dramatic, sweeping trail for cinematic photography and unforgettable moments.",
    price: 48000,
    comparePrice: null,
    category: "Lehengas",
    sizes: ["Custom", "S", "M", "L"],
    featured: true,
    sku: "MC-PW-002",
  },
  {
    title: "Pastel Ombre Co-ord Set",
    description: "A contemporary pastel ombre co-ord set perfect for casual, intimate pre-wedding shoot concepts.",
    price: 22000,
    comparePrice: 28000,
    category: "Co-ord Sets",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    sku: "MC-PW-003",
  },
];


async function run() {
  console.log("\n🗑  Removing existing pre-wedding placeholder products...");
  const q = query(collection(db, "products"), where("collection", "==", "pre-wedding"));
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  console.log("\n🌱  Adding 3 Pre Wedding products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "pre-wedding",
      images: [driveImg(IMAGE_IDS[i])],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/3] ${product.title} (${ref.id})`);
  }

  console.log("\n✅  Done! 3 Pre Wedding products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
