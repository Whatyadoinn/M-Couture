export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  // To bypass external APIs and Firebase Storage setup, we will compress the image 
  // directly in the browser and return it as a Base64 string to be saved in Firestore.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Scale down to max 600px to keep the database size small
        const MAX_DIMENSION = 600;
        if (width > height && width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export as heavily compressed JPEG (approx 30-50KB per image)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to process image format."));
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
  });
}

export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return url.startsWith("http") || url.startsWith("data:image");
}
