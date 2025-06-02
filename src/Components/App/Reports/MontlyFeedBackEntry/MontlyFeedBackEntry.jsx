import { useState, useEffect } from "react";
import "./MontlyFeedBackEntry.css";
import NavBar from "../../NavBar/NavBar";

const MonthlyFeedbackForm = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    student_id: "",
    class_id: "", 
    month: "",
    year: "",
    appearance: "",
    punctuality: "",
    interaction_with_peers_and_teachers: "",
    confidence_and_communication: "",
    classwork_completion: "",
    group_work_participation: "",
    listening_and_following_instructions: "",
    homework_submission: "",
    parents_involvement: false,
    handwriting: "",
    maintenance_of_books_and_copies: "",
    involvement_in_school_activities: false,
    special_talents_observed: "",
    leadership_and_initiative: "",
    areas_of_improvement: "",
    goals_for_next_month: "",
  });

  // Rating choices
  const RATING_CHOICES = ["Excellent", "Good", "Average", "Needs Improvement"];
  const FREQUENCY_CHOICES = ["Always", "Sometimes", "Rarely"];
  const HOMEWORK_CHOICES = ["On time", "Late", "Incomplete"];
  const LEADERSHIP_CHOICES = ["High", "Moderate", "Low"];
  const NEPALI_MONTHS = [
    { value: 1, label: "Baishakh" },
    { value: 2, label: "Jestha" },
    { value: 3, label: "Ashadh" },
    { value: 4, label: "Shrawan" },
    { value: 5, label: "Bhadra" },
    { value: 6, label: "Ashwin" },
    { value: 7, label: "Kartik" },
    { value: 8, label: "Mangsir" },
    { value: 9, label: "Poush" },
    { value: 10, label: "Magh" },
    { value: 11, label: "Falgun" },
    { value: 12, label: "Chaitra" },
  ];

  // Fetch classes and students on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://192.168.1.100/api/admin/classes");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const url = classId
        ? `http://192.168.1.100/api/student/students/?class_id=${classId}`
        : "http://192.168.1.100/api/student/students/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      class_id: classId,
      student: "",
      student_id: "",
    }));
    setShowStudentDropdown(false);
    setFilteredStudents([]);
    if (classId) {
      fetchStudents(classId);
    } else {
      setStudents([]);
      setFilteredStudents([]);
    }
  };

  const handleStudentSearch = (e) => {
    const searchTerm = e.target.value;
    setFormData((prev) => ({
      ...prev,
      student: searchTerm,
      student_id: "",
    }));

    if (searchTerm.length > 0) {
      const filtered = students.filter(
        (student) =>
          `${student.firstname} ${student.middlename || ""} ${
            student.lastname
          }`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.rollno?.toString().includes(searchTerm)
      );
      setFilteredStudents(filtered);
      setShowStudentDropdown(true);
    } else {
      setFilteredStudents(students);
      setShowStudentDropdown(false);
    }
  };

  const selectStudent = (student) => {
    const fullName = `${student.firstname} ${
      student.middlename || ""
    } ${student.lastname}`.replace(/\s+/g, " ").trim();
    setFormData((prev) => ({
      ...prev,
      student: fullName,
      student_id: student.id,
      class_id: student.student_class.id, // Update class_id based on student's class
    }));
    setShowStudentDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        student_id: formData.student_id,
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        appearance: formData.appearance,
        punctuality: formData.punctuality,
        interaction_with_peers_and_teachers:
          formData.interaction_with_peers_and_teachers,
        confidence_and_communication: formData.confidence_and_communication,
        classwork_completion: formData.classwork_completion,
        group_work_participation: formData.group_work_participation,
        listening_and_following_instructions:
          formData.listening_and_following_instructions,
        homework_submission: formData.homework_submission,
        parents_involvement: formData.parents_involvement,
        handwriting: formData.handwriting,
        maintenance_of_books_and_copies: formData.maintenance_of_books_and_copies,
        involvement_in_school_activities: formData.involvement_in_school_activities,
        special_talents_observed: formData.special_talents_observed,
        leadership_and_initiative: formData.leadership_and_initiative,
        areas_of_improvement: formData.areas_of_improvement,
        goals_for_next_month: formData.goals_for_next_month,
      };

      const response = await fetch(
        "http://192.168.1.100/api/feedback/monthly-feedback/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );

      if (response.ok) {
        alert("Monthly feedback submitted successfully!");
        // Reset form
        setFormData({
          student: "",
          student_id: "",
          class_id: "",
          month: "",
          year: "",
          appearance: "",
          punctuality: "",
          interaction_with_peers_and_teachers: "",
          confidence_and_communication: "",
          classwork_completion: "",
          group_work_participation: "",
          listening_and_following_instructions: "",
          homework_submission: "",
          parents_involvement: false,
          handwriting: "",
          maintenance_of_books_and_copies: "",
          involvement_in_school_activities: false,
          special_talents_observed: "",
          leadership_and_initiative: "",
          areas_of_improvement: "",
          goals_for_next_month: "",
        });
        setFilteredStudents(students);
        setShowStudentDropdown(false);
      } else {
        const errorData = await response.json();
        alert("Error submitting feedback: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <NavBar />
        <div className="feedback-form-container">
          <h1 className="form-heading">Monthly Feedback Form</h1>

          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Student Selection Section */}
            <div className="form-section">
              <h2 className="section-title">Student Information</h2>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="class_id" className="form-label">
                    Class:
                  </label>
                  <select
                    className="form-input"
                    name="class_id"
                    id="class_id"
                    value={formData.class_id}
                    onChange={handleClassChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.grade} - {cls.section}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group student-search-group">
                  <label htmlFor="student" className="form-label">
                    Student Name:
                  </label>
                  <div className="student-search-container">
                    <input
                      className="form-input"
                      type="text"
                      name="student"
                      id="student"
                      value={formData.student}
                      onChange={handleStudentSearch}
                      placeholder="Search student by name or roll number..."
                      required
                      autoComplete="off"
                      disabled={!formData.class_id} // Disable until class is selected
                    />
                    {showStudentDropdown && filteredStudents.length > 0 && (
                      <div className="student-dropdown">
                        {filteredStudents.slice(0, 10).map((student) => (
                          <div
                            key={student.id}
                            className="student-option"
                            onClick={() => selectStudent(student)}
                          >
                            <div className="student-name">
                              {student.firstname} {student.middlename || ""}{" "}
                              {student.lastname}
                            </div>
                            <div className="student-details">
                              Roll: {student.rollno} | Class: {student.student_class.grade} - {student.student_class.section}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="month" className="form-label">
                    Month:
                  </label>
                  <select
                    className="form-input"
                    name="month"
                    id="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Month</option>
                    {NEPALI_MONTHS.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="year" className="form-label">
                    Year (B.S.):
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2082"
                    min="2082"
                    max="2090"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Grooming & Behaviour Section */}
            <div className="form-section">
              <h2 className="section-title">Grooming & Behaviour</h2>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="appearance" className="form-label">
                    Appearance:
                  </label>
                  <select
                    className="form-input"
                    name="appearance"
                    id="appearance"
                    value={formData.appearance}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="punctuality" className="form-label">
                    Punctuality:
                  </label>
                  <select
                    className="form-input"
                    name="punctuality"
                    id="punctuality"
                    value={formData.punctuality}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label
                    htmlFor="interaction_with_peers_and_teachers"
                    className="form-label"
                  >
                    Interaction with Peers & Teachers:
                  </label>
                  <select
                    className="form-input"
                    name="interaction_with_peers_and_teachers"
                    id="interaction_with_peers_and_teachers"
                    value={formData.interaction_with_peers_and_teachers}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label
                    htmlFor="confidence_and_communication"
                    className="form-label"
                  >
                    Confidence & Communication:
                  </label>
                  <select
                    className="form-input"
                    name="confidence_and_communication"
                    id="confidence_and_communication"
                    value={formData.confidence_and_communication}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Class Tasks & Participation Section */}
            <div className="form-section">
              <h2 className="section-title">Class Tasks & Participation</h2>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="classwork_completion" className="form-label">
                    Classwork Completion:
                  </label>
                  <select
                    className="form-input"
                    name="classwork_completion"
                    id="classwork_completion"
                    value={formData.classwork_completion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Frequency</option>
                    {FREQUENCY_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label
                    htmlFor="group_work_participation"
                    className="form-label"
                  >
                    Group Work Participation:
                  </label>
                  <select
                    className="form-input"
                    name="group_work_participation"
                    id="group_work_participation"
                    value={formData.group_work_participation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Frequency</option>
                    {FREQUENCY_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label
                    htmlFor="listening_and_following_instructions"
                    className="form-label"
                  >
                    Listening & Following Instructions:
                  </label>
                  <select
                    className="form-input"
                    name="listening_and_following_instructions"
                    id="listening_and_following_instructions"
                    value={formData.listening_and_following_instructions}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Frequency</option>
                    {FREQUENCY_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Home Task Section */}
            <div className="form-section">
              <h2 className="section-title">Home Task</h2>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="homework_submission" className="form-label">
                    Homework Submission:
                  </label>
                  <select
                    className="form-input"
                    name="homework_submission"
                    id="homework_submission"
                    value={formData.homework_submission}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    {HOMEWORK_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="parents_involvement"
                      checked={formData.parents_involvement}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">Parents Involvement</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Extracurricular & Skills Development Section */}
            <div className="form-section">
              <h2 className="section-title">Extracurricular & Skills Development</h2>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="handwriting" className="form-label">
                    Handwriting:
                  </label>
                  <select
                    className="form-input"
                    name="handwriting"
                    id="handwriting"
                    value={formData.handwriting}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label
                    htmlFor="maintenance_of_books_and_copies"
                    className="form-label"
                  >
                    Maintenance of Books & Copies:
                  </label>
                  <select
                    className="form-input"
                    name="maintenance_of_books_and_copies"
                    id="maintenance_of_books_and_copies"
                    value={formData.maintenance_of_books_and_copies}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    {RATING_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label
                    htmlFor="leadership_and_initiative"
                    className="form-label"
                  >
                    Leadership & Initiative:
                  </label>
                  <select
                    className="form-input"
                    name="leadership_and_initiative"
                    id="leadership_and_initiative"
                    value={formData.leadership_and_initiative}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    {LEADERSHIP_CHOICES.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="involvement_in_school_activities"
                      checked={formData.involvement_in_school_activities}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      Involvement in School Activities
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group full-width">
                  <label
                    htmlFor="special_talents_observed"
                    className="form-label"
                  >
                    Special Talents Observed:
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    name="special_talents_observed"
                    id="special_talents_observed"
                    value={formData.special_talents_observed}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe any special talents or skills observed..."
                  />
                </div>
              </div>
            </div>

            {/* Teacher's Observation & Monthly Summary Section */}
            <div className="form-section">
              <h2 className="section-title">
                Teacher's Observation & Monthly Summary
              </h2>
              <div className="form-row">
                <div className="input-group full-width">
                  <label htmlFor="areas_of_improvement" className="form-label">
                    Areas of Improvement:
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    name="areas_of_improvement"
                    id="areas_of_improvement"
                    value={formData.areas_of_improvement}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe areas where the student can improve..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group full-width">
                  <label htmlFor="goals_for_next_month" className="form-label">
                    Goals for Next Month:
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    name="goals_for_next_month"
                    id="goals_for_next_month"
                    value={formData.goals_for_next_month}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Set goals and expectations for the next month..."
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit Monthly Feedback"}
            </button>
          </form>
        </div>
    </>
  );
};

export default MonthlyFeedbackForm;