import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/NoteCard";

import { FaBook, FaBookmark, FaDownload, FaFire } from "react-icons/fa";

function UserDashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.subject.toLowerCase().includes(search.toLowerCase()) ||
        note.category.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredNotes(filtered);
  }, [search, notes]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");

      setNotes(res.data);
      setFilteredNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6 md:p-10">
      {/* HERO */}

      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          👋 Welcome Back, {user?.name}
        </h1>

        <p className="text-gray-700 mt-4 text-lg">
          Discover, Upload and Manage Notes Easily.
        </p>
      </div>

      {/* PREMIUM STATS */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:scale-105 hover:-translate-y-2 transition duration-300">
          <FaBook className="text-4xl text-blue-600" />

          <h2 className="text-4xl font-bold text-gray-800 mt-4">
            {notes.length}
          </h2>

          <p className="text-gray-600 mt-2">Total Notes</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:scale-105 hover:-translate-y-2 transition duration-300">
          <FaBookmark className="text-4xl text-yellow-500" />

          <h2 className="text-4xl font-bold text-gray-800 mt-4">0</h2>

          <p className="text-gray-600 mt-2">Saved Notes</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:scale-105 hover:-translate-y-2 transition duration-300">
          <FaDownload className="text-4xl text-green-600" />

          <h2 className="text-4xl font-bold text-gray-800 mt-4">0</h2>

          <p className="text-gray-600 mt-2">Downloads</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:scale-105 hover:-translate-y-2 transition duration-300">
          <FaFire className="text-4xl text-red-500" />

          <h2 className="text-4xl font-bold text-gray-800 mt-4">Hot</h2>

          <p className="text-gray-600 mt-2">Trending Notes</p>
        </div>
      </div>

      {/* SEARCH BAR */}

      <div className="mt-10">
        <input
          type="text"
          placeholder="🔍 Search Notes by title, subject or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-5 rounded-3xl shadow-xl bg-white border-0 text-black placeholder-gray-500 focus:ring-4 focus:ring-blue-300 outline-none"
        />
      </div>

      {/* NOTES */}

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800">Available Notes 📚</h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
