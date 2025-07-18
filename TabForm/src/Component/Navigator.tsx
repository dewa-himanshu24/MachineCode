import React, { useState } from "react";
import Profile from "./Profile";
import Interest from "./Interest";
import Setting from "./Setting";

interface FormData {
  name: string;
  age: string;
  interests: string[];
  theme: string;
}

interface ErrorState {
  name?: string;
  age?: string;
  interest?: string;
}

interface Tab {
  path: string;
  tabName: string;
  component: React.FC<TabComponentProps>;
  validate: () => boolean;
}

interface TabComponentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  error: ErrorState;
}

const Navigator: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("/profile");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    interests: [],
    theme: "dark",
  });

  const [error, setError] = useState<ErrorState>({});

  const tabs: Tab[] = [
    {
      path: "/profile",
      tabName: "Profile",
      component: Profile,
      validate: () => {
        const obj: ErrorState = {};
        if (!formData.name || formData.name.length < 2) {
          obj.name = "Invalid Name";
        }
        if (!formData.age) {
          obj.age = "Age cannot be empty";
        }
        setError(obj);
        return !obj.name && !obj.age;
      },
    },
    {
      path: "/interest",
      tabName: "Interest",
      component: Interest,
      validate: () => {
        const obj: ErrorState = {};
        if (formData.interests.length < 2) {
          obj.interest = "Select at least 2";
        }
        setError(obj);
        return !obj.interest;
      },
    },
    {
      path: "/setting",
      tabName: "Setting",
      component: Setting,
      validate: () => true,
    },
  ];

  const currentTabIndex = tabs.findIndex((tab) => tab.path === currentTab);
  const ActiveTab = tabs[currentTabIndex];

  const handleNext = () => {
    if (
      currentTabIndex < tabs.length - 1 &&
      tabs[currentTabIndex].validate()
    ) {
      setCurrentTab(tabs[currentTabIndex + 1].path);
    }
  };

  const handlePrev = () => {
    if (currentTabIndex > 0) {
      setCurrentTab(tabs[currentTabIndex - 1].path);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="navigator">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            className={`tab ${currentTab === tab.path ? "active" : ""}`}
            onClick={() =>
              ActiveTab.validate() && setCurrentTab(tab.path)
            }
          >
            {tab.tabName}
          </div>
        ))}
      </div>

      <div className="tab-content-container">
        <div className="tab-content">
          <ActiveTab.component
            formData={formData}
            setFormData={setFormData}
            error={error}
          />
        </div>
      </div>

      <div>
        {currentTabIndex > 0 && <button onClick={handlePrev}>Prev</button>}
        {currentTabIndex < tabs.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {currentTabIndex === tabs.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Navigator;
