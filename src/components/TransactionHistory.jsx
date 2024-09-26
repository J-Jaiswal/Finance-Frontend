import { useState, useEffect, useContext } from "react";
import { FinanceContext } from "../context/RecordContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

function TransactionHistory() {
  // const [transactions, setTransactions] = useState([]);

  const { records, deleteTransaction } = useContext(FinanceContext);
  const [currentuser, setCurrentuser] = useState({});

  const [filter, setFilter] = useState("");
  // // react-spinner-->
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#001233");
  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentuser(currentuser);
    });
  }, []);

  const handleDelete = async (_id) => {
    try {
      setLoading(true);
      await deleteTransaction(_id);
      toast.info("Transaction deleted successsfully");
      setLoading(false);
      console.log("Transaction deleting successfully");
    } catch (error) {
      toast.error("Error in deleting transaction");
      console.error("Error in deleting transaction:", error);
    }
  };

  const filteredTransactions = records.filter(
    (t) =>
      t.description.toLowerCase().includes(filter.toLowerCase()) ||
      t.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full mb-36 mt-10 ">
      <div className="bg-white p-6 rounded shadow-md w-[50%] my-12">
        <h3 className="text-2xl font-semibold text-[#001233] mb-4">
          Transaction History
        </h3>
        <input
          type="text"
          placeholder="Search by description or category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {currentuser ? (
          <div>
            {records.length !== 0 ? (
              <ul className="space-y-2">
                <div className="flex justify-center w-full">
                  <FadeLoader
                    className="my-16"
                    color={color}
                    loading={loading}
                    radius={0}
                    size={400}
                    aria-label="Loading Spinner"
                  />
                </div>

                {filteredTransactions.map((transaction, ind) => (
                  <li key={ind} className="flex justify-between py-2 border-b">
                    <div className="text-[#7D8597]">
                      <p className="font-bold text-[#201c3e] mb-1">
                        {transaction.description}
                      </p>
                      <p className="text-sm">
                        Category: {transaction.category}
                      </p>
                      <p className="text-sm ">
                        Payment Method: {transaction.paymentMethod}
                      </p>
                      <p className="text-sm">Date: {transaction.date}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p
                        className={`font-bold ${
                          transaction.type === "Credit"
                            ? "text-[#3F8F22]"
                            : "text-[#B52E31]"
                        }`}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}$
                        {transaction.amount}
                      </p>
                      <p className="text-sm">{transaction.type}</p>
                      <button
                        className="py-[6px] px-[8px] my-[6px] rounded-sm bg-[#5C677D] text-white text-[12px] hover:bg-[#33415C] cursor-pointer"
                        onClick={() => {
                          handleDelete(transaction._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-16 mb-32 font-medium w-full text-center">
                You haven't add any transaction yet!!
              </div>
            )}
          </div>
        ) : (
          <div className=" text-center mt-16 mb-32 font-medium ">
            Please log in to see your recent transactions!!
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
