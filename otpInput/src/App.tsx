import './App.css';
import OTPInput from './components/OTPInput';
import { FC } from 'react';

// Define the App component as a Functional Component (FC) for TypeScript
const App: FC = () => {
  return (
    <div className="container">
      <h1>OTPInput</h1>
      <OTPInput />
    </div>
  );
};

export default App;