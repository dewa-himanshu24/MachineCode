
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Package } from 'lucide-react';
import styles from './styles';

// Reusable Calendar Navigation Component
const CalendarNav = ({ currentDate, onPrevious, onNext, onToday, view, onViewChange }) => {
  const formatTitle = () => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    
    if (view === 'day') {
      return currentDate.toLocaleDateString('default', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    return `${month} ${year}`;
  };

  return (
    <div style={styles.navContainer}>
      <div style={styles.navLeft}>
        <h1 style={styles.navTitle}>{formatTitle()}</h1>
        <button onClick={onToday} style={styles.todayBtn}>
          Today
        </button>
      </div>
      
      <div style={styles.navRight}>
        <div style={styles.viewToggle}>
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              style={{
                ...styles.viewBtn,
                ...(view === v ? styles.viewBtnActive : {})
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        
        <div style={styles.navButtons}>
          <button onClick={onPrevious} style={styles.navArrowBtn}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={onNext} style={styles.navArrowBtn}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarNav;