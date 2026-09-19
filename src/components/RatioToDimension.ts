export function parseAspectRatio(value: string): { width: number; height: number } {
  const cleaned = value.replace(/[{}]/g, "").trim();

  if (cleaned.includes("/")) {
    const [wStr, hStr] = cleaned.split("/");
    const width = Number(wStr);
    const height = Number(hStr);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  } else {
    const num = Number(cleaned);
    if (!isNaN(num)) {
      return { width: num, height: num };
    }
  }

  throw new Error(`Invalid aspect ratio format: ${value}`);
}