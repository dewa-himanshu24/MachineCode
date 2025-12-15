

import React, { useState, useMemo, useEffect } from 'react';

// Sample data generator
const generateSampleData = (count = 100) => {
  const statuses = ['Active', 'Inactive', 'Pending'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${['Smith', 'Johnson', 'Williams', 'Brown'][i % 4]}`,
    age: 22 + (i % 40),
    email: `user${i + 1}@example.com`,
    department: departments[i % departments.length],
    salary: 40000 + (i * 1000),
    status: statuses[i % statuses.length],
    joinDate: new Date(2020 + (i % 5), i % 12, (i % 28) + 1).toISOString().split('T')[0]
  }));
};

// Table Configuration
const tableConfig = {
  columns: [
    { 
      key: 'id', 
      label: 'ID', 
      sortable: true, 
      type: 'number',
      width: '80px'
    },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true, 
      type: 'string',
      filterable: true,
      width: '200px'
    },
    { 
      key: 'age', 
      label: 'Age', 
      sortable: true, 
      type: 'number',
      filterable: true,
      filterType: 'range',
      width: '100px'
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true, 
      type: 'string',
      filterable: true,
      width: '250px'
    },
    { 
      key: 'department', 
      label: 'Department', 
      sortable: true, 
      type: 'string',
      filterable: true,
      width: '150px'
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      sortable: true, 
      type: 'number',
      filterable: true,
      filterType: 'range',
      width: '150px',
      customRender: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true, 
      type: 'string',
      width: '120px',
      customRender: (value) => {
        const colors = {
          Active: { bg: '#d1fae5', color: '#065f46' },
          Inactive: { bg: '#fee2e2', color: '#991b1b' },
          Pending: { bg: '#fef3c7', color: '#92400e' }
        };
        return (
          <span style={{
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: colors[value].bg,
            color: colors[value].color
          }}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'joinDate', 
      label: 'Join Date', 
      sortable: true, 
      type: 'date',
      width: '120px'
    }
  ],
  pageSize: 20,
  enablePagination: true,
  stickyHeader: true
};

const AdvancedTable = () => {
  const [data] = useState(() => generateSampleData(100));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [debouncedFilters, setDebouncedFilters] = useState({});

  // Debounce filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    
    return () => clearTimeout(handler);
  }, [filters]);

  // Persist state
  useEffect(() => {
    const state = { sortConfig, filters, currentPage };
    sessionStorage.setItem('tableState', JSON.stringify(state));
  }, [sortConfig, filters, currentPage]);

  // Load state
  useEffect(() => {
    const savedState = sessionStorage.getItem('tableState');
    if (savedState) {
      const { sortConfig: savedSort, filters: savedFilters, currentPage: savedPage } = JSON.parse(savedState);
      setSortConfig(savedSort);
      setFilters(savedFilters);
      setCurrentPage(savedPage);
    }
  }, []);

  // Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig(direction ? { key, direction } : { key: null, direction: null });
  };

  // Filtering
  const handleFilterChange = (key, value, filterType = 'text') => {
    setFilters(prev => ({
      ...prev,
      [key]: { value, type: filterType }
    }));
    setCurrentPage(1);
  };

  // Process data
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.entries(debouncedFilters).forEach(([key, filterObj]) => {
      if (!filterObj.value) return;
      
      if (filterObj.type === 'range') {
        const [min, max] = filterObj.value.split('-').map(v => parseFloat(v.trim()));
        filtered = filtered.filter(item => {
          const val = item[key];
          if (min && val < min) return false;
          if (max && val > max) return false;
          return true;
        });
      } else {
        filtered = filtered.filter(item => 
          String(item[key]).toLowerCase().includes(filterObj.value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        const column = tableConfig.columns.find(col => col.key === sortConfig.key);
        
        let comparison = 0;
        
        if (column.type === 'number') {
          comparison = aVal - bVal;
        } else if (column.type === 'date') {
          comparison = new Date(aVal) - new Date(bVal);
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, debouncedFilters, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!tableConfig.enablePagination) return processedData;
    
    const startIndex = (currentPage - 1) * tableConfig.pageSize;
    const endIndex = startIndex + tableConfig.pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / tableConfig.pageSize);

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    setFilters({});
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .sort-icon {
          display: inline-block;
          margin-left: 4px;
          opacity: 0.3;
          transition: opacity 0.2s;
        }
        
        .sort-icon.active {
          opacity: 1;
        }
        
        .table-row {
          transition: background-color 0.2s;
        }
        
        .table-row:hover {
          background-color: #f9fafb;
        }
        
        .btn {
          cursor: pointer;
          border: none;
          outline: none;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        .btn:active {
          transform: translateY(0);
        }
        
        .filter-input {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 12px;
          transition: border-color 0.2s;
        }
        
        .filter-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .expand-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
          transition: color 0.2s;
        }
        
        .expand-btn:hover {
          color: #111827;
        }
        
        .pagination-btn {
          padding: 8px 12px;
          margin: 0 4px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
      `}</style>
      
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Employee Data Table</h1>
              <p style={styles.subtitle}>
                Total: {processedData.length} records | Page {currentPage} of {totalPages}
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="btn"
              style={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={{
                ...styles.thead,
                ...(tableConfig.stickyHeader ? styles.stickyHeader : {})
              }}>
                <tr>
                  <th style={styles.thExpand}>Expand</th>
                  {tableConfig.columns.map(column => (
                    <th
                      key={column.key}
                      style={{
                        ...styles.th,
                        width: column.width
                      }}
                    >
                      <div style={styles.thContent}>
                        <div style={styles.thLabel}>
                          <span>{column.label}</span>
                          {column.sortable && (
                            <button
                              onClick={() => handleSort(column.key)}
                              className="btn"
                              style={styles.sortButton}
                            >
                              <span className={`sort-icon ${sortConfig.key === column.key ? 'active' : ''}`}>
                                {sortConfig.key === column.key && sortConfig.direction === 'asc' ? '↑' : 
                                 sortConfig.key === column.key && sortConfig.direction === 'desc' ? '↓' : '↕'}
                              </span>
                            </button>
                          )}
                        </div>
                        {column.filterable && (
                          <input
                            type="text"
                            placeholder={column.filterType === 'range' ? 'min-max' : 'Filter...'}
                            className="filter-input"
                            value={filters[column.key]?.value || ''}
                            onChange={(e) => handleFilterChange(column.key, e.target.value, column.filterType || 'text')}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={styles.tbody}>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={tableConfig.columns.length + 1} style={styles.emptyState}>
                      <div>
                        <div style={styles.emptyIcon}>📭</div>
                        <p style={styles.emptyText}>No data found</p>
                        <p style={styles.emptySubtext}>Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map(row => (
                    <React.Fragment key={row.id}>
                      <tr className="table-row" style={styles.tr}>
                        <td style={styles.tdExpand}>
                          <button
                            onClick={() => toggleRowExpansion(row.id)}
                            className="expand-btn"
                          >
                            {expandedRows.has(row.id) ? '▼' : '▶'}
                          </button>
                        </td>
                        {tableConfig.columns.map(column => (
                          <td key={column.key} style={styles.td}>
                            {column.customRender
                              ? column.customRender(row[column.key])
                              : row[column.key]}
                          </td>
                        ))}
                      </tr>
                      {expandedRows.has(row.id) && (
                        <tr style={styles.expandedRow}>
                          <td colSpan={tableConfig.columns.length + 1} style={styles.expandedContent}>
                            <div style={styles.expandedInner}>
                              <h4 style={styles.expandedTitle}>Additional Details</h4>
                              <div style={styles.expandedGrid}>
                                {tableConfig.columns.map(column => (
                                  <div key={column.key} style={styles.expandedItem}>
                                    <strong style={styles.expandedLabel}>{column.label}:</strong>
                                    <span style={styles.expandedValue}>
                                      {column.customRender && typeof column.customRender(row[column.key]) === 'string'
                                        ? column.customRender(row[column.key])
                                        : row[column.key]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {tableConfig.enablePagination && totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '24px'
  },
  wrapper: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    overflow: 'hidden'
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px'
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500'
  },
  tableContainer: {
    overflowX: 'auto',
    maxHeight: 'calc(100vh - 300px)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    backgroundColor: '#f9fafb'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb'
  },
  thExpand: {
    width: '60px',
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e5e7eb'
  },
  thContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  thLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  sortButton: {
    background: 'none',
    padding: '0 4px',
    fontSize: '14px'
  },
  tbody: {
    backgroundColor: 'white'
  },
  tr: {
    borderBottom: '1px solid #e5e7eb'
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#111827'
  },
  tdExpand: {
    padding: '16px',
    textAlign: 'center'
  },
  expandedRow: {
    backgroundColor: '#f9fafb'
  },
  expandedContent: {
    padding: '0'
  },
  expandedInner: {
    padding: '16px',
    borderTop: '1px solid #e5e7eb'
  },
  expandedTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  },
  expandedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px'
  },
  expandedItem: {
    display: 'flex',
    gap: '8px'
  },
  expandedLabel: {
    fontSize: '13px',
    color: '#6b7280'
  },
  expandedValue: {
    fontSize: '13px',
    color: '#111827'
  },
  pagination: {
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px'
  },
  emptyState: {
    padding: '48px 24px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#6b7280'
  }
};

export default AdvancedTable;