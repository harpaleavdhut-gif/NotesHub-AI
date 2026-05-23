function NoteCard({ note }) {

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* TOP */}

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-36 flex items-center justify-center">

        <h1 className="text-6xl text-white">
          📘
        </h1>

      </div>


      {/* CONTENT */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800">
          {note.title}
        </h2>

        <p className="mt-4 text-gray-600">
          📚 Subject:
          <span className="font-semibold ml-2">
            {note.subject}
          </span>
        </p>

        <p className="mt-2 text-gray-600">
          🎓 Semester:
          <span className="font-semibold ml-2">
            {note.semester}
          </span>
        </p>


        {/* BUTTONS */}

        <div className="flex gap-3 mt-6">

          {/* VIEW PDF */}

          <a
            href={`http://localhost:5000/uploads/${note.pdf}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition font-semibold"
          >
            View
          </a>


          {/* DOWNLOAD PDF */}

          <a
            href={`http://localhost:5000/uploads/${note.pdf}`}
            download
            className="flex-1 text-center bg-purple-600 text-white py-3 rounded-2xl hover:bg-purple-700 transition font-semibold"
          >
            Download
          </a>

        </div>

      </div>

    </div>
  );
}

export default NoteCard;