import React, { useState } from 'react';
import styles from './styles.module.css';
import { FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';

const StudentManagement = () => {
    // Dummy Data
    const [students, setStudents] = useState([
        { id: 1, name: 'Alice Johnson', roll: '101' },
        { id: 2, name: 'Bob Williams', roll: '102' },
        { id: 3, name: 'Charlie Brown', roll: '103' },
    ]);

    const handleDelete = (id) => {
        setStudents(students.filter(s => s.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>Student Management</h2>

            <div className={styles.controls}>
                <div className={styles.searchBox}>
                    <FiSearch />
                    <input type="text" placeholder="Search students..." className={styles.input} />
                </div>
                <button className={styles.btnPrimary}>
                    <FiPlus /> Add Student
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.roll}</td>
                            <td>{student.name}</td>
                            <td>
                                <button onClick={() => handleDelete(student.id)} className={styles.btnDelete}>
                                    <FiTrash2 /> Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentManagement;
