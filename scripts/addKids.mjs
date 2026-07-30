/**
 * Adds 18 Kids products from real Google Drive images.
 * Removes placeholder kids products first.
 *
 * Run: node scripts/addKids.mjs
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
  "1L8-7eGZQKJcsnBDfvj4jUQRMurmne1Qf",
  "1XOdSOeaYxDloFfzqU3azemrZEIljmGF0",
  "13PYJz2Ilfu1BiTqUq105XlGagq17zKF6",
  "1GsB65pUeBc2KU4Ojl33oA3ZwcRdpUBNd",
  "1ZGEp3qGbSIDdwi1igKmsojp0L14iUPZU",
  "1TNhyCeM_kSNZiNQAyRkhHXDjF6TP9WSP",
  "1H5axXPcwboPFP1JjKvgN5TmkKB8YUHPg",
  "1wGAn2VfRJCqDEN06tajTK7ct5Jn9NiuK",
  "1MlYaKf7k5jsScdtBmSvPHe32-UNmYeB4",
  "1jOJkX6DKB7e97tCRcrP0AdcXnXNI6I1h",
  "1tSa4GbUfvSii5KaNdVQpWw2deaT5r4gD",
  "1JlI1vyAECr0ziKI5IYFAiln_bdmZD-wz",
  "1z81Xh70FNbmM00SdZv2GdoS4Uvp1hIz0",
  "17PC_52pFWtajPFp1aSyTjz3w-CGupWvR",
  "1gT34nr94yUGiyHxBNpgeKUqX6m-zBeaS",
  "1vOCGWv2MYG5Edo8pQyEEgeUoX3mclJYU",
  "1n5u9YPobO23rygao2v3BTVHfetmsmmjr",
  "1Ni7jlOxwePo8ePuG2vO0mzmEoxVoMj1h",
];

const PRODUCTS = [
  { title: "Ivory Organza Lehenga Set", description: "A dreamy ivory organza lehenga with delicate silver embroidery and a matching choli. Perfect for weddings and festive celebrations.", price: 8500, comparePrice: 10000, category: "Lehengas", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: true, sku: "MC-KD-001" },
  { title: "Sunflower Print Kerala Dress", description: "A charming white and gold Kerala-inspired dress with hand-painted yellow floral motifs. Adorable matching set for sisters.", price: 5500, comparePrice: null, category: "Dresses", sizes: ["0-1Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: true, sku: "MC-KD-002" },
  { title: "Gold Sequin Party Frock", description: "A show-stopping gold and brown sequin party frock with a flared skirt and one-shoulder detail. Stage-ready glamour for little stars.", price: 6800, comparePrice: 8000, category: "Party Wear", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"], featured: true, sku: "MC-KD-003" },
  { title: "White Chikankari Dhoti Set", description: "A pure white chikankari kurta paired with comfortable dhoti pants. Traditional elegance for Republic Day and festive occasions.", price: 4200, comparePrice: 5000, category: "Ethnic Sets", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: false, sku: "MC-KD-004" },
  { title: "Tricolour Ruffled Frock", description: "A playful ruffled frock in tricolour tones with pompom and tassel details. A festive outfit that celebrates the spirit of India.", price: 3800, comparePrice: null, category: "Party Wear", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: false, sku: "MC-KD-005" },
  { title: "Peach Embroidered Anarkali", description: "A soft peach anarkali with delicate embroidery and a flowy dupatta. Comfortable enough for all-day celebrations.", price: 5200, comparePrice: 6500, category: "Anarkalis", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: false, sku: "MC-KD-006" },
  { title: "Royal Blue Sherwani Set", description: "A charming royal blue sherwani with matching pyjama for young boys, adorned with subtle gold embroidery. A miniature masterpiece.", price: 7200, comparePrice: null, category: "Sherwani", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"], featured: true, sku: "MC-KD-007" },
  { title: "Pink Floral Lehenga Choli", description: "An adorable pink lehenga choli with hand-printed floral motifs and a matching dupatta. Perfect for family celebrations.", price: 4800, comparePrice: 5800, category: "Lehengas", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: false, sku: "MC-KD-008" },
  { title: "Mint Green Palazzo Set", description: "A breezy mint green palazzo set with lace detailing and a comfortable elasticated waist. Easy-going festive dressing for kids.", price: 3500, comparePrice: null, category: "Palazzo Sets", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: false, sku: "MC-KD-009" },
  { title: "Maroon Velvet Kurta Pyjama", description: "A rich maroon velvet kurta with gold buttons paired with cream pyjama pants. Regal festive wear for little gentlemen.", price: 5500, comparePrice: 6800, category: "Ethnic Sets", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: false, sku: "MC-KD-010" },
  { title: "Cream Embroidered Gharara Set", description: "A cream gharara set with subtle threadwork and a matching dupatta. Graceful traditional wear for young fashionistas.", price: 6200, comparePrice: null, category: "Gharara Sets", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: false, sku: "MC-KD-011" },
  { title: "Yellow Flared Dress", description: "A sunny yellow flared dress with gota patti trim and delicate embroidered accents. A bright burst of joy for festivals.", price: 4000, comparePrice: 4800, category: "Dresses", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: false, sku: "MC-KD-012" },
  { title: "Lavender Tutu Lehenga", description: "A whimsical lavender tutu-style lehenga with a sequin blouse. Let your little princess twirl her way through celebrations.", price: 5800, comparePrice: null, category: "Lehengas", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: true, sku: "MC-KD-013" },
  { title: "Off-White Silk Kurta Set", description: "A classic off-white silk kurta set with minimal gold embroidery on the neckline and cuffs. Timeless festive elegance.", price: 4500, comparePrice: 5500, category: "Ethnic Sets", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"], featured: false, sku: "MC-KD-014" },
  { title: "Red Mirror Work Choli Set", description: "A vibrant red choli with hand-sewn mirror work paired with a contrasting printed lehenga. Navratri and Garba ready.", price: 5000, comparePrice: null, category: "Lehengas", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], featured: false, sku: "MC-KD-015" },
  { title: "Coral Tiered Frock", description: "A playful coral tiered frock with ruffled layers and a satin bow. Perfect for birthday parties and family gatherings.", price: 3200, comparePrice: 3900, category: "Party Wear", sizes: ["0-1Y", "2-3Y", "4-5Y", "6-7Y"], featured: false, sku: "MC-KD-016" },
  { title: "Sky Blue Nehru Jacket Set", description: "A sky blue Nehru jacket worn over a white kurta and pyjama set. Sharp, sophisticated, and perfect for weddings.", price: 6500, comparePrice: null, category: "Sherwani", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"], featured: false, sku: "MC-KD-017" },
  { title: "Dusty Rose Gown", description: "A fairytale dusty rose gown with tulle layers and delicate sequin embroidery. Designed for the little princess in your life.", price: 7500, comparePrice: 9000, category: "Gowns", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"], featured: true, sku: "MC-KD-018" },
];

async function run() {
  console.log("\n🗑  Removing existing kids placeholder products...");
  const q = query(collection(db, "products"), where("collection", "==", "kids"));
  const existing = await getDocs(q);
  for (const d of existing.docs) {
    await deleteDoc(d.ref);
    console.log(`  ✗ Deleted: ${d.data().title || d.id}`);
  }

  console.log("\n🌱  Adding 18 Kids products with real images...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const ref = await addDoc(collection(db, "products"), {
      ...product,
      collection: "kids",
      images: [driveImg(IMAGE_IDS[i])],
      inStock: true,
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ [${i + 1}/18] ${product.title} (${ref.id})`);
  }

  console.log("\n✅  Done! 18 Kids products are live in Firestore.");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
