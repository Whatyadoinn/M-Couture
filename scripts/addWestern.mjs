/**
 * Adds 22 Western products from real Google Drive images.
 * Removes placeholder western products first.
 *
 * Run: node scripts/addWestern.mjs
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
  "1G1X8NtpjRy91Qv8NnUAqpVVOeWx7QSzX",
  "1zpifhlFgCJBW6OHXmq_txLo1zbqZxuMo",
  "10pslL7SGOaf0ScvGmhaPfx9248l5C6FD",
  "1o2X0IrrnOSbiASfGVnnqrFpSVK-OfTQ2",
  "1nUZ2qfPubNCPfAxkKkxDvqUM_Zswpoi1",
  "17DG9O4GcireUD4pnN-fPdYIWMLUUiNT7",
  "1Y8jMh1caVvcgZQLMo-Cz9ww6raYXhkfu",
  "1v1F3Y-xYvmz7WDOmp9BHAhM4kl1R9QmM",
  "1ICp3SKcwokED0eX-kmdPZwJVCA_Mn0QX",
  "1G9YX6TYmmVHCrQUj04E9lUAuSQr72JG3",
  "1lk_A4NM65IeTpEMtFpVlL9FFczNHWURC",
  "1p0W-Ga7C6mgt2_VFux0X3JRbXAk_OTAU",
  "1PfQjn5Vn8v5xFvwWg3xoNVUKf_8K8Yn3",
  "1Gq_6vyuvnew4C8rAMfDLPdYqi1Q1P5Fd",
  "1prK2494M1PmotqOmkszsAtY4-mx19p3r",
  "1ArwKn9T1wrcpAbuMq9EsB0P6GH46DIVg",
  "164bs3BI7n0qtbvrAN9pw88IpOQERe1Ah",
  "1KErDV5r9Tft43RK0iPreTm7iqqjkbY_V",
  "1axQDKIU2vyhzmEsWdzwWkE1YraKf8kNI",
  "18GENtOIVMM71T4nTQM7FD-ToDFqluWak",
  "1CVDjzp3p6IiwTXZ65yA8jCYGY0Q1pDrt",
  "1ZS3TB64w7loYz76iQ2rTEkya_Iw08BUi",
];

const PRODUCTS = Array.from({ length: 22 }, (_, i) => ({
  title: `Western Elegance ${i + 1}`,
  description: "A chic western silhouette tailored to perfection, blending modern design with luxurious fabrics.",
  price: 25000 + (i * 800), // Variable pricing
  comparePrice: null,
  category: i % 2 === 0 ? "Gowns" : "Dresses",
  sizes: ["XS", "S", "M", "L"],
  featured: i < 3,
  sku: `MC-WST-${String(i + 1).padStart(3, '0')}`,
}));

async function run() {
  console.log("\n🗑  Removing existing western placeholder products...");
  const q = query(collection(db, "products"), where("collection", "==", "western"));
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  console.log("\n🌱  Adding 22 Western products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "western",
      images: [driveImg(IMAGE_IDS[i])],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/22] ${product.title} (${ref.id})`);
  }

  console.log("\n✅  Done! 22 Western products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
