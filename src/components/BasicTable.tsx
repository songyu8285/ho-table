import React from 'react';
import { TableProps, EnhancedTableProps } from '../types';

interface BasicTableProps extends TableProps, EnhancedTableProps {}

const BasicTable: React.FC<BasicTableProps> = ({
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  sortConfig,
  filters,
  onSort,
  onFilter,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="table-container">
      {/* Filters */}
      <div className="filters">
        {columns.map((column) => (
          <div key={column} className="filter-item">
            <input
              type="text"
              placeholder={`Filter ${column}...`}
              value={filters[column] || ''}
              onChange={(e) => onFilter(column, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => onSort(column)}
                style={{ cursor: 'pointer' }}
              >
                {column}
                {sortConfig?.field === column && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>

        <div className="page-controls">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;