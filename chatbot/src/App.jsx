

import './App.css';
import Chatbot from './Components/Chatbot';

function App() {
  const customApiConfig = {
    endpoint: 'https://dummyjson.com/quotes/random',
    method: 'GET',
    transformResponse: (data) => data.quote,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)',
      padding: '32px'
    }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '16px'
        }}>
          Advanced Chatbot Component
        </h1>
        <p style={{
          color: '#6B7280',
          marginBottom: '32px',
          fontSize: '16px'
        }}>
          Click the chat button in the bottom right to start a conversation!
        </p>
      </div>

      <Chatbot
        apiConfig={customApiConfig}
        botName="Quote Bot"
      />
    </div>
  );
}

export default App