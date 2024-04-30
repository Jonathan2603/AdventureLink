import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsList from './ContactsList';
import Chat from './Chat';
import './Messages.scss';
import { setActiveContact } from '../../features/messagingSlice';

const Messages = () => {
    const userId = useSelector(state => state.user.user.id);
    const activeContactId = useSelector(state => state.messaging.activeContactId); // Correct selector
    const dispatch = useDispatch();

    const handleSelectContact = (contactId) => {
        dispatch(setActiveContact(contactId)); 
    };

    return (
        <div className="messages-container">
            <div className="contacts-panel">
                <ContactsList onContactSelect={handleSelectContact} selectedContactId={activeContactId} />
            </div>
            <div className="chat-panel">
                {activeContactId ? (
                    <Chat activeContactId={activeContactId} userId={userId} />
                ) : (
                    <div className="select-contact-message">Please select a contact to start chatting.</div>
                )}
            </div>
        </div>
    );
};

export default Messages;
