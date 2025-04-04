import { useState } from "react";

function Budget() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [description, setDescription] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      paymentMethod,
      description,
    };
    setExpenses([...expenses, newExpense]);
    resetFields();
  };

  const resetFields = () => {
    setCategory("");
    setAmount("");
    setPaymentMethod("Cash");
    setDescription("");
  };

  const handleSubmitToDatabase = () => {
    console.log("Submitting expenses to database:", expenses);
    setExpenses([]);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10  p-6 mt-6 w-full max-w-7xl mx-auto px-4">
      {/* Add Expense Form */}
      <div className="flex flex-col w-full lg:w-1/2 shadow-lg p-6 rounded-md">
        <h3 className="text-2xl font-semibold mb-4 text-[#001233]">
          Add Your Monthly Expenses
        </h3>

        <form onSubmit={handleAddExpense} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#5C677D]">
              Expense Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C] cursor-pointer"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Rent">Rent</option>
              <option value="EMI">EMI</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Restaurants">Restaurants</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#5C677D]">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#5C677D]">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C] cursor-pointer"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#5C677D]">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Monthly rent payment"
              className="w-full p-2 border rounded border-[#979DAC] focus:outline-none focus:ring-2 focus:ring-[#33415C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#33415C] text-white p-2 rounded hover:bg-[#001233] transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Expenses List */}
      <div className="flex flex-col w-full lg:w-1/2 shadow-lg p-6 rounded-md">
        <h4 className="text-xl font-semibold mb-4 text-[#001233]">
          Your Expenses
        </h4>
        {expenses.length === 0 ? (
          <p className="text-[#7D8597]">No expenses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="bg-[#F7F9FC] p-4 rounded-lg shadow"
              >
                <p className="font-bold text-lg text-[#33415C]">
                  {expense.category}
                </p>
                <p className="text-[#5C677D]">Amount: ${expense.amount}</p>
                <p className="text-[#5C677D]">
                  Payment Method: {expense.paymentMethod}
                </p>
                <p className="text-[#5C677D]">
                  Description: {expense.description || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleSubmitToDatabase}
          className="w-full mt-6 bg-[#33415C] text-white p-2 rounded hover:bg-[#001233] transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Budget;
