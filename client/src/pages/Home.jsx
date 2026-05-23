import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="flex flex-col justify-center items-center h-[85vh] text-center px-5">

      <h1 className="text-6xl font-extrabold text-blue-700">
        College Notes Sharing Platform
      </h1>

      <p className="mt-6 text-xl text-gray-700 max-w-[700px]">
        Upload, download and share study materials with students easily.
        A smart platform for organized learning and collaboration 🚀
      </p>

      <div className="mt-10 flex gap-5">

        <Link
          to="/register"
          className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-800 transition"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-xl text-lg hover:bg-blue-700 hover:text-white transition"
        >
          Login
        </Link>

      </div>

    </div>
  );
}

export default Home;