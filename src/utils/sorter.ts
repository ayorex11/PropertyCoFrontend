import { SortableProperty } from "@/lib/types";

export const Sort = <T extends SortableProperty>(data: T[], direction: string): T[] => {
  if (!data || data.length === 0) return [];

  const sorted = [...data]; // Clone to avoid mutating original array

  switch (direction) {
    case "oldest":
      sorted.sort((a, b) => {
        const dateA = new Date(a.created_at || a.date_created || a.prop?.created_at || a.date_joined || "").getTime();
        const dateB = new Date(b.created_at || b.date_created || b.prop?.created_at || b.date_joined || "").getTime();
        return dateA - dateB;
      });
      break;

    case "latest":
      sorted.sort((a, b) => {
        const dateA = new Date(a.created_at || a.date_created || a.prop?.created_at || a.date_joined || "").getTime();
        const dateB = new Date(b.created_at || b.date_created || b.prop?.created_at || b.date_joined || "").getTime();
        return dateB - dateA;
      });
      break;

    case "admin":
      sorted.sort((a, b) => {
        const priority = "propertycosales@gmail.com";
        const agentA = a.agent?.toLowerCase() === priority.toLowerCase() ? -1 : 0;
        const agentB = b.agent?.toLowerCase() === priority.toLowerCase() ? -1 : 0;
        return agentB - agentA; // Put matches first
      });
      break;

    case "price_low":
      sorted.sort((a, b) => (Number(a.price) ?? 0) - (Number(b.price) ?? 0));
      break;

    case "price_high":
      sorted.sort((a, b) => (Number(b.price) ?? 0) - (Number(a.price) ?? 0));
      break;

    default:
      // No sorting applied
      break;
  }

  return sorted;
};