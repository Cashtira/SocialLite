import { useState, useRef, useEffect } from "react";

export default function Live() {
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsLive(true);
    } catch (err) {
      alert("Không thể truy cập camera/mic: " + err.message);
    }
  };

  const stopLive = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsLive(false);
  };

  useEffect(() => {
    // Cleanup khi rời trang
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  return (
    <div className="max-w-3xl mx-auto pt-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🎥 Live Stream</h1>

      {/* Luôn render video để ref không bị null */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className={`w-full rounded-lg shadow-lg mb-4 transition-all duration-300 ${
          isLive ? "block" : "hidden"
        }`}
      />

      {!isLive ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="relative bg-gray-200 aspect-video rounded-lg overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                  Live #{n}
                </div>
                <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  🔴 Live
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={startLive}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Go Live 🚀
          </button>
        </>
      ) : (
        <div className="flex justify-center gap-4">
          <button
            onClick={stopLive}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Dừng Live
          </button>
        </div>
      )}
    </div>
  );
}