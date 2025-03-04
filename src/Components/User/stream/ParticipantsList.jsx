// File: src/components/ParticipantsList.jsx
import React from 'react';
import { FaVideo, FaUser } from 'react-icons/fa';
import '../styles/ParticipantsList.css';

const ParticipantsList = ({ participants, currentUserId }) => {
  return (
    <div className="participants-list">
      <h2>Participants ({participants.length})</h2>
      
      <ul>
        {participants.map(participant => (
          <li key={participant.id} className={participant.id === currentUserId ? 'current-user' : ''}>
            <div className="participant-icon">
              {participant.isBroadcasting ? (
                <FaVideo className="broadcasting-icon" />
              ) : (
                <FaUser />
              )}
            </div>
            <span className="participant-name">
              {participant.name} {participant.id === currentUserId && '(You)'}
            </span>
            {participant.isBroadcasting && (
              <span className="broadcasting-badge">Live</span>
            )}
          </li>
        ))}
        
        {participants.length === 0 && (
          <li className="empty-list">No participants yet</li>
        )}
      </ul>
    </div>
  );
};

export default ParticipantsList;