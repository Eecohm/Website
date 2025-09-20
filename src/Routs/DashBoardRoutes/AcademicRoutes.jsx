import { Route } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import Acadamic from "../../Components/App/Acadamic/Acadamic";
import AcademicYearCard from "../../Components/App/Acadamic/Card/AcademicYearCard";
import ProgramCard from "../../Components/App/Acadamic/Card/ProgramCard";
import FacultyCard from "../../Components/App/Acadamic/Card/FacultyCard";
import GradeCard from "../../Components/App/Acadamic/Card/GradeCard";
import AcademicClassCard from "../../Components/App/Acadamic/Card/AcademicClassCard";
import AcademicYearData from "../../Components/App/Acadamic/Data/AcademicYearData ";
import ProgramData from "../../Components/App/Acadamic/Data/ProgramData";
import FacultyData from "../../Components/App/Acadamic/Data/FacultyData ";
import GradeData from "../../Components/App/Acadamic/Data/GradeData ";
import AcademicClassData from "../../Components/App/Acadamic/Data/AcademicClassData ";

export const AcademicRoutes = [
  <Route
    key="academic"
    path="/academic"
    element={
      <RequireAuth>
        <Acadamic />
      </RequireAuth>
    }
  />,
  <Route
    key="year"
    path="/academic/academic-year"
    element={
      <RequireAuth>
        <AcademicYearCard />
      </RequireAuth>
    }
  />,
  <Route
    key="program"
    path="/academic/program"
    element={
      <RequireAuth>
        <ProgramCard />
      </RequireAuth>
    }
  />,
  <Route
    key="faculty"
    path="/academic/faculty"
    element={
      <RequireAuth>
        <FacultyCard />
      </RequireAuth>
    }
  />,
  <Route
    key="grade"
    path="/academic/grade"
    element={
      <RequireAuth>
        <GradeCard />
      </RequireAuth>
    }
  />,
  <Route
    key="class"
    path="/academic/academic-class"
    element={
      <RequireAuth>
        <AcademicClassCard />
      </RequireAuth>
    }
  />,
  <Route
    key="yearData"
    path="/academic/academic-year/academic-data"
    element={
      <RequireAuth>
        <AcademicYearData />
      </RequireAuth>
    }
  />,
  <Route
    key="programData"
    path="/academic/program/program-data"
    element={
      <RequireAuth>
        <ProgramData />
      </RequireAuth>
    }
  />,
  <Route
    key="facultyData"
    path="/academic/faculty/faculty-data"
    element={
      <RequireAuth>
        <FacultyData />
      </RequireAuth>
    }
  />,
  <Route
    key="gradeData"
    path="/academic/grade/grade-data"
    element={
      <RequireAuth>
        <GradeData />
      </RequireAuth>
    }
  />,
  <Route
    key="classData"
    path="/academic/academic-class/academic-data"
    element={
      <RequireAuth>
        <AcademicClassData />
      </RequireAuth>
    }
  />,
];
