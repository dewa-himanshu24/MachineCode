import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useRef } from 'react';
import { useEffect } from 'react';

const Chatbot = ({
  botName = "Assistant",
  apiConfig = {
    endpoint: 'https://dummyjson.com/quotes/random',
    method: 'GET',
    transformResponse: (data) => console.log('~ data', data),
    headers: {},
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  async function fetchBotResponse() {
    try {
      const response = await fetch(apiConfig.endpoint, {
        method: apiConfig.method,
        headers: apiConfig.headers,
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      console.log('~ data1', data);
    } catch (error) {
        console.error('Error fetching bot response:', error);
        setIsTyping(false);
    }
  }

  function sendMessage() {
    if (!inputValue.trim()) return;

    const userInput = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timeStamp: new Date().toISOString(),
      status: 'pending'
    }
    console.log('~ input Value', userInput);
    setMessages(prev => [...prev, userInput]);
    setInputValue('');
    setIsTyping(true);
    fetchBotResponse();
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          className="chat-btn"
          onClick={() => setIsOpen(true)}
        >
        <MessageCircle size={28}/>
        <span className="notification-badge"></span>
      </button>
    )}

      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="bot-avatar">
                <MessageCircle size={20} />
              </div>
              <div className="bot-info">
                <h3 className="bot-name">{botName}</h3>
                <p className="bot-status">{isTyping ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='close-chat'
            >
              <X size={20} />
            </button>
          </div>

          {/* message */}
          <div className="chat-msgs">

          </div>
          {/* Input */}
          <div className="chat-input-wrapper">
            <div className="chat-input-container">
              <input
                type="text"
                ref={inputRef}
                className='chat-input'
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={sendMessage}
                className="send-button"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot