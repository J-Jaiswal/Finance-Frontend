import { useState, useEffect, useContext } from "react";
import { FinanceContext } from "../context/RecordContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

function TransactionHistory() {
  const { records, deleteTransaction } = useContext(FinanceContext);
  const [currentuser, setCurrentuser] = useState({});
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#001233");

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentuser(currentuser);
    });
  }, []);

  const handleDelete = async (_id) => {
    try {
      setLoading(true);
      await deleteTransaction(_id);
      toast.info("Transaction deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Error in deleting transaction");
      console.error("Error in deleting transaction:", error);
    }
  };

  // ✅ Currency formatter for INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const filteredTransactions = records.filter(
    (t) =>
      t.description.toLowerCase().includes(filter.toLowerCase()) ||
      t.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full mb-36 mt-10 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h3 className="text-2xl font-semibold text-[#001233] mb-4">
          Transaction History
        </h3>

        <input
          type="text"
          placeholder="Search by description or category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded mb-4 border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
        />

        {currentuser ? (
          <div>
            {records.length !== 0 ? (
              <ul className="space-y-4">
                {loading && (
                  <div className="flex justify-center w-full my-10">
                    <FadeLoader
                      color={color}
                      loading={loading}
                      radius={0}
                      size={400}
                      aria-label="Loading Spinner"
                    />
                  </div>
                )}

                {filteredTransactions.map((transaction, ind) => (
                  <li
                    key={ind}
                    className="flex flex-col sm:flex-row justify-between gap-4 py-4 border-b"
                  >
                    <div className="text-[#7D8597]">
                      <p className="font-bold text-[#201c3e] mb-1">
                        {transaction.description}
                      </p>
                      <p className="text-sm">
                        Category: {transaction.category}
                      </p>
                      <p className="text-sm">
                        Payment Method: {transaction.paymentMethod}
                      </p>
                      <p className="text-sm">Date: {transaction.date}</p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                      <p
                        className={`font-bold ${
                          transaction.type === "Credit"
                            ? "text-[#3F8F22]"
                            : "text-[#B52E31]"
                        }`}
                      >
                        {transaction.type === "Credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm">{transaction.type}</p>
                      <button
                        className="py-1 px-3 mt-2 rounded-sm bg-[#5C677D] text-white text-xs hover:bg-[#33415C] transition"
                        onClick={() => handleDelete(transaction._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-16 mb-32 font-medium w-full text-center">
                You haven't added any transactions yet!
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-16 mb-32 font-medium">
            Please log in to see your recent transactions!
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
