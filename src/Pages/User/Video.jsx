import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function Video() {
  const videoRef = useRef(null);
  const [isBroadcaster, setIsBroadcaster] = useState(false);

  useEffect(() => {
    socket.on("viewer-consume", async ({ rtpCapabilities }) => {
      console.log("Viewer consuming stream...");
      socket.emit("consume", { rtpCapabilities });
    });

    socket.on("consumer-ready", async ({ id, producerId, kind, rtpParameters }) => {
      console.log("Consumer received:", { id, producerId, kind, rtpParameters });

      const transport = await socket.emit("createConsumerTransport");
      socket.emit("resumeConsumer", { id });

      const track = new MediaStreamTrack(rtpParameters);
      const stream = new MediaStream();
      stream.addTrack(track);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const startStreaming = async () => {
    setIsBroadcaster(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    socket.emit("broadcaster-start", { kind: "video" });

    stream.getTracks().forEach((track) => {
      socket.emit("produce", { track });
    });
  };

  const joinStream = () => {
    setIsBroadcaster(false);
    socket.emit("viewer-join");
  };

  return (
    <div>
      <h1>One-to-Many Live Streaming</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: "600px", height: "400px" }} />
      <div>
        <button onClick={startStreaming} disabled={isBroadcaster}>
          Start Broadcasting
        </button>
        <button onClick={joinStream}>Join as Viewer</button>
      </div>
    </div>
  );
}

export default Video;