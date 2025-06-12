import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import NavBar from '../NavBar/NavBar';
import { useBaseUrl } from '../../../BaseUrlContext';

const Admin = () => {
    const baseUrl = useBaseUrl();
    return(
        <>
        <NavBar />
        <div className={styles.mainDiv}>
            <div className={styles.card}>
                
            </div>

        </div>
        </>
    )
}

export default Admin;