export function getCurrentLocalDateMMDDYYYY() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  return `${month}/${day}/${year}`;
}