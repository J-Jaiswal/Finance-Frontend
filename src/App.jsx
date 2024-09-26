import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import ExpenseTracker from "./components/ExpenseTracker";
import Budget from "./components/Budget";
import TransactionHistory from "./components/TransactionHistory";
import Home from "./components/Home";
import Register from "./components/authentication/Register";
import Dashboard from "./components/Dashboard";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseTracker />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
