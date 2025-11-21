import NavBar from "@/Components/App/NavBar/NavBar";
import styles from "@/Components/App/Admin/ClassInfo/ClassInfo.module.css";
import { useAuth } from "@/Context/AuthContext";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClassInfo = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [classDetails, setClassDetails] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [isLoadingGrades, setIsLoadingGrades] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isEditing, setIsEditing] = useState({
    teacher: false,
    room: false,
    students: false,
  });
  const [formData, setFormData] = useState({
    classTeacher: "",
    roomNo: "",
    numberOfStudents: "",
  });

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoadingGrades(true);
      try {
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch(`${baseUrl}/sadmin/classes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch grades");
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades", error);
      } finally {
        setIsLoadingGrades(false);
      }
    };
    fetchGrades();
  }, [baseUrl, token, navigate]);

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${baseUrl}/sadmin/teachers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    };
    fetchTeachers();
  }, [baseUrl, token]);

  // Fetch class details when grade and section are selected
  useEffect(() => {
    if (selectedGrade && selectedSection) {
      const fetchClassDetails = async () => {
        setIsLoadingDetails(true);
        try {
          const response = await fetch(
            `${baseUrl}/sadmin/classes/${selectedGrade}/${selectedSection}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch class details");
          const data = await response.json();
          setClassDetails(data);
          setFormData({
            classTeacher: data.classTeacher || "",
            roomNo: data.roomNo || "",
            numberOfStudents: data.numberOfStudents || "",
          });
        } catch (error) {
          console.error("Error fetching class details", error);
          setClassDetails(null);
        } finally {
          setIsLoadingDetails(false);
        }
      };
      fetchClassDetails();
    }
  }, [selectedGrade, selectedSection, baseUrl, token]);

  // Handle edit toggle
  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save changes
  const handleSave = async (field) => {
    try {
      const response = await fetch(
        `${baseUrl}/sadmin/classes/${selectedGrade}/${selectedSection}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: formData[field] }),
        }
      );
      if (!response.ok) throw new Error("Failed to update class details");
      setClassDetails((prev) => ({ ...prev, [field]: formData[field] }));
      handleEditToggle(field);
    } catch (error) {
      console.error("Error updating class details", error);
    }
  };

  // Get unique grades and sections
  const uniqueGrades = [...new Set(grades.map((item) => item.grade_name))];
  const availableSections = selectedGrade
    ? [
        ...new Set(
          grades
            .filter((item) => item.grade_name === selectedGrade)
            .map((item) => item.section)
        ),
      ]
    : [];

  return (
    <>
      <NavBar />
      <div className={styles.mainDiv}>
        <h1>Class List</h1>
        <div className={styles.selectionForm}>
          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value);
              setSelectedSection("");
              setClassDetails(null);
            }}
          >
            <option value="">Select Grade</option>
            {uniqueGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={!selectedGrade}
          >
            <option value="">Select Section</option>
            {availableSections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {isLoadingDetails && <p>Loading class details...</p>}
        {classDetails && (
          <div className={styles.card}>
            <h2>
              {classDetails.grade_name} - Section {classDetails.section}
            </h2>
            <div className={styles.cardItem}>
              <span>Class Teacher:</span>
              {isEditing.teacher ? (
                <div>
                  <select
                    name="classTeacher"
                    value={formData.classTeacher}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleSave("classTeacher")}>
                    Save
                  </button>
                  <button onClick={() => handleEditToggle("teacher")}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span>{classDetails.classTeacher || "Not assigned"}</span>
                  <button onClick={() => handleEditToggle("teacher")}>
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className={styles.cardItem}>
              <span>Room No:</span>
              {isEditing.room ? (
                <div>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave("roomNo")}>Save</button>
                  <button onClick={() => handleEditToggle("room")}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span>{classDetails.roomNo || "Not assigned"}</span>
                  <button onClick={() => handleEditToggle("room")}>Edit</button>
                </div>
              )}
            </div>
            <div className={styles.cardItem}>
              <span>Number of Students:</span>
              {isEditing.students ? (
                <div>
                  <input
                    type="number"
                    name="numberOfStudents"
                    value={formData.numberOfStudents}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleSave("numberOfStudents")}>
                    Save
                  </button>
                  <button onClick={() => handleEditToggle("students")}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span>{classDetails.numberOfStudents || "0"}</span>
                  <button onClick={() => handleEditToggle("students")}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassInfo;
