const Message = require('../model/Message');

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { senderId, recipientId, text } = req.body;
    const message = await Message.create({ sender: senderId, recipient: recipientId, text });
    res.status(200).json({ success: true, msg: "Message sent successfully!", messageId: message._id });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Retrieve messages for a specific conversation
const getMessages = async (req, res) => {
  try {
    const { senderId, recipientId } = req.query;
    const messages = await Message.find({
      $or: [{ sender: senderId, recipient: recipientId }, { sender: recipientId, recipient: senderId }]
    }).sort('createdAt');
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Retrieve messages for a specific user (Mock function to simulate fetching user-specific messages)
const getMessagesForUser = async (req, res) => {
    const { userId } = req.params;
    // Mock data: In a real application, you would replace this with a database query
    const messages = [{id: 1, from: userId, message: "Hello"}];
    res.json(messages);
};

module.exports = { sendMessage, getMessages, getMessagesForUser };
