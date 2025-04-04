// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../../../firebase.config";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         navigate("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => navigate("/login"))
//       .catch((error) => console.error("Logout Error:", error));
//   };

//   const getInitial = () => {
//     const name = user?.displayName || user?.email || "U";
//     return name.charAt(0).toUpperCase();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#001233]">
//           Your Profile
//         </h2>

//         {user && (
//           <div className="flex flex-col items-center">
//             {/* Rectangular profile image or fallback */}
//             <div className="w-24 h-28 mb-4 rounded-lg bg-[#3C5B6F] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
//               {user.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt="Profile"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <span>{getInitial()}</span>
//               )}
//             </div>

//             <p className="text-xl font-semibold text-[#001233] mb-1">
//               {user.displayName || "No Name Set"}
//             </p>
//             <p className="text-md text-[#33415C] mb-6">{user.email}</p>

//             <button
//               onClick={handleLogout}
//               className="bg-[#3C5B6F] text-white py-2 px-4 rounded hover:bg-[#304b5b] transition duration-300"
//             >
//               Log Out
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
