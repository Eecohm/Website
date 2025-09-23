import AcademicYearCard from "@/Components/App/Acadamic/Card/AcademicYearCard";
import React from "react";
import Acadamic from "@/Components/App/Acadamic/Acadamic";
import ProgramCard from "@/Components/App/Acadamic/Card/ProgramCard";
import FacultyCard from "@/Components/App/Acadamic/Card/FacultyCard";
import GradeCard from "@/Components/App/Acadamic/Card/GradeCard";
import AcademicClassCard from "@/Components/App/Acadamic/Card/AcademicClassCard";
import ProgramData from "@/Components/App/Acadamic/Data/ProgramData";
import FacultyData from "@/Components/App/Acadamic/Data/FacultyData ";
import GradeData from "@/Components/App/Acadamic/Data/GradeData ";
import AcademicClassData from "@/Components/App/Acadamic/Data/AcademicClassData ";

const AcademicRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Acadamic />} />
      <Route path="/academic-year" element={<AcademicYearCard />} />
      <Route path="/program" element={<ProgramCard />} />
      <Route path="/faculty" element={<FacultyCard />} />
      <Route path="/grade" element={<GradeCard />} />
      <Route path="/academic-class" element={<AcademicClassCard />} />
      <Route
        path="/academic-year/academic-data"
        element={<AcademicYearData />}
      />
      <Route path="/program/program-data" element={<ProgramData />} />
      <Route path="/faculty/faculty-data" element={<FacultyData />} />
      <Route path="/grade/grade-data" element={<GradeData />} />
      <Route
        path="/academic-class/academic-data"
        element={<AcademicClassData />}
      />
    </Routes>
  );
};

export default AcademicRoutes;
