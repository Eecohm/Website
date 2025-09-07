import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import './Students.module.css';
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

        const response = await fetch(`https://bishamsinchiury.com.np/api/user/students/?${params.toString()}`, {
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
     
    </>
  );
};

// export default StudentTable;
// #new changes