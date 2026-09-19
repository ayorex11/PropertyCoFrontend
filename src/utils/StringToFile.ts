export const urlToFile = async (
  url: string,
  filename = "image.jpg"
): Promise<File | null> => {
  if (!url) return null;

  const response = await fetch(url, { mode: "cors" });
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};
