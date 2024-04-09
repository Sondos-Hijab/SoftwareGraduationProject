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
  //handling location to set a marker
  const locationParts = location.split(/[,:]/).map((part) => part.trim());
  const locationMarker = {
    lat: parseFloat(locationParts[1]),
    lng: parseFloat(locationParts[3]),
  };
  return locationMarker;
}

export function isExpired(dateToCheck) {
  const currentDate = new Date();
  return currentDate > dateToCheck;
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
