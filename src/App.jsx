import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import AddExpense from "./components/AddExpense";
import Budget from "./components/Budget";
import TransactionHistory from "./components/TransactionHistory";
import Home from "./components/Home";
import Register from "./components/authentication/Register";
import Dashboard from "./components/Dashboard";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
// import Profile from "./components/authentication/Profile";
import { Transaction } from "./Transaction";
import CreditScore from "./components/CreditScore";
// import AddExpense from "./components/AddExpense";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile />} /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/credit score" element={<CreditScore />} />

          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
