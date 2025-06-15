import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom'
import { useBaseUrl } from '../../../BaseUrlContext';

const Admin = () => {
    const baseUrl = useBaseUrl();
    return(
        <>
        <NavBar />
        <div className={styles.mainDiv}>
            <div className={styles.card}>
                <Link to="/admin/classinfo">
                <h1> CLASS SETTING </h1>
                </ Link>
            </div>
            <div className={styles.card}>
                <Link to="/admin/registrationapproval">
                <h1> REGISTRATION APPROVAL </h1>
                </ Link>
            </div>

        </div>
        </>
    )
}

export default Admin;