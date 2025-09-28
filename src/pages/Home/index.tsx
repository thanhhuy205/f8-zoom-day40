import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4">
      <h1 className="text-2xl font-bold">Chào mừng đến trang Home</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/task"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Xem Tasks
        </Link>
        <a
          href="/redux.html"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Redux Demo
        </a>
      </div>
    </div>
  );
};

export default Home;
