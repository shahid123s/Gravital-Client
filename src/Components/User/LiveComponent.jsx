import React from 'react'
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");  // Update with your backend URL
function LiveComponent() {
    const videoRef = useRef(null);
    const peerRef = useRef(null);
    const roomId = "room-123";  // Static Room ID (you can make it dynamic)

    useEffect(() => {
        // Get user media (camera & mic)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                peerRef.current = new RTCPeerConnection({
                    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
                });

                stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

                // When ICE candidate is generated, send it to viewers
                peerRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit("ice-candidate", { candidate: event.candidate, roomId });
                    }
                };

                // Create offer and send to viewers
                peerRef.current.createOffer()
                    .then(offer => {
                        peerRef.current.setLocalDescription(offer);
                        socket.emit("offer", { offer, roomId });
                    });

                socket.emit("start-stream", roomId);
            });
            

        // Receive answer from viewers
        socket.on("answer", (answer) => {
            peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        // Receive ICE candidates from viewers
        socket.on("ice-candidate", (candidate) => {
            peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        });

    }, []);
  return (
    <div className= "" >

         <video className= 'ml-auto' ref={videoRef} autoPlay playsInline />;
    </div>
  )
}

export default LiveComponent
