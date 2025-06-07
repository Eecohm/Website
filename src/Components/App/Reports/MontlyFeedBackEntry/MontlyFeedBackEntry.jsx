import { useState, useEffect } from "react";
import styles from "./MontlyFeedBackEntry.module.css";
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
        <div className={styles.feedbackFormContainer}>
          <h1 className={styles.formHeading}>Monthly Feedback Form</h1>

          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            {/* Student Selection Section */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Student Information</h2>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="class_id" className={styles.formLabel}>
                    Class:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={`${styles.inputGroup} student-search-group`}>
                  <label htmlFor="student" className={styles.formLabel}>
                    Student Name:
                  </label>
                  <div className={styles.studentSearchContainer}>
                    <input
                      className={styles.formInput}
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
                      <div className={styles.studentDropdown}>
                        {filteredStudents.slice(0, 10).map((student) => (
                          <div
                            key={student.id}
                            className={styles.studentOption}
                            onClick={() => selectStudent(student)}
                          >
                            <div className={styles.studentName}>
                              {student.firstname} {student.middlename || ""}{" "}
                              {student.lastname}
                            </div>
                            <div className={styles.studentDetails}>
                              Roll: {student.rollno} | Class: {student.student_class.grade} - {student.student_class.section}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="month" className={styles.formLabel}>
                    Month:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.inputGroup}>
                  <label htmlFor="year" className={styles.formLabel}>
                    Year (B.S.):
                  </label>
                  <input
                    className={styles.formInput}
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
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Grooming & Behaviour</h2>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="appearance" className={styles.formLabel}>
                    Appearance:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.inputGroup}>
                  <label htmlFor="punctuality" className={styles.formLabel}>
                    Punctuality:
                  </label>
                  <select
                    className={styles.formInput}
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

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="interaction_with_peers_and_teachers"
                    className={styles.formLabel}
                  >
                    Interaction with Peers & Teachers:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.inputGroup}>
                  <label
                    htmlFor="confidence_and_communication"
                    className={styles.formLabel}
                  >
                    Confidence & Communication:
                  </label>
                  <select
                    className={styles.formInput}
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
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Class Tasks & Participation</h2>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="classwork_completion" className={styles.formLabel}>
                    Classwork Completion:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.inputGroup}>
                  <label
                    htmlFor="group_work_participation"
                    className={styles.formLabel}
                  >
                    Group Work Participation:
                  </label>
                  <select
                    className={styles.formInput}
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

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="listening_and_following_instructions"
                    className={styles.formLabel}
                  >
                    Listening & Following Instructions:
                  </label>
                  <select
                    className={styles.formInput}
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
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Home Task</h2>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="homework_submission" className={styles.formLabel}>
                    Homework Submission:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="parents_involvement"
                      checked={formData.parents_involvement}
                      onChange={handleInputChange}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxText}>Parents Involvement</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Extracurricular & Skills Development Section */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Extracurricular & Skills Development</h2>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="handwriting" className={styles.formLabel}>
                    Handwriting:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.inputGroup}>
                  <label
                    htmlFor="maintenance_of_books_and_copies"
                    className={styles.formLabel}
                  >
                    Maintenance of Books & Copies:
                  </label>
                  <select
                    className={styles.formInput}
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

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="leadership_and_initiative"
                    className={styles.formLabel}
                  >
                    Leadership & Initiative:
                  </label>
                  <select
                    className={styles.formInput}
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

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="involvement_in_school_activities"
                      checked={formData.involvement_in_school_activities}
                      onChange={handleInputChange}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxText}>
                      Involvement in School Activities
                    </span>
                  </label>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label
                    htmlFor="special_talents_observed"
                    className={styles.formLabel}
                  >
                    Special Talents Observed:
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.formTextarea}`}
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
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                Teacher's Observation & Monthly Summary
              </h2>
              <div className={styles.formRow}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="areas_of_improvement" className={styles.formLabel}>
                    Areas of Improvement:
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    name="areas_of_improvement"
                    id="areas_of_improvement"
                    value={formData.areas_of_improvement}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe areas where the student can improve..."
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="goals_for_next_month" className={styles.formLabel}>
                    Goals for Next Month:
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.formTextarea}`}
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

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Submitting..." : "Submit Monthly Feedback"}
            </button>
          </form>
        </div>
    </>
  );
};

export default MonthlyFeedbackForm;