// Helper to read file as Base64
export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // result is a data URL (e.g., "data:image/png;base64,iVBORw0KGgo...")
      // We need to strip the prefix to get only the Base64 string
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    });
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper to format file size in a human-readable format
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
