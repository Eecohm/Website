import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import NavBar from '../NavBar/NavBar';

// Reusable Form Components
const PersonalDetailForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <h3>Personal Details</h3>
    <div className="form-grid">
      <div>
        <label>Full Name *</label>
        <input
          type="text"
          value={formData.full_name || ''}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Date of Birth *</label>
        <input
          type="date"
          value={formData.date_of_birth || ''}
          onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Gender *</label>
        <select
          value={formData.gender || ''}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Photo *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
          required
        />
      </div>
    </div>
  </div>
);

const AddressDetailForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <h3>Address Details</h3>
    <div className="form-grid">
      <div>
        <label>Country *</label>
        <input
          type="text"
          value={formData.country || ''}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Province *</label>
        <input
          type="text"
          value={formData.province || ''}
          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Municipality *</label>
        <input
          type="text"
          value={formData.municipality || ''}
          onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Ward *</label>
        <input
          type="text"
          value={formData.ward || ''}
          onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Tole *</label>
        <input
          type="text"
          value={formData.tole || ''}
          onChange={(e) => setFormData({ ...formData, tole: e.target.value })}
          required
        />
      </div>
    </div>
  </div>
);

const ContactDetailForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <h3>Contact Details</h3>
    <div className="form-grid">
      <div>
        <label>Phone *</label>
        <input
          type="text"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Alternate Phone</label>
        <input
          type="text"
          value={formData.alternate_phone || ''}
          onChange={(e) => setFormData({ ...formData, alternate_phone: e.target.value })}
        />
      </div>
      <div>
        <label>Email *</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
    </div>
  </div>
);

const DocumentDetailForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <h3>Document Details</h3>
    <div className="form-grid">
      <div>
        <label>Nagarikta Number *</label>
        <input
          type="text"
          value={formData.nagarikta_no || ''}
          onChange={(e) => setFormData({ ...formData, nagarikta_no: e.target.value })}
          required
        />
      </div>
      <div>
        <label>PAN Number</label>
        <input
          type="text"
          value={formData.pan_no || ''}
          onChange={(e) => setFormData({ ...formData, pan_no: e.target.value })}
        />
      </div>
      <div>
        <label>Nagarikta Photo *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, nagarikta_photo: e.target.files[0] })}
          required
        />
      </div>
      <div>
        <label>PAN Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, pan_photo: e.target.files[0] })}
        />
      </div>
    </div>
  </div>
);

// Role-specific Forms
const StudentForm = ({ navigate }) => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://bishamsinchiury.com.np/api/student/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit student data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <div className="form-section">
        <h3>Student Details</h3>
        <div className="form-grid">
          <div>
            <label>Mother's Name *</label>
            <input
              type="text"
              value={formData.mother_name || ''}
              onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Father's Name *</label>
            <input
              type="text"
              value={formData.father_name || ''}
              onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Guardian Email</label>
            <input
              type="email"
              value={formData.guardian || ''}
              onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
            />
          </div>
          <div>
            <label>Birth Certificate Photo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, birth_certificate_photo: e.target.files[0] })}
              required
            />
          </div>
          <div>
            <label>Grade (Class ID)</label>
            <input
              type="text"
              value={formData.grade || ''}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            />
          </div>
          <div>
            <label>Roll Number</label>
            <input
              type="number"
              value={formData.rollno || ''}
              onChange={(e) => setFormData({ ...formData, rollno: e.target.value })}
            />
          </div>
          <div>
            <label>Symbol Number</label>
            <input
              type="text"
              value={formData.symbol_number || ''}
              onChange={(e) => setFormData({ ...formData, symbol_number: e.target.value })}
            />
          </div>
          <div>
            <label>IEMIS Code</label>
            <input
              type="text"
              value={formData.iemis_code || ''}
              onChange={(e) => setFormData({ ...formData, iemis_code: e.target.value })}
            />
          </div>
          <div>
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const TeacherForm = ({ navigate }) => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://bishamsinchiury.com.np/api/teacher/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit teacher data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Teacher Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} />
      <div className="form-section">
        <h3>Teacher Details</h3>
        <div className="form-grid">
          <div>
            <label>Subject *</label>
            <input
              type="text"
              value={formData.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Hire Date *</label>
            <input
              type="date"
              value={formData.hire_date || ''}
              onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const GuardianForm = ({ navigate }) => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://bishamsinchiury.com.np/api/guardian/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit guardian data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Guardian Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <div className="form-section">
        <h3>Guardian Details</h3>
        <div className="form-grid">
          <div>
            <label>Relation to Student *</label>
            <input
              type="text"
              value={formData.relation_to_student || ''}
              onChange={(e) => setFormData({ ...formData, relation_to_student: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const EmployeeForm = ({ navigate }) => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://bishamsinchiury.com.np/api/employee/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit employee data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Employee Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} />
      <div className="form-section">
        <h3>Employee Details</h3>
        <div className="form-grid">
          <div>
            <label>Position *</label>
            <input
              type="text"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Department *</label>
            <input
              type="text"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Driving License Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, driving_license_photo: e.target.files[0] })}
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const OwnerForm = ({ navigate }) => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://bishamsinchiury.com.np/api/owner/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit owner data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Owner Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} />
      <div className="form-section">
        <h3>Owner Details</h3>
        <div className="form-grid">
          <div>
            <label>Institution Name *</label>
            <input
              type="text"
              value={formData.institution_name || ''}
              onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const Register = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch('https://bishamsinchiury.com.np/api/user/user/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setRole(data.role.toLowerCase());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return <div className="loading">Loading...</div>;

  let FormComponent;
  switch (role) {
    case 'student':
      FormComponent = StudentForm;
      break;
    case 'teacher':
      FormComponent = TeacherForm;
      break;
    case 'guardian':
      FormComponent = GuardianForm;
      break;
    case 'employee':
      FormComponent = EmployeeForm;
      break;
    case 'owner':
      FormComponent = OwnerForm;
      break;
    default:
      return (
        <>
          <NavBar />
          <div className="registration-form">
            <div className="form-container">
              <h2>Error</h2>
              <p>Invalid or unset role. Please contact support.</p>
            </div>
          </div>
        </>
      );
  }

  return (
    <>
      <NavBar />
      <div className="registration-form">
        <FormComponent navigate={navigate} />
      </div>
    </>
  );
};

export default Register;