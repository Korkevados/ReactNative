/** @format */
const GOOGLE_API_KEY = "AIzaSyCJdySlCJ7tg0H019OWNprCpZlyLjsLicw";

export function getMapPreview(lat, lng) {
  const imagePrevieUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePrevieUrl;
}

export async function getAddress(location) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("בעיה בהשגת כתובת");
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}
