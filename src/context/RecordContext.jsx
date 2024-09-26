import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // const [transactions, setTransactions] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const serverURL = import.meta.env.VITE_BASE_URL;
  // const [details, setDetails] = useState({
  //   name: "jayesh",
  //   age: "20",
  // });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const addTransaction = async (newRecord) => {
    try {
      await Axios.post(`${serverURL}/add`, newRecord);
      const response = await getUserTransactions();

      // console.log("Transaction added successfully:", response.data);
    } catch (error) {
      console.log("Error in adding transaction:", error);
    }
  };

  // Update an existing transaction by ID
  // const updateTransaction = (transactionId, updatedTransaction) => {
  //   setTransactions(
  //     transactions.map((transaction) =>
  //       transaction.id === transactionId ? updatedTransaction : transaction
  //     )
  //   );
  // };

  useEffect(() => {
    if (currentUser) {
      getUserTransactions(); // Fetch transactions when currentUser changes
    }
  }, [currentUser]); // Dependency on currentUser

  const getUserTransactions = async () => {
    try {
      if (currentUser && currentUser.uid) {
        const res = await Axios.get(
          `${serverURL}/gettingAllByUserid/${currentUser.uid}`
        );
        setRecords(res.data);
      } else {
        // toast.error("Current user is not defined");
        console.log("Current user is not defined");
      }
    } catch (err) {
      console.log("Error in fetching data:", err);
    }
  };

  const deleteTransaction = async (_id) => {
    try {
      const res = await Axios.delete(`${serverURL}/${_id}`);
      await getUserTransactions();
      // toast.info("Transaction deleted successsfully");
      // console.log("Transaction deleted successsfully", res.data);
    } catch (err) {
      // toast.error("Error in deleting transaction");
      console.log("Error in deleting transaction ", err);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        records,
        addTransaction,
        // updateTransaction,
        deleteTransaction,
        getUserTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export default { FinanceContext, FinanceProvider };
