import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");  // Update with your backend URL

const Viewer = () => {
    const videoRef = useRef(null);
    const peerRef = useRef(null);
    const roomId = "room-123"; // Static room ID (must match streamer's room)
  
    useEffect(() => {
      // Join the stream room
      socket.emit("join-stream", roomId);
  
      // Initialize RTCPeerConnection
      peerRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN server for NAT traversal
      });
  
      // Handle ICE candidates
      peerRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate:", event.candidate);
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };
  
      // Handle incoming tracks (stream)
      peerRef.current.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0]; // Display the stream
        }
      };
  
      // Handle offer from streamer
      socket.on("offer", async (offer) => {
        console.log("Received offer from streamer:", offer);
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
  
        // Create and send answer
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socket.emit("answer", { answer, roomId });
      });
  
      // Handle ICE candidates from streamer
      socket.on("ice-candidate", ({ candidate }) => {
        if (candidate) {
          try {
            peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error) {
            console.error("Error adding ICE candidate:", error);
          }
        }
      });
  
      // Cleanup on unmount
      return () => {
        peerRef.current.close();
        socket.off("offer");
        socket.off("ice-candidate");
      };
    }, []);
  
    return <video className = 'ml-auto w-[70%]' ref={videoRef} autoPlay playsInline />;
  };

export default Viewer;