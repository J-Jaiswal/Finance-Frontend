import React from "react";
import TransactionHistory from "./components/TransactionHistory";
import AddExpense from "./components/AddExpense";

export const Transaction = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-6 mt-6 w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col w-full lg:w-2/5 shadow-lg p-6 rounded-md">
        <AddExpense />
      </div>
      <div className="flex flex-col w-full lg:w-3/5 shadow-lg p-6 rounded-md">
        <TransactionHistory />
      </div>
    </div>
  );
};
