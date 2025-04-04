import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerWithfirebase = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Optional: set user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("Account created successfully");
      navigate("/home"); // or home page
    } catch (error) {
      console.error("Registration error:", error);
      let msg = "Registration failed. Please try again.";

      // Handle Firebase Auth errors
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered.";
          break;
        case "auth/invalid-email":
          msg = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters.";
          break;
        default:
          msg = error.message;
      }

      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#001233]">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-[#5C677D]">Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(event) => setName(event.target.value)}
            className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#5C677D]">Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-[#5C677D]">Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            required
          />
        </div>

        <button
          onClick={registerWithfirebase}
          className="bg-[#3C5B6F] text-white py-2 px-4 rounded w-full hover:bg-[#304b5b] transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
