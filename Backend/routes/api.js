const express = require('express');
const router = express.Router();
const demandController = require('../controllers/demandController');

// This defines the /api/search path
router.post('/search', demandController.handleSearch);

module.exports = router;