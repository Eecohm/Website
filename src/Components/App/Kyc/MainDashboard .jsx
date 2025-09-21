// components/MainDashboard.jsx
import React from "react";
import { useAuth } from "../../App/Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const { userId, role, kyc_status, verified } = useAuth();
  const navigate = useNavigate();

  // Sample dashboard data - replace with actual data from your API
  const dashboardData = {
    walletBalance: 1250.75,
    recentTransactions: [
      {
        id: 1,
        amount: -50.0,
        description: "Grocery Store",
        date: "2023-06-15",
      },
      {
        id: 2,
        amount: 100.0,
        description: "Transfer from John",
        date: "2023-06-14",
      },
      {
        id: 3,
        amount: -25.5,
        description: "Online Subscription",
        date: "2023-06-12",
      },
    ],
    notifications: [
      { id: 1, message: "Your profile is 80% complete", type: "info" },
      { id: 2, message: "New security feature available", type: "security" },
    ],
  };

  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <div className="user-status">
          <span className={`status-badge ${kyc_status}`}>
            KYC: {kyc_status.toUpperCase()}
          </span>
          <span className="verified-badge">
            {verified ? "Verified" : "Not Verified"}
          </span>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card balance-card">
          <h3>Wallet Balance</h3>
          <div className="balance-amount">
            ${dashboardData.walletBalance.toFixed(2)}
          </div>
          <div className="balance-actions">
            <button className="btn-primary">Add Funds</button>
            <button className="btn-secondary">Withdraw</button>
          </div>
        </div>

        <div className="card transactions-card">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {dashboardData.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-desc">
                    {transaction.description}
                  </div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div
                  className={`transaction-amount ${
                    transaction.amount >= 0 ? "positive" : "negative"
                  }`}
                >
                  {transaction.amount >= 0 ? "+" : ""}
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">View All Transactions</button>
        </div>

        <div className="card profile-card">
          <h3>Profile Overview</h3>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">User ID</span>
              <span className="stat-value">{userId}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Account Type</span>
              <span className="stat-value">{role}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">KYC Status</span>
              <span className="stat-value">{kyc_status}</span>
            </div>
          </div>
          <button
            className="kyc-details-btn"
            onClick={() => navigate("/dashboard/kyc/form")}
          >
            Complete KYC Form
          </button>
        </div>

        <div className="card notifications-card">
          <h3>Notifications</h3>
          <div className="notifications-list">
            {dashboardData.notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.type}`}
              >
                {notification.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
