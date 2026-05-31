import { useEffect, useState } from "react";

import API from "../services/api";

import NoteCard from "../components/NoteCard";

function Profile() {

  const [notes, setNotes] = useState([]);

  const [profileImage, setProfileImage] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");


  // SAFE USER FETCH

  const user = JSON.parse(
    localStorage.getItem("user")
  ) || {
    _id: "",
    name: "Guest User",
    email: "guest@gmail.com",
    profileImage: "",
  };


  // LOAD USER DATA

  useEffect(() => {

    setName(user?.name || "");

    setEmail(user?.email || "");

    setProfileImage(
      user?.profileImage || ""
    );

    fetchNotes();

  }, []);


  // FETCH NOTES

  const fetchNotes = async () => {

    try {

      const res = await API.get("/notes");

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // IMAGE UPLOAD

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();

    data.append(
      "profileImage",
      file
    );

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.put(

        `/users/upload-profile/${user._id}`,

        data,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      // UPDATED USER

      const updatedUser =
        res.data.user;


      // UPDATE STATE

      setProfileImage(
        updatedUser.profileImage
      );


      // UPDATE LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      alert(
        "Profile Photo Updated 🚀"
      );

    } catch (error) {

      console.log(error);

      alert("Image Upload Failed");

    }

  };


  // EDIT PROFILE

  const handleUpdateProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.put(

        `/users/edit-profile/${user._id}`,

        {
          name,
          email,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      // UPDATED USER

      const updatedUser =
        res.data.user;


      // UPDATE LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      alert(
        "Profile Updated Successfully 🚀"
      );

    } catch (error) {

      console.log(error);

      alert("Profile Update Failed");

    }

  };


  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* PROFILE SECTION */}

      <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-10 shadow-2xl text-white flex flex-col md:flex-row items-center gap-10">

        {/* PROFILE IMAGE */}

        <div className="relative">

          {profileImage ? (

            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
            />

          ) : (

            <div className="w-40 h-40 rounded-full bg-white text-blue-700 flex items-center justify-center text-6xl font-bold shadow-2xl">

              {user?.name?.charAt(0)}

            </div>

          )}


          {/* CAMERA BUTTON */}

          <label className="absolute bottom-0 right-0 bg-white text-blue-700 px-4 py-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition">

            📷

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />

          </label>

        </div>


        {/* USER INFO */}

        <div className="w-full md:w-[500px]">

          <h1 className="text-5xl font-extrabold">
            My Profile 👤
          </h1>


          {/* NAME */}

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full mt-6 p-4 rounded-2xl text-black outline-none"
            placeholder="Enter Name"
          />


          {/* EMAIL */}

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full mt-4 p-4 rounded-2xl text-black outline-none"
            placeholder="Enter Email"
          />


          {/* SAVE BUTTON */}

          <button
            onClick={handleUpdateProfile}
            className="mt-6 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
          >
            Save Profile
          </button>


          <p className="mt-6 text-lg">
            📚 Uploaded Notes:
            <span className="font-bold ml-2">
              {notes.length}
            </span>
          </p>

        </div>

      </div>


      {/* NOTES SECTION */}

      <div className="mt-14">

        <h1 className="text-4xl font-bold text-gray-800">
          Uploaded Notes 📘
        </h1>


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

              <h2 className="text-2xl text-gray-600">
                No Notes Uploaded Yet
              </h2>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;