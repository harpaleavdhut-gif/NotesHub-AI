import API from "../services/api";

function NoteCard({ note }) {

  const deleteNote = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(

        `/notes/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-36 flex items-center justify-center">

        <h1 className="text-6xl text-white">
          📘
        </h1>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800">
          {note.title}
        </h2>

        <p className="mt-4">
          Subject: {note.subject}
        </p>

        <p className="mt-2">
          Category: {note.category}
        </p>

        <p className="mt-2">
          Downloads: {note.downloads}
        </p>

        <div className="flex gap-3 mt-6">

          <a
            href={`http://localhost:5000/uploads/${note.pdf}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-2xl"
          >
            View
          </a>

          <button
            onClick={() =>
              deleteNote(note._id)
            }
            className="flex-1 bg-red-500 text-white py-3 rounded-2xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default NoteCard;