import React, { useState, useMemo } from 'react';
import styles from './styles';

// Reusable Order Card Component
const OrderCard = ({ order, isCompact }) => {
  const startDate = new Date(order.startDateTime);
  const endDate = new Date(order.endDateTime);
  
  const formatDateTime = (date) => {
    return date.toLocaleDateString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isCompact) {
    return (
      <div
        style={{
          ...styles.orderCardCompact,
          backgroundColor: order.color
        }}
        title={`${order.orderNumber} - ${order.productName}`}
      >
        <div style={styles.compactTime}>
          {startDate.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div style={styles.compactTitle}>{order.orderNumber}</div>
        <div style={styles.compactProduct}>{order.productName}</div>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.orderCard,
      backgroundColor: `${order.color}15`,
      borderLeftColor: order.color
    }}>
      <div style={styles.orderHeader}>
        <div style={styles.orderNumber}>{order.orderNumber}</div>
        <span style={{
          ...styles.statusBadge,
          backgroundColor: order.color
        }}>
          {order.status}
        </span>
      </div>
      <div style={styles.productName}>
        <Package size={14} />
        <span style={{ marginLeft: '4px' }}>{order.productName}</span>
      </div>
      <div style={styles.dateTimeInfo}>
        <div style={styles.dateTimeRow}>
          <Clock size={12} />
          <span style={{ marginLeft: '4px', fontWeight: '600' }}>Start:</span>
          <span style={{ marginLeft: '4px' }}>{formatDateTime(startDate)}</span>
        </div>
        <div style={styles.dateTimeRow}>
          <Clock size={12} />
          <span style={{ marginLeft: '4px', fontWeight: '600' }}>End:</span>
          <span style={{ marginLeft: '4px' }}>{formatDateTime(endDate)}</span>
        </div>
      </div>
      <div style={styles.orderFooter}>
        Qty: {order.quantity} | Line: {order.productionLine}
      </div>
    </div>
  );
};

export default OrderCard;