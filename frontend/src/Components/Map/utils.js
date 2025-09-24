export function simulateWeatherData(lat, lng) {
  const isNearCoast = lat < 25 && lat > 8 && lng > 68 && lng < 97;
  const isDeepOcean = !isNearCoast;
  const month = new Date().getMonth();
  const seasonFactor = Math.sin((month / 12) * 2 * Math.PI);
  const isMonsoon = month >= 5 && month <= 9;
  const latFactor = Math.abs(lat - 10) / 20;
  const isBayOfBengal = lng > 82;
  const isArabianSea = lng < 76;

  return {
    windSpeed: Math.round((Math.random() * 15 + (isDeepOcean ? 12 : 8) + (isMonsoon ? 6 : 0) + (isBayOfBengal ? 2 : 0)) * 10) / 10,
    windDirection: Math.round(Math.random() * 360),
    temperature: Math.round((28 + seasonFactor * 5 - latFactor * 7 + Math.random() * 4) * 10) / 10,
    seaTemperature: Math.round((27 + seasonFactor * 4 - latFactor * 6 + Math.random() * 3) * 10) / 10,
    humidity: Math.round(65 + Math.random() * 20 + (isMonsoon ? 15 : 0) + (isBayOfBengal ? 5 : 0)),
    pressure: Math.round((1013 + Math.random() * 12 - 6 - (isMonsoon ? 8 : 0)) * 10) / 10,
    waveHeight: Math.round((1.2 + Math.random() * (isDeepOcean ? 4 : 2.5) + (isMonsoon ? 1.5 : 0)) * 10) / 10,
    currentSpeed: Math.round((0.3 + Math.random() * 0.8 + (isDeepOcean ? 0.2 : 0)) * 100) / 100,
    tideSpeed: Math.round((0.2 + Math.random() * 1.3 + (isNearCoast ? 0.5 : 0)) * 10) / 10,
    visibility: Math.round(10 + Math.random() * 15 - (isMonsoon ? 8 : 0)),
    cloudCover: Math.round(Math.random() * 60 + (isMonsoon ? 40 : 20)),
    precipitation: Math.round(Math.random() * (isMonsoon ? 15 : 3) * 10) / 10,
  };
}

export function getDefaultWeatherData() {
  return {
    windSpeed: 12.0,
    windDirection: 225,
    temperature: 28.5,
    seaTemperature: 27.2,
    humidity: 75,
    pressure: 1008.5,
    waveHeight: 2.1,
    currentSpeed: 0.45,
    tideSpeed: 0.7,
    visibility: 12,
    cloudCover: 65,
    precipitation: 0.8,
  };
}

export function screenToLat(y, height, bounds) {
  const ratio = 1 - y / height;
  return bounds.south + ratio * (bounds.north - bounds.south);
}

export function screenToLng(x, width, bounds) {
  const ratio = x / width;
  return bounds.west + ratio * (bounds.east - bounds.west);
}

export function latToScreen(lat, height, bounds) {
  const ratio = 1 - (lat - bounds.south) / (bounds.north - bounds.south);
  return ratio * height;
}

export function lngToScreen(lng, width, bounds) {
  const ratio = (lng - bounds.west) / (bounds.east - bounds.west);
  return ratio * width;
}

export function downloadCSV(filename, headers, rows) {
  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function convertDMSToDD(dms, ref) {
  let dd = dms[0] + dms[1] / 60 + dms[2] / 3600;
  if (ref === "S" || ref === "W") dd = dd * -1;
  return dd;
}
