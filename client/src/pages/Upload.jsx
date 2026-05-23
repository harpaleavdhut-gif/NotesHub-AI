import { useState } from "react";

import API from "../services/api";

function Upload() {

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    pdf: null,
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      pdf: e.target.files[0],
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("semester", formData.semester);
    data.append("pdf", formData.pdf);

    try {

      const res = await API.post(
        "/notes/upload",
        data
      );

      alert(res.data.message);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[600px]"
      >

        <h1 className="text-5xl font-bold text-center text-purple-700 mb-10">
          Upload Notes 📚
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-4 rounded-2xl mb-5"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          className="w-full border p-4 rounded-2xl mb-5"
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          onChange={handleChange}
          className="w-full border p-4 rounded-2xl mb-5"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full border p-4 rounded-2xl mb-5"
        />

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl text-xl font-bold"
        >
          Upload Notes
        </button>

      </form>

    </div>
  );
}

export default Upload;