import API from "../services/api";
import { useState } from "react";
import { FaBook, FaDownload, FaTrash, FaTag } from "react-icons/fa";

function NoteCard({ note }) {
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/notes/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (id) => {
    try {
      await API.put(`/notes/download/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 h-40 flex flex-col justify-center items-center">
        <FaBook className="text-6xl text-white mb-2 group-hover:scale-110 transition" />

        <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm backdrop-blur">
          {note.category}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {note.title}
        </h2>

        <p className="mt-4 flex items-center gap-2 text-gray-600">
          <FaTag />

          {note.subject}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {note.category}
          </span>

          <span className="flex items-center gap-2 text-green-600 font-semibold">
            <FaDownload />

            {note.downloads}
          </span>
        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-3 gap-3 mt-6">
          {/* VIEW */}

          <button
            onClick={() =>
              window.open(`http://localhost:5000/uploads/${note.pdf}`, "_blank")
            }
            className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:opacity-90"
          >
            👁 View
          </button>

          {/* DOWNLOAD */}

          <a
            href={`http://localhost:5000/uploads/${note.pdf}`}
            download
            onClick={() => handleDownload(note._id)}
            className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:opacity-90"
          >
            📥 Download
          </a>

          {/* DELETE */}

          <button
            onClick={() => deleteNote(note._id)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-2xl font-semibold hover:opacity-90"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
