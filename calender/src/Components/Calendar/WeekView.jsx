import React, { useState, useMemo } from 'react';
import styles from './styles';

// Week View Component
const WeekView = ({ currentDate, orders }) => {
  const getWeekDays = () => {
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      days.push(day);
    }
    
    return days;
  };

  const getOrdersForDate = (date) => {
    return orders.filter(order => {
      const orderStart = new Date(order.startDateTime);
      const orderEnd = new Date(order.endDateTime);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      orderStart.setHours(0, 0, 0, 0);
      orderEnd.setHours(0, 0, 0, 0);
      
      return checkDate >= orderStart && checkDate <= orderEnd;
    });
  };

  const weekDays = getWeekDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.weekGrid}>
        {weekDays.map((day, index) => {
          const dayOrders = getOrdersForDate(day);
          const isToday = day.getTime() === today.getTime();
          
          return (
            <div key={index} style={styles.weekColumn}>
              <div style={{
                ...styles.weekDayHeader,
                backgroundColor: isToday ? '#eff6ff' : '#f9fafb'
              }}>
                <div style={styles.weekDayName}>
                  {day.toLocaleDateString('default', { weekday: 'short' })}
                </div>
                <div style={{
                  ...styles.weekDayNumber,
                  color: isToday ? '#2563eb' : '#1f2937'
                }}>
                  {day.getDate()}
                </div>
              </div>
              <div style={styles.weekDayContent}>
                {dayOrders.map(order => (
                  <OrderCard key={order.id} order={order} isCompact={false} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;