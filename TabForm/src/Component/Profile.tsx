import React from "react";

interface FormData {
  name: string;
  age: string;
  interests: string[];
  theme: string;
}

interface ErrorData {
  name?: string;
  age?: string;
  interest?: string;
}

interface ProfileProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  error: ErrorData;
}

const Profile: React.FC<ProfileProps> = ({ formData, setFormData, error }) => {
  const { name, age } = formData;

  const handleInputChange = (field: keyof FormData, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <>
      <div className="input-container">
        <div>
          Name<span className="required">*</span>
        </div>
        <input
          value={name}
          type="text"
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {error?.name && <span className="error">{error.name}</span>}
      </div>
      <div className="input-container">
        <div>
          Age<span className="required">*</span>
        </div>
        <input
          value={age}
          type="number"
          onChange={(e) => handleInputChange("age", e.target.value)}
        />
        {error?.age && <span className="error">{error.age}</span>}
      </div>
    </>
  );
};

export default Profile;
