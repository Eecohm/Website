import React, { useState } from "react";
import styles from "./Acadamic.module.css";

import AcademicYearData from "./AcademicYearData ";
import ProgramData from "./ProgramData ";
import FacultyData from "./FacultyData ";
import GradeData from "./GradeData ";
import AcademicClassData from "./AcademicClassData ";
import NavBar from "../NavBar/NavBar";

const Acadamic = () => {
  // Form states
  const [academicYear, setAcademicYear] = useState({
    startDate: "",
    endDate: "",
  });
  const [program, setProgram] = useState({
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    affiliatedTo: "",
  });
  const [faculty, setFaculty] = useState({ facultyName: "", programId: "" });
  const [grade, setGrade] = useState({ gradeName: "", programId: "" });
  const [academicClass, setAcademicClass] = useState({
    academicYearId: "",
    gradeId: "",
    facultyId: "",
    section: "",
  });

  const [savedAcademicYear, setSavedAcademicYear] = useState(null);
  const [savedProgram, setSavedProgram] = useState(null);
  const [savedFaculty, setSavedFaculty] = useState(null);
  const [savedGrade, setSavedGrade] = useState(null);
  const [savedAcademicClass, setSavedAcademicClass] = useState(null);

  const handleChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e, data, saveSetter, label) => {
    e.preventDefault();
    saveSetter(data);
    console.log(`${label} saved:`, data);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Academic Management</h1>

        <div className={styles.row}>
          <form
            className={styles.card}
            onSubmit={(e) =>
              handleSubmit(
                e,
                academicYear,
                setSavedAcademicYear,
                "Academic Year"
              )
            }
          >
            <h2>Academic Year</h2>
            <input
              type="date"
              name="startDate"
              value={academicYear.startDate}
              onChange={(e) => handleChange(e, setAcademicYear)}
              required
            />
            <input
              type="date"
              name="endDate"
              value={academicYear.endDate}
              onChange={(e) => handleChange(e, setAcademicYear)}
              required
            />
            <button type="submit">Save</button>
          </form>

          <form
            className={styles.card}
            onSubmit={(e) =>
              handleSubmit(e, program, setSavedProgram, "Program")
            }
          >
            <h2>Program</h2>
            <input
              name="programName"
              placeholder="Program Name"
              value={program.programName}
              onChange={(e) => handleChange(e, setProgram)}
              required
            />
            <input
              type="number"
              name="durationMonths"
              placeholder="Duration in Months"
              value={program.durationMonths}
              onChange={(e) => handleChange(e, setProgram)}
              required
            />
            <input
              name="previousProgramId"
              placeholder="Previous Program ID (optional)"
              value={program.previousProgramId}
              onChange={(e) => handleChange(e, setProgram)}
            />
            <input
              name="affiliatedTo"
              placeholder="Affiliated To"
              value={program.affiliatedTo}
              onChange={(e) => handleChange(e, setProgram)}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className={styles.row}>
          <form
            className={styles.card}
            onSubmit={(e) =>
              handleSubmit(e, faculty, setSavedFaculty, "Faculty")
            }
          >
            <h2>Faculty</h2>
            <input
              name="facultyName"
              placeholder="Faculty Name"
              value={faculty.facultyName}
              onChange={(e) => handleChange(e, setFaculty)}
              required
            />
            <input
              name="programId"
              placeholder="Program ID"
              value={faculty.programId}
              onChange={(e) => handleChange(e, setFaculty)}
              required
            />
            <button type="submit">Save</button>
          </form>

          <form
            className={styles.card}
            onSubmit={(e) => handleSubmit(e, grade, setSavedGrade, "Grade")}
          >
            <h2>Grade</h2>
            <input
              name="gradeName"
              placeholder="Grade Name"
              value={grade.gradeName}
              onChange={(e) => handleChange(e, setGrade)}
              required
            />
            <input
              name="programId"
              placeholder="Program ID"
              value={grade.programId}
              onChange={(e) => handleChange(e, setGrade)}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className={styles.row}>
          <form
            className={styles.card}
            onSubmit={(e) =>
              handleSubmit(
                e,
                academicClass,
                setSavedAcademicClass,
                "Academic Class"
              )
            }
          >
            <h2>Academic Class</h2>
            <input
              name="academicYearId"
              placeholder="Academic Year ID"
              value={academicClass.academicYearId}
              onChange={(e) => handleChange(e, setAcademicClass)}
              required
            />
            <input
              name="gradeId"
              placeholder="Grade ID"
              value={academicClass.gradeId}
              onChange={(e) => handleChange(e, setAcademicClass)}
              required
            />
            <input
              name="facultyId"
              placeholder="Faculty ID"
              value={academicClass.facultyId}
              onChange={(e) => handleChange(e, setAcademicClass)}
              required
            />
            <input
              name="section"
              placeholder="Section"
              value={academicClass.section}
              onChange={(e) => handleChange(e, setAcademicClass)}
              required
            />
            <button type="submit">Save</button>
          </form>

          <div className={styles.card} style={{ visibility: "hidden" }}></div>
        </div>

        <div className={styles.savedData}>
          {savedAcademicYear && <AcademicYearData data={savedAcademicYear} />}
          {savedProgram && <ProgramData data={savedProgram} />}
          {savedFaculty && <FacultyData data={savedFaculty} />}
          {savedGrade && <GradeData data={savedGrade} />}
          {savedAcademicClass && (
            <AcademicClassData data={savedAcademicClass} />
          )}
        </div>
      </div>
    </>
  );
};

export default Acadamic;
