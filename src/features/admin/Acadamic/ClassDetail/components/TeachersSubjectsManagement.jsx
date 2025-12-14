import React, { useState } from 'react';
import styles from './styles.module.css';
import { FiPlus, FiTrash2, FiUser } from 'react-icons/fi';

const TeachersSubjectsManagement = () => {
    // Dummy Data
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', teacher: 'John Doe' },
        { id: 2, name: 'Science', teacher: 'Jane Smith' },
        { id: 3, name: 'English', teacher: 'Not Assigned' },
    ]);

    const [newSubject, setNewSubject] = useState('');

    const handleAddSubject = () => {
        if (!newSubject) return;
        setSubjects([...subjects, { id: Date.now(), name: newSubject, teacher: 'Not Assigned' }]);
        setNewSubject('');
    };

    const handleDelete = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>Teachers & Subjects Management</h2>

            <div className={styles.addSection}>
                <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Enter Subject Name"
                    className={styles.input}
                />
                <button onClick={handleAddSubject} className={styles.btnPrimary}>
                    <FiPlus /> Add Subject
                </button>
            </div>

            <div className={styles.list}>
                {subjects.map(subject => (
                    <div key={subject.id} className={styles.itemCard}>
                        <div className={styles.info}>
                            <h3>{subject.name}</h3>
                            <div className={styles.teacherInfo}>
                                <FiUser />
                                <span>Teacher: <strong>{subject.teacher}</strong></span>
                                <button className={styles.btnSmall}>Assign</button>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(subject.id)} className={styles.btnDelete}>
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeachersSubjectsManagement;
