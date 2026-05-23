import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 px-10 py-5 flex justify-between items-center shadow-xl sticky top-0 z-50">

      <Link
        to="/"
        className="text-4xl font-extrabold text-white tracking-wide"
      >
        NotesHub
      </Link>


      <div className="flex gap-8 text-lg text-white font-medium">

        <Link className="hover:text-yellow-300 transition" to="/">
          Home
        </Link>

        <Link className="hover:text-yellow-300 transition" to="/dashboard">
          Dashboard
        </Link>

        <Link className="hover:text-yellow-300 transition" to="/upload">
          Upload
        </Link>

        <Link className="hover:text-yellow-300 transition" to="/login">
          Login
        </Link>

        <Link className="hover:text-yellow-300 transition" to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;