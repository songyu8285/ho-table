import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import withTable from '../withTable';

const mockData = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Alice', age: 30 },
  { id: 3, name: 'Bob', age: 20 },
];

const TestComponent = ({ data, onSort, onFilter, onPageChange }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Name</th>
          <th onClick={() => onSort('age')}>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <input
      data-testid="name-filter"
      onChange={(e) => onFilter('name', e.target.value)}
    />
    <button onClick={() => onPageChange(2)}>Next Page</button>
  </div>
);

const TableComponent = withTable(TestComponent);

describe('withTable HOC', () => {
  it('renders wrapped component with initial data', () => {
    render(<TableComponent data={mockData} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('sorts data when clicking on header', () => {
    render(<TableComponent data={mockData} />);
    
    // Click name header to sort
    fireEvent.click(screen.getByText('Name'));
    
    // Check if sorted alphabetically
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Alice');
    expect(cells[2]).toHaveTextContent('Bob');
    expect(cells[4]).toHaveTextContent('John');
  });

  it('filters data based on input', () => {
    render(<TableComponent data={mockData} />);
    
    const filterInput = screen.getByTestId('name-filter');
    fireEvent.change(filterInput, { target: { value: 'john' } });
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('paginates data', () => {
    render(<TableComponent data={mockData} />);
    
    // Click next page
    fireEvent.click(screen.getByText('Next Page'));
    
    // Since we have only 3 items and itemsPerPage is 10,
    // second page should be empty
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });
});