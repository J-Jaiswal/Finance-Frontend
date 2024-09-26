import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [currentuser, setCurrentUser] = useState({});

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentUser(currentuser);
    });
  }, []);

  const Logout = async () => {
    await signOut(auth);
    toast.info("You Loged-Out");
    navigate("/");
  };

  const loginWithFirebase = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      toast.success("You Logged-in");
      // alert("You Logged-in");
      // console.log(user);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Log-in failed", error);
    }
  };

  return (
    <div>
      {!currentuser ? (
        <div className="flex w-full  bg-gray-100 justify-center">
          <div className=" flex justify-center items-center mt-[140px] mb-[260px]">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <div className="flex w-full justify-between">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <h2
                  className="text-md font-semibold mb-4 underline cursor-pointer text-[#54565a] hover:text-[#5C677D]"
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </h2>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#3C5B6F] text-white py-2 px-4 rounded w-full hover:bg-[#304b5b] cursor-pointer"
                  onClick={() => loginWithFirebase()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full  bg-gray-100 justify-center">
          <div className=" flex justify-center items-center mt-[140px] mb-[260px]">
            <div className="flex flex-col justify-center items-start bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4 ml-4">
                You Loged-In with email:
              </h2>
              <h6 className="text-md text-[#001233] font-semibold mb-12 ml-8">
                - {currentuser.email} -
              </h6>

              <button
                type="submit"
                className="bg-[#3C5B6F] text-white py-2 px-4 rounded w-full hover:bg-[#304b5b] cursor-pointer max-w-[100px]"
                onClick={() => Logout()}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
