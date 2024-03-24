export function getDatTimeFromString(createdAt) {
  // Get current date and time
  const currentDate = new Date(createdAt);

  // Format date as "dd-mmm-yyyy"
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = currentDate
    .toLocaleDateString("en-US", optionsDate)
    .replace(/,/g, "");

  // Format time as "hh:mm:ss"
  const optionsTime = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = currentDate.toLocaleTimeString("en-US", optionsTime);

  return {formattedDate, formattedTime};
}
