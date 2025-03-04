import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); 
function StreamingPage() {
    const videoRef = useRef(null);
    const peerRef = useRef(null);
    const streamRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const roomId = "room-123"; // Static room ID (can be dynamic in production)
  
    const startStream = async () => {
      try {
        // Get user media (video and audio)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
  
        // Display stream in video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
  
        // Initialize RTCPeerConnection
        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN server for NAT traversal
        });
  
        // Add tracks to the peer connection
        stream.getTracks().forEach((track) => peerRef.current.addTrack(track, stream));
  
        // Handle ICE candidates
        peerRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Sending ICE candidate:", event.candidate);
            socket.emit("ice-candidate", { candidate: event.candidate, roomId });
          }
        };
  
        // Create and send offer
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.emit("offer", { offer, roomId });
  
        // Notify backend that streaming has started
        socket.emit("start-stream", roomId);
        setIsStreaming(true);
      } catch (error) {
        console.error("Error starting stream:", error);
      }
    };
  
    const stopStream = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks
      }
  
      if (peerRef.current) {
        peerRef.current.close(); // Close peer connection
        peerRef.current = null;
      }
  
      socket.emit("stop-stream", roomId); // Notify backend
      setIsStreaming(false);
    };
  
    useEffect(() => {
      // Handle answer from viewer
      socket.on("answer", async (answer) => {
        if (peerRef.current && peerRef.current.signalingState === "have-local-offer") {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });
  
      // Handle ICE candidates from viewer
      socket.on("ice-candidate", async ({ candidate }) => {
        if (candidate) {
          try {
            await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error) {
            console.error("Error adding ICE candidate:", error);
          }
        }
      });
  
      return () => {
        stopStream(); // Cleanup on unmount
      };
    }, []);
  
    return (
      <div>
        <video ref={videoRef} autoPlay playsInline muted /> {/* Muted to avoid echo */}
        <div>
          {!isStreaming ? (
            <button onClick={startStream}>Start Live</button>
          ) : (
            <button onClick={stopStream}>Stop Live</button>
          )}
        </div>
      </div>
    );
  }


export default StreamingPage
