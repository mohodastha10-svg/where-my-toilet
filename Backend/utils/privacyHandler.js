// This function fulfills the "Privacy-Preserving Data Handling" feature [cite: 60]
const anonymizeLocation = (latitude, longitude) => {
    // We round the coordinates to 3 decimal places.
    // This identifies the general "Grid/Area" but hides the exact house or spot.
    const maskedLat = Math.round(latitude * 1000) / 1000;
    const maskedLng = Math.round(longitude * 1000) / 1000;

    return {
        latGrid: maskedLat,
        lngGrid: maskedLng,
        status: "Anonymized"
    };
};

module.exports = { anonymizeLocation };