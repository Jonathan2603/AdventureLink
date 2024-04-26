const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chat');

// Define routes for chat functionalities
router.post('/messages', sendMessage);
router.get('/messages', getMessages);

module.exports = router;
