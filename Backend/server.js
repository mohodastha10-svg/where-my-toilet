const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Setup
dotenv.config();
const app = express();
const PORT = 3000;
let demandSignals = []; // This is your temporary Demand Signal Store

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. The "Brain" Connection (Direct link to fix 404)
// This tells the server: "When you see /api/search, go straight to the controller"
const demandController = require('./controllers/demandController');
app.post('/api/search', (req, res) => {
    const { areaType, distanceToNearestToilet } = req.body;
    
    // Check if the distance violates the rules
    if (areaType === 'city' && distanceToNearestToilet > 1000) {
        const newSignal = { 
            id: demandSignals.length + 1, 
            location: "Nagpur Grid", 
            timestamp: new Date() 
        };
        
        demandSignals.push(newSignal); // This adds the signal to our "Bin"
        console.log("🚨 Signal Added! Total signals now:", demandSignals.length);
        
        return res.status(201).json({ message: "Demand Signal Logged", signal: newSignal });
    }
    
    res.json({ message: "No violation found" });
});
// This allows you to see all the "Missing Toilet" signals in your store
app.get('/api/signals', (req, res) => {
    res.json({ 
        message: "Current Demand Hotspots", 
        totalSignals: demandSignals.length, // This shows the current count
        data: demandSignals // This shows the list of signals
    });
});

// 4. Test Route to check if server is working at all
app.get('/', (req, res) => {
    res.send("Where's my Toilet Backend is live! 🚀");
});

// 5. Start
app.listen(PORT, () => {
    console.log(`✅ Server is live on http://localhost:${PORT}`);
    console.log(`🚀 Testing path: http://localhost:${PORT}/api/search`);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is live on http://localhost:${PORT}`);
    console.log("------------------------------------------");
    console.log("KEEP THIS TERMINAL OPEN - DO NOT CLOSE IT");
    console.log("------------------------------------------");
});