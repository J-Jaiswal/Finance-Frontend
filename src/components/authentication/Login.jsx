import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/profile");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const loginWithFirebase = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You Logged-in");
      navigate("/profile");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Log-in failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#001233]">Login</h2>
          <button
            className="text-sm underline text-[#54565a] hover:text-[#5C677D]"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#5C677D]">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-[#5C677D]">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            required
          />
        </div>

        <button
          onClick={loginWithFirebase}
          className="bg-[#3C5B6F] text-white py-2 px-4 rounded w-full hover:bg-[#304b5b] transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
