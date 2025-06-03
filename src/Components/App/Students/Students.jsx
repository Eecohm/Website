import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import './Students.css';
import debounce from 'lodash/debounce';

const StudentTable = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [classFrom, setClassFrom] = useState('');
  const [classTo, setClassTo] = useState('');
  const [rollNoFrom, setRollNoFrom] = useState('');
  const [rollNoTo, setRollNoTo] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'full_name', direction: 'asc' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if at least one filter is applied
  const isFilterApplied = searchTerm || genderFilter || classFrom || classTo || rollNoFrom || rollNoTo;

  // Debounced fetch function
  const fetchStudents = useCallback(
    debounce(async (search, gender, classFrom, classTo, rollNoFrom, rollNoTo) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (search) params.append('full_name', search);
        if (gender) params.append('gender', gender);
        if (classFrom) params.append('grade_name_from', classFrom);
        if (classTo) params.append('grade_name_to', classTo);
        if (rollNoFrom) params.append('rollno_from', rollNoFrom);
        if (rollNoTo) params.append('rollno_to', rollNoTo);

        const response = await fetch(`http://127.0.0.1:8000/api/user/students/?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        // Normalize data to handle nested fields
        const normalizedData = data.results.map(student => ({
          id: student.id,
          full_name: student.user?.full_name || student.full_name || 'N/A',
          gender: student.user?.gender || student.gender || 'N/A',
          grade: student.grade || { name: 'N/A' },
          rollno: student.rollno !== null ? student.rollno : 'N/A',
        }));
        setStudentData(normalizedData);
        setFilteredData(normalizedData);
      } catch (err) {
        setError(err.message);
        setStudentData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Apply client-side sorting
  useEffect(() => {
    let updatedData = [...studentData];

    updatedData.sort((a, b) => {
      const key = sortConfig.key === 'grade' ? 'grade.name' : sortConfig.key;
      const [objA, objB] = [a, b].map(obj => {
        if (key.includes('.')) {
          const [parent, child] = key.split('.');
          return obj[parent]?.[child] || '';
        }
        return obj[key] || '';
      });
      if (objA < objB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (objA > objB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(updatedData);
  }, [sortConfig, studentData]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  const closeCard = () => {
    setSelectedStudent(null);
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} for student ${selectedStudent?.full_name}`);
  };

  const handleAddStudent = () => {
    console.log('Add Student button clicked');
  };

  const handleShowData = () => {
    if (isFilterApplied) {
      fetchStudents(searchTerm, genderFilter, classFrom, classTo, rollNoFrom, rollNoTo);
    }
  };

  return (
    <>
      <NavBar />
      <div className="student-table-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="class-range">
            <input
              type="text"
              placeholder="Class From"
              value={classFrom}
              onChange={(e) => setClassFrom(e.target.value)}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Class To"
              value={classTo}
              onChange={(e) => setClassTo(e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="rollno-range">
            <input
              type="number"
              placeholder="Roll No From"
              value={rollNoFrom}
              onChange={(e) => setRollNoFrom(e.target.value)}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Roll No To"
              value={rollNoTo}
              onChange={(e) => setRollNoTo(e.target.value)}
              className="filter-input"
            />
          </div>
          <button className="add-student-button" onClick={handleAddStudent}>
            Add Student
          </button>
          <button
            className="show-data-button"
            onClick={handleShowData}
            disabled={!isFilterApplied}
          >
            Show Data
          </button>
        </div>
        {loading && <div className="status-message">Loading...</div>}
        {error && <div className="status-message">Error: {error}</div>}
        <table className="student-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('full_name')}>
                Name {sortConfig.key === 'full_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('gender')}>
                Gender {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('grade')}>
                Class {sortConfig.key === 'grade' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('rollno')}>
                Roll No {sortConfig.key === 'rollno' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(student => (
                <tr key={student.id} onClick={() => handleRowClick(student)}>
                  <td>{student.full_name}</td>
                  <td>{student.gender}</td>
                  <td>{student.grade.name || 'N/A'}</td>
                  <td>{student.rollno}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
        {selectedStudent && (
          <div className="student-card">
            <div className="card-content">
              <h2>{selectedStudent.full_name}</h2>
              <p>Gender: {selectedStudent.gender}</p>
              <p>Class: {selectedStudent.grade.name || 'N/A'}</p>
              <p>Roll No: {selectedStudent.rollno}</p>
              <div className="card-buttons">
                <button className="action-button show-data" onClick={() => handleAction('Show Data')}>Show Data</button>
                <button className="action-button reports" onClick={() => handleAction('Reports')}>Reports</button>
                <button className="action-button accounts" onClick={() => handleAction('Accounts')}>Accounts</button>
                <button className="action-button others" onClick={() => handleAction('Others')}>Others</button>
                <button className="action-button close" onClick={closeCard}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentTable;