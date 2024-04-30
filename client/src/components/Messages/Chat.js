import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage, receiveMessage } from '../../features/messagingSlice';
import './Chat.scss';

const Chat = ({ activeContactId, userId }) => {
    const dispatch = useDispatch();
    // Ensure messages are always an array
    const messages = useSelector(state => Array.isArray(state.messaging.messages) ? state.messaging.messages : []);
    console.log("Messages from Redux:", messages); // This helps debug what's stored
    const [newMessageText, setNewMessageText] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        dispatch(fetchMessages(activeContactId));
    }, [dispatch, activeContactId]);

    useEffect(() => {
        const wsUrl = `ws://localhost:4000/chat/${activeContactId}`;
        if (!ws.current) {
            ws.current = new WebSocket(wsUrl);
            ws.current.onopen = () => console.log("Connected to WebSocket");
            ws.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.recipient === userId || message.sender === userId) {
                    dispatch(receiveMessage(message));
                }
            };
            ws.current.onclose = () => {
                console.log("WebSocket closed. Attempting to reconnect...");
                setTimeout(() => {
                    ws.current = new WebSocket(wsUrl);
                }, 1000);
            };
        }

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [dispatch, userId, activeContactId]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (!newMessageText.trim()) return;

        const message = {
            sender: userId,
            recipient: activeContactId,
            text: newMessageText,
            timestamp: new Date().toISOString()
        };

        ws.current.send(JSON.stringify(message));
        dispatch(sendMessage({ recipientId: activeContactId, text: newMessageText }));
        setNewMessageText('');
    };

    return (
        <div className="chat-container">
            <div className="messages-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
                        <div className="message-content">{msg.text}</div>
                        <div className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;