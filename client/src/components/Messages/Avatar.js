import React from 'react';
import './Avatar.scss'; // Make sure to create and import the corresponding SCSS file

export default function Avatar({ userId, username, online }) {
    const colors = [
        'bg-teal-200', 'bg-red-200',
        'bg-green-200', 'bg-purple-200',
        'bg-blue-200', 'bg-yellow-200',
        'bg-orange-200', 'bg-pink-200', 'bg-fuchsia-200', 'bg-rose-200'
    ];
    const userIdBase10 = parseInt(userId.substring(10), 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];

    return (
        <div className={`avatar ${color}`}>
            <div className="initial">{username[0]}</div>
            <div className={`status-dot ${online ? 'online' : 'offline'}`}></div>
        </div>
    );
}
