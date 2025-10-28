import React, { useState, useMemo } from 'react';
import styles from './styles';

// Month View Component
const MonthView = ({ currentDate, orders }) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i)
      });
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

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.weekdayHeader}>
        {weekDays.map(day => (
          <div key={day} style={styles.weekdayCell}>
            {day}
          </div>
        ))}
      </div>
      <div style={styles.monthGrid}>
        {days.map((day, index) => {
          const dayOrders = getOrdersForDate(day.fullDate);
          const isToday = day.fullDate.getTime() === today.getTime();
          
          return (
            <div
              key={index}
              style={{
                ...styles.dayCell,
                backgroundColor: !day.isCurrentMonth ? '#f9fafb' : '#ffffff',
                ...(isToday ? styles.todayCell : {})
              }}
            >
              <div style={{
                ...styles.dayNumber,
                color: !day.isCurrentMonth ? '#9ca3af' : isToday ? '#2563eb' : '#374151',
                fontWeight: isToday ? '700' : '500'
              }}>
                {day.date}
              </div>
              <div style={styles.ordersContainer}>
                {dayOrders.slice(0, 3).map(order => (
                  <OrderCard key={order.id} order={order} isCompact={true} />
                ))}
                {dayOrders.length > 3 && (
                  <div style={styles.moreOrders}>
                    +{dayOrders.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;