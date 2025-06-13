import NavBar from "../../NavBar/NavBar";
import styles from "./ClassInfo.module.css"
import { useAuth } from '../../Login/Auth/AuthContext';
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const ClassInfo = () => {
    const baseUrl = useBaseUrl();
    const { token } = useAuth()
    const [grades, setGrades] = useState()
    const navigate = useNavigate()
    const [isLoadingGrades, setIsLoadingGrades] = useState(false);
    useEffect(() => {
        const fetchGrades = async () => {
            setIsLoadingGrades(true);
            try {
                if (!token) {
                navigate('/login');
                return;
                }
                const response = await fetch (`${baseUrl}/sadmin/classes`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',           
                        },
                    });
                if (!response.ok) throw new Error('Failed to fetch grades');
                const data = await response.json();
                console.log(data); 
            } catch(error) {
                console.error("Error fetching grades", error);
            } finally {
                setIsLoadingGrades(false)
            }
        } 
        fetchGrades();
    }, []);
    return (
        <>
        <NavBar />
        <div className={styles.mainDiv}>
            <h1>Class List</h1>
            <form action="">
                <select name="" id=""> {/* class name select*/}
                    <option value=""></option>
                </select>
                <select></select> {/*class teacher select */}
                <input type="text" /> {/* total Number of Subjects */}
                <input />{}
            </form>
        </div>
        </>
    )
}
export default ClassInfo;