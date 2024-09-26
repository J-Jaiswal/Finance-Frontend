import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerWithfirebase = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created succeffuly");
      navigate("/");
      // alert("Account created succeffuly");
      // console.log(user);
    } catch (error) {
      // console.log("Registration failed. Please try again.", error.message);
      toast.error("Registration failed. Please try again");
    }
  };

  return (
    <div className="flex w-full  bg-gray-100 justify-center">
      <div className="flex justify-center items-center mt-[140px] mb-[260px]">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                // value={user.name}
                onChange={(event) => setName(event.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                // value={user.email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                // value={user.password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#3C5B6F]  text-white py-2 px-4 rounded w-full hover:bg-[#304b5b] cursor-pointer"
              onClick={() => registerWithfirebase()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
