import React, { useState, useEffect, useRef, useCallback } from 'react';
import Message from './Message';

// Virtualized List Component for handling 100s of messages
const VirtualizedMessageList = ({ messages, containerRef, onRetry }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const messageRefs = useRef({});
  const ITEM_HEIGHT = 80;
  const BUFFER = 5;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
      const end = Math.min(
        messages.length,
        Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER
      );
      
      setVisibleRange({ start, end });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messages.length, containerRef]);

  const totalHeight = messages.length * ITEM_HEIGHT;
  const offsetY = visibleRange.start * ITEM_HEIGHT;

  return (
    <div style={{ height: totalHeight, position: 'relative' }}>
      <div style={{ transform: `translateY(${offsetY}px)` }}>
        {messages.slice(visibleRange.start, visibleRange.end).map((msg, idx) => {
          const actualIndex = visibleRange.start + idx;
          return (
            <Message 
              key={msg.id} 
              message={msg} 
              onRetry={onRetry}
              ref={el => messageRefs.current[msg.id] = el}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedMessageList;