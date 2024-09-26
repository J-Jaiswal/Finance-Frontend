import React, { useEffect, useState, useContext } from "react";
import { FinanceContext } from "../context/RecordContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [transactions, setTransactions] = useState(data);
  const [RecentRecord, setRecentRecords] = useState([]);
  const { records, deleteTransaction } = useContext(FinanceContext);
  const [currentuser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#001233");

  useEffect(() => {
    getRecentRecords();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentUser(currentuser);
    });
  }, []);

  const getRecentRecords = () => {
    setLoading(true);
    const sortedRecords = [...records].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const latestFiveRecords = sortedRecords.slice(0, 5);
    setRecentRecords(latestFiveRecords);
    setLoading(false);
  };

  const handleDelete = async (_id) => {
    try {
      // setLoading(true);
      await deleteTransaction(_id);
      toast.success("Transaction deleted successfully");
      navigate("/expenses");

      // setLoading(false);

      // console.log("Transaction deleting successfully");
    } catch (error) {
      toast.error("Error in deleting transaction:");
      setLoading(false);
      console.error("Error in deleting transaction:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[180px] mt-[100px] mb-[400px] w-full items-center">
      {/* <ExpenseTracker /> */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold text-[#001233] mb-4">
          Recent Transactions
        </h2>
        <table className="min-w-full bg-white border border-[#979DAC] shadow-md rounded-lg">
          <thead className="bg-[#33415C] text-white">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm min-w-[200px]">
                Description
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Payment Method
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Credit/Debit
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>

          {currentuser && (
            <tbody>
              {RecentRecord.map((transaction, ind) => (
                <tr key={ind} className="border-b border-[#979DAC]">
                  <td className="py-3 px-4 text-[#7D8597]">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-[#7D8597]">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-[#7D8597]">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-[#7D8597]">
                    {transaction.paymentMethod}
                  </td>
                  <td className="py-3 px-4 text-[#7D8597]">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-4 text-[#7D8597]">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="bg-[#5C677D] text-white py-1 px-3 rounded hover:bg-[#33415C] transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {currentuser ? (
          <div className="w-full ">
            {records.length !== 0 ? (
              <div className="flex justify-center my-16 w-full">
                <FadeLoader
                  color={color}
                  loading={loading}
                  radius={0}
                  size={400}
                  aria-label="Loading Spinner"
                />
              </div>
            ) : (
              <div className="my-16 font-medium w-full text-center ">
                You haven't add any transaction yet!!
              </div>
            )}
          </div>
        ) : (
          <div className="w-full text-center my-16 font-medium ">
            Please log in to see your recent transactions!!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
