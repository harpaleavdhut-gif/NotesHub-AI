import { useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (
    <div className="flex justify-center items-center h-[85vh]">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[420px]"
      >

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-4 mb-5 rounded-xl outline-none focus:border-green-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-4 mb-5 rounded-xl outline-none focus:border-green-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-4 mb-5 rounded-xl outline-none focus:border-green-700"
        />

        <button
          className="bg-green-700 hover:bg-green-800 transition text-white w-full py-4 rounded-xl text-lg"
        >
          Register
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?
          <Link className="text-green-700 ml-2" to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;