const express = require('express');
const router = express.Router();
const { generateItinerary } = require('../controllers/itinerary');
const { protected } = require('../middleware/auth');

router.post('/generate', protected, generateItinerary);

module.exports = router;
