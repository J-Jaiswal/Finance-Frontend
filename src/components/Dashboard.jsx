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
} from "recharts";

const Dashboard = () => {
  const totalBudget = 2000;
  const totalExpenses = 1200;
  const remainingBudget = totalBudget - totalExpenses;

  // Data for the budget Pie chart
  const budgetData = [
    { name: "Spent", value: totalExpenses },
    { name: "Remaining", value: remainingBudget },
  ];

  // Data for the financial summary line chart
  const financeData = [
    { name: "Week 1", Income: 1000, Expenses: 500 },
    { name: "Week 2", Income: 1500, Expenses: 1000 },
    { name: "Week 3", Income: 1250, Expenses: 750 },
    { name: "Week 4", Income: 1800, Expenses: 1200 },
  ];

  // Custom color palette
  const COLORS = ["#33415C", "#979DAC"];

  const transactions = [
    { id: 1, description: "Groceries", amount: 100, date: "2024-09-01" },
    { id: 2, description: "Rent", amount: 700, date: "2024-09-02" },
    { id: 3, description: "Gym Membership", amount: 50, date: "2024-09-03" },
  ];

  return (
    <div className="flex w-full justify-center mb-20">
      <div className="p-8 w-[70%] my-10">
        <h1 className="text-3xl font-semibold text-[#001233] underline ml-4 my-10">
          Dashboard
        </h1>

        {/* Monthly Budget Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Budget Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#33415C]">
              Monthly Budget Overview
            </h2>
            <div className="flex justify-between mb-4">
              <p>
                Total Budget: <span className="font-bold">${totalBudget}</span>
              </p>
              <p>
                Total Expenses:{" "}
                <span className="font-bold">${totalExpenses}</span>
              </p>
              <p>
                Remaining: <span className="font-bold">${remainingBudget}</span>
              </p>
            </div>
            {/* Pie Chart for Budget */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={budgetData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {budgetData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between w-full gap-[20px]">
              <h2 className="text-xl font-semibold mb-4 text-[#33415C]">
                Your Budget
              </h2>
              <h2 className="text-md mb-4 text-[#c55858]">Delete</h2>
            </div>

            <ul>
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-b py-2 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-[#5C677D]">{transaction.date}</p>
                  </div>
                  <p className="font-bold">${transaction.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Financial Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#33415C]">
            Finance Summary
          </h2>
          {/* Line Chart for Financial Data */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
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
