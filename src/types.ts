export interface TableOptions {
  sortable?: boolean;
  filterable?: boolean;
  pageable?: boolean;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface Filters {
  [key: string]: string;
}

export interface TableData {
  [key: string]: any;
}

export interface TableProps {
  data: TableData[];
  [key: string]: any;
}

export interface EnhancedTableProps extends TableProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  sortConfig: SortConfig | null;
  filters: Filters;
  onSort: (field: string) => void;
  onFilter: (field: string, value: string) => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}