exports.handleSearch = async (req, res) => {
    try {
        const { latitude, longitude, areaType, distanceToNearestToilet } = req.body;

        // Apply Layer 3 Rules from your PDF [cite: 276]
        let isViolated = false;
        if (areaType === 'city' && distanceToNearestToilet > 1000) isViolated = true;
        if (areaType === 'crowded' && distanceToNearestToilet > 500) isViolated = true;
        if (areaType === 'highway' && distanceToNearestToilet > 40000) isViolated = true;

        if (isViolated) {
            console.log("🚨 Demand Signal Captured for underserved area!");
            return res.status(201).json({ 
                message: "Demand Signal Logged", 
                status: "NO_TOILET" 
            });
        }

        res.status(200).json({ message: "Toilet is within required distance." });
    } catch (error) {
        res.status(500).json({ error: "Controller Error" });
    }
};