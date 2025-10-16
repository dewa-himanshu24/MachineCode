import React, { useState, useCallback, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';


// Individual Message Component
const Message = React.forwardRef(({ message, onRetry }, ref) => {
  const isUser = message.sender === 'user';
  const isFailed = message.status === 'failed';
  const isPending = message.status === 'pending';

  return (
    <div 
      ref={ref}
      className={`message-container ${isUser ? 'user-message' : 'bot-message'}`}
    >
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'} ${isFailed ? 'failed' : ''} ${isPending ? 'pending' : ''}`}>
        <p className="message-text">{message.text}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      
      {isFailed && (
        <button onClick={() => onRetry(message.id)} className="retry-button">
          <RefreshCw size={12} />
          Retry
        </button>
      )}
      
      {isPending && (
        <div className="pending-status">
          <div className="spinner">
            <RefreshCw size={12} />
          </div>
          Sending...
        </div>
      )}
    </div>
  );
});

export default Message;