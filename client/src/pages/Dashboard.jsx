import { useEffect, useState } from "react";

import API from "../services/api";

import NoteCard from "../components/NoteCard";

function Dashboard() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {

    fetchNotes();

  }, []);

  const fetchNotes = async () => {

    try {

      const res = await API.get("/notes");

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* TOP SECTION */}

      <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">

        <h1 className="text-5xl font-extrabold">
          Welcome to NotesHub 🚀
        </h1>

        <p className="mt-4 text-xl text-gray-200">
          Manage, upload and explore study materials easily.
        </p>

      </div>


      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-8 mt-10">

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition">

          <h2 className="text-5xl font-bold text-blue-700">
            {notes.length}
          </h2>

          <p className="mt-3 text-gray-600 text-lg">
            Total Notes
          </p>

        </div>


        <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition">

          <h2 className="text-5xl font-bold text-green-700">
            120+
          </h2>

          <p className="mt-3 text-gray-600 text-lg">
            Active Students
          </p>

        </div>


        <div className="bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition">

          <h2 className="text-5xl font-bold text-purple-700">
            350+
          </h2>

          <p className="mt-3 text-gray-600 text-lg">
            Downloads
          </p>

        </div>

      </div>


      {/* NOTES SECTION */}

      <div className="mt-14">

        <div className="flex justify-between items-center">

          <h1 className="text-4xl font-bold text-gray-800">
            Recent Notes 📚
          </h1>

        </div>


        <div className="grid md:grid-cols-3 gap-8 mt-8">

          {notes.length > 0 ? (

            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
              />
            ))

          ) : (

            <div className="bg-white p-10 rounded-3xl shadow-lg">

              <h2 className="text-2xl font-semibold text-gray-600">
                No Notes Available
              </h2>

              <p className="mt-3 text-gray-500">
                Upload your first study material 🚀
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;