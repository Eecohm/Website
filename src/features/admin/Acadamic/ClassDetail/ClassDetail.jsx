
import NavBar from '@/features/admin/NavBar/NavBar';
import { useState } from 'react';
import styles from '@/features/admin/Acadamic/ClassDetail/ClassDetail.module.css';
const ClassDetail = () => {
    const [activeTab, setActiveTab] = useState('teachers');
    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.classmanagement}>
                <h2 className={styles.sectionHeading}>Class Management</h2>
                <div className={styles.contentArea}>
                    <div className={styles.sections}>
                        <h3 
                        className={`${styles.sectionTabs} ${activeTab === 'teachers' ? styles.box : ''}`}
                        onClick={() => setActiveTab('teachers')}>Teachers and Attendence</h3>
                        <h3 className={`${styles.sectionTabs} ${activeTab === 'students' ? styles.box : ''}`} onClick={() => setActiveTab('students')}>Students</h3>
                        <h3 className={`${styles.sectionTabs} ${activeTab === 'attendance' ? styles.box : ''}`} onClick={() => setActiveTab('attendance')}>Attendence and Notice</h3>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default ClassDetail;
