/**
 * Upload an image to ImgBB (free image hosting, no signup needed for basic use).
 * Falls back to returning the provided URL if upload fails.
 *
 * For production, use your own Cloudinary / Firebase Storage / S3 bucket.
 * ImgBB free tier: 32MB max file size, unlimited uploads.
 *
 * How it works:
 * 1. Admin selects an image file from their computer
 * 2. We convert it to base64
 * 3. Upload to ImgBB API (free, no auth needed for small usage)
 * 4. Get back a permanent URL
 *
 * Alternative: Admin can just paste any image URL directly.
 */

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "";

/**
 * Upload a File to ImgBB and return the hosted URL.
 * If no API key is set, converts to a local data URL (for dev/demo).
 */
export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  // Validate file type
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"];
  const isHeicExt = file.name && file.name.toLowerCase().match(/\.(heic|heif)$/);
  if (!allowed.includes(file.type) && !isHeicExt) {
    throw new Error("Invalid file type. Allowed: JPG, PNG, WebP, GIF, HEIC");
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File too large. Maximum size: 10MB");
  }

  // If no ImgBB key, use local object URL (works for demo)
  if (!IMGBB_API_KEY) {
    console.warn("[ImageUpload] No IMGBB_API_KEY set — using local URL. Images won't persist across sessions.");
    return URL.createObjectURL(file);
  }

  // Convert file to base64
  const base64 = await fileToBase64(file);

  // Upload to ImgBB
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  formData.append("image", base64.split(",")[1]); // Remove the data:image/... prefix

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed. Please try again.");
  }

  const data = await res.json();
  return data.data.display_url;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validate an image URL.
 */
export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "blob:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
