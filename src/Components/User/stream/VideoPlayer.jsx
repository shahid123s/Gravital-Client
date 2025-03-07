// File: src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ stream, peerName, isLocalVideo = false }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);
  
  return (
    <div className={`video-player ${isLocalVideo ? 'local-video' : 'remote-video'}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocalVideo}
      />
      {peerName && (
        <div className="peer-name">
          {peerName} {isLocalVideo && '(You)'}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;