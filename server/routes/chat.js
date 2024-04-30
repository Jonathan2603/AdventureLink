const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getMessagesForUser } = require('../controllers/chat');

router.post('/messages', sendMessage);  // Endpoint to send a new message
router.get('/messages', getMessages);  // Endpoint to retrieve all messages between two users
router.get('/messages/:userId', getMessagesForUser);  // Endpoint to retrieve messages for a specific user

module.exports = router;
