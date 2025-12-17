import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/features/admin/NavBar/NavBar';
import TeachersSubjectsManagement from './components/TeachersSubjectsManagement';
import RoutineManagement from './components/RoutineManagement';
import StudentManagement from './components/StudentManagement';
import styles from './ClassDetail.module.css';
import { FiArrowLeft } from 'react-icons/fi';

const ClassDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('teachers');

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <FiArrowLeft /> Back
                    </button>
                    <h1>Class Detail Management</h1>
                </div>
        
                {/* <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'teachers' ? styles.active : ''}`}
                        onClick={() => setActiveTab('teachers')}
                    >
                        Teachers & Subjects
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'routine' ? styles.active : ''}`}
                        onClick={() => setActiveTab('routine')}
                    >
                        Routine & Timing
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'students' ? styles.active : ''}`}
                        onClick={() => setActiveTab('students')}
                    >
                        Students
                    </button>
                </div> */}

                {/* <div className={styles.tabContent}>
                    {activeTab === 'teachers' && <TeachersSubjectsManagement classId={id} />}
                    {activeTab === 'routine' && <RoutineManagement classId={id} />}
                    {activeTab === 'students' && <StudentManagement classId={id} />}
                </div> */}
            </div> 
        </div>
    );
};

export default ClassDetail;
