import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const CategoryPagination: React.FC<CategoryPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  // Calculate showing range
  const start = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show (maximum 5)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-500 order-2 sm:order-1">
        Showing <span className="font-semibold text-gray-900">{start}-{end}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> items
      </p>
      <div className="flex gap-2 order-1 sm:order-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
        >
          Previous
        </Button>
        
        <div className="hidden sm:flex items-center gap-1.5 px-2">
          {getPageNumbers().map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 text-sm font-medium rounded-md transition-all ${
                  isActive 
                    ? "bg-black text-white shadow-sm" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
