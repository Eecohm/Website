
import NavBar from '@/features/admin/NavBar/NavBar';
import styles from '@/features/admin/Acadamic/ClassDetail/ClassDetail.module.css';
import { sync } from 'framer-motion';
const ClassDetail = () => {
    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.classmanagement}>
                <h2 className={styles.sectionHeading}>Class Management</h2>
                <div className={styles.contentArea}>
                    <div className={styles.sections}>
                        <h3 className={styles.sectionTabs}>Teachers and Attendence</h3>
                        <h3 className={styles.sectionTabs}>Teachers and Attendence</h3>
                        <h3 className={styles.sectionTabs}>Teachers and Attendence</h3>
                    </div>

                </div>
            </div>

            
        </div>
    );
};

export default ClassDetail;
