import React from 'react';
import BasicTable from '../components/BasicTable';
import withTable from '../withTable';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
  { id: 4, name: 'Alice Brown', age: 28, city: 'Houston' },
  { id: 5, name: 'Charlie Wilson', age: 42, city: 'Phoenix' },
  { id: 6, name: 'Diana Lee', age: 31, city: 'Boston' },
  { id: 7, name: 'Edward Kim', age: 29, city: 'Seattle' },
  { id: 8, name: 'Frank Zhang', age: 33, city: 'Miami' },
  { id: 9, name: 'Grace Davis', age: 27, city: 'Denver' },
  { id: 10, name: 'Henry Miller', age: 38, city: 'Austin' },
  { id: 11, name: 'Ivy Chen', age: 26, city: 'Portland' },
  { id: 12, name: 'Jack Taylor', age: 34, city: 'Atlanta' },
];

// Create enhanced table component
const EnhancedTable = withTable(BasicTable, {
  sortable: true,
  filterable: true,
  pageable: true,
});

// Demo App
const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Table HOC Demo</h1>
      <p>Features demonstrated:</p>
      <ul>
        <li>Click column headers to sort (ascending/descending)</li>
        <li>Use text inputs to filter data</li>
        <li>Change items per page and navigate through pages</li>
      </ul>
      <EnhancedTable data={sampleData} />
    </div>
  );
};

export default App;