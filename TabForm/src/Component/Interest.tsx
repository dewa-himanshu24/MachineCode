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

interface InterestProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  error: ErrorData;
}

const Interest: React.FC<InterestProps> = ({ formData, setFormData, error }) => {
  const { interests } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, name]
        : prev.interests.filter((i) => i !== name),
    }));
  };

  const options = ["cricket", "badminton", "travelling", "coding"];

  return (
    <>
      {options.map((item) => (
        <label key={item}>
          <input
            name={item}
            type="checkbox"
            checked={interests.includes(item)}
            onChange={handleInputChange}
          />
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </label>
      ))}
      {error?.interest && <span className="error">{error.interest}</span>}
    </>
  );
};

export default Interest;
