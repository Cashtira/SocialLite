import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../hooks/useUser.js";

export default function Live() {
  const { currentUser } = useUser();
  const [isLive, setIsLive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // Like + Comment states
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

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
    setLikes(0);
    setComments([]);
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

          {/* Like + Comment */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4">
            <button
              onClick={() => setLikes((prev) => prev + 1)}
              className="flex flex-col items-center text-white hover:scale-110 transition"
            >
              <span className="text-3xl">❤️</span>
              <span className="text-sm">{likes}</span>
            </button>

            <button
              onClick={() => setShowComments((s) => !s)}
              className="flex flex-col items-center text-white hover:scale-110 transition"
            >
              <span className="text-3xl">💬</span>
              <span className="text-sm">{comments.length}</span>
            </button>
          </div>

          {/* Hộp bình luận */}
          {showComments && (
            <div className="absolute right-20 top-10 bg-white/95 rounded-2xl shadow-xl w-72 p-3 h-[70%] overflow-y-auto">
              <h3 className="font-semibold text-lg mb-2">Bình luận</h3>

              <div className="space-y-2 mb-3">
                {comments.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center">Chưa có bình luận.</p>
                ) : (
                  comments.map((c, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <img
                        src={c.user.avatar || "https://i.pravatar.cc/30"}
                        alt={c.user.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                        <p className="font-medium">{c.user.name}</p>
                        <p>{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Nhập bình luận */}
              <div className="flex gap-2 mt-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Nhập bình luận..."
                  className="flex-1 border rounded-lg px-2 py-1 text-sm"
                />
                <button
                  onClick={() => {
                    if (commentText.trim()) {
                      setComments((prev) => [
                        ...prev,
                        { user: currentUser, text: commentText },
                      ]);
                      setCommentText("");
                    }
                  }}
                  className="bg-blue-600 text-white px-3 rounded-lg text-sm"
                >
                  Gửi
                </button>
              </div>
            </div>
          )}

          {/*  Nút dừng Live */}
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