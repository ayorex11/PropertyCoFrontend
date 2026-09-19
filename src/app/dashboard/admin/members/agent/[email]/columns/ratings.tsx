import { Column, RatingHistory } from "@/lib/types";
import { formatTime, formatToShortDate } from "@/utils/converters";

export const columns:Column<RatingHistory>[] = [
  {
    key: "date",
    label: "Date",
    render: (rating) => (
    <span>
        {formatToShortDate(rating.date)}
    </span>
    ),
  },
  {
    key: "date",
    label: "Time",
    render: (rating) => (
    <span>
        {formatTime(rating.date)}
    </span>
    ),
  },
  {
    key: "rating",
    label: "Amount",
  },
  {
    key: "reason",
    label: "Reason",
    render: (rating) => (
    <span>
        {rating.reason ?? "N/A"}
    </span>
    ),
  },
];