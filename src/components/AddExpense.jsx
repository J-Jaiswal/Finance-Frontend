import { useState, useContext, useEffect } from "react";
import { FinanceContext } from "../context/RecordContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Debit");
  const [category, setCategory] = useState("Entertainment");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [date, setDate] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#001233");

  const { addTransaction } = useContext(FinanceContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setCurrentUser(currentuser);
    });
  }, []);

  const newRecord = {
    userId: userId,
    description,
    amount: parseFloat(amount),
    type,
    category,
    paymentMethod,
    date,
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addTransaction(newRecord);
      setDescription("");
      setAmount("");
      setDate("");
      toast.success("Transaction added successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Error in adding transaction:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex min-h-screen items-center justify-center w-full">
          <FadeLoader
            color={color}
            loading={loading}
            radius={0}
            size={400}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="bg-white px-6 py-4 rounded w-full">
            <h3 className="text-2xl font-semibold mb-4 text-[#001233]">
              Add New Transaction
            </h3>

            <div>
              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">Description</label>
                <input
                  type="text"
                  value={description}
                  placeholder="Purchased clothes"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">Amount</label>
                <input
                  type="number"
                  value={amount}
                  placeholder="5000"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food">Food</option>
                  <option value="Salary">Salary</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-[#5C677D]">Date & Time</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
                  required
                />
              </div>

              <button
                onClick={() => {
                  currentUser
                    ? handleSubmit()
                    : alert("Please log in to record your data");
                }}
                className="bg-[#33415C] text-white py-2 px-4 rounded w-full cursor-pointer hover:bg-[#001233] transition-colors"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
