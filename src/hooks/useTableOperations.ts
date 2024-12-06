import { useState, useMemo } from 'react';

interface UseTableOperationsProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  itemsPerPage?: number;
}

export function useTableOperations<T>({ data, searchFields, itemsPerPage = 10 }: UseTableOperationsProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Status filter
      if (statusFilter !== 'all') {
        const status = (item as { approved?: boolean; replied?: boolean }).approved ?? (item as { approved?: boolean; replied?: boolean }).replied;
        if (statusFilter === 'true' && !status) return false;
        if (statusFilter === 'false' && status) return false;
      }

      // Search filter
      if (!searchQuery) return true;
      
      return searchFields.some(field => {
        const value = String(item[field])?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, statusFilter, searchFields]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    pageSize,
    setPageSize,
  };
}