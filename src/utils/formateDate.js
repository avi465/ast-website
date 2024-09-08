export default function formateDate(date) {
    // Parse the input date-time string
    const inputDateTime = new Date("2024-03-22T21:25:48.201Z");

    // Format the date-time string to the desired format
    const options = {
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