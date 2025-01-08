import React from 'react';

const withTable = (WrappedComponent, options = {}) => {
  const {
    sortable = true,
    filterable = true,
    pageable = true,
  } = options;

  return function TableHOC(props) {
    const [data, setData] = React.useState(props.data || []);
    const [sortConfig, setSortConfig] = React.useState(null);
    const [filters, setFilters] = React.useState({});
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);

    const sortData = React.useCallback((field) => {
      if (!sortable) return;

      let direction = 'asc';
      if (sortConfig && sortConfig.field === field && sortConfig.direction === 'asc') {
        direction = 'desc';
      }

      const sortedData = [...data].sort((a, b) => {
        if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
        return 0;
      });

      setData(sortedData);
      setSortConfig({ field, direction });
    }, [data, sortConfig, sortable]);

    const filterData = React.useCallback((field, value) => {
      if (!filterable) return;

      const newFilters = { ...filters, [field]: value };
      setFilters(newFilters);

      const filteredData = props.data.filter(item => {
        return Object.entries(newFilters).every(([key, filterValue]) => {
          if (!filterValue) return true;
          return String(item[key]).toLowerCase().includes(String(filterValue).toLowerCase());
        });
      });

      setData(filteredData);
      setCurrentPage(1);
    }, [filters, props.data, filterable]);

    const changePage = React.useCallback((page) => {
      if (!pageable) return;
      setCurrentPage(page);
    }, [pageable]);

    const getPaginatedData = React.useCallback(() => {
      if (!pageable) return data;
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage, pageable]);

    const tableProps = {
      data: getPaginatedData(),
      totalItems: data.length,
      currentPage,
      itemsPerPage,
      sortConfig,
      filters,
      onSort: sortData,
      onFilter: filterData,
      onPageChange: changePage,
      onItemsPerPageChange: setItemsPerPage,
    };

    return <WrappedComponent {...props} {...tableProps} />;
  };
};

export default withTable;