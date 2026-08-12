/**
 * Upload images to Firebase Storage.
 * Returns a permanent, publicly accessible download URL.
 */

import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * Upload a File to Firebase Storage and return the hosted download URL.
 * Supports JPG, PNG, WebP, GIF, HEIC/HEIF.
 */
export async function uploadImage(file, pathPrefix = "uploads") {
  if (!file) throw new Error("No file provided");

  // Validate file type
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/heic",
    "image/heif",
  ];
  const isHeicExt =
    file.name && file.name.toLowerCase().match(/\.(heic|heif)$/);
  if (!allowed.includes(file.type) && !isHeicExt) {
    throw new Error("Invalid file type. Allowed: JPG, PNG, WebP, GIF, HEIC");
  }

  // Validate file size (max 10 MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File too large. Maximum size: 10 MB");
  }

  // Build a unique path: uploads/1234567890_filename.jpg
  const ext = file.name.split(".").pop() || "jpg";
  const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const storagePath = `${pathPrefix}/${uniqueName}`;

  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Return a promise that resolves with the download URL
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // progress callback (optional)
      (error) => reject(new Error(error.message || "Upload failed")),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Validate an image URL (rules out blob:// URLs stored from old sessions).
 */
export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  if (url.startsWith("blob:")) return false; // Blob URLs are session-only
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
