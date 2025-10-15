export const enforceHTTPS = () => {
  // Only enforce HTTPS in production
  if (
    import.meta.env.VITE_ENVIRONMENT === "production" &&
    location.protocol !== "https:" &&
    location.hostname !== "localhost"
  ) {
    // Redirect to HTTPS
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`
    );
  }
};

export const isSecureContext = () => {
  // Check if we're in a secure context (HTTPS or localhost)
  return (
    location.protocol === "https:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
};

export const canUseGeolocation = () => {
  return "geolocation" in navigator && isSecureContext();
};

export const validateCoordinates = (lat, lng) => {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

export const obfuscateCoordinates = (lat, lng) => {
  // Round to reduce precision for privacy (3 decimal places ≈ 100m accuracy)
  return {
    latitude: Math.round(lat * 1000) / 1000,
    longitude: Math.round(lng * 1000) / 1000,
  };
};
