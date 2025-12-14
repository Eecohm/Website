import React, { useState } from 'react';
import styles from './styles.module.css';
import { FiPlus, FiClock } from 'react-icons/fi';

const RoutineManagement = () => {
    // Dummy Data
    const [routines, setRoutines] = useState([
        { id: 1, day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'Math' },
        { id: 2, day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Science' },
        { id: 3, day: 'Tuesday', time: '09:00 AM - 10:00 AM', subject: 'English' },
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h2>Class Routine & Timing</h2>
                <button className={styles.btnPrimary}>
                    <FiPlus /> Add Slot
                </button>
            </div>

            <div className={styles.grid}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className={styles.dayColumn}>
                        <h4 className={styles.dayTitle}>{day}</h4>
                        <div className={styles.slots}>
                            {routines.filter(r => r.day === day).map(slot => (
                                <div key={slot.id} className={styles.slotCard}>
                                    <div className={styles.slotTime}>
                                        <FiClock /> {slot.time}
                                    </div>
                                    <div className={styles.slotSubject}>
                                        {slot.subject}
                                    </div>
                                </div>
                            ))}
                            {routines.filter(r => r.day === day).length === 0 && (
                                <div className={styles.emptySlot}>No classes</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.attendanceSection}>
                <h3>Attendance Overview (Dummy)</h3>
                <div className={styles.attendanceBar}>
                    <span>Today's Attendance: 85%</span>
                    <button className={styles.btnSmall}>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default RoutineManagement;
