import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Accounts.module.css";
import NavBar from "../NavBar/NavBar";

const Accounts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/accounts", { replace: true });
  }, [navigate]);

  const accountsCards = [
    {
      title: "Student Fees",
      path: "/dashboard/accounts/student-fees",
      icon: "💰", // money / fees
      description: "Manage and track student fee collection and dues",
    },
    {
      title: "Payroll",
      path: "/dashboard/accounts/payroll",
      icon: "🧾", // salary / payslip
      description: "Handle staff salaries, bonuses, and deductions",
    },
    {
      title: "Expenses",
      path: "/dashboard/accounts/expenses",
      icon: "📉", // outgoing / loss
      description: "Record and monitor institution expenses",
    },
    {
      title: "Revenue",
      path: "/dashboard/accounts/revenue",
      icon: "📈", // growth / income
      description: "Track income from fees and other sources",
    },
    {
      title: "Reports",
      path: "/dashboard/accounts/reports",
      icon: "📊", // analytics / reports
      description: "Generate financial statements and summaries",
    },
    {
      title: "Vouchers",
      path: "/dashboard/accounts/vouchers",
      icon: "🧾", // voucher / bill
      description: "Create and manage payment vouchers and receipts",
    }
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Accounts Management</h1>
          <p className={styles.subtitle}>
            Manage all Accounts-related operations and financial records
          </p>
        </div>

        <div className={styles.cardGrid}>
          {accountsCards.map((card, index) => (
            <Link key={index} to={card.path} className={styles.card}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accounts;
