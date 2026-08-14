const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "0c8969b9f7a7509d6f6e52c8035ed95a"; // Demo fallback key

export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"];
  const isHeicExt = file.name && file.name.toLowerCase().match(/\.(heic|heif)$/);
  if (!allowed.includes(file.type) && !isHeicExt) {
    throw new Error("Invalid file type. Allowed: JPG, PNG, WebP, GIF, HEIC");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File too large. Maximum size: 10MB");
  }

  const base64 = await fileToBase64(file);

  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  formData.append("image", base64.split(",")[1]); 

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

export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "blob:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
