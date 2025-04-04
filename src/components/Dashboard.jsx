import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Format amounts as INR
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

const Dashboard = () => {
  const totalBudget = 2000;
  const totalExpenses = 1200;
  const remainingBudget = totalBudget - totalExpenses;

  const budgetData = [
    { name: "Spent", value: totalExpenses },
    { name: "Remaining", value: remainingBudget },
  ];

  const financeData = [
    { name: "Week 1", Income: 1000, Expenses: 500 },
    { name: "Week 2", Income: 1500, Expenses: 1000 },
    { name: "Week 3", Income: 1250, Expenses: 750 },
    { name: "Week 4", Income: 1800, Expenses: 1200 },
  ];

  const COLORS = ["#33415C", "#979DAC"];

  const transactions = [
    { id: 1, description: "Groceries", amount: 100, date: "2024-09-01" },
    { id: 2, description: "Rent", amount: 700, date: "2024-09-02" },
    { id: 3, description: "Gym Membership", amount: 50, date: "2024-09-03" },
  ];

  return (
    <div className="flex w-full justify-center mb-20 px-4">
      <div className="p-4 w-full max-w-7xl my-10">
        <h1 className="text-2xl font-semibold text-[#001233] underline mb-10">
          Your Dashboard
        </h1>

        {/* Monthly Budget Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Budget Overview + Pie Chart + Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#33415C]">
              Monthly Budget Overview
            </h2>
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
              <p>
                Total Budget:{" "}
                <span className="font-bold">{formatCurrency(totalBudget)}</span>
              </p>
              <p>
                Total Expenses:{" "}
                <span className="font-bold">
                  {formatCurrency(totalExpenses)}
                </span>
              </p>
              <p>
                Remaining:{" "}
                <span className="font-bold">
                  {formatCurrency(remainingBudget)}
                </span>
              </p>
            </div>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={budgetData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {budgetData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>

            {/* Bar Chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Expenses Bar Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="Expenses" fill="#629584" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between w-full gap-4">
              <h2 className="text-xl font-semibold text-[#33415C]">
                Your Budget
              </h2>
              <h2 className="text-md text-[#c55858] cursor-pointer">Delete</h2>
            </div>

            <ul className="mt-4">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-b py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-[#5C677D]">{transaction.date}</p>
                  </div>
                  <p className="font-bold">
                    {formatCurrency(transaction.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Finance Summary Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#33415C]">
            Finance Summary
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Income"
                stroke="#007233"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Expenses" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
