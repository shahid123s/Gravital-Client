// File: src/pages/StreamingApp.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { Device } from 'mediasoup-client';

// Components
import StreamControls from './StreamControls';
import ParticipantsList from './ParticipantsList';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';

// Styles
import './StreamingApp.css';

const StreamingApp = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isViewingEnabled, setIsViewingEnabled] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  
  // MediaSoup related state
  const socketRef = useRef(null);
  const deviceRef = useRef(null);
  const producerTransportRef = useRef(null);
  const consumerTransportRef = useRef(null);
  const producersRef = useRef(new Map());
  const consumersRef = useRef(new Map());
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  
  // User information
  const [user, setUser] = useState(() => ({
    id: `user-${Math.random().toString(36).substring(2, 9)}`,
    name: localStorage.getItem('username') || 'Anonymous',
    isBroadcaster: false
  }));

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = socketIOClient(process.env.REACT_APP_API_URL || 'http://localhost:8001');
    
    // Set up socket event listeners
    setupSocketListeners();
    
    // Initialize MediaSoup device
    initializeDevice();
    
    // Join the room
    joinRoom();
    
    // Cleanup function
    return () => {
      leaveRoom();
      closeMediaConnections();
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const setupSocketListeners = () => {
    const socket = socketRef.current;
    
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });
    
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to the server');
    });
    
    socket.on('roomInfo', ({ participants: roomParticipants }) => {
      setParticipants(roomParticipants);
    });
    
    socket.on('newParticipant', (participant) => {
      setParticipants(prev => [...prev, participant]);
    });
    
    socket.on('participantLeft', (participantId) => {
      setParticipants(prev => prev.filter(p => p.id !== participantId));
    });
    
    socket.on('broadcastStarted', ({ peerId, peerName }) => {
      console.log(`${peerName} started broadcasting`);
      setParticipants(prev => 
        prev.map(p => p.id === peerId ? { ...p, isBroadcasting: true } : p)
      );
    });
    
    socket.on('broadcastStopped', ({ peerId }) => {
      console.log(`Peer ${peerId} stopped broadcasting`);
      setParticipants(prev => 
        prev.map(p => p.id === peerId ? { ...p, isBroadcasting: false } : p)
      );
    });
    
    socket.on('chatMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // MediaSoup specific events
    socket.on('rtpCapabilities', ({ rtpCapabilities }) => {
      loadDevice(rtpCapabilities);
    });
    
    socket.on('producerTransportCreated', async ({ transportOptions }) => {
      await createProducerTransport(transportOptions);
    });
    
    socket.on('consumerTransportCreated', async ({ transportOptions }) => {
      await createConsumerTransport(transportOptions);
    });
    
    socket.on('producerConnected', () => {
      console.log('Producer transport connected');
      startProducing();
    });
    
    socket.on('consumerConnected', () => {
      console.log('Consumer transport connected');
      startConsuming();
    });
    
    socket.on('newConsumer', async ({ consumerId, producerId, kind, rtpParameters }) => {
      await consumeTrack(consumerId, producerId, kind, rtpParameters);
    });
    
    socket.on('consumerClosed', ({ consumerId }) => {
      removeConsumer(consumerId);
    });
    
    socket.on('error', ({ message }) => {
      setError(message);
    });
  };

  const initializeDevice = async () => {
    try {
      deviceRef.current = new Device();
    } catch (error) {
      console.error('Failed to create device:', error);
      setError('Your browser is not supported');
    }
  };

  const loadDevice = async (routerRtpCapabilities) => {
    try {
      await deviceRef.current.load({ routerRtpCapabilities });
      console.log('Device loaded');
      
      // If the user wants to broadcast, request a producer transport
      if (user.isBroadcaster) {
        socketRef.current.emit('createProducerTransport', { 
          roomId, 
          peerId: user.id 
        });
      }
      
      // Always create a consumer transport for viewing
      socketRef.current.emit('createConsumerTransport', { 
        roomId, 
        peerId: user.id 
      });
    } catch (error) {
      console.error('Failed to load device:', error);
      setError('Failed to initialize media capabilities');
    }
  };

  const joinRoom = () => {
    socketRef.current.emit('joinRoom', { 
      roomId, 
      peerId: user.id, 
      peerName: user.name,
      isBroadcaster: user.isBroadcaster 
    });
  };

  const leaveRoom = () => {
    socketRef.current.emit('leaveRoom', { 
      roomId, 
      peerId: user.id 
    });
  };
  
  const createProducerTransport = async (transportOptions) => {
    try {
      producerTransportRef.current = deviceRef.current.createSendTransport(transportOptions);
      
      producerTransportRef.current.on('connect', ({ dtlsParameters }, callback, errback) => {
        socketRef.current.emit('connectProducerTransport', {
          transportId: producerTransportRef.current.id,
          dtlsParameters
        }, (response) => {
          if (response.error) {
            errback(new Error(response.error));
          } else {
            callback();
          }
        });
      });
      
      producerTransportRef.current.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
        socketRef.current.emit('produce', {
          roomId,
          peerId: user.id,
          transportId: producerTransportRef.current.id,
          kind,
          rtpParameters
        }, (response) => {
          if (response.error) {
            errback(new Error(response.error));
          } else {
            callback({ id: response.producerId });
          }
        });
      });
      
      producerTransportRef.current.on('connectionstatechange', (state) => {
        console.log('Producer transport connection state:', state);
        if (state === 'failed' || state === 'closed') {
          producerTransportRef.current = null;
        }
      });
      
    } catch (error) {
      console.error('Failed to create producer transport:', error);
      setError('Failed to create broadcasting connection');
    }
  };
  
  const createConsumerTransport = async (transportOptions) => {
    try {
      consumerTransportRef.current = deviceRef.current.createRecvTransport(transportOptions);
      
      consumerTransportRef.current.on('connect', ({ dtlsParameters }, callback, errback) => {
        socketRef.current.emit('connectConsumerTransport', {
          transportId: consumerTransportRef.current.id,
          dtlsParameters
        }, (response) => {
          if (response.error) {
            errback(new Error(response.error));
          } else {
            callback();
          }
        });
      });
      
      consumerTransportRef.current.on('connectionstatechange', (state) => {
        console.log('Consumer transport connection state:', state);
        if (state === 'failed' || state === 'closed') {
          consumerTransportRef.current = null;
        }
      });
      
    } catch (error) {
      console.error('Failed to create consumer transport:', error);
      setError('Failed to create viewing connection');
    }
  };
  
  const startProducing = async () => {
    if (!producerTransportRef.current) {
      console.error('No producer transport available');
      return;
    }
    
    try {
      // Request user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }
      });
      
      streamRef.current = stream;
      
      // Update local video preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Produce audio track
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const audioProducer = await producerTransportRef.current.produce({
          track: audioTrack,
          codecOptions: {
            opusStereo: true,
            opusDtx: true
          }
        });
        
        producersRef.current.set('audio', audioProducer);
        
        audioProducer.on('trackended', () => {
          console.log('Audio track ended');
          stopProducing('audio');
        });
        
        audioProducer.on('transportclose', () => {
          console.log('Audio transport closed');
          producersRef.current.delete('audio');
        });
      }
      
      // Produce video track
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const videoProducer = await producerTransportRef.current.produce({
          track: videoTrack,
          encodings: [
            { maxBitrate: 500000, scaleResolutionDownBy: 2 },
            { maxBitrate: 1000000, scaleResolutionDownBy: 1 }
          ],
          codecOptions: {
            videoGoogleStartBitrate: 1000
          }
        });
        
        producersRef.current.set('video', videoProducer);
        
        videoProducer.on('trackended', () => {
          console.log('Video track ended');
          stopProducing('video');
        });
        
        videoProducer.on('transportclose', () => {
          console.log('Video transport closed');
          producersRef.current.delete('video');
        });
      }
      
      setIsBroadcasting(true);
      setUser(prev => ({ ...prev, isBroadcaster: true }));
      
      socketRef.current.emit('broadcastStarted', { roomId, peerId: user.id });
      
    } catch (error) {
      console.error('Failed to produce media:', error);
      setError('Failed to access camera or microphone');
    }
  };
  
  const stopProducing = async (kind = null) => {
    if (kind) {
      const producer = producersRef.current.get(kind);
      if (producer) {
        producer.close();
        producersRef.current.delete(kind);
      }
      
      // If we've stopped both audio and video, update state
      if (producersRef.current.size === 0) {
        setIsBroadcasting(false);
        setUser(prev => ({ ...prev, isBroadcaster: false }));
        socketRef.current.emit('broadcastStopped', { roomId, peerId: user.id });
      }
    } else {
      // Stop all producers
      for (const producer of producersRef.current.values()) {
        producer.close();
      }
      producersRef.current.clear();
      
      // Stop and release media stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      setIsBroadcasting(false);
      setUser(prev => ({ ...prev, isBroadcaster: false }));
      socketRef.current.emit('broadcastStopped', { roomId, peerId: user.id });
    }
  };
  
  const startConsuming = () => {
    socketRef.current.emit('getProducers', { roomId });
  };
  
  const consumeTrack = async (consumerId, producerId, kind, rtpParameters) => {
    if (!consumerTransportRef.current) {
      console.error('No consumer transport available');
      return;
    }
    
    try {
      const consumer = await consumerTransportRef.current.consume({
        id: consumerId,
        producerId,
        kind,
        rtpParameters,
      });
      
      consumersRef.current.set(consumerId, consumer);
      
      // Resume the consumer (start receiving media)
      socketRef.current.emit('resumeConsumer', { consumerId });
      
      // Create or update the video element for this consumer
      const stream = new MediaStream([consumer.track]);
      
      // Find the producer's peer information
      const producerPeer = participants.find(p => p.producers?.includes(producerId));
      
      // Create a new video element or update existing
      const videoContainer = document.getElementById('remote-videos');
      if (videoContainer) {
        let videoEl = document.getElementById(`video-${producerId}`);
        
        if (!videoEl && kind === 'video') {
          videoEl = document.createElement('video');
          videoEl.id = `video-${producerId}`;
          videoEl.autoplay = true;
          videoEl.playsInline = true;
          
          const nameDiv = document.createElement('div');
          nameDiv.className = 'peer-name';
          nameDiv.innerText = producerPeer?.name || 'Unknown';
          
          const videoWrapper = document.createElement('div');
          videoWrapper.className = 'video-wrapper';
          videoWrapper.appendChild(videoEl);
          videoWrapper.appendChild(nameDiv);
          
          videoContainer.appendChild(videoWrapper);
        }
        
        if (videoEl) {
          videoEl.srcObject = stream;
        }
      }
      
      consumer.on('trackended', () => {
        removeConsumer(consumerId);
      });
      
      consumer.on('transportclose', () => {
        removeConsumer(consumerId);
      });
      
    } catch (error) {
      console.error('Failed to consume track:', error);
    }
  };
  
  const removeConsumer = (consumerId) => {
    const consumer = consumersRef.current.get(consumerId);
    if (!consumer) return;
    
    consumer.close();
    consumersRef.current.delete(consumerId);
    
    // Remove the video element if it exists
    const videoEl = document.getElementById(`video-${consumer.producerId}`);
    if (videoEl) {
      const wrapper = videoEl.parentNode;
      if (wrapper) {
        wrapper.parentNode.removeChild(wrapper);
      }
    }
  };
  
  const closeMediaConnections = () => {
    // Close all producers
    for (const producer of producersRef.current.values()) {
      producer.close();
    }
    producersRef.current.clear();
    
    // Close all consumers
    for (const consumer of consumersRef.current.values()) {
      consumer.close();
    }
    consumersRef.current.clear();
    
    // Close transports
    if (producerTransportRef.current) {
      producerTransportRef.current.close();
      producerTransportRef.current = null;
    }
    
    if (consumerTransportRef.current) {
      consumerTransportRef.current.close();
      consumerTransportRef.current = null;
    }
    
    // Stop local stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  const toggleBroadcasting = async () => {
    if (isBroadcasting) {
      stopProducing();
    } else {
      // Request a producer transport if not already available
      if (!producerTransportRef.current && deviceRef.current?.loaded) {
        socketRef.current.emit('createProducerTransport', { 
          roomId, 
          peerId: user.id 
        });
      } else if (producerTransportRef.current) {
        startProducing();
      }
    }
  };
  
  const toggleViewingEnabled = () => {
    setIsViewingEnabled(!isViewingEnabled);
    
    // Pause or resume all consumers
    for (const consumer of consumersRef.current.values()) {
      if (isViewingEnabled) {
        socketRef.current.emit('pauseConsumer', { consumerId: consumer.id });
      } else {
        socketRef.current.emit('resumeConsumer', { consumerId: consumer.id });
      }
    }
  };
  
  const sendChatMessage = (text) => {
    socketRef.current.emit('sendChatMessage', {
      roomId,
      sender: user.name,
      senderId: user.id,
      text,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="streaming-app">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <header className="app-header">
        <h1>Room: {roomId}</h1>
        <div className="connection-status">
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <button className="leave-button" onClick={() => navigate('/')}>
          Leave Room
        </button>
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <ParticipantsList participants={participants} currentUserId={user.id} />
          <Chat messages={messages} onSendMessage={sendChatMessage} />
        </aside>
        
        <main className="video-area">
          {/* Local preview */}
          {isBroadcasting && (
            <div className="local-video-container">
              <h3>You are broadcasting</h3>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="local-video"
              />
            </div>
          )}
          
          {/* Remote videos */}
          <div id="remote-videos" className="remote-videos-container">
            {participants.length === 0 && (
              <div className="empty-room-message">
                <p>No one else is in this room yet</p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <StreamControls
        isBroadcasting={isBroadcasting}
        isViewingEnabled={isViewingEnabled}
        onToggleBroadcast={toggleBroadcasting}
        onToggleViewing={toggleViewingEnabled}
      />
    </div>
  );
};

export default StreamingApp;