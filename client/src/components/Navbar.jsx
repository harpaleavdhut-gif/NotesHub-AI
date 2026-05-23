import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        NotesHub
      </h1>

      <div className="flex gap-4">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/upload">Upload</Link>

      </div>

    </nav>
  );
}

export default Navbar;