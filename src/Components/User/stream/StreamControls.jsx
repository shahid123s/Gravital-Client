// File: src/components/StreamControls.jsx
import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/StreamControls.css';

const StreamControls = ({ 
  isBroadcasting, 
  isViewingEnabled, 
  onToggleBroadcast, 
  onToggleViewing 
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const toggleAudioMute = () => {
    setIsAudioMuted(!isAudioMuted);
    // Send mute command to the MediaSoup service
    // This would typically connect to your producer reference
  };
  
  const toggleVideoOff = () => {
    setIsVideoOff(!isVideoOff);
    // Send video toggle command to the MediaSoup service
    // This would typically connect to your producer reference
  };
  
  return (
    <div className="stream-controls">
      {isBroadcasting && (
        <>
          <button 
            className={`control-button ${isAudioMuted ? 'off' : 'on'}`}
            onClick={toggleAudioMute}
            title={isAudioMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          
          <button 
            className={`control-button ${isVideoOff ? 'off' : 'on'}`}
            onClick={toggleVideoOff}
            title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
          >
            {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
          </button>
        </>
      )}
      
      <button 
        className={`control-button ${isBroadcasting ? 'broadcasting' : ''}`}
        onClick={onToggleBroadcast}
        title={isBroadcasting ? "Stop Broadcasting" : "Start Broadcasting"}
      >
        {isBroadcasting ? "Stop Broadcasting" : "Start Broadcasting"}
      </button>
      
      <button 
        className={`control-button ${isViewingEnabled ? 'on' : 'off'}`}
        onClick={onToggleViewing}
        title={isViewingEnabled ? "Pause Viewing" : "Resume Viewing"}
      >
        {isViewingEnabled ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

export default StreamControls;