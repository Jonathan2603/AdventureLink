const Message = require('../model/Message');

const sendMessage = async (req, res) => {
  try {
    const { senderId, recipientId, text } = req.body;
    const message = await Message.create({ sender: senderId, recipient: recipientId, text });
    res.status(200).json({ success: true, msg: "Message sent successfully!", messageId: message._id });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

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

module.exports = { sendMessage, getMessages };
