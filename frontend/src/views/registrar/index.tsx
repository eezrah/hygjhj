import { Routes, Route } from 'react-router-dom';

const RegistrarDashboard = () => <div>Registrar Dashboard</div>;
const CourseManagement = () => <div>Course Management</div>;
const EnrollmentManagement = () => <div>Enrollment Management</div>;

function Registrar() {
  return (
    <Routes>
      <Route path="/" element={<RegistrarDashboard />} />
      <Route path="courses" element={<CourseManagement />} />
      <Route path="enrollment" element={<EnrollmentManagement />} />
    </Routes>
  );
}

export default Registrar;