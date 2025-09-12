import { formatDistanceToNow } from "date-fns";

export function formateDate(date: Date) {
  // Parse the input date-time string
  const inputDateTime = new Date("2024-03-22T21:25:48.201Z");

  // Format the date-time string to the desired format
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateTime = inputDateTime.toLocaleString("en-US", options).replace(",", "");

  return formattedDateTime;
}

export function timeAgo(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    .replace("about ", "")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" years", "y")
    .replace(" year", "y");
}
