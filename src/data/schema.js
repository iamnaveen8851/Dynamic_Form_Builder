const formSchema = [
  { type: "text", name: "name", label: "Full Name", required: true },
  { type: "email", name: "email", label: "Email", required: true },
  {
    type: "select",
    name: "gender",
    label: "Gender",
    options: ["Male", "Female", "Other"],
  },
  { type: "checkbox", name: "subscribe", label: "Subscribe to newsletter" },
  {
    type: "section",
    name: "education",
    label: "Education",
    fields: [
      { type: "text", name: "degree", label: "Degree", required: true },
      { type: "text", name: "university", label: "University", required: true },
    ],
  },
];

export default formSchema;
