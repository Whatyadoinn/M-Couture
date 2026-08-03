/**
 * Adds 33 Traditional products from real Google Drive images.
 * Removes placeholder traditional products first.
 *
 * Run: node scripts/addTraditional.mjs
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
  "10y4EHApEuLbeZ4SEcDqiuvE8TuuyXWuL",
  "1AE7kmtYUSfLPpYn1EXx7HqFXj3TEv_Rg",
  "1X4UnLO8C9BFygxCFMQ4cvln_no1A-4el",
  "1yWd2f7lbA11lC08Bkhk1rBYhC6UQsfTb",
  "1wOImKb-YPaSqv3-yRWhAShA6pV1japJ5",
  "1uFCcdWWhfmFGV-dh33RkT6o6N8eJonS0",
  "1LVOeWX0-A1lN3UZPq-CFWQeN77Kw5RXA",
  "1TPpL0GAC_xkR5uwl00VFD-MMhKzfbC6A",
  "1Fr7xQK6KipmAMmnorYDZq3EU_lfq0BBJ",
  "1w-Xyn73RkBZiVpQ1W8cn6VipLEu2Tbpc",
  "1Druj2D0lGCwWGdR9OlYZPqyLlf9GWnAY",
  "1-lfWqAXXeqc71NcslUSBb6M1pfCu6pls",
  "1dXKrar5UWjJXIF2AwycJgQMnO_gHNnnB",
  "1Ca0KOocbLZ4K_yHS-6U49hwxVRT9AnfA",
  "1TmoNLpTrr0lI5YSSp_glKzCe5ISo6i_C",
  "1rsuRJZovM32AUQ-ECEqxEBsb1Odq--Zz",
  "11IK8WzQNGDAX-IXci7eB3uttQqkEcw73",
  "1nYnsYBVj5I5GcBh0_ru-AU6NzXHIT_9g",
  "1GmxHPYSlkeEyLZuxEU_UcqttQhn52GpT",
  "1gigraWBydSUknUu8N_QQ4vjuszze8Luq",
  "18p-iAV-zpjXemlPE6X_jpJmfesHjtzmr",
  "1clAYnvqj5swUFtKcHHFT1RHp8zA7B2ri",
  "1lLxAOXs4hOAFn4vdl25nJPPJidlOvWIY",
  "1ym1maCZhs6_rlWF-rstsZbklgwQeFjyt",
  "1kpvi1NBfbDkOuAOSsN-5bEYyWuCnxkN-",
  "1em67ElXZ5p3b_u2QOcdugBSbffJxnAtP",
  "15hZQIwOXwEruE8Z85lrFVcL_2N5VaMYm",
  "1dQKDp2d54rqtCxukNRcLzY18mLvcPeL7",
  "1jYvcXsJcZZpwkDZpiH4TgoMp7xLM8bbh",
  "1nyW9Hhi-BCsBoICzcyCV1KAscC0PRo4v",
  "1NbAt_rcEkoIk1xHymxlA0TOXotM3uB30",
  "1VHzBtMtuCBBVVzr7PE87iEj1WE8QXpSU",
  "1zddnf0w5LY6PDPWex0gYbTzt1DmFCb7X",
];

const PRODUCTS = Array.from({ length: 33 }, (_, i) => ({
  title: `Traditional Masterpiece ${i + 1}`,
  description: "A stunning expression of traditional Indian artistry, featuring intricate detailing and timeless silhouettes.",
  price: 45000 + (i * 1000), // Variable pricing
  comparePrice: null,
  category: i % 3 === 0 ? "Lehengas" : i % 3 === 1 ? "Suits" : "Sarees",
  sizes: ["XS", "S", "M", "L", "XL"],
  featured: i < 4,
  sku: `MC-TRD-${String(i + 1).padStart(3, '0')}`,
}));

async function run() {
  console.log("\n🗑  Removing existing traditional placeholder products...");
  const q = query(collection(db, "products"), where("collection", "==", "traditional"));
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  console.log("\n🌱  Adding 33 Traditional products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "traditional",
      images: [driveImg(IMAGE_IDS[i])],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/33] ${product.title} (${ref.id})`);
  }

  console.log("\n✅  Done! 33 Traditional products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
