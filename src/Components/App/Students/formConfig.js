import { FiUser, FiPhone, FiUsers, FiBook } from "react-icons/fi";

const formConfig = [
  {
    part: 1,
    sections: [
      {
        id: 1,
        title: "Personal Details",
        icon: FiUser,
        fields: [
          {
            label: "First Name *",
            name: "firstName",
            type: "text",
            required: true,
          },
          { label: "Middle Name", name: "middleName", type: "text" },
          {
            label: "Last Name *",
            name: "lastName",
            type: "text",
            required: true,
          },
          {
            label: "Date of Birth *",
            name: "dateOfBirth",
            type: "date",
            required: true,
          },
          {
            label: "Passport Photo *",
            name: "photo",
            type: "photo",
            required: true,
          },
        ],
      },
      {
        id: 2,
        title: "Contact Details",
        icon: FiPhone,
        fields: [
          {
            label: "Contact Number *",
            name: "contactNumber",
            type: "text",
            required: true,
          },
          { label: "Email *", name: "email", type: "email", required: true },
          {
            label: "Address *",
            name: "address",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
  {
    part: 2,
    sections: [
      {
        id: 1,
        title: "Parents Details",
        icon: FiUsers,
        fields: [
          {
            label: "Father's Name *",
            name: "fatherName",
            type: "text",
            required: true,
          },
          {
            label: "Father's Contact *",
            name: "fatherContact",
            type: "text",
            required: true,
          },
          {
            label: "Mother's Name *",
            name: "motherName",
            type: "text",
            required: true,
          },
          {
            label: "Mother's Contact *",
            name: "motherContact",
            type: "text",
            required: true,
          },
          { label: "Guardian Name", name: "guardianName", type: "text" },
          { label: "Guardian Contact", name: "guardianContact", type: "text" },
        ],
      },
    ],
  },
  {
    part: 3,
    sections: [
      {
        id: 1,
        title: "Educational Details",
        icon: FiBook,
        fields: [
          {
            label: "Previous School *",
            name: "previousSchool",
            type: "text",
            required: true,
          },
          { label: "Program *", name: "program", type: "text", required: true },
          { label: "Faculty *", name: "faculty", type: "text", required: true },
          {
            label: "Academic Class *",
            name: "academicClass",
            type: "text",
            required: true,
          },
          { label: "EMIS Code", name: "emisCode", type: "text" },
          { label: "Registration No.", name: "registrationNo", type: "text" },
          { label: "Symbol No.", name: "symbolNo", type: "text" },
        ],
      },
    ],
  },
];

export default formConfig;
