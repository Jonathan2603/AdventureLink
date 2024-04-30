import React from 'react';
import Contact from './Contact';
import { dummyContacts } from './DummyContacts'; // Static data for now

const ContactsList = ({ onContactSelect, selectedContactId }) => {
    return (
        <div className="contacts-list">
            {dummyContacts.map(contact => (
                <Contact
                    key={contact.id}
                    id={contact.id}
                    username={contact.username}
                    online={contact.online}
                    selected={contact.id === selectedContactId}
                    onClick={onContactSelect}
                />
            ))}
        </div>
    );
};

export default ContactsList;
