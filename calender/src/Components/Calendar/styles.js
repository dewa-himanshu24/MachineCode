// CSS Styles Object
const styles = {
  mainContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  },
  mainTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0 0 0'
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  navTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  todayBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    padding: '4px'
  },
  viewBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewBtnActive: {
    backgroundColor: '#ffffff',
    color: '#111827',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  navButtons: {
    display: 'flex',
    gap: '8px'
  },
  navArrowBtn: {
    padding: '8px',
    color: '#374151',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  weekdayHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  },
  weekdayCell: {
    padding: '12px',
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
  },
  monthGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)'
  },
  dayCell: {
    minHeight: '128px',
    padding: '8px',
    borderRight: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb'
  },
  todayCell: {
    boxShadow: 'inset 0 0 0 2px #3b82f6'
  },
  dayNumber: {
    fontSize: '14px',
    marginBottom: '4px'
  },
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  orderCardCompact: {
    marginBottom: '4px',
    padding: '6px 8px',
    borderRadius: '4px',
    color: '#ffffff',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontSize: '11px'
  },
  compactTime: {
    fontWeight: '600',
    marginBottom: '2px',
    fontSize: '10px'
  },
  compactTitle: {
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  compactProduct: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: '0.9'
  },
  moreOrders: {
    fontSize: '11px',
    color: '#6b7280',
    paddingLeft: '8px'
  },
  orderCard: {
    marginBottom: '8px',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
    borderLeft: '4px solid'
  },
  orderHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  orderNumber: {
    fontWeight: '600',
    color: '#1f2937'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: '500',
    color: '#ffffff'
  },
  productName: {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  dateTimeInfo: {
    fontSize: '12px',
    color: '#4b5563',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  dateTimeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  orderFooter: {
    fontSize: '11px',
    color: '#6b7280'
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    backgroundColor: '#e5e7eb'
  },
  weekColumn: {
    backgroundColor: '#ffffff'
  },
  weekDayHeader: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb'
  },
  weekDayName: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280'
  },
  weekDayNumber: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '700'
  },
  weekDayContent: {
    padding: '12px',
    minHeight: '384px'
  },
  dayViewContainer: {
    maxHeight: '600px',
    overflowY: 'auto'
  },
  hourRow: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb'
  },
  hourLabel: {
    width: '80px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    borderRight: '1px solid #e5e7eb'
  },
  hourContent: {
    flex: '1',
    padding: '12px',
    minHeight: '80px'
  },
  legend: {
    marginTop: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    padding: '16px'
  },
  legendTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
    margin: '0 0 12px 0'
  },
  legendItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px'
  },
  legendText: {
    fontSize: '14px',
    color: '#6b7280'
  }
};

export default styles;