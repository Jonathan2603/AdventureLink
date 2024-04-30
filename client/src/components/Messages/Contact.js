import React from 'react';
import Avatar from './Avatar';

const Contact = ({ id, username, onClick, selected, online }) => {
    return (
        <div onClick={() => onClick(id)} className={`contact-item ${selected ? 'selected' : ''}`}>
            <Avatar userId={id.toString()} username={username} online={online} />
            <span className="username">{username}</span>
        </div>
    );
};

export default Contact;
