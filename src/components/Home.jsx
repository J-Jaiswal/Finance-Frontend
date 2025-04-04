import React, { useEffect, useState, useContext } from "react";
import { FinanceContext } from "../context/RecordContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Home = () => {
  const [RecentRecord, setRecentRecords] = useState([]);
  const { records, deleteTransaction } = useContext(FinanceContext);
  const [currentuser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#001233");

  useEffect(() => {
    getRecentRecords();
  }, [records]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const getRecentRecords = () => {
    setLoading(true);
    const sortedRecords = [...records].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setRecentRecords(sortedRecords.slice(0, 5));
    setLoading(false);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteTransaction(_id);
      toast.info("Transaction deleted successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Error in deleting transaction:");
      console.error("Error in deleting transaction:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-10 w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-[#001233] mb-4">
          Recent Transactions
        </h2>
        <div className="flex justify-center w-full overflow-x-auto">
          <table className="min-w-full border border-[#979DAC] shadow-md rounded-lg">
            <thead className="bg-[#33415C] text-white">
              <tr>
                {[
                  "S. No.",
                  "Description",
                  "Category",
                  "Date",
                  "Payment Method",
                  "Credit/Debit",
                  "Amount",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={index}
                    className={`${
                      heading == "S. No."
                        ? "md:min-w-[90px]"
                        : "md:min-w-[150px]"
                    } text-left py-2 px-3 font-semibold text-sm min-w-[100px] `}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-black border-2 h-[200px]">
              {RecentRecord.length > 0 ? (
                RecentRecord.map((transaction, ind) => (
                  <tr
                    key={ind}
                    className="border-b border-[#979DAC] hover:bg-gray-100"
                  >
                    <td className="py-2 pl-6 text-[#7D8597]">{ind + 1}</td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      {transaction.description}
                    </td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      {transaction.category}
                    </td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      {transaction.paymentMethod}
                    </td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      {transaction.type}
                    </td>
                    <td className="py-2 px-3 text-[#7D8597]">
                      ₹{transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="bg-[#5C677D] text-white py-1 px-3 rounded hover:bg-[#33415C] transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 px-3 text-center text-[#7D8597] italic"
                  >
                    {!currentuser
                      ? "Please log in to see your recent transactions!"
                      : "  No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="flex justify-center mt-10">
            <FadeLoader color={color} loading={loading} size={50} />
          </div>
        )}
        {/* {!loading && currentuser && records.length === 0 && (
          <p className="my-10 font-medium text-center text-gray-600">
            You haven't added any transactions yet!
          </p>
        )} */}
      </div>
      <Dashboard />
    </div>
  );
};

export default Home;
