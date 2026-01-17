// This is the "Demand Signal Store" from Layer 4 of your presentation
const mongoose = require('mongoose');

// This defines exactly what data we collect when a toilet is missing
const SignalSchema = new mongoose.Schema({
    areaType: { type: String, required: true }, // City, Crowded, or Highway [cite: 112]
    violatedRule: { type: String, required: true }, // e.g., "No toilet within 1km" [cite: 114]
    locationGrid: {
        lat: Number,
        lng: Number
    }, // This is the anonymized grid from our privacyHandler [cite: 111]
    timestamp: { type: Date, default: Date.now }, // Time & frequency tracking [cite: 134]
    status: { type: String, default: 'NO_TOILET' } // Availability status [cite: 135]
});

module.exports = mongoose.model('Signal', SignalSchema);