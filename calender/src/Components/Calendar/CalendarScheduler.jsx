import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Package } from 'lucide-react';
import styles from './styles';
import CalendarNav from './CalendarNav';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

// Main Calendar Scheduler Component
const CalendarScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  // Helper function to assign color based on status
  const getStatusColor = (status) => {
    const statusColors = {
      'In Progress': '#3b82f6',
      'Scheduled': '#10b981',
      'Completed': '#06b6d4',
      'Pending': '#f59e0b',
      'On Hold': '#ef4444',
      'Cancelled': '#6b7280'
    };
    return statusColors[status] || '#8b5cf6';
  };

  // Mock API data - Replace with actual API call
  const mockOrders = useMemo(() => {
    const ordersData = [
      {
        id: 1,
        orderNumber: 'MO-2024-001',
        productName: 'Widget Assembly',
        quantity: 500,
        productionLine: 'Line A',
        status: 'In Progress',
        startDateTime: new Date(2024, 9, 28, 8, 30),
        endDateTime: new Date(2024, 9, 28, 16, 45)
      },
      {
        id: 2,
        orderNumber: 'MO-2024-002',
        productName: 'Gear Manufacturing',
        quantity: 300,
        productionLine: 'Line B',
        status: 'Scheduled',
        startDateTime: new Date(2024, 9, 29, 9, 15),
        endDateTime: new Date(2024, 9, 30, 17, 30)
      },
      {
        id: 3,
        orderNumber: 'MO-2024-003',
        productName: 'Circuit Board Assembly',
        quantity: 750,
        productionLine: 'Line C',
        status: 'In Progress',
        startDateTime: new Date(2024, 9, 29, 7, 30),
        endDateTime: new Date(2024, 9, 29, 15, 45)
      },
      {
        id: 4,
        orderNumber: 'MO-2024-004',
        productName: 'Metal Stamping',
        quantity: 1000,
        productionLine: 'Line A',
        status: 'Scheduled',
        startDateTime: new Date(2024, 9, 30, 8, 0),
        endDateTime: new Date(2024, 9, 31, 16, 30)
      },
      {
        id: 5,
        orderNumber: 'MO-2024-005',
        productName: 'Packaging Unit',
        quantity: 2000,
        productionLine: 'Line D',
        status: 'Completed',
        startDateTime: new Date(2024, 9, 25, 6, 15),
        endDateTime: new Date(2024, 9, 25, 14, 45)
      },
      {
        id: 6,
        orderNumber: 'MO-2024-006',
        productName: 'Quality Inspection',
        quantity: 500,
        productionLine: 'Line B',
        status: 'In Progress',
        startDateTime: new Date(2024, 9, 29, 10, 30),
        endDateTime: new Date(2024, 9, 29, 12, 45)
      }
    ];
    
    // Assign colors based on status
    return ordersData.map(order => ({
      ...order,
      color: getStatusColor(order.status)
    }));
  }, []);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <Calendar style={{ color: '#2563eb' }} size={32} />
          <div>
            <h1 style={styles.mainTitle}>Manufacturing Scheduler</h1>
            <p style={styles.subtitle}>Plan and track production orders</p>
          </div>
        </div>

        <CalendarNav
          currentDate={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          view={view}
          onViewChange={setView}
        />

        {view === 'month' && <MonthView currentDate={currentDate} orders={mockOrders} />}
        {view === 'week' && <WeekView currentDate={currentDate} orders={mockOrders} />}
        {view === 'day' && <DayView currentDate={currentDate} orders={mockOrders} />}

        <div style={styles.legend}>
          <h3 style={styles.legendTitle}>Legend</h3>
          <div style={styles.legendItems}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: '#3b82f6' }}></div>
              <span style={styles.legendText}>In Progress</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: '#10b981' }}></div>
              <span style={styles.legendText}>Scheduled</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: '#06b6d4' }}></div>
              <span style={styles.legendText}>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CalendarScheduler;