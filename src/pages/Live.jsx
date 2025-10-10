import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../hooks/useUser.js";

export default function Live() {
  const { currentUser } = useUser();
  const [isLive, setIsLive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setIsLive(true);
    } catch (err) {
      alert("Không thể truy cập camera/mic: " + err.message);
    }
  };

  const stopLive = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setStream(null);
    setIsLive(false);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  return (
    <div className="max-w-3xl mx-auto pt-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🎥 Live Stream</h1>

      {!isLive ? (
        <button
          onClick={startLive}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          🚀 Go Live
        </button>
      ) : (
        <div className="relative inline-block w-full max-w-[640px]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full aspect-video rounded-xl shadow-lg bg-black"
          />

          {/* Thông tin người live */}
          {currentUser && (
            <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/50 px-3 py-2 rounded-full">
              <img
                src={currentUser.avatar || "https://i.pravatar.cc/40"}
                alt={currentUser.name || "User"}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <p className="text-white font-semibold">@{currentUser.name || "Ẩn danh"}</p>
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button
              onClick={stopLive}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              🛑 Dừng Live
            </button>
          </div>
        </div>
      )}
    </div>
  );
}