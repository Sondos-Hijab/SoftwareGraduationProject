export function getDatTimeFromString(createdAt) {
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
  return { formattedDate, formattedTime };
}

export function getExpireDate() {
  const currentDate = new Date();
  // Add 24 hours to the current date
  const expirationDate = new Date(currentDate);
  expirationDate.setHours(expirationDate.getHours() + 24);
  return expirationDate;
}

export function createBlobUrl(data) {
  const uint8Array = new Uint8Array(data);
  const blob = new Blob([uint8Array], { type: "image/*" });
  return URL.createObjectURL(blob);
}

export function stringToLocationMarker(location) {
  if (!location) return null;
  location = JSON.parse(location);
  const locationMarker = {
    lat: location.lat,
    lng: location.lng,
  };
  return locationMarker;
}

export function isExpired(dateToCheck) {
  let dateObject = new Date(dateToCheck);
  const currentDate = new Date();

  return currentDate > dateObject;
}

export function sortByDate(array, type) {
  let newArray = [];
  if (array) {
    if (!type || type == "newToOld")
      newArray = array.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    else {
      newArray = array.slice().sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });
    }
  }

  return newArray;
}

export function getFormattedDate(date) {
  let year = date.getFullYear(); // Get the full year (e.g., 2024)
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (0-11), add 1 to get (1-12), padStart to ensure two digits
  let day = date.getDate().toString().padStart(2, "0"); // Get the day of the month, padStart to ensure two digits

  let formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}
