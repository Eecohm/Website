import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Inventory.module.css";
import NavBar from "../NavBar/NavBar";

const Inventory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/inventory", { replace: true });
  }, [navigate]);

  const inventoryCards = [
    {
      title: "Stock",
      path: "/dashboard/inventory/stock",
      icon: "📦", // stock / box
      description: "View and manage available stock items",
    },
    {
      title: "Suppliers",
      path: "/dashboard/inventory/suppliers",
      icon: "🚚", // suppliers / delivery
      description: "Manage supplier details and purchase orders",
    },
    {
      title: "Assets",
      path: "/dashboard/inventory/assets",
      icon: "💼", // assets / property
      description: "Track and maintain organizational assets",
    },
    {
      title: "Categories",
      path: "/dashboard/inventory/categories",
      icon: "🗂️", // folder / category
      description: "Organize inventory by product categories",
    },
    {
      title: "Purchase",
      path: "/dashboard/inventory/purchase",
      icon: "🛒", // shopping / purchase
      description: "Record purchases and manage procurement",
    },
    {
      title: "Reports",
      path: "/dashboard/inventory/reports",
      icon: "📊", // report / analytics
      description: "Generate stock and inventory usage reports",
    }
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Inventory Management</h1>
          <p className={styles.subtitle}>
            Track, manage, and analyze all inventory and assets
          </p>
        </div>

        <div className={styles.cardGrid}>
          {inventoryCards.map((card, index) => (
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

export default Inventory;
