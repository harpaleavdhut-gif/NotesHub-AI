function Register() {

  return (
    <div className="flex justify-center mt-10">

      <form className="bg-white p-10 rounded shadow-md w-[400px]">

        <h1 className="text-3xl mb-5 font-bold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          className="bg-green-600 text-white px-5 py-3 rounded w-full"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;