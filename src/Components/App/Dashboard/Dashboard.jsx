import NavBar from "../NavBar/NavBar";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./Dashboard.module.css";
import { useStatusCheck } from "./utils/StatusCheck";

const DashBoard = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  // run status check automatically
  useStatusCheck(baseUrl, token);

  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <h1>Welcome to the Dashboard</h1>
      </div>
    </>
  );
};

export default DashBoard;
