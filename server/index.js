const express = require('express');
const path = require("path");
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const ws = require('ws');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bucketListRoutes = require('./routes/bucketList');
const itineraryRoutes = require('./routes/itinerary');
const chatRoutes = require('./routes/chat');
const Message = require('./model/Message');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bucketList", bucketListRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use('/api/chat', chatRoutes);

// WebSocket setup
const wss = new ws.Server({ noServer: true });
const onlineUsers = new Map(); // Store online users

app.on('upgrade', (req, socket, head) => {
  if (req.url === '/ws') {  // Listen for WebSocket connections only on /ws path
    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          socket.destroy();
          return;
        }
        req.user = decoded;
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req);
        });
      });
    } else {
      socket.destroy();
    }
  } else {
    socket.destroy();  // Destroy any non-WebSocket upgrade requests
  }
});

wss.on('connection', function(socket, req) {
  socket.userId = req.user.id;
  onlineUsers.set(socket.userId, socket);

  // Broadcast new user online status to all users
  const onlineUserIds = Array.from(onlineUsers.keys());
  broadcastToAll({ type: 'online-users', users: onlineUserIds });

  socket.on('message', async function(message) {
    const messageData = JSON.parse(message);
    const { recipient, text, file } = messageData;

    // Process file if it exists
    let filename;
    if (file) {
      const buffer = Buffer.from(file.data, 'base64');
      filename = `${Date.now()}-${file.name}`;
      fs.writeFile(`./uploads/${filename}`, buffer, (err) => {
        if (err) console.error('File save error:', err);
      });
    }

    // Save message to the database
    const newMessage = new Message({
      sender: socket.userId,
      recipient,
      text,
      file: filename
    });

    await newMessage.save();

    // Broadcast message to recipient
    if (onlineUsers.has(recipient)) {
      onlineUsers.get(recipient).send(JSON.stringify({ sender: socket.userId, text, file: filename }));
    }
  });

  socket.on('close', () => {
    onlineUsers.delete(socket.userId);
    const onlineUserIds = Array.from(onlineUsers.keys());
    broadcastToAll({ type: 'online-users', users: onlineUserIds });
    console.log(`Connection closed: ${socket.userId}`);
  });
});

function broadcastToAll(data) {
  wss.clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

app.use('/uploads', express.static(__dirname + '/uploads'));

// Server Frontend
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
