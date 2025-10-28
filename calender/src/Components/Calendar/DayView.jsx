import React, { useState, useMemo } from 'react';
import styles from './styles';

// Day View Component
const DayView = ({ currentDate, orders }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getOrdersForDate = () => {
    return orders.filter(order => {
      const orderStart = new Date(order.startDateTime);
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      orderStart.setHours(0, 0, 0, 0);
      
      return orderStart.getTime() === checkDate.getTime();
    });
  };

  const dayOrders = getOrdersForDate();

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.dayViewContainer}>
        {hours.map(hour => (
          <div key={hour} style={styles.hourRow}>
            <div style={styles.hourLabel}>
              {hour.toString().padStart(2, '0')}:00
            </div>
            <div style={styles.hourContent}>
              {dayOrders
                .filter(order => new Date(order.startDateTime).getHours() === hour)
                .map(order => (
                  <OrderCard key={order.id} order={order} isCompact={false} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;