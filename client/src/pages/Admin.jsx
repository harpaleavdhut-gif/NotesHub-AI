import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const usersRes =
        await API.get(
          "/admin/users",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const notesRes =
        await API.get(
          "/admin/notes",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUsers(usersRes.data);
      setNotes(notesRes.data);

    } catch (error) {
      console.log(error);
    }

  };

  const deleteUser = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {
      console.log(error);
    }

  };

  const deleteNote = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/admin/notes/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        👑 Admin Dashboard

      </h1>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-5xl font-bold text-blue-600">
            {users.length}
          </h2>

          <p>Total Users</p>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow">

          <h2 className="text-5xl font-bold text-purple-600">
            {notes.length}
          </h2>

          <p>Total Notes</p>

        </div>

      </div>

      {/* USERS */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-5">
          Users
        </h2>

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-3"
          >

            <div>

              <h3 className="font-bold">
                {user.name}
              </h3>

              <p>
                {user.email}
              </p>

            </div>

            <button
              onClick={() =>
                deleteUser(user._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* NOTES */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-5">
          Notes
        </h2>

        {notes.map((note) => (

          <div
            key={note._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-3"
          >

            <div>

              <h3 className="font-bold">
                {note.title}
              </h3>

              <p>
                {note.subject}
              </p>

            </div>

            <button
              onClick={() =>
                deleteNote(note._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Admin;