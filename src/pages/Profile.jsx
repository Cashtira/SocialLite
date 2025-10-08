function Profile() {
  const videos = [
    { id: 1, title: "Chuyến đi Đà Lạt", thumbnail: "🎬" },
    { id: 2, title: "Buổi live đầu tiên", thumbnail: "🔥" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl">
          😎
        </div>
        <div>
          <h2 className="text-xl font-bold">Minh Kha</h2>
          <p className="text-gray-600">Thành viên từ 2025</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Video của bạn</h3>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((v) => (
          <div
            key={v.id}
            className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-2">{v.thumbnail}</div>
            <p className="font-medium">{v.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;