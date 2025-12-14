import AcademicYearCard from "@/features/admin/Acadamic/Card/AcademicYearCard";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Acadamic from "@/features/admin/Acadamic/Acadamic";
import ProgramCard from "@/features/admin/Acadamic/Card/ProgramCard";
import FacultyCard from "@/features/admin/Acadamic/Card/FacultyCard";
import GradeCard from "@/features/admin/Acadamic/Card/GradeCard";
import AcademicClassCard from "@/features/admin/Acadamic/Card/AcademicClassCard";
import ProgramData from "@/features/admin/Acadamic/Data/ProgramData";
import FacultyData from "@/features/admin/Acadamic/Data/FacultyData ";
import GradeData from "@/features/admin/Acadamic/Data/GradeData ";
import AcademicClassData from "@/features/admin/Acadamic/Data/AcademicClassData ";
import AcademicYearData from "@/features/admin/Acadamic/Data/AcademicYearData ";
import AcademicStudents from "@/features/admin/Acadamic/AcademicStudents";
import ClassDetail from "@/features/admin/Acadamic/ClassDetail/ClassDetail";

const AcademicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Acadamic />} />
      <Route path="/academic-year" element={<AcademicYearCard />} />
      <Route path="/program" element={<ProgramCard />} />
      <Route path="/faculty" element={<FacultyCard />} />
      <Route path="/grade" element={<GradeCard />} />
      <Route path="/academic-class" element={<AcademicClassCard />} />
      <Route path="/academic-class/:id" element={<ClassDetail />} />
      <Route path="/students" element={<AcademicStudents />} />
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
