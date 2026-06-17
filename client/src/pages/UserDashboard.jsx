import { useEffect, useState } from "react";

import API from "../services/api";

import NoteCard from "../components/NoteCard";

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
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">
        <h1 className="text-5xl font-bold">🎓 Student Dashboard</h1>

        <p className="mt-4 text-xl">Welcome {user?.name}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-blue-700">{notes.length}</h2>
          <p>Total Notes</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-green-700">📤</h2>
          <p>Upload Notes</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-purple-700">👤</h2>
          <p>My Profile</p>
        </div>
      </div>

      <div className="mt-10">
        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl border"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
