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
  theme?: string;
}

interface SettingProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  error: ErrorData;
}

const Setting: React.FC<SettingProps> = ({ formData, setFormData, error }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      theme: e.target.name,
    }));
  };

  return (
    <>
      <label key="dark">
        <input
          name="dark"
          type="radio"
          checked={formData.theme === "dark"}
          onChange={handleInputChange}
        />
        Dark
      </label>
      <label key="light">
        <input
          name="light"
          type="radio"
          checked={formData.theme === "light"}
          onChange={handleInputChange}
        />
        Light
      </label>
      {error?.theme && <span className="error">{error.theme}</span>}
    </>
  );
};

export default Setting;
