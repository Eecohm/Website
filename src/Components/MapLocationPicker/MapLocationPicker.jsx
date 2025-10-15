import React, { useState, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl/maplibre";
import { X, MapPin, Navigation, Shield } from "lucide-react";
import { canUseGeolocation } from "@/utils/security";
import styles from "./MapLocationPicker.module.css";

const MapLocationPicker = ({
  isOpen,
  onClose,
  onLocationSelect,
  initialLocation,
}) => {
  const [viewport, setViewport] = useState({
    longitude: 85.324,
    latitude: 27.7172,
    zoom: 10,
  });
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  const mapRef = useRef();

  // Validate coordinates
  const validateCoordinates = (lat, lng) => {
    return (
      typeof lat === "number" &&
      typeof lng === "number" &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  };

  // Obfuscate coordinates for privacy (optional)
  const obfuscateCoordinates = (lat, lng) => {
    return {
      latitude: Math.round(lat * 1000) / 1000, // 3 decimal places ≈ 100m accuracy
      longitude: Math.round(lng * 1000) / 1000,
    };
  };

  // Get user's current location with security checks
  const getUserLocation = () => {
    if (!canUseGeolocation()) {
      alert(
        "Geolocation is not available in this environment. Please use HTTPS."
      );
      return;
    }

    if (!hasConsent) {
      setShowPrivacyNotice(true);
      return;
    }

    setIsLoadingLocation(true);

    const options = {
      timeout: parseInt(import.meta.env.VITE_GEOLOCATION_TIMEOUT) || 10000,
      enableHighAccuracy: false, // Less battery drain
      maximumAge: 60000, // Cache for 1 minute
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (validateCoordinates(latitude, longitude)) {
          const location = obfuscateCoordinates(latitude, longitude);
          setUserLocation(location);
          setSelectedLocation(location);
          setViewport((prev) => ({
            ...prev,
            longitude: location.longitude,
            latitude: location.latitude,
            zoom: 15,
          }));
        } else {
          console.error("Invalid coordinates received");
          alert("Invalid location data received. Please select manually.");
        }
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error.code);
        setIsLoadingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Location access denied. Please select your location manually."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            alert(
              "Location unavailable. Please select your location manually."
            );
            break;
          case error.TIMEOUT:
            alert(
              "Location request timed out. Please try again or select manually."
            );
            break;
          default:
            alert("Unable to get location. Please select manually.");
        }
      },
      options
    );
  };

  // Handle map click with validation
  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;

    if (validateCoordinates(lat, lng)) {
      const location = obfuscateCoordinates(lat, lng);
      setSelectedLocation(location);
    }
  };

  // Handle privacy consent
  const handlePrivacyConsent = (consent) => {
    setHasConsent(consent);
    setShowPrivacyNotice(false);

    if (consent) {
      getUserLocation();
    }
  };

  // Confirm location selection
  const handleConfirmLocation = () => {
    if (
      selectedLocation &&
      validateCoordinates(selectedLocation.latitude, selectedLocation.longitude)
    ) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <Shield size={20} />
            Select Your Location
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {showPrivacyNotice && (
          <div className={styles.privacyNotice}>
            <div className={styles.privacyContent}>
              <h4>🔒 Privacy Notice</h4>
              <p>
                We'll request your location to help you select your address more
                easily. Your location data is:
              </p>

              <div className={styles.privacyActions}>
                <button
                  className={styles.denyButton}
                  onClick={() => handlePrivacyConsent(false)}
                >
                  Select Manually
                </button>
                <button
                  className={styles.allowButton}
                  onClick={() => handlePrivacyConsent(true)}
                >
                  Allow Location Access
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          <button
            className={styles.trackButton}
            onClick={getUserLocation}
            disabled={isLoadingLocation || !hasConsent}
          >
            <Navigation size={16} />
            {isLoadingLocation ? "Getting Location..." : "Track My Location"}
          </button>
        </div>

        <div className={styles.mapContainer}>
          <Map
            ref={mapRef}
            {...viewport}
            onMove={(evt) => setViewport(evt.viewState)}
            onClick={handleMapClick}
            onLoad={() => console.log("🗺️ Map loaded successfully!")}
            onError={(error) => console.error("🚨 Map error:", error)}
            style={{ width: "100%", height: "400px" }}
            mapStyle={
              import.meta.env.VITE_MAP_STYLE_URL ||
              "https://demotiles.maplibre.org/style.json"
            }
            maxParallelImageRequests={1}
            workerClass={null}
          >
            {selectedLocation && (
              <Marker
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
                anchor="bottom"
              >
                <div className={styles.marker}>
                  <MapPin size={24} color="#ef4444" />
                </div>
              </Marker>
            )}
          </Map>
        </div>

        {selectedLocation && (
          <div className={styles.locationInfo}>
            <p className={styles.locationText}>
              📍 Selected Location: {selectedLocation.latitude.toFixed(4)},{" "}
              {selectedLocation.longitude.toFixed(4)}
            </p>
            <p className={styles.instruction}>This is your selected location</p>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmLocation}
            disabled={!selectedLocation}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapLocationPicker;
