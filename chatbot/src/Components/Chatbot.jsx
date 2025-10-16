import React, { useState, useCallback, useRef, useEffect } from 'react';
import VirtualizedMessageList from "./VirtualizedMessageList";
import { Send, MessageCircle, X, RefreshCw, AlertCircle } from 'lucide-react';
import Message from "./Message"

// Main Reusable Chatbot Component
const Chatbot = ({ 
  apiConfig = {
    endpoint: 'https://dummyjson.com/quotes/random',
    method: 'GET',
    transformResponse: (data) => data.quote,
    headers: {}
  },
  botName = "Assistant",
  theme = {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    background: '#FFFFFF'
  }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const fetchBotResponse = async (retryMessageId = null) => {
    try {
      const response = await fetch(apiConfig.endpoint, {
        method: apiConfig.method || 'GET',
        headers: apiConfig.headers || {}
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const botMessage = apiConfig.transformResponse 
        ? apiConfig.transformResponse(data) 
        : data.quote;

      const delay = Math.random() * 2000 + 1000;
      
      setTimeout(() => {
        const newMessage = {
          id: Date.now(),
          text: botMessage,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          status: 'sent'
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, delay);

    } catch (error) {
      console.error('Error fetching bot response:', error);
      setIsTyping(false);
      
      if (retryMessageId) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === retryMessageId
              ? { ...msg, status: 'failed' }
              : msg
          )
        );
      } else {
        const errorMessage = {
          id: Date.now(),
          text: "Sorry, I'm having trouble connecting. Please try again.",
          sender: 'bot',
          timestamp: new Date().toISOString(),
          status: 'failed'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
      
      fetchBotResponse();
    }, 500);
  };

  const retryMessage = (messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'pending' }
          : msg
      )
    );
    
    setIsTyping(true);
    fetchBotResponse(messageId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-fab" aria-label="Open chat">
          <MessageCircle size={28} />
          <span className="notification-badge"></span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">
                <MessageCircle size={20} />
              </div>
              <div className="bot-info">
                <h3 className="bot-name">{botName}</h3>
                <p className="bot-status">{isTyping ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-button" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div ref={messagesContainerRef} className="messages-area">
            {messages.length === 0 ? (
              <div className="empty-state">
                <MessageCircle size={48} />
                <p>Start a conversation!</p>
              </div>
            ) : messages.length > 50 ? (
              <VirtualizedMessageList
                messages={messages}
                containerRef={messagesContainerRef}
                onRetry={retryMessage}
              />
            ) : (
              messages.map(msg => (
                <Message
                  key={msg.id} 
                  message={msg} 
                  onRetry={retryMessage}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="message-input"
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        /* Chat FAB Button */
        .chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          border: none;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .chat-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.5);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background: #EF4444;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Chat Window */
        .chat-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 384px;
          height: 600px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          animation: slideUp 0.3s ease-out;
          border: 1px solid #E5E7EB;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          padding: 16px;
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bot-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .bot-info {
          display: flex;
          flex-direction: column;
        }

        .bot-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .bot-status {
          font-size: 12px;
          margin: 0;
          opacity: 0.9;
        }

        .close-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Messages Area */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
        }

        .messages-area::-webkit-scrollbar {
          width: 6px;
        }

        .messages-area::-webkit-scrollbar-track {
          background: #F3F4F6;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 3px;
        }

        .messages-area::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #9CA3AF;
          gap: 8px;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
        }

        /* Message Container */
        .message-container {
          display: flex;
          margin-bottom: 16px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-message {
          justify-content: flex-start;
        }

        .bot-message {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }

        .user-bubble {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .bot-bubble {
          background: #F3F4F6;
          color: #1F2937;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.failed {
          opacity: 0.6;
          border: 2px solid #F87171;
        }

        .message-bubble.pending {
          opacity: 0.7;
        }

        .message-text {
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 4px 0;
        }

        .message-time {
          font-size: 11px;
          opacity: 0.7;
          display: block;
        }

        .retry-button {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #EF4444;
          background: none;
          border: none;
          cursor: pointer;
          margin-top: 4px;
          padding: 4px 0;
          transition: color 0.2s;
        }

        .retry-button:hover {
          color: #DC2626;
        }

        .pending-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6B7280;
          margin-top: 4px;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Input Area */
        .input-area {
          padding: 16px;
          border-top: 1px solid #E5E7EB;
          background: white;
          border-radius: 0 0 16px 16px;
        }

        .input-container {
          display: flex;
          gap: 8px;
        }

        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .message-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-button {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          min-width: 48px;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;