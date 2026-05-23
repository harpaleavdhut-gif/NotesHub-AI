import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

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

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Welcome Back
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-4 mb-5 rounded-xl outline-none focus:border-blue-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-4 mb-5 rounded-xl outline-none focus:border-blue-700"
        />

        <button
          className="bg-blue-700 hover:bg-blue-800 transition text-white w-full py-4 rounded-xl text-lg"
        >
          Login
        </button>

        <p className="mt-5 text-center text-gray-600">
          Don't have an account?
          <Link className="text-blue-700 ml-2" to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;