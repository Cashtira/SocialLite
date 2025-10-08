function Feed() {
  const posts = [
    { id: 1, user: "Minh Kha", content: "Bài đăng đầu tiên." },
    { id: 2, user: "Kha Minh", content: "Bài đăng thứ hai." },
    { id: 3, user: "Kinh Mha", content: "GEN G vô địch rồi." },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Bảng tin</h2>
      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 hover:shadow transition-shadow"
          >
            <p className="font-semibold text-blue-600">{p.user}</p>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;