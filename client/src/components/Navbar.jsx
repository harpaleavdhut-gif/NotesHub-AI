import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaHome,
  FaUpload,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* LOGO */}

        <Link to="/" className="flex items-center gap-3">
          <FaBook className="text-3xl text-blue-700" />

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            🧠 NotesHub AI{" "}
          </h1>
        </Link>

        {/* MENU */}

        <div className="flex items-center gap-6 font-semibold">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaHome />
            Home
          </Link>

          {user && (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </Link>

              <Link
                to="/upload"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <FaUpload />
                Upload
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <FaUser />
                Profile
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700"
            >
              <FaUserShield />
              Admin
            </Link>
          )}

          {/* DARK MODE */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* LOGIN / LOGOUT */}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
