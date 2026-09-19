import { Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import dayjs from 'dayjs';

export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // "Dec"
    day: "2-digit", // "19"
    year: "numeric", // "2025"
  });
}

export const formatDateToReadableGB = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  const formattedDate = `${day}${suffix} ${date.toLocaleDateString("en-GB", {
    month: "long",
  })}, ${date.toLocaleDateString("en-GB", {
    year: "numeric",
  })}`;

  return formattedDate;
};

export function formatDateDay(dateString: string): ReactNode {
  const date = new Date(dateString);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short", // "Tue"
  });
  return (
    <VStack gap={0} p={1} lineHeight={1}>
      <Text
        fontFamily="var(--font-poppins)"
        fontWeight={500}
        fontSize="16px"
        lineHeight="100%"
        color="#2B2B2B"
      >
        {day}
      </Text>
      <Text fontWeight={400} fontSize="14px" color="#808080">
        {weekday}
      </Text>
    </VStack>
  );
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateAlone(dateString: string): ReactNode {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit", // "Dec"
    day: "2-digit", // "19"
    year: "numeric", // "2025"
  });
}

export function formatTimeAlone(dateString: string): ReactNode {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatWithCommas(value: number | string): string {
  return Number(value).toLocaleString("en-US");
}

export function formatToShortDate(isoDate: string): string {
  return dayjs(isoDate).format('DD/MM/YY');
}
