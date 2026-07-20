import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { products } from "./products";

/**
 * Utility to seed initial products to Firestore.
 * Run this once from the browser console if you want to prepopulate the database.
 * 
 * Example usage in a component:
 * import { seedProducts } from '../data/seed';
 * <button onClick={seedProducts}>Seed</button>
 */
export async function seedProducts() {
  try {
    const productsRef = collection(db, "products");
    
    let count = 0;
    for (const product of products) {
      // Use the local ID as the document ID for consistency
      const { id, ...data } = product;
      await setDoc(doc(productsRef, id), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }
    
    console.log(`Successfully seeded ${count} products to Firestore!`);
    return true;
  } catch (error) {
    console.error("Error seeding products:", error);
    return false;
  }
}
