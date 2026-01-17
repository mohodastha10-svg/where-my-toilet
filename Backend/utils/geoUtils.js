// This function applies the Distance Rules from your project slides
const checkDistanceViolation = (distanceInMeters, areaType) => {
    // Rule 1: City -> 1 km (1000 meters) 
    if (areaType === 'city' && distanceInMeters > 1000) return true;

    // Rule 2: Crowded area -> 500 meters 
    if (areaType === 'crowded' && distanceInMeters > 500) return true;

    // Rule 3: Highway -> 40 km (40000 meters) 
    if (areaType === 'highway' && distanceInMeters > 40000) return true;

    return false; // No violation found
};

module.exports = { checkDistanceViolation };