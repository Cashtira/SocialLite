import { useState } from "react";

function Upload() {
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đăng bài: ${caption}`);
    setCaption("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Đăng bài mới</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="border rounded-lg p-3 focus:outline-blue-400"
          rows="4"
          placeholder="Chia sẻ điều gì đó..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="video/*"
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Đăng
        </button>
      </form>
    </div>
  );
}

export default Upload;